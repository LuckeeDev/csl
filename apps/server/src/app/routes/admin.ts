import { Router, Response } from 'express';
const router = Router();
import { IRequest } from '@csl/shared';
import { isAdmin } from '@config/authcheck';
import { createAccount, removeAccount } from '@controllers/user';

router.post('/accounts', isAdmin, async (req: IRequest, res: Response) => {
  const result = await createAccount(req.body.account);
  res.json(result);
});

router.delete('/accounts/:email', isAdmin, async (req: IRequest, res: Response) => {
  const result = await removeAccount(req.params.email);
  res.json(result);
})

export default router;
