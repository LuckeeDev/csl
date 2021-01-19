import { Request, Response, Router } from 'express';
const router = Router();
import { ICommissione } from '@csl/shared';
import { createAccount, removeAccount } from '@controllers/user';
import {
  getEvents,
  getErrors,
  emptyEvents,
  emptyErrors,
} from '@controllers/log';
import {
  createCommissione,
  getCommissioni,
  removeCommissione,
} from '@controllers/commissione';
import { isAdmin } from '@common/auth';

router.get('/events', isAdmin, async (req: Request, res: Response) => {
  const result = await getEvents(req.user);
  res.json(result);
});

router.delete('/events', isAdmin, async (req: Request, res: Response) => {
  const result = await emptyEvents();
  res.json(result);
});

router.get('/errors', isAdmin, async (req: Request, res: Response) => {
  const result = await getErrors(req.user);
  res.json(result);
});

router.delete('/errors', isAdmin, async (req: Request, res: Response) => {
  const result = await emptyErrors();
  res.json(result);
});

router.post('/accounts', isAdmin, async (req: Request, res: Response) => {
  const result = await createAccount(req.body.account, req.user);
  res.json(result);
});

router.delete(
  '/accounts/:email',
  isAdmin,
  async (req: Request, res: Response) => {
    const result = await removeAccount(req.params.email);
    res.json(result);
  }
);

router.get('/commissioni', isAdmin, async (req: Request, res: Response) => {
  const result = await getCommissioni();
  res.json(result);
});

router.post('/commissioni', isAdmin, async (req: Request, res: Response) => {
  const result = await createCommissione(req.body.commissione, req.user);
  res.json(result);
});

router.delete(
  '/commissioni/:id',
  isAdmin,
  async (req: Request, res: Response) => {
    const params: any = req.params;
    const id: ICommissione['id'] = params.id;
    const result = await removeCommissione(id, req.user);

    res.json(result);
  }
);

export { router as admin };
