
import admin from 'firebase-admin';

let db: admin.firestore.Firestore | null = null;
let storage: admin.storage.Storage | null = null;

const initializeFirebaseAdmin = () => {
    if (admin.apps.length > 0) {
        console.log("Firebase Admin SDK already initialized.");
        db = admin.firestore();
        storage = admin.storage();
        return;
    }

    try {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;
        if (!privateKey) {
            throw new Error("FIREBASE_PRIVATE_KEY environment variable is not set.");
        }

        // Correctly format the private key for both local and deployment environments
        const formattedPrivateKey = privateKey.includes('\\n') ? privateKey.replace(/\\n/g, '\n') : privateKey;

        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: formattedPrivateKey,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        } as admin.ServiceAccount;

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });

        console.log("Firebase Admin SDK initialized successfully.");
        db = admin.firestore();
        storage = admin.storage();

    } catch (error) {
        console.error("Firebase Admin SDK initialization error: ", error);
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

const getStorageAdmin = () => {
    if (!storage) {
        console.log("Firebase Storage is not available. Attempting to re-initialize...");
        initializeFirebaseAdmin();
        if (!storage) {
            console.error("Failed to re-initialize Firebase Storage.");
            return null;
        }
    }
    return storage;
}

export { getDb, getStorageAdmin };
