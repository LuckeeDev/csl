import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getTokens } from '@csl/google';
import { environment } from 'environments/environment';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const redirectQuerySchema = Joi.object({
	code: Joi.string().required(),
	state: Joi.string().required(),
	scope: Joi.string(),
	authuser: Joi.number().integer(),
	hd: Joi.string(),
	prompt: Joi.string(),
});

handler.get(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	validate({ query: redirectQuerySchema }),
	async (req, res) => {
		try {
			const code = req.query.code as string;
			const next = req.query.state as string;

			const tokens = await getTokens(
				code,
				environment.google.clientId,
				environment.google.secret,
				`${environment.url}/api/service-account/redirect`
			);

			return res.redirect(
				`${next}?accessToken=${tokens.access_token}&idToken=${tokens.id_token}`
			);
		} catch (err) {
			return res.redirect(`${environment.url}?authError=1`);
		}
	}
);

export default handler;
