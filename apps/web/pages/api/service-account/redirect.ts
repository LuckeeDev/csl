import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getTokens, getProfile } from '@csl/google';
import { environment } from 'environments/environment';
import prisma from 'prisma/client';

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
		const code = req.query.code as string;
		const next = req.query.state as string;

		const tokens = await getTokens(
			code,
			environment.google.clientId,
			environment.google.secret,
			`${environment.url}/api/service-account/redirect`
		);

		if (!tokens.refresh_token) {
			return res.redirect(`${environment.url}?authError=1`);
		}

		const profile = getProfile(tokens.id_token);

		await prisma.user.update({
			where: {
				id: req.user?.id,
			},
			data: {
				serviceAccount: {
					create: {
						email: profile.email,
						image: profile.picture,
						name: profile.name,
						refreshToken: tokens.refresh_token,
					},
				},
			},
		});

		res.redirect(next);
	}
);

export default handler;
