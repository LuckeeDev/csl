import { AuthState } from '@/global/store/auth';
import { Orders, OrdersState, OrdersStateModel } from '@/global/store/orders';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { IProduct, IUser } from '@csl/shared';
import { stripeKey } from '@environments/environment';
import { Select, Store } from '@ngxs/store';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
	selector: 'csl-store-payments',
	templateUrl: './store-payments.view.html',
	styleUrls: ['./store-payments.view.scss'],
})
export class StorePaymentsView implements OnInit, AfterViewInit {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	@Select(OrdersState)
	orders$: Observable<OrdersStateModel>;

	thirdStepCompleted: boolean;

	form = this._fb.group({
		categoryStep: this._fb.group({
			category: ['', Validators.required],
		}),
	});

	@ViewChild(MatVerticalStepper)
	stepper: MatVerticalStepper;

	stripe: Stripe;

	constructor(private _fb: FormBuilder, private store: Store) {}

	ngOnInit() {
		from(loadStripe(stripeKey)).subscribe((stripe) => (this.stripe = stripe));
	}

	ngAfterViewInit() {
		this.stepper.selectionChange
			.pipe(
				filter((selection) => selection.selectedIndex === 2),
				take(1),
				switchMap(() => {
					const category = this.form.value.categoryStep
						.category as IProduct['category'];

					return this.store.dispatch(new Orders.SetupPayment(category));
				}),
				switchMap(() => this.orders$),
				tap((state) => {
					if (state.ready) {
						this.completeThirdStep();
					}
				})
			)
			.subscribe();
	}

	get notConfirmedNames$(): Observable<string> {
		return this.orders$.pipe(
			map((state) => state.notConfirmed),
			map((notConfirmed) => notConfirmed.map((user) => user.name).join(', '))
		);
	}

	completeThirdStep() {
		this.thirdStepCompleted = true;
	}

	submit() {
		this.orders$.subscribe((state) => {
			if (state.ready && state.id) {
				this.stripe.redirectToCheckout({ sessionId: state.id });
			}
		});
	}
}
