// Main imports
import { Request, Response, Router } from 'express';
const router = Router();
import { isSignedIn, isNotSignedIn } from '@common/auth';
import passport from 'passport';
import { nextMiddelware } from '@config/login';
import { fireAuth } from '@config/firebase';
import { environment } from '@environments/environment';

router.get('/', async (req: Request, res: Response) => {
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

router.get(
  '/redirect',
  passport.authenticate('google', { failureRedirect: './failure' }),
  (req: Request, res: Response) => {
    const returnTo: string[] = req.session.returnTo.split('+');

    res.redirect(`${environment.client}/${returnTo.join('/')}`);
  }
);

router.get('/failure', isNotSignedIn, (req: Request, res: Response) => {
  res.redirect(`${environment.client}/login-failed`);
});

router.get('/logout', isSignedIn, (req: Request, res: Response) => {
  req.logout();
  res.redirect(`${environment.client}`);
});

router.get(
  '/:next',
  isNotSignedIn,
  nextMiddelware,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

export { router as auth };
