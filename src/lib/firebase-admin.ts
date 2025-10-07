
import admin from 'firebase-admin';

// Check if the app is already initialized to prevent initialization errors.
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("FIREBASE_PRIVATE_KEY environment variable is not set.");
    }

    // Correctly format the private key.
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    const serviceAccount: admin.ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: formattedPrivateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error) {
    console.error("Firebase Admin SDK initialization error: ", error);
  }
}

// Export the initialized services directly.
const db = admin.firestore();
const storage = admin.storage();

export { db, storage };
