import admin from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./firebase.credentials.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cslussana.appspot.com',
});

// Export variables for Firebase
export const bucket = admin.storage().bucket();

export const fireAuth = admin.auth();

export const messaging = admin.messaging();
