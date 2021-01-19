import { Router, Response, Request } from 'express';
import { isAdmin } from '@common/auth';
import { getReports, reportBug, toggleSolved } from '@controllers';
const router = Router();

router.get('/', isAdmin, async (req: Request, res: Response) => {
  const result = await getReports();
  res.json(result);
});

router.patch('/solved', isAdmin, async (req: Request, res: Response) => {
  const result = await toggleSolved(req.body.id, req.body.solved);
  res.json(result);
});

router.post('/bug', async (req: Request, res: Response) => {
  console.log(req.user || req.body.contactInfo);
  const result = await reportBug(req.user || req.body.contactInfo, req.body.bugData);
  res.json(result);
});

export { router as reports };
