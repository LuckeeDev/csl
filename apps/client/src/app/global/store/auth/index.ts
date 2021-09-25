import { AuthService } from '@/global/services/auth/auth.service';
import { OrdersService } from '@/global/services/orders/orders.service';
import { Injectable } from '@angular/core';
import { IProduct, IUser, ProductInUserCart } from '@csl/shared';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Platform } from '../platform';

export namespace Auth {
	export class GetUser {
		static readonly type = '[OldAuth] Get User';
		constructor(
			public options: { firebaseToken: boolean; platformStatus: boolean }
		) {}
	}

	export class AddToCart {
		static readonly type = '[OldAuth] Add to Cart';
		constructor(
			public product: ProductInUserCart & Pick<IProduct, 'discountable'>
		) {}
	}

	export class RemoveFromCart {
		static readonly type = '[OldAuth] Remove from Cart';
		constructor(public product: ProductInUserCart) {}
	}

	export class ConfirmCategory {
		static readonly type = '[OldAuth] Confirm Category';
		constructor(
			public category: IProduct['category'],
			public phone: IUser['phone']
		) {}
	}

	export class ConfirmDraft {
		static readonly type = '[OldAuth] Confirm Draft';
	}
}

export interface AuthStateModel {
	user: IUser;
	loading: boolean;
	token: string;
	orderDraft: ProductInUserCart;
}

@State<AuthStateModel>({
	name: 'oldAuth',
	defaults: {
		user: undefined,
		loading: false,
		token: undefined,
		orderDraft: undefined,
	},
})
@Injectable()
export class AuthState {
	constructor(
		private auth: AuthService,
		private orders: OrdersService,
		private _loadingBar: LoadingBarService,
		private store: Store
	) {}

	@Selector()
	static user(state: AuthStateModel) {
		return state.user;
	}

	@Selector()
	static token(state: AuthStateModel) {
		return state.token;
	}

	@Selector()
	static orderDraft(state: AuthStateModel) {
		return state.orderDraft;
	}

	@Selector()
	static loading(state: AuthStateModel) {
		return state.loading;
	}

	@Action(Auth.GetUser)
	getUser(ctx: StateContext<AuthStateModel>, action: Auth.GetUser) {
		ctx.patchState({ loading: true });

		return this.auth.getUser(action.options).pipe(
			filter((res) => {
				if (!res.success) {
					ctx.patchState({ user: null, loading: false });
				}

				return res.success;
			}),
			map((res) => res.data),
			tap((data) => {
				ctx.patchState({ user: data.user, token: data.token });

				if (data.platformStatus) {
					this.store.dispatch(new Platform.SetStatus(data.platformStatus));
				}
			}),
			switchMap((data) => this.auth.firebaseSignIn(data.token)),
			tap(() => {
				this._loadingBar.useRef('http').complete();
				ctx.patchState({ loading: false });
			})
		);
	}

	@Action(Auth.AddToCart)
	addToCart(ctx: StateContext<AuthStateModel>, action: Auth.AddToCart) {
		const productInCart = action.product;
		const currentState = ctx.getState();

		if (
			productInCart.discountable !== true &&
			currentState.orderDraft === undefined
		) {
			delete productInCart.discountable;

			return ctx.patchState({ orderDraft: productInCart });
		} else if (
			productInCart.discountable === true &&
			currentState.orderDraft !== undefined
		) {
			delete productInCart.discountable;

			ctx.setState(
				produce(currentState, (state) => {
					state.orderDraft.bundled = productInCart;
				})
			);

			const newState = ctx.getState();

			return this._addToCart(ctx, newState.orderDraft).pipe(
				tap(() => ctx.patchState({ orderDraft: undefined }))
			);
		} else {
			delete productInCart.discountable;

			return this._addToCart(ctx, productInCart);
		}
	}

	@Action(Auth.RemoveFromCart)
	removeFromCart(
		ctx: StateContext<AuthStateModel>,
		action: Auth.RemoveFromCart
	) {
		ctx.patchState({ loading: true });
		const { cartID } = action.product;

		return this.orders.removeFromCart(cartID).pipe(
			tap((res) => {
				if (res.success) {
					ctx.setState(
						produce(ctx.getState(), (state) => {
							const index = state.user.cart.findIndex(
								(x) => x.cartID === cartID
							);
							state.user.cart.splice(index, 1);

							state.loading = false;
						})
					);
				} else {
					throw new Error('È stato impossibile eliminare questo ordine');
				}
			})
		);
	}

	@Action(Auth.ConfirmCategory)
	confirmCategory(
		ctx: StateContext<AuthStateModel>,
		action: Auth.ConfirmCategory
	) {
		const { category, phone } = action;
		const currentState = ctx.getState();

		if (
			!currentState.user.confirmed ||
			!currentState.user.confirmed[category]
		) {
			ctx.patchState({ loading: true });

			return this.orders.confirmOrder(category, phone).pipe(
				tap((res) => {
					ctx.patchState({ loading: false });

					if (res.success === true) {
						ctx.setState(
							produce(ctx.getState(), (state) => {
								state.user.confirmed = {
									...state.user.confirmed,
									[category]: true,
								};
								state.user.phone = phone;
							})
						);
					} else {
						throw new Error("Errore durante la conferma dell'ordine");
					}
				})
			);
		} else {
			throw new Error('Il tuo ordine è già stato confermato');
		}
	}

	@Action(Auth.ConfirmDraft)
	confirmDraft(ctx: StateContext<AuthStateModel>) {
		const { orderDraft } = ctx.getState();

		return this._addToCart(ctx, orderDraft).pipe(
			tap(() => ctx.patchState({ orderDraft: undefined }))
		);
	}

	private _addToCart(
		ctx: StateContext<AuthStateModel>,
		product: ProductInUserCart
	) {
		return this.orders.addToCart(product).pipe(
			tap((res) => {
				const currentState = ctx.getState();

				if (res.success === true) {
					const newCart = res.data;

					ctx.setState(
						produce(currentState, (state) => {
							state.user.cart = newCart;
						})
					);
				} else {
					throw new Error(
						'Non è stato possibile aggiungere il prodotto al carrello.'
					);
				}
			})
		);
	}
}
