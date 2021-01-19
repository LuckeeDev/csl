// Main imports
import { Request, Response, Router } from 'express';
const router = Router();
import { isSignedIn, isRappreDiClasse } from '@common/auth';
import {
  getAllOrders,
  confirmOrder,
  deleteFromCart,
  addToCart,
} from '@controllers/order';
import { getStripeID } from '@controllers/user';
import {
  updateTotal,
  verifyReady,
  verifyPaid,
  getTotal,
} from '@controllers/classe';

// Stripe initialization
import { environment as env } from '@environments/environment';
import Stripe from 'stripe';
const stripe = new Stripe(env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});

// Get all orders of a user
router.get('/', isSignedIn, async (req: Request, res: Response) => {
  const response = await getAllOrders(req.user.id);

  res.json(response);
});

// Add a product to the cart
router.post('/add', isSignedIn, async (req: Request, res: Response) => {
  const result = await addToCart(req.body.product, req.user);

  res.json(result);
});

// Confirm an order
router.post('/confirm', isSignedIn, async (req: Request, res: Response) => {
  const orderTotal = await confirmOrder(req.user.id, req.body.category);

  const classTotal = await getTotal(req.user.classID, req.body.category);

  const result = await updateTotal(
    orderTotal,
    classTotal,
    req.body.category,
    req.user.classID
  );

  res.json(result);
});

// Delete an order
router.post('/delete', isSignedIn, async (req: Request, res: Response) => {
  const result = await deleteFromCart(req.user.id, req.body.product);

  res.json(result);
});

// Create a payment intent
router.post(
  '/create-payment-intent',
  isRappreDiClasse,
  async (req: Request, res: Response) => {
    const classID = req.user.classID;

    const amount = await getTotal(classID, req.body.category);

    if (amount < 1) {
      return res.json({
        success: false,
        err: 'no-orders',
      });
    }

    const stripeID = await getStripeID(req.user.id);

    const isConfirmed = await verifyReady(classID, req.body.category);

    if (!isConfirmed) {
      return res.json({
        success: false,
        data: {
          isConfirmed: false,
        },
      });
    }

    const isPaid = await verifyPaid(classID, req.body.category);

    if (isPaid === true) {
      return res.json({
        success: false,
        data: {
          isPaid: true,
        },
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      description: `Pagamento di ${
        amount / 100
      }€ per la classe ${classID} nella categoria ${req.body.category}`,
      receipt_email: req.user.email,
      customer: stripeID,
      metadata: {
        Classe: classID,
        Categoria: req.body.category,
      },
    });

    if (!isPaid && isConfirmed) {
      return res.json({
        success: true,
        data: {
          clientSecret: paymentIntent.client_secret,
          total: amount / 100,
          classID: classID,
        },
      });
    }
  }
);

export { router as orders };
