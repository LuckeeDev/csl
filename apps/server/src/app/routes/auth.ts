// Main imports
import { Request, Response, Router } from 'express';
const router = Router();
import { authCheck, profileCheck, notAuthCheck } from '@config/authcheck';
import passport from 'passport';
import { nextMiddelware } from '@config/login';
import { fireAuth } from '@config/firebase';
import { IRequest } from '@csl/shared';

router.get('/', profileCheck, async (req: IRequest, res: Response) => {
  const user = req.user;

  const token = await fireAuth.createCustomToken(user.id, {
    isAdmin: user.isAdmin,
    isBar: user.isBar,
    isQp: user.isQp,
    isRappre: user.isRappre,
    isRappreDiClasse: user.isRappreDiClasse,
    isReferente: user.isReferente,
    isVice: user.isVice,
  });

  res.json({
    success: true,
    data: {
      user,
      token,
    },
  });
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
  res.redirect('/login-failed');
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
