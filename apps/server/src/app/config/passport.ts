import passport from 'passport';
import { environment as env } from '@environments/environment';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import { User } from '../models/user';

// Create user session
passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

// Decrypt session and find user
passport.deserializeUser((id, done) => {
  User.findOne({ id: id }).then((user) => {
    done(null, user);
  });
});

// Google Login
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/redirect',
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      const googleID = profile.id;

      User.findOne({ id: googleID }).then((user) => {
        if (user) {
          done(null, user);
        } else {
          const email = profile.emails[0].value;
          const rawPhotoURL = profile.photos[0].value;
          const photoURL = rawPhotoURL.replace('photo.jpg', 's100-c/photo.jpg');

          User.findOne({ email: email }).then(async (user) => {
            if (user) {
              await User.findOneAndUpdate(
                { email: email },
                {
                  id: googleID,
                  photoURL,
                }
              );

              User.findOne({ id: googleID }).then((user) => {
                done(null, user);
              });
            } else {
              done(null, null);
            }
          });
        }
      });
    }
  )
);
