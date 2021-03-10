import { Request, Response, Router } from 'express';
const router = Router();
import {
	createCourse,
	getAllCourses,
	getCourses,
	signUpToCourse,
} from '@controllers';
import { isSignedIn } from '@common/auth';

router.get('/', isSignedIn, async (req: Request, res: Response) => {
	const result = await getAllCourses();

	res.json(result);
});

router.get('/courses', isSignedIn, async (req: Request, res: Response) => {
	const result = await getCourses(req.user);

	res.json(result);
});

router.post('/courses', isSignedIn, async (req: Request, res: Response) => {
	const result = await createCourse(req.body.course, req.user);

	res.json(result);
});

router.post('/signup', isSignedIn, async (req: Request, res: Response) => {
	const result = await signUpToCourse(req.user, {
		courses: req.body.courses,
		slot: req.body.slot,
	});

	res.json(result);
});

export { router as coge };
