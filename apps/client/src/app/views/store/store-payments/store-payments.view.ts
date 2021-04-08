import { AuthState } from '@/global/store/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser } from '@csl/shared';
import { stripeKey } from '@environments/environment';
import { Select } from '@ngxs/store';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';

@Component({
	selector: 'csl-store-payments',
	templateUrl: './store-payments.view.html',
	styleUrls: ['./store-payments.view.scss'],
})
export class StorePaymentsView implements OnInit {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	form = this._fb.group({
		categoryStep: this._fb.group({
			category: ['', Validators.required],
		}),
		contactInfo: this._fb.group({
			name: ['', Validators.required],
			classID: ['', [Validators.required]],
		}),
	});

	stripe: Stripe;

	constructor(private _fb: FormBuilder) {}

	async ngOnInit(): Promise<void> {
		this.stripe = await loadStripe(stripeKey);
	}

	submit() {
		console.log(this.form.value);
	}
}
