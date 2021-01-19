import { Router, Request, Response } from 'express';
const router = Router();
import { isBar, isSignedIn } from '@common/auth';
import {
  createSnack,
  deleteSnack,
  updateMaxQuantity,
  getSnacks,
  addSnackToCart,
  getSnacksCart,
  deleteSnackFromCart,
  confirmSnackOrder,
} from '@controllers';

router.get('/', isSignedIn, async (req: Request, res: Response) => {
  const result = await getSnacks();

  res.json(result);
});

router.get('/cart', isSignedIn, async (req: Request, res: Response) => {
  const result = await getSnacksCart(req.user.id);

  res.json(result);
});

router.post('/cart', isSignedIn, async (req: Request, res: Response) => {
  const result = await addSnackToCart(req.body.id, req.user);

  res.json(result);
});

router.delete('/cart/:id', isSignedIn, async (req: Request, res: Response) => {
  const user: any = req.user;

  const result = await deleteSnackFromCart(req.params.id, user.id);

  res.json(result);
});

router.get('/cart/confirm', isSignedIn, async (req: Request, res: Response) => {
  const user: any = req.user;

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

export { router as snacks };
