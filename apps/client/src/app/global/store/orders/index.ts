import { OrdersService } from '@/global/services/orders/orders.service';
import { Injectable } from '@angular/core';
import { IProduct, IUser } from '@csl/shared';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

export namespace Orders {
	export class SetupPayment {
		static readonly type = '[Orders] Setup Payment';
		constructor(public category: IProduct['category']) {}
	}
}

export interface OrdersStateModel {
	id: string;
	total: number;
	notConfirmed: IUser[];
	loading: boolean;
	ready: boolean;
	paid: boolean;
}

@State({
	name: 'orders',
})
@Injectable()
export class OrdersState {
	constructor(private orders: OrdersService) {}

	@Action(Orders.SetupPayment)
	setupPayment(
		ctx: StateContext<OrdersStateModel>,
		action: Orders.SetupPayment
	) {
		const currentState = ctx.getState();

		if (
			!currentState.ready &&
			!currentState.loading &&
			!currentState.notConfirmed
		) {
			ctx.patchState({ loading: true });
			
			return this.orders.setupPayment(action.category).pipe(
				tap((res) => {
					const { data, success } = res;

					if (success && data.ready) {
						ctx.patchState({
							id: data.id,
							total: data.total,
							loading: false,
							ready: true,
						});
					} else if (success && !data.ready && data.paid) {
						ctx.patchState({
							paid: data.paid,
							loading: false,
							ready: false,
						});
					} else if (success && !data.ready && data.notConfirmed) {
						ctx.patchState({
							notConfirmed: data.notConfirmed,
							loading: false,
							ready: false,
						});
					} else {
						ctx.patchState({ loading: false, ready: false });
						throw new Error(
							'Errore durante la creazione di una sessione di pagamento'
						);
					}
				})
			);
		}
	}
}
