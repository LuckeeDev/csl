export const environment = {
	production: false,
	client: 'http://localhost:4200',
	api: 'http://localhost:3000',

	PORT: process.env.PORT,
	DB_URI: process.env.DB_URI,

	ENVIRONMENT: 'dev' as 'dev' | 'prod',

	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

	COOKIE_KEYS: process.env.COOKIE_KEYS.split(','),

	WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
	STRIPE_KEY: process.env.STRIPE_KEY,

	FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
	// Replace \n string in env variable with actual new line
	FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
};
