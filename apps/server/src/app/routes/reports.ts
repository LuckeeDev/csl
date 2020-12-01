import { Router, Response } from 'express';
import { IRequest } from '@csl/shared';
import { isAdmin } from '@config/authcheck';
import { getReports, reportBug, toggleSolved } from '@controllers/report';
const router = Router();

router.get('/', isAdmin, async (req: IRequest, res: Response) => {
  const result = await getReports();
  res.json(result);
});

router.patch('/solved', isAdmin, async (req: IRequest, res: Response) => {
  const result = await toggleSolved(req.body.id, req.body.solved);
  res.json(result);
});

router.post('/bug', async (req: IRequest, res: Response) => {
  console.log(req.user || req.body.contactInfo);
  const result = await reportBug(req.user || req.body.contactInfo, req.body.bugData);
  res.json(result);
});

export default router;
