import admin from 'firebase-admin';
export const serviceAccount = require('./firebaseCredentials.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cslussana.appspot.com',
});

// Export variable for Firebase bucket
export const bucket = admin.storage().bucket();
