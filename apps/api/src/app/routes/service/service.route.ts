import { isAdmin } from '@common/auth';
import { Router } from 'express';
const router = Router();
import { environment } from '@environments/environment';
import passport from 'passport';
import { loginMiddleware } from '@/common/middlewares';
import { Course, User } from '@/models';
import { createCalendarEvent, getAccessToken } from '@csl/google';
import { slotToTime } from '@/utils/slotToTime';
import { saveError } from '@/common/logs';

router.get('/', isAdmin, async (req, res) => {
	const serviceAccount = await User.findOne({ id: 'service' });

	res.json({success: true, data: serviceAccount});
});

router.get(
	'/setup/:next',
	isAdmin,
	(req, res, next) => {
		req.logout();
		next();
	},
	loginMiddleware,
	passport.authenticate('service-account', {
		scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'],
	})
);

router.get(
	'/redirect',
	passport.authenticate('service-account', { failureRedirect: './failure' }),
	async (req, res) => {
		const destination: string = req.session.returnTo;
		req.logout();

		res.send(
			`Service account correctly set up, please log back in <a href="${environment.api}/auth/${destination}">here</a>.`
		);
	}
);

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
