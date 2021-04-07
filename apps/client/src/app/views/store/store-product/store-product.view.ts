import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IImage, IProduct } from '@csl/shared';
import { OrdersService } from '@global/services/orders/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Products, ProductsState } from '@/global/store/products';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

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

	images$: Observable<IImage[]>;

	id: string;
	category: IProduct['category'];

	orderForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private ordersService: OrdersService,
		private fb: FormBuilder,
		private dialog: DialogService,
		private toastr: ToastrService,
		private router: Router,
		private store: Store,
	) {
		const params = this.route.snapshot.paramMap;
		
		this.id = params.get('productID');
		this.category = params.get(
			'category'
		) as IProduct['category'];

		if (this.category === 'gadgets') {
			this.orderForm = this.fb.group({
				id: [this.id, Validators.required],
				quantity: ['', Validators.required],
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
		this.dialog
			.open({
				title: 'Sei sicuro di voler ordinare questo prodotto?',
				text:
					'Potrai comunque rivedere i tuoi ordini prima di procedere al pagamento',
				answer: 'Conferma',
				color: 'primary',
			})
			.pipe(switchMap(() => this.ordersService.addToCart(this.orderForm.value)))
			.subscribe((res) => {
				if (res.success === true) {
					this.toastr.show({
						message: 'Prodotto aggiunto al carrello',
						color: 'success',
					});

					this.router.navigate(['..'], {
						relativeTo: this.route
					});
				} else if (res.err === 'already-confirmed') {
					this.toastr.show({
						message: 'Hai già confermato il tuo ordine!',
						color: 'accent',
					});
				} else {
					this.toastr.showError();
				}
			});
	}
}
