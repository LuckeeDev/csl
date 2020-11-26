import { Router, Response } from 'express';
const router = Router();
import { ICommissione, IRequest } from '@csl/shared';
import { isAdmin } from '@config/authcheck';
import { createAccount, removeAccount } from '@controllers/user';
import { getEvents, getErrors } from '@controllers/log';
import { createCommissione, getCommissioni, removeCommissione } from '@controllers/commissione';

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

router.get('/commissioni', isAdmin, async (req: IRequest, res: Response) => {
  const result = await getCommissioni();
  res.json(result);
});

router.post('/commissioni', isAdmin, async (req: IRequest, res: Response) => {
  const result = await createCommissione(req.body.commissione, req.user);
  res.json(result);
});

router.delete('/commissioni/:id', isAdmin, async (req: IRequest, res: Response) => {
  const params: any = req.params;
  const id: ICommissione['id'] = params.id;
  const result = await removeCommissione(id, req.user);

  res.json(result);
})

export default router;
