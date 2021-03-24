import { Application, json, raw } from 'express';
import * as cors from 'cors';
import { environment as env } from '@environments/environment';
import * as passport from 'passport';
import cookieSession from 'cookie-session';
import * as fileUpload from 'express-fileupload';
import { webhookHandler } from '@common/utils';
import PackageJSON from '../../../../../package.json';

import { google, calendar_v3 } from 'googleapis';
import { v4 } from 'uuid';

export function setupApp(app: Application) {
	app.use(
		cors({
			origin: [
				'http://localhost:4200',
				'https://cslussana.com',
				'https://beta.cslussana.com',
			],
			credentials: true,
		})
	);

	app.use(
		cookieSession({
			maxAge: 24 * 60 * 60 * 1000,
			keys: env.COOKIE_KEYS,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	const calendar = google.calendar({
		version: 'v3',
		auth: 'key',
	});

	calendar.events.insert({
		conferenceDataVersion: 1,
		requestBody: {
			summary: 'Test event',
			start: {
				timeZone: 'Europe/Rome'
			},
			end: {

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

	// Receive webhooks from Stripe [TODO: need to add CORS, allowing Stripe, to this route]
	app.post('/api/webhook', raw({ type: 'application/json' }), webhookHandler);

	app.use(json());

	app.use(
		fileUpload({
			createParentPath: true,
		})
	);

	app.get('/version', (req, res) => {
		res.send(`Current version is ${PackageJSON.version}`);
	});
}
