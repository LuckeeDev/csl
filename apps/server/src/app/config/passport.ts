import passport from 'passport';
import { environment as env } from '@environments/environment';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import { User } from '@controllers/user';

// Create user session
passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

// Decrypt session and find user
passport.deserializeUser((id, done) => {
  console.log(id);
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
      callbackURL: `/auth/redirect`,
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      const id = profile.id;
      const photoURL = profile.photos[0].value;
      const email = profile.emails[0].value;

      User.findOne({ id }).then(async (user) => {
        if (user) {
          await user.updateOne({ photoURL });

          done(null, user);
        } else {
          User.findOne({ email }).then(async (user) => {
            if (user) {
              await user.updateOne({
                id,
                photoURL,
              });

              User.findOne({ id }).then((user) => {
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
