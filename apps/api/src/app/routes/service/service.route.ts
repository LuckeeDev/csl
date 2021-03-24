import { isAdmin } from '@common/auth';
import { Router } from 'express';
const router = Router();
import { User } from '@models';

import { google } from 'googleapis';
import { environment } from '@environments/environment';

const oauth2Client = new google.auth.OAuth2(
	environment.GOOGLE_CLIENT_ID,
	environment.GOOGLE_CLIENT_SECRET,
	`${environment.api}/service/redirect`
);

const scopes = ['email', 'profile', 'https://www.googleapis.com/auth/calendar'];

const url = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: scopes,
});

const calendar = google.calendar('v3');

router.get('/', isAdmin, async (req, res) => {
	const { refreshToken } = await User.findOne({ id: 'service' });

	const auth = oauth2Client;
	auth.setCredentials({
		refresh_token: refreshToken,
	});

	try {
		const events = await calendar.events.list({
			calendarId: 'primary',
			auth,
		});
		console.log(events.data.items);
	} catch (err) {
		console.log(err);
	}

	res.send('Hi from service');
});

router.get('/setup', isAdmin, (req, res) => res.redirect(url));

router.get('/redirect', isAdmin, async (req, res) => {
	const code = req.query.code as string;
	const { tokens } = await oauth2Client.getToken(code);

	const refreshToken = tokens.refresh_token;

	await User.findOneAndUpdate({ id: 'service' }, { refreshToken });

	res.send('It worked!');
});

router.get('/failure', (req, res) =>
	res.send(
		'Something went wrong while logging in, please sign back in as admin <a href="/auth/dashboard">here</a>.'
	)
);

router.get('/success', (req, res) =>
	res.send('Success! Log back in <a href="/auth/dashboard">here</a>.')
);

export { router as service };
