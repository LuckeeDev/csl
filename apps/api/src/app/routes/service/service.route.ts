import { isAdmin } from '@common/auth';
import { Router } from 'express';
const router = Router();
import { environment } from '@environments/environment';
import { Course, User } from '@/models';
import {
	createCalendarEvent,
	getAccessToken,
	getAuthURL,
	getProfile,
	getTokens,
} from '@csl/google';
import { slotToTime } from '@/utils/slotToTime';
import { saveError } from '@/common/logs';

router.get('/', isAdmin, async (req, res) => {
	const serviceAccount = await User.findOne({ isService: 'active' });

	res.json({ success: true, data: serviceAccount });
});

router.get('/setup', isAdmin, (req, res) => {
	const scopes = [
		'email',
		'profile',
		'https://www.googleapis.com/auth/calendar',
	];
	const next = req.query.next as string;

	const authURL = getAuthURL(
		environment.GOOGLE_CLIENT_ID,
		`${environment.api}/service/redirect`,
		scopes,
		next
	);

	res.redirect(authURL);
});

router.get('/redirect', isAdmin, async (req, res) => {
	const code = req.query.code as string;
	const next = req.query.state as string;

	const tokens = await getTokens(
		code,
		environment.GOOGLE_CLIENT_ID,
		environment.GOOGLE_CLIENT_SECRET,
		`${environment.api}/service/redirect`
	);

	const profile = getProfile(tokens.id_token);

	const photoURL = profile.picture;
	const email = profile.email;
	const name = profile.name;
	const userID = profile.sub;

	if (tokens.refresh_token !== undefined) {
		await User.findOneAndUpdate(
			{ id: userID },
			{
				photoURL,
				email,
				refreshToken: tokens.refresh_token,
				name,
				isService: 'active',
			},
			{ new: true, upsert: true }
		);
	} else {
		await User.findOneAndUpdate(
			{ id: userID },
			{ photoURL, email, name, isService: 'active' },
			{ new: true, upsert: true }
		);
	}

	await User.findOneAndUpdate(
		{ $and: [{ isService: 'active' }, { id: { $not: { $eq: userID } } }] },
		{ isService: 'inactive' }
	);

	res.redirect(`${environment.client}/${next}`);
});

router.get('/links', isAdmin, async (req, res) => {
	try {
		const service = await User.findOne({ id: 'service' });

		const accessToken = await getAccessToken(
			service.refreshToken,
			environment.GOOGLE_CLIENT_ID,
			environment.GOOGLE_CLIENT_SECRET
		);

		const courses = await Course.find();

		const eventsPromises = courses.map(async (course) => {
			const data = await createCalendarEvent(accessToken, {
				conferenceDataVersion: 1,
				body: {
					summary: `${course.title} - Fascia ${course.slot.toUpperCase()}`,
					start: {
						dateTime: slotToTime[course.slot].start,
					},
					end: {
						dateTime: slotToTime[course.slot].end,
					},
					conferenceData: {
						createRequest: {
							requestId: course.id,
							conferenceSolutionKey: {
								type: 'hangoutsMeet',
							},
						},
					},
				},
			});

			return data.hangoutLink;
		});

		const links = await Promise.all(eventsPromises);

		res.json({ success: true, data: links });
	} catch (err) {
		saveError('Error while generating links', {
			category: 'coge',
			err,
		});

		res.json({
			success: false,
			err,
		});
	}
});

router.get('/failure', (req, res) =>
	res.redirect(`${environment.client}/login-failed`)
);

export { router as service };
