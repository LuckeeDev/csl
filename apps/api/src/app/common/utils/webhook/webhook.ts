import { Request, Response } from 'express';
import { stripe } from '@/common/stripe';
import { setPaid } from '@controllers';
import { environment } from '@environments/environment';
import Stripe from 'stripe';
import { IProduct, IUser } from '@csl/shared';

interface WebhookMetadata {
	classID: IUser['classID'];
	category: IProduct['category'];
}

export async function webhookHandler(
	req: Request<string | Buffer>,
	res: Response
) {
	const payload = req.body;

	const sig = req.headers['stripe-signature'];

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			payload,
			sig,
			environment.WEBHOOK_SECRET
		);
	} catch (err) {
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type !== 'checkout.session.completed') {
		return res
			.status(400)
			.send('Bad request, not the event we were listening for.');
	}

	/**
	 * Force Session type on the `event.data.object` because it's not strongly typed.
	 */
	const sessionData: Stripe.Checkout.Session = event.data.object as any;

	const {
		category,
		classID,
	} = (sessionData.metadata as unknown) as WebhookMetadata;

	const result = await setPaid(classID, category);

	if (result.success) {
		res.json({ success: true });
	} else {
		res.status(500).send('Something wrong happened on our end');
	}
}
