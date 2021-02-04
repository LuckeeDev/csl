import credentials from './dev.credentials.json';

export const environment: { [x: string]: any } = {
  production: false,
  client: 'http://localhost:4200',

  PORT: 3000,
  DB_URI: 'mongodb://localhost:27017/csl',

  ENVIRONMENT: 'dev',

  GOOGLE_CLIENT_ID: credentials.google.CLIENT_ID,
  GOOGLE_CLIENT_SECRET: credentials.google.CLIENT_SECRET,

  COOKIE_KEYS: credentials.COOKIE_KEYS,

  WEBHOOK_SECRET: credentials.stripe.WEBHOOK_SECRET,
  STRIPE_KEY: credentials.stripe.STRIPE_KEY,

  FIREBASE_SERVICE_ACCOUNT: require('./firebase.credentials.json'),
};
