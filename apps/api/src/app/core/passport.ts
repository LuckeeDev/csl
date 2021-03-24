import passport from 'passport';
import { environment as env } from '@environments/environment';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { User } from '@models';
import { IUser } from '@csl/shared';

export function setupPassport() {
	// Create user session
	passport.serializeUser((user: IUser, done) => {
		done(null, user.id);
	});

	// Decrypt session and find user
	passport.deserializeUser((id: string, done) => {
		User.findOne({ id }).then((user: IUser) => {
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
			(accessToken, refreshToken, profile, done) => {
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

	passport.use(
		'service-account',
		new GoogleStrategy(
			{
				clientID: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
				callbackURL: `/auth/redirect`,
			},
			(accessToken: string, refreshToken: string, profile, done) => {
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
}
