import { Response, Router } from 'express';
import { IRequest } from '@csl/shared';
const router = Router();
import { createCourse, getCourses } from '@controllers/course';
import { authCheck } from '@config/authcheck';

router.get('/courses', authCheck, async (req: IRequest, res: Response) => {
  const result = await getCourses(req.user);

  res.json(result);
})

router.post('/courses', authCheck, async (req: IRequest, res: Response) => {
  const result = await createCourse(req.body.course, req.user);

  res.json(result);
})

export default router;
