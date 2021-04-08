import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stripeKey } from '@environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
	selector: 'csl-store-payments',
	templateUrl: './store-payments.view.html',
	styleUrls: ['./store-payments.view.scss'],
})
export class StorePaymentsView implements OnInit {
	form: FormGroup;

	stripe: Stripe;

	constructor(private _fb: FormBuilder) {}

	async ngOnInit(): Promise<void> {
		this.form = this._fb.group({
			firstStep: this._fb.group({
				category: ['', Validators.required],
			}),
			secondStep: this._fb.group({
				description: ['', Validators.required],
				context: ['', Validators.required],
			}),
			contactInfo: this._fb.group({
				name: ['', Validators.required],
				classID: ['', [Validators.required]],
			}),
		});

		this.stripe = await loadStripe(stripeKey);
	}

	submit() {
		console.log(this.form.value);
	}
}
