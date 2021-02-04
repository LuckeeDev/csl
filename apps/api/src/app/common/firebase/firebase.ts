import admin from 'firebase-admin';
import { environment as env } from '@environments/environment';

// Initialize Firebase
const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY,
    projectId: env.FIREBASE_PROJECT_ID,
  }),
  storageBucket: 'cslussana.appspot.com',
});

// Export variables for Firebase
export const bucket = app.storage().bucket();

export const fireAuth = app.auth();

export const messaging = app.messaging();
