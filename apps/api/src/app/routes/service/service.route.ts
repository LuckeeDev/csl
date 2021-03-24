import { isAdmin } from '@common/auth';
import { Router } from 'express';
const router = Router();
import { Course, User } from '@models';
import { google } from 'googleapis';
import { environment } from '@environments/environment';
import { saveError } from '@common/logs';
import { slotToTime } from '@/utils/slotToTime';

const oauth2Client = new google.auth.OAuth2(
	environment.GOOGLE_CLIENT_ID,
	environment.GOOGLE_CLIENT_SECRET,
	`${environment.api}/service/redirect`
);

const scopes = ['email', 'profile', 'https://www.googleapis.com/auth/calendar'];

const signInUrl = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: scopes,
});

const calendar = google.calendar('v3');

router.get('/', isAdmin, async (req, res) => {
	const result = await User.findOne({ id: 'service' });

	res.json(result);
});

router.get('/links', isAdmin, async (req, res) => {
	try {
		const courses = await Course.find();
		const { refreshToken } = await User.findOne({ id: 'service' });

		const auth = oauth2Client;
		auth.setCredentials({
			refresh_token: refreshToken,
		});

		const createEventsPromises = courses.map(async (course) => {
			const insert = await calendar.events.insert({
				conferenceDataVersion: 1,
				auth,
				calendarId: 'primary',
				requestBody: {
					summary: `${course.title} - Fascia ${course.slot.toUpperCase()}`,
					start: {
						timeZone: 'Europe/Rome',
						dateTime: slotToTime[course.slot].start,
					},
					end: {
						timeZone: 'Europe/Rome',
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

			const link = insert.data.hangoutLink;

			await course.updateOne({ link });

			return link;
		});

		const links = await Promise.all(createEventsPromises);

		res.json({
			success: true,
			data: links,
		});
	} catch (err) {
		saveError('Error while creating links for courses', {
			category: 'coge',
			err,
		});

		res.json({
			success: false,
			err,
		});
	}
});

router.get('/setup', isAdmin, (req, res) => res.redirect(signInUrl));

router.get('/redirect', isAdmin, async (req, res) => {
	try {
		const code = req.query.code as string;
		const { tokens } = await oauth2Client.getToken(code);

		const refreshToken = tokens.refresh_token;

		await User.findOneAndUpdate({ id: 'service' }, { refreshToken });

		res.redirect(`${environment.client}/admin/service`);
	} catch (err) {
		saveError('Error while setting up the service account', {
			category: 'coge',
			err,
		});

		res.redirect(`${environment.client}/login-failed`);
	}
});

export { router as service };
