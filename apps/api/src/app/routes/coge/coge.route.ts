import { Request, Response, Router } from 'express';
const router = Router();
import {
	createCourse,
	getAllCourses,
	getCourses,
	signUpToCourse,
	getCourse,
} from '@controllers';
import { isAdmin, isSignedIn } from '@common/auth';
import { User } from '@/models';

router.get('/', isSignedIn, async (req: Request, res: Response) => {
	const result = await getAllCourses();

	res.json(result);
});

router.get('/courses', isSignedIn, async (req: Request, res: Response) => {
	const result = await getCourses(req.user);

	res.json(result);
});

router.get('/courses/:id', isSignedIn, async (req: Request, res: Response) => {
	const result = await getCourse(req.params.id);

	res.json(result);
});

router.post('/courses', isAdmin, async (req: Request, res: Response) => {
	const result = await createCourse(req.body.course, req.user);

	res.json(result);
});

router.post('/signup', isSignedIn, async (req: Request, res: Response) => {
	// const result = await signUpToCourse(req.user, {
	// 	course: req.body.course,
	// 	slot: req.body.slot,
	// });

	res.json({
		success: false,
		err: 'subscription-ended',
	});
});

router.patch('/speaker', isAdmin, async (req: Request, res: Response) => {
	try {
		const { courseID, userID, slot }: Record<string, string> = req.body;
		const updateQuery = `courses.${slot}`;
		await User.findOneAndUpdate({ id: userID }, { [updateQuery]: courseID });

		res.json({
			success: true,
		});
	} catch (err) {
		res.json({
			success: false,
			err,
		});
	}
});

export { router as coge };
