import admin from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const serviceAccount = require('./firebaseCredentials.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cslussana.appspot.com',
});

// Export variable for Firebase bucket
export const bucket = admin.storage().bucket();

export const fireAuth = admin.auth();
