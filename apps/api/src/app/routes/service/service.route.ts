import { isAdmin } from '@common/auth';
import { Router, Request, Response } from 'express';
import passport from 'passport';
const router = Router();

// import { google, calendar_v3 } from 'googleapis';
// import { v4 } from 'uuid';

// const calendar = google.calendar({
// 	version: 'v3',
// 	auth: 'key',
// });

// calendar.events.insert({
// 	conferenceDataVersion: 1,
// 	requestBody: {
// 		summary: 'Test event',
// 		start: {
// 			timeZone: 'Europe/Rome',
// 		},
// 		end: {},
// 		conferenceData: {
// 			createRequest: {
// 				requestId: v4(),
// 				conferenceSolutionKey: {
// 					type: 'hangoutsMeet',
// 				},
// 			},
// 		},
// 	},
// });

router.get('/', (req, res) => res.send('Hi from service'));

router.get(
	'/setup',
	isAdmin,
	passport.authenticate('service-account', {
		scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
	}),
	(req, res) => {}
);

export { router as service };
