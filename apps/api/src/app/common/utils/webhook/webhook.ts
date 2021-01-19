import { Request, Response } from 'express';

// Stripe initialization
import { environment as env } from '@environments/environment';
import Stripe from 'stripe';
const stripe = new Stripe(env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});

import { setPaid } from '@controllers/classe';

export async function webhookHandler(
  req: Request<string | Buffer>,
  res: Response
): Promise<void> {
  const sig = req.headers['stripe-signature'];

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.WEBHOOK_SECRET);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event && event.type == 'payment_intent.succeeded') {
    const dataObject: any = event.data.object;

    await setPaid(
      dataObject.metadata.Classe,
      dataObject.metadata.Categoria
    );
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}
