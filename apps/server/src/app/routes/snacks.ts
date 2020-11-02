import { Router, Request, Response } from 'express';
const router = Router();
import { isBar, authCheck } from '../config/authcheck';
import {
  createSnack,
  deleteSnack,
  updateMaxQuantity,
  getSnacks,
} from '../models/snack';
import {
  addSnackToCart,
  getSnacksCart,
  deleteSnackFromCart,
  confirmSnackOrder,
} from '../models/snack-order';

router.get('/', authCheck, async (req: Request, res: Response) => {
  const result = await getSnacks();

  res.json(result);
});

router.get('/cart', authCheck, async (req: Request, res: Response) => {
  const user: any = req.user!;

  const result = await getSnacksCart(user.id);

  res.json(result);
});

router.post('/cart', authCheck, async (req: Request, res: Response) => {
  const user: any = req.user!;

  const result = await addSnackToCart(req.body.id, user);

  res.json(result);
});

router.delete('/cart/:id', authCheck, async (req: Request, res: Response) => {
  const user: any = req.user!;

  const result = await deleteSnackFromCart(req.params.id, user.id);

  res.json(result);
});

router.get('/cart/confirm', authCheck, async (req: Request, res: Response) => {
  const user: any = req.user!;

  const result = await confirmSnackOrder(user);

  res.json(result);
});

router.post('/manage', isBar, async (req: Request, res: Response) => {
  const result = await createSnack(req.body.snack);

  res.json(result);
});

router.delete('/manage/:id', isBar, async (req: Request, res: Response) => {
  const result = await deleteSnack(req.params.id);

  res.json(result);
});

router.patch('/manage/:id', isBar, async (req: Request, res: Response) => {
  const result = await updateMaxQuantity(req.body.maxQuantity, req.params.id);

  res.json(result);
});

export default router;
