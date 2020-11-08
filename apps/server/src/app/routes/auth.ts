// Main imports
import { Request, Response, Router } from 'express';
const router = Router();
import { authCheck, profileCheck, notAuthCheck } from '@config/authcheck';
import passport from 'passport';
import { nextMiddelware } from '@config/login';

router.get('/', profileCheck, (req: Request, res: Response) => {
  res.json(req.user);
});

router.get(
  '/redirect',
  passport.authenticate('google', { failureRedirect: './failure' }),
  (req: Request, res: Response) => {
    const returnTo: string[] = req.session.returnTo.split('+');

    res.redirect(`/${returnTo.join('/')}`);
  }
);

router.get('/failure', notAuthCheck, (req: Request, res: Response) => {
  res.redirect('/');
});

router.get('/logout', authCheck, (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/:next',
  notAuthCheck,
  nextMiddelware,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

export default router;
