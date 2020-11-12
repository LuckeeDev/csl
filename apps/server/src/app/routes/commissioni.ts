import { Router, Response } from 'express';
const router = Router();

import { authCheck, isReferente } from '@config/authcheck';
import { ICommissione, IRequest } from '@csl/shared';
import { getCommissione } from '@controllers/commissione';

router.get('/', isReferente, async (req: IRequest, res: Response) => {
  const result = await getCommissione(req.user.isReferente);

  console.log(result);

  res.json(result);
})

router.get('/:id', authCheck, async (req: IRequest, res: Response) => {
  const params: any = req.params;
  const id: ICommissione['id'] = params.id;
  const result = await getCommissione(id);

  res.json(result);
})

export default router;
