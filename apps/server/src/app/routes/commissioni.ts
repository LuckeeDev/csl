import { Router, Response } from 'express';
const router = Router();

import { authCheck, isReferente } from '@config/authcheck';
import { ICommissione, IRequest } from '@csl/shared';
import { getCommissione, setPage } from '@controllers/commissione';

router.get('/', isReferente, async (req: IRequest, res: Response) => {
  const result = await getCommissione(req.user.isReferente);

  res.json(result);
})

router.get('/:id', authCheck, async (req: IRequest, res: Response) => {
  const params: any = req.params;
  const id: ICommissione['id'] = params.id;
  const result = await getCommissione(id);

  res.json(result);
})

router.patch('/', isReferente, async (req: IRequest, res: Response) => {
  const result = await setPage(req.body.page, req.user);

  res.json(result);
})

export default router;
