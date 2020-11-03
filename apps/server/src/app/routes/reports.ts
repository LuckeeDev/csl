import { Router, Response } from 'express';
import { IRequest } from '@csl/shared';
import { authCheck } from '@config/authcheck';
import { reportBug } from '@controllers/report';
const router = Router();

router.post('/bug', authCheck, async (req: IRequest, res: Response) => {
  const result = await reportBug(req.user, req.body.bugData);
  res.json(result);
});

export default router;
