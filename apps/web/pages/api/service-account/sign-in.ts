import { Permission } from '@prisma/client';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAuthURL } from '@csl/google';
import { environment } from 'environments/environment';
import Joi from 'joi';
import validate from 'middlewares/validate';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const getQuerySchema = Joi.object({
	redirectUri: Joi.string().required(),
});

handler.get(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	validate({ query: getQuerySchema }),
	async (req, res) => {
		const redirectUri = req.query.redirectUri as string;

		const url = getAuthURL(
			environment.google.clientId,
			`${environment.url}/api/service-account/redirect`,
			['profile', 'email', 'https://www.googleapis.com/auth/calendar.events'],
			redirectUri
		);

		res.redirect(url);
	}
);

export default handler;
