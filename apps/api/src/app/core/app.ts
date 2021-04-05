import { Application, json, raw } from 'express';
import * as cors from 'cors';
import { environment as env } from '@environments/environment';
import * as passport from 'passport';
import session from 'express-session';
import * as fileUpload from 'express-fileupload';
import { webhookHandler } from '@common/utils';
import PackageJSON from '../../../../../package.json';
import redis from 'redis';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({ port: 6379 });

export function setupApp(app: Application) {
	app.use(
		cors({
			origin: [
				'http://localhost:4200',
				'https://cslussana.com',
				'https://beta.cslussana.com',
			],
			credentials: true,
		})
	);

	app.use(
		session({
			secret: env.COOKIE_KEYS,
			cookie: {
				maxAge: 7 * 24 * 60 * 60 * 1000,
			},
			store: new RedisStore({ client: redisClient }),
			rolling: true,
			saveUninitialized: true,
			resave: false,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	// Receive webhooks from Stripe [TODO: need to add CORS, allowing Stripe, to this route]
	app.post('/api/webhook', raw({ type: 'application/json' }), webhookHandler);

	app.use(json());

	app.use(
		fileUpload({
			createParentPath: true,
		})
	);

	app.get('/version', (req, res) => {
		res.send(`Current version is ${PackageJSON.version}`);
	});
}
