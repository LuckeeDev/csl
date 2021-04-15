import { OrdersService } from '@/global/services/orders/orders.service';
import { Injectable } from '@angular/core';
import { IProduct, IUser } from '@csl/shared';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs/operators';

export namespace Orders {
	export class SetupPayment {
		static readonly type = '[Orders] Setup Payment';
		constructor(public category: IProduct['category']) {}
	}

	/**
	 * User to retrieve all users inside a classroom.
	 */
	export class GetClassroom {
		static readonly type = '[Orders] Get Classroom';
	}
}

export interface OrdersStateModel {
	id: string;
	total: number;
	notConfirmed: IUser[];
	classroom: IUser[];
	loading: boolean;
	ready: boolean;
	paid: boolean;
}

@State({
	name: 'orders',
})
@Injectable()
export class OrdersState {
	@Selector()
	static classroom(state: OrdersStateModel) {
		return state.classroom;
	}

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

	@Action(Orders.GetClassroom)
	getClassroom(ctx: StateContext<OrdersStateModel>) {
		const currentState = ctx.getState();
		ctx.patchState({ loading: true });

		if (!currentState.classroom) {
			return this.orders.getClassroom().pipe(
				tap((res) => {
					if (res.success === true) {
						ctx.setState(
							produce(ctx.getState(), (state) => {
								state.classroom = res.data;
								state.loading = false;
							})
						);
					} else {
						throw new Error('È stato impossibile completare questa richiesta.');
					}
				})
			);
		}
	}
}
