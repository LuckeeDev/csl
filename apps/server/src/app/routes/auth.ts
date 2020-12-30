// Main imports
import { Request, Response, Router } from 'express';
const router = Router();
import { authCheck, notAuthCheck } from '@config/authcheck';
import passport from 'passport';
import { nextMiddelware } from '@config/login';
import { fireAuth } from '@config/firebase';
import { IRequest } from '@csl/shared';
import { environment } from '@environments/environment';

router.get('/', async (req: IRequest, res: Response) => {
  console.log('request received', req.user);
  const user = req.user;

  if (user) {
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
  } else {
    res.json({
      success: false,
    });
  }
});

router.get('/profile', (req, res) => {
  res.send(req.user);
})

router.get(
  '/redirect',
  passport.authenticate('google', { failureRedirect: './failure' }),
  (req: Request, res: Response) => {
    const returnTo: string[] = req.session.returnTo.split('+');

    res.redirect(`/auth/profile`);
  }
);

router.get('/failure', notAuthCheck, (req: Request, res: Response) => {
  res.redirect(`${environment.client}/login-failed`);
});

router.get('/logout', authCheck, (req: Request, res: Response) => {
  req.logout();
  res.redirect(`${environment.client}`);
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
