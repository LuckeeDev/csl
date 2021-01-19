import { Request, Response, Router } from 'express';
const router = Router();
import { createCourse, getCourses } from '@controllers/course';
import { isSignedIn } from '@common/auth';

router.get('/courses', isSignedIn, async (req: Request, res: Response) => {
  const result = await getCourses(req.user);

  res.json(result);
});

router.post('/courses', isSignedIn, async (req: Request, res: Response) => {
  const result = await createCourse(req.body.course, req.user);

  res.json(result);
});

export { router as coge };
