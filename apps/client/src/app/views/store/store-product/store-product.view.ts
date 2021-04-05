import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IImage, IProduct } from '@csl/shared';
import { OrdersService } from '@global/services/orders/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Products, ProductsState } from '@/global/store/products';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
	selector: 'csl-store-product',
	templateUrl: './store-product.view.html',
	styleUrls: ['./store-product.view.scss'],
})
export class StoreProductView implements OnInit {
	product$: Observable<IProduct>;

	@Select(ProductsState.products)
	products$: Observable<IProduct[]>;

	id: string;
	images: IImage[];
	category: IProduct['category'];

	orderForm: FormGroup;

	constructor(
		private activated: ActivatedRoute,
		private ordersService: OrdersService,
		private fb: FormBuilder,
		private dialog: DialogService,
		private toastr: ToastrService,
		private router: Router,
		private store: Store,
	) {
		this.id = this.activated.snapshot.paramMap.get('productID');
		this.category = this.activated.snapshot.paramMap.get(
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
			map((products) => products.find((x) => x.id === this.id)),
			tap(console.log)
		);
	}

	get selectedColor(): string {
		return this.orderForm.value.color;
	}

	get carouselReady(): boolean {
		// return this.images.length === this.product.fileNames.length;
		return false;
	}

	selectColor(color: string) {
		if (color === this.orderForm.value.color) {
			this.orderForm.patchValue({ color: '' });
		} else {
			this.orderForm.patchValue({ color });
		}
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
			.subscribe(() => {
				this.ordersService.addToCart(this.orderForm.value).subscribe((res) => {
					if (res.success) {
						this.toastr.show({
							message: 'Prodotto aggiunto al carrello',
							color: 'success',
						});

						this.router.navigate(['..', 'store', this.category]);
					} else if (res.err === 'already-confirmed') {
						this.toastr.show({
							message: 'Hai già confermato il tuo ordine!',
							color: 'accent',
						});
					} else {
						this.toastr.showError();
					}
				});
			});
	}
}
