import * as admin from 'firebase-admin';

const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!admin.apps.length) {
  if (privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    });
  } else {
    console.warn('Firebase Admin private key is not set. Admin features will be disabled.');
  }
}

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  } 
  // This will be logged on the server, so it's safe to log the warning here.
  console.warn('Firebase Admin is not initialized. Cannot get Firestore instance.');
  return null; 
};

const getStorageAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.storage();
  }
  console.warn('Firebase Admin is not initialized. Cannot get Storage instance.');
  return null;
}

export { getDb, getStorageAdmin };
export default admin;
