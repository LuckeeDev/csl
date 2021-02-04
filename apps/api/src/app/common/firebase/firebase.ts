import admin from 'firebase-admin';
import { environment as env } from '@environments/environment';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = env.production ? env.FIREBASE_SERVICE_ACCOUNT : require('./firebase.credentials.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cslussana.appspot.com',
});

// Export variables for Firebase
export const bucket = admin.storage().bucket();

export const fireAuth = admin.auth();

export const messaging = admin.messaging();
