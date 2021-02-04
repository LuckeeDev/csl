import credentials from './prod.credentials.json';

export const environment = {
  production: true,
  client: 'https://cslussana.com',

  PORT: 3000,
  DB_URI: credentials.DB_URI,

  ENVIRONMENT: 'prod',

  GOOGLE_CLIENT_ID: credentials.google.CLIENT_ID ?? process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: credentials.google.CLIENT_SECRET ?? process.env.GOOGLE_CLIENT_SECRET,

  COOKIE_KEYS: credentials.COOKIE_KEYS ?? process.env.COOKIE_KEYS.split(';'),

  WEBHOOK_SECRET: credentials.stripe.WEBHOOK_SECRET ?? process.env.WEBHOOK_SECRET,
  STRIPE_KEY: credentials.stripe.STRIPE_KEY ?? process.env.STRIPE_KEY,
};
