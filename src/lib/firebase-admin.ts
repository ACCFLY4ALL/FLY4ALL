
import admin from 'firebase-admin';

let db: admin.firestore.Firestore | null = null;

const initializeFirebaseAdmin = () => {
    if (admin.apps.length > 0) {
        console.log("Firebase Admin SDK already initialized.");
        db = admin.firestore();
        return;
    }

    try {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;
        if (!privateKey) {
            throw new Error("FIREBASE_PRIVATE_KEY environment variable is not set.");
        }

        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: privateKey.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        } as admin.ServiceAccount;

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        console.log("Firebase Admin SDK initialized successfully.");
        db = admin.firestore();

    } catch (error) {
        console.error("Firebase Admin SDK initialization error: ", error);
        // We don't re-throw the error to allow the app to continue running
        // in case Firebase is not essential for all parts of it.
        // Functions that need db will handle the null case.
    }
};

// Initialize on module load
initializeFirebaseAdmin();

const getDb = () => {
    if (!db) {
        console.log("Firestore database is not available. Attempting to re-initialize...");
        initializeFirebaseAdmin();
        if (!db) {
            console.error("Failed to re-initialize Firestore database.");
            return null;
        }
    }
    return db;
};

export { getDb };
