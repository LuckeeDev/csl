import { isAdmin } from '@common/auth';
import { Router } from 'express';
const router = Router();
import { environment } from '@environments/environment';
import passport from 'passport';
import { loginMiddleware } from '@/common/middlewares';
import { User } from '@/models';
import { createCalendarEvent, getAccessToken } from '@csl/google';
import { v4 } from 'uuid';

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

router.get('/something', (req, res) => res.send('Hi there!'));

router.get('/access', async (req, res) => {
	const service = await User.findOne({ id: 'service' });

	const accessToken = await getAccessToken(
		service.refreshToken,
		environment.GOOGLE_CLIENT_ID,
		environment.GOOGLE_CLIENT_SECRET
	);

	const events = await createCalendarEvent(accessToken, {
		conferenceDataVersion: 1,
		body: {
			summary: `Evento di prova - Fascia F`,
			start: {
				dateTime: '2021-03-29T11:00:00+02:00',
			},
			end: {
				dateTime: '2021-03-29T13:00:00+02:00',
			},
			conferenceData: {
				createRequest: {
					requestId: v4(),
					conferenceSolutionKey: {
						type: 'hangoutsMeet',
					},
				},
			},
		},
	});

	console.log(events);

	if (accessToken !== null) {
		res.send(accessToken);
	} else {
		res.send('No access token retrieved');
	}
});

router.get('/failure', (req, res) =>
	res.redirect(`${environment.client}/login-failed`)
);

router.get('/links', isAdmin, async (req, res) => {
	res.json({ msg: 'it worked' });
});

export { router as service };
