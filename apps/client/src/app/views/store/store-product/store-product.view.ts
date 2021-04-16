import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IImage, IProduct, IUser, ProductInUserCart } from '@csl/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Products, ProductsState } from '@/global/store/products';
import {
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	take,
} from 'rxjs/operators';
import { Auth, AuthState, AuthStateModel } from '@/global/store/auth';

@Component({
	selector: 'csl-store-product',
	templateUrl: './store-product.view.html',
	styleUrls: ['./store-product.view.scss'],
})
export class StoreProductView implements OnInit {
	product$: Observable<IProduct>;

	@Select(ProductsState.products)
	products$: Observable<IProduct[]>;

	@Select(ProductsState.loading)
	loading$: Observable<boolean>;

	@Select(AuthState.user)
	user$: Observable<IUser>;

	@Select(AuthState.orderDraft)
	orderDraft$: Observable<IUser>;

	images$: Observable<IImage[]>;

	id: string;
	category: IProduct['category'];

	orderForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private dialog: DialogService,
		private toastr: ToastrService,
		private router: Router,
		private store: Store
	) {
		const params = this.route.snapshot.paramMap;

		this.id = params.get('productID');
		this.category = params.get('category') as IProduct['category'];

		const { orderDraft }: AuthStateModel = this.store.selectSnapshot(AuthState);

		if (this.category === 'gadgets') {
			this.orderForm = this.fb.group({
				id: [this.id, Validators.required],
				quantity: [
					'',
					[
						Validators.required,
						Validators.min(1),
						...(orderDraft ? [Validators.max(orderDraft.quantity)] : []),
					],
				],
				color: ['', Validators.required],
				size: ['', Validators.required],
			});
		} else if (this.category === 'photos') {
			this.orderForm = this.fb.group({
				id: [this.id, Validators.required],
				quantity: ['', Validators.required],
			});
		}
	}

	ngOnInit(): void {
		this.store.dispatch(new Products.LoadImages(this.id));

		this.product$ = this.products$.pipe(
			distinctUntilChanged(),
			filter((products) => (products ? true : false)),
			map((products) => products.find((x) => x.id === this.id))
		);

		this.images$ = this.product$.pipe(
			/**
			 * Filter to check that all images have been fetched.
			 */
			filter(
				(product) => product.fileNames.length === product.previewLinks.length
			),
			map((product) => product.previewLinks.map((link) => ({ link })))
		);
	}

	get selectedColor(): string {
		return this.orderForm.value.color;
	}

	selectColor(color: string) {
		this.orderForm.patchValue({ color });
	}

	addToCart(): void {
		const productForm: ProductInUserCart = this.orderForm.value;

		this.dialog
			.open({
				title: 'Sei sicuro di voler ordinare questo prodotto?',
				text:
					'Potrai comunque rivedere i tuoi ordini prima di procedere al pagamento',
				answer: 'Conferma',
				color: 'primary',
			})
			.pipe(
				switchMap(() => this.product$),
				switchMap((product) =>
					this.store.dispatch(
						new Auth.AddToCart({
							...productForm,
							discountable: product.discountable,
						})
					)
				),
				take(1)
			)
			.subscribe({
				next: () => {
					this.toastr.show({
						color: 'success',
						message: 'Prodotto aggiunto con successo',
					});

					this.router.navigate(['..'], {
						relativeTo: this.route,
					});
				},
				error: () => this.toastr.showError(),
			});
	}
}
