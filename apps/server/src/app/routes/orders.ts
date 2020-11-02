// Main imports
import { Request, Response, Router } from 'express';
const router = Router();
import { IReqUser } from '../models/user/model';
import { authCheck, isRappreDiClasse } from '../config/authcheck';
import {
  getAllOrders,
  confirmOrder,
  deleteFromCart,
  addToCart,
} from '../models/order';
import { getStripeID } from '../models/user';
import {
  updateTotal,
  verifyReady,
  verifyPaid,
  getTotal,
} from '../models/classe';

// Stripe initialization
import { environment as env } from '@environments/environment';
import Stripe from 'stripe';
const stripe = new Stripe(env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});

// Get all orders of a user
router.get('/', authCheck, async (req: Request, res: Response) => {
  const user: IReqUser = req.user!;

  const response = await getAllOrders(user.id);

  res.json(response);
});

// Add a product to the cart
router.post(
  '/add',
  authCheck, async (req: Request, res: Response) => {
    const user: IReqUser = req.user!;

    const result = await addToCart(req.body.product, user); // Replace with user

    res.json(result);
  }
);

// Confirm an order
router.post('/confirm', authCheck, async (req: Request, res: Response) => {
  const user: IReqUser = req.user!;

  const orderTotal = await confirmOrder(user.id, req.body.category);

  const classTotal = await getTotal(user.classID!, req.body.category);

  const result = await updateTotal(
    orderTotal,
    classTotal,
    req.body.category,
    user.classID!
  );

  res.json(result);
});

// Delete an order
router.post('/delete', authCheck, async (req: Request, res: Response) => {
  const user: IReqUser = req.user!;

  const result = await deleteFromCart(user.id, req.body.product);

  res.json(result);
});

// Create a payment intent
router.post(
  '/create-payment-intent',
  isRappreDiClasse,
  async (req: Request, res: Response) => {
    const user: IReqUser = req.user!;

    const classID = user.classID!;

    const amount = await getTotal(classID, req.body.category);

    if (amount <= 0) {
      res.json({
        success: false,
        err: 'no-orders',
      });
    }

    const stripeID = await getStripeID(user.id!);

    const isConfirmed = await verifyReady(classID, req.body.category);

    if (!isConfirmed) {
      res.json({
        success: false,
        isConfirmed: false,
      });
    }

    const isPaid = await verifyPaid(classID, req.body.category);

    if (isPaid) {
      res.json({
        success: false,
        isPaid,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      description: `Pagamento di ${
        amount / 100
      }€ per la classe ${classID} nella categoria ${req.body.category}`,
      receipt_email: user.email,
      customer: stripeID,
      metadata: {
        Classe: classID,
        Categoria: req.body.category,
      },
    });

    if (!isPaid && isConfirmed) {
      res.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        total: amount / 100,
        classID: classID,
      });
    }
  }
);

export default router;
