import { environment } from '@environments/environment';
import Stripe from 'stripe';

export const stripe = new Stripe(environment.STRIPE_KEY, {
	apiVersion: '2020-08-27',
	typescript: true,
});
