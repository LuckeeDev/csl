// Main imports
import { Request, Response, Router } from 'express';
const router = Router();
import { authCheck, profileCheck, notAuthCheck } from '../config/authcheck';
import passport from 'passport';

// Send to Google login screen
router.get(
  '/',
  notAuthCheck,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Redirect route for Google login
router.get(
  '/redirect',
  passport.authenticate('google', { failureRedirect: './failure' }),
  (req: Request, res: Response) => {
    res.redirect('/dashboard'); // This is to be changed
  }
);

// Login failure
router.get('/failure', notAuthCheck, (req: Request, res: Response) => {
  res.redirect('/');
});

// Retrieve profile info
router.get('/getprofile', profileCheck, (req: Request, res: Response) => {
  res.json(req.user);
});

// Logout and delete session
router.get('/logout', authCheck, (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
});

export default router;
