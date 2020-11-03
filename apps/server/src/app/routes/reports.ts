import { Router, Response } from 'express';
import { IRequest } from '@csl/shared';
import { authCheck, isAdmin } from '@config/authcheck';
import { getReports, reportBug } from '@controllers/report';
const router = Router();

router.get('/', isAdmin, async (req: IRequest, res: Response) => {
  const result = await getReports();
  res.json(result);
})

router.post('/bug', authCheck, async (req: IRequest, res: Response) => {
  const result = await reportBug(req.user, req.body.bugData);
  res.json(result);
});

export default router;
