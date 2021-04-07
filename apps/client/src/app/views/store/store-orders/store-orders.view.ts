import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '@global/services/orders/orders.service';
import { DialogService, ToastrService } from '@csl/ui';
import { IProduct, IUser, ProductInUserCart } from '@csl/shared';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '@/global/store/auth';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Products, ProductsState } from '@/global/store/products';

@Component({
	selector: 'csl-orders',
	templateUrl: './store-orders.view.html',
	styleUrls: ['./store-orders.view.scss'],
})
export class StoreOrdersView implements OnInit {
	category: IProduct['category'];
	displayedColumns: string[];

	@Select(AuthState.user)
	user$: Observable<IUser>;

	@Select(ProductsState.products)
	products$: Observable<IProduct[]>;

	orders$: Observable<
		ProductInUserCart[] &
			{
				name: IProduct['name'];
				category: IProduct['category'];
				color: IProduct['colors'][0]['color'];
			}[]
	>;

	constructor(
		private dialog: DialogService,
		private toastr: ToastrService,
		public orders: OrdersService,
		private router: Router,
		private store: Store
	) {}

	ngOnInit(): void {
		this.store.dispatch(new Products.GetAll());

		this.category = this.router.url.includes('gadgets') ? 'gadgets' : 'photos';

		this.orders$ = combineLatest([this.products$, this.user$]).pipe(
			map(([products, user]) => ({
				products,
				user,
			})),
			filter((value) => {
				return (
					value.products &&
					value.products.length > 0 &&
					value.user &&
					value.user.cart.length > 0
				);
			}),
			map(({ user, products: availableProducts }) => {
				const cart = user.cart;

				return cart
					.map((product) => {
						const availableProduct = availableProducts.find(
							(x) => x.id === product.id
						);

						const selectedColor = availableProduct.colors.find(
							(x) => x.id === product.color
						);

						return {
							...product,
							category: availableProduct.category,
							name: availableProduct.name,
							color: selectedColor.color,
						};
					})
					.filter((product) => product.category === this.category);
			})
		);

		this.displayedColumns =
			this.category === 'gadgets'
				? ['name', 'quantity', 'size', 'color']
				: ['name', 'quantity'];

		if (!this.orders[this.category]) {
			this.orders.getOrders();
		}
	}

	deleteOrder(product: ProductInUserCart) {
		this.dialog
			.open({
				title:
					'Sei sicuro di voler eliminare questo prodotto dal tuo carrello?',
				text: 'Potrai comunque riordinarlo in seguito',
				color: 'warn',
				answer: 'Conferma',
			})
			.subscribe(() => {
				this.orders.deleteProduct(product).subscribe((res) => {
					const { err, success } = res;

					if (
						success === false &&
						err === 'Your order has already been confirmed'
					) {
						this.toastr.show({
							message: 'Ordine già confermato',
							color: 'accent',
							action: 'Chiudi',
							duration: 5000,
						});
					} else if (success === false) {
						this.toastr.showError();
					} else {
						this.toastr.show({
							message: 'Ordine cancellato',
							color: 'accent',
							action: 'Chiudi',
							duration: 5000,
						});
					}
				});
			});
	}

	confirmOrder() {
		this.dialog
			.open({
				title: 'Sei sicuro di voler confermare il tuo ordine?',
				text: 'Se confermi, non potrai più effettuare modifiche',
				color: 'primary',
				answer: 'Conferma',
			})
			.subscribe(() => {
				this.orders.confirmOrder(this.category).subscribe((res) => {
					const { success } = res;

					if (success === true) {
						this.toastr.show({
							message: 'Ordine confermato',
							color: 'success',
							action: 'Chiudi',
							duration: 5000,
						});
					} else if (success === false) {
						this.toastr.showError();
					}

					this.orders.getOrders();
				});
			});
	}
}
