import { Request, Response, Router } from 'express';
const router = Router();
import { ICommissione } from '@csl/shared';
import {
	createAccount,
	removeAccount,
	getEvents,
	getErrors,
	emptyEvents,
	emptyErrors,
	createCommissione,
	getCommissioni,
	removeCommissione,
} from '@controllers';
import { isAdmin } from '@common/auth';
import { Course, User } from '@/models';

router.get('/events', isAdmin, async (req: Request, res: Response) => {
	const result = await getEvents(req.user);
	res.json(result);
});

router.delete('/events', isAdmin, async (req: Request, res: Response) => {
	const result = await emptyEvents();
	res.json(result);
});

router.get('/errors', isAdmin, async (req: Request, res: Response) => {
	const result = await getErrors(req.user);
	res.json(result);
});

router.delete('/errors', isAdmin, async (req: Request, res: Response) => {
	const result = await emptyErrors();
	res.json(result);
});

router.post('/accounts', isAdmin, async (req: Request, res: Response) => {
	const result = await createAccount(req.body.account, req.user);
	res.json(result);
});

router.delete(
	'/accounts/:email',
	isAdmin,
	async (req: Request, res: Response) => {
		const result = await removeAccount(req.params.email);
		res.json(result);
	}
);

router.get('/commissioni', isAdmin, async (req: Request, res: Response) => {
	const result = await getCommissioni();
	res.json(result);
});

router.post('/commissioni', isAdmin, async (req: Request, res: Response) => {
	const result = await createCommissione(req.body.commissione, req.user);
	res.json(result);
});

router.delete(
	'/commissioni/:id',
	isAdmin,
	async (req: Request, res: Response) => {
		const params: any = req.params;
		const id: ICommissione['id'] = params.id;
		const result = await removeCommissione(id, req.user);

		res.json(result);
	}
);

router.get('/unsubscribe-errors', isAdmin, async (req, res) => {
	try {
		const allCourses = await Course.find();

		const countPromises = allCourses.map(async (course) => {
			const courseQuery = `courses.${course.slot}`;

			const users = await User.find({ [courseQuery]: course.id });

			return {
				actualSignupsCount: users.length,
				actualUsers: users.map(({ id, name }) => ({ id, name })),
				savedCourse: course,
			};
		});

		const courses = await Promise.all(countPromises);
		const erroredCourses = courses.filter(
			({ actualSignupsCount, savedCourse }) =>
				actualSignupsCount >= savedCourse.max - savedCourse.speakers.length
		);

		const unsubscribeErroredUsers = erroredCourses.map(
			async ({ actualUsers, savedCourse }) => {
				const savedSignups = savedCourse.signups;
				const signupsIDs = savedSignups.map(({ id }) => id);

				const usersToRemove = actualUsers.filter(
					(user) => !signupsIDs.includes(user.id)
				);
				const toRemoveIDs = usersToRemove.map(({ id }) => id);

				const updateQuery = `courses.${savedCourse.slot}`;
				const emailPromises = toRemoveIDs.map(async (id) => {
					const user = await User.findOneAndUpdate(
						{ id },
						{ $unset: { [updateQuery]: '' } }
					);
					return user.email;
				});

				return {
					emails: await Promise.all(emailPromises),
					slot: savedCourse.slot,
					title: savedCourse.title,
				};
			}
		);

		const data = await Promise.all(unsubscribeErroredUsers);

		res.json({
			success: true,
			data,
		});
	} catch (err) {
		res.json({
			success: false,
			err,
		});
	}
});

router.get('/courses-count', isAdmin, async (req, res) => {
	const allCourses = await Course.find();

	const countPromises = allCourses.map(async (course) => {
		const courseQuery = `courses.${course.slot}`;

		const users = await User.find({ [courseQuery]: course.id });

		return {
			actualSignupsCount: users.length,
			savedCourse: course,
		};
	});

	const courses = await Promise.all(countPromises);
	const resultCourses = courses.map(({ actualSignupsCount, savedCourse }) => ({
		actualSignupsCount,
		signupsCount: savedCourse.signups.length,
		isError: actualSignupsCount > savedCourse.max - savedCourse.speakers.length,
	}));

	res.json(resultCourses);
});

export { router as admin };
