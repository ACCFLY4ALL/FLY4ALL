
import * as admin from 'firebase-admin';
// Import the configuration from the file we created
import { firebaseAdminConfig } from './firebase-admin-config';

// Check if the app is already initialized
if (!admin.apps.length) {
  try {
    // Use the imported config to initialize the app
    admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
      databaseURL: `https://${firebaseAdminConfig.project_id}.firebaseio.com`,
      storageBucket: `${firebaseAdminConfig.project_id}.appspot.com`,
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
  }
}

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  console.error('Firebase Admin is not initialized. Cannot get Firestore instance.');
  return null;
};

const getStorageAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.storage();
  }
  console.error('Firebase Admin is not initialized. Cannot get Storage instance.');
  return null;
};

export { getDb, getStorageAdmin };
export default admin;
