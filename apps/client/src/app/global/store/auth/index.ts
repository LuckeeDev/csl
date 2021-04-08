import { AuthService } from '@/global/services/auth/auth.service';
import { OrdersService } from '@/global/services/orders/orders.service';
import { Injectable } from '@angular/core';
import { IProduct, IUser, ProductInUserCart } from '@csl/shared';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { filter, map, switchMap, tap } from 'rxjs/operators';

export namespace Auth {
	export class GetUser {
		static readonly type = '[Auth] Get User';
		constructor(public options: { firebaseToken: boolean }) {}
	}

	export class AddToCart {
		static readonly type = '[Auth] Add to Cart';
		constructor(public product: ProductInUserCart) {}
	}

	export class ConfirmCategory {
		static readonly type = '[Auth] Confirm Category';
		constructor(
			public category: IProduct['category'],
			public phone: IUser['phone']
		) {}
	}
}

export interface AuthStateModel {
	user: IUser;
	loading: boolean;
	token: string;
}

@State<AuthStateModel>({
	name: 'auth',
	defaults: {
		user: undefined,
		loading: false,
		token: undefined,
	},
})
@Injectable()
export class AuthState {
	constructor(
		private auth: AuthService,
		private orders: OrdersService,
		private _loadingBar: LoadingBarService
	) {}

	@Selector()
	static user(state: AuthStateModel) {
		return state.user;
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

		return this.orders.addToCart(productInCart).pipe(
			tap((res) => {
				const currentState = ctx.getState();

				if (res.success === true) {
					ctx.setState(
						produce(currentState, (state) => {
							state.user.cart.push(productInCart);
						})
					);
				} else {
					throw new Error('Success was set to false on the API response.');
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
}
