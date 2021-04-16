import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '@global/services/orders/orders.service';
import { DialogService, ToastrService } from '@csl/ui';
import { IProduct, IUser, ProductInUserCart } from '@csl/shared';
import { Select, Store } from '@ngxs/store';
import { Auth, AuthState } from '@/global/store/auth';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
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
		(ProductInUserCart & {
			name: IProduct['name'];
			category: IProduct['category'];
			color: IProduct['colors'][number]['color'];
			price: number;
		})[]
	>;

	total$: Observable<{ value: number }>;

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

		const combined$ = combineLatest([this.products$, this.user$]).pipe(
			map(([products, user]) => ({
				products,
				user,
			})),
			filter(({ products, user }) => (products && user ? true : false))
		);

		this.orders$ = combined$.pipe(
			filter((state) => state.products && state.products.length > 0),
			map(({ user, products: availableProducts }) => {
				if (!user.cart || user.cart.length === 0) {
					return [];
				}

				const cart = user.cart;

				const reducedCart: (ProductInUserCart & {
					discounted: boolean;
				})[] = cart.reduce((acc, product: ProductInUserCart) => {
					if (product.bundled) {
						const bundled = product.bundled;

						return [
							...acc,
							{ ...product, discounted: false },
							{ ...bundled, discounted: true },
						];
					} else {
						return [...acc, { ...product, discounted: false }];
					}
				}, []);

				return reducedCart
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
							price: product.discounted
								? availableProduct.price / 2
								: availableProduct.price,
							color: selectedColor.color,
						};
					})
					.filter((product) => product.category === this.category);
			})
		);

		this.total$ = this.orders$.pipe(
			map((cart) => {
				if (cart.length === 0) {
					return { value: 0 };
				}

				return { value: cart.reduce((acc, val) => acc + val.price, 0) };
			})
		);

		this.displayedColumns =
			this.category === 'gadgets'
				? ['name', 'quantity', 'size', 'color', 'price', 'actions']
				: ['name', 'quantity', 'actions'];
	}

	removeFromCart(product: ProductInUserCart) {
		this.dialog
			.open({
				title:
					'Sei sicuro di voler eliminare questo prodotto dal tuo carrello?',
				text: 'Potrai comunque riordinarlo in seguito',
				color: 'warn',
				answer: 'Conferma',
			})
			.pipe(
				switchMap(() => this.store.dispatch(new Auth.RemoveFromCart(product)))
			)
			.subscribe({
				next: () =>
					this.toastr.show({
						message: 'Prodotto eliminato correttamente',
						color: 'basic',
					}),
				error: (err) => {
					console.log(err);
					this.toastr.showError(err);
				},
			});
	}

	confirmOrder() {
		this.dialog
			.open({
				title: 'Sei sicuro di voler confermare il tuo ordine?',
				text:
					"Per confermare l'ordine avremo bisogno di sapere il tuo numero di telefono, per saperne di più consulta la nostra politica sulla privacy.",
				color: 'primary',
				answer: 'Conferma',
				hasInput: true,
				inputType: 'text',
				inputLabel: 'Numero di telefono',
				inputPattern: /^(\+?39)?3\d{2}\d{6,8}$/,
			})
			.pipe(
				switchMap((phone: string) =>
					this.store.dispatch(new Auth.ConfirmCategory(this.category, phone))
				)
			)
			.subscribe({
				next: () => {
					this.toastr.show({
						message: 'Ordine confermato',
						color: 'success',
						action: 'Chiudi',
						duration: 5000,
					});
				},

				error: (err) => this.toastr.showError(err),
			});
	}
}
