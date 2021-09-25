import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from './auth.model';
import { Auth } from './auth.actions';
import { Injectable } from '@angular/core';
import { StrapiAuthService } from '@csl/strapi';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@State<AuthStateModel>({
	name: 'auth',
	defaults: {
		jwt: null,
		user: null,
		loading: false,
	},
})
@Injectable()
export class AuthState {
	@Selector()
	static user(state: AuthStateModel) {
		return state.user;
	}

	@Selector()
	static loading(state: AuthStateModel) {
		return state.loading;
	}

	constructor(private strapiAuth: StrapiAuthService) {}

	@Action(Auth.GetUser)
	getUser(ctx: StateContext<AuthStateModel>, action: Auth.GetUser) {
		ctx.patchState({ loading: true });

		return this.strapiAuth.getProfile(action.provider, action.accessToken).pipe(
			catchError(() => {
				this._resetState(ctx);

				return of(null);
			}),
			tap((res) => {
				if (res && res !== null) {
					ctx.patchState({ ...res, loading: false });
				} else {
					this._resetState(ctx);
				}
			})
		);
	}

	_resetState(ctx: StateContext<AuthStateModel>) {
		ctx.setState({ jwt: null, user: null, loading: false });
	}
}
