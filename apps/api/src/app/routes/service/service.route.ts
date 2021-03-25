import { isAdmin } from '@common/auth';
import { Router } from 'express';
const router = Router();
import { environment } from '@environments/environment';
import passport from 'passport';
import { loginMiddleware } from '@/common/middlewares';

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

router.get('/failure', (req, res) =>
	res.redirect(`${environment.client}/login-failed`)
);

router.get('/links', isAdmin, async (req, res) => {
	res.json({ msg: 'it worked' });
});

export { router as service };
