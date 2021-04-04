import passport from 'passport';
import { environment as env } from '@environments/environment';
import * as passportGoogleOauth from 'passport-google-oauth';
import { User } from '@models';
import { IUser } from '@csl/shared';

const GoogleStrategy = passportGoogleOauth.OAuth2Strategy;

export function setupPassport() {
	// Create user session
	passport.serializeUser((user: IUser, done) => {
		done(null, user.id);
	});

	// Decrypt session and find user
	passport.deserializeUser(async (id: string, done) => {
		try {
			const user = await User.findOne({ id });
			done(null, user);
		} catch (err) {
			done(err, null);
		}
	});

	// Google Login
	passport.use(
		new GoogleStrategy(
			{
				clientID: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${env.api}/auth/redirect`,
			},
			async (accessToken, refreshToken, profile, done) => {
				const { id } = profile;
				const photoURL = profile.photos[0].value;
				const email = profile.emails[0].value;

				try {
					const oldUser: IUser = await User.findOne({
						$or: [{ id }, { email }],
					});

					const photoHasChanged = oldUser && photoURL !== oldUser.photoURL;

					if (!photoHasChanged && oldUser && oldUser.id) {
						done(null, oldUser);
					} else if (photoHasChanged && oldUser && oldUser.id) {
						const user = await User.findOneAndUpdate(
							{ id },
							{ photoURL },
							{ new: true }
						);

						done(null, user);
					} else if (oldUser) {
						const user = await User.findOneAndUpdate(
							{ email },
							{
								id,
								photoURL,
							},
							{ new: true }
						);

						done(null, user);
					} else {
						done(null, null);
					}
				} catch (err) {
					done(err, null);
				}
			}
		)
	);
}
