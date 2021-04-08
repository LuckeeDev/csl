import { Request, Response } from 'express';
import { stripe } from '@/common/stripe';
import { setPaid } from '@controllers';
import { environment } from '@environments/environment';

export async function webhookHandler(
  req: Request<string | Buffer>,
  res: Response
): Promise<void> {
  const sig = req.headers['stripe-signature'];

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, environment.WEBHOOK_SECRET);
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
