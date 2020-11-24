import { Router, Response } from 'express';
const router = Router();
import { IRequest } from '@csl/shared';
import { isAdmin } from '@config/authcheck';
import { createAccount, removeAccount } from '@controllers/user';
import { getEvents, getErrors } from '@controllers/log';

router.get('/events', isAdmin, async (req: IRequest, res: Response) => {
  const result = await getEvents(req.user);
  res.json(result);
});

router.get('/errors', isAdmin, async (req: IRequest, res: Response) => {
  const result = await getErrors(req.user);
  res.json(result);
});

router.post('/accounts', isAdmin, async (req: IRequest, res: Response) => {
  const result = await createAccount(req.body.account, req.user);
  res.json(result);
});

router.delete(
  '/accounts/:email',
  isAdmin,
  async (req: IRequest, res: Response) => {
    const result = await removeAccount(req.params.email);
    res.json(result);
  }
);

export default router;
