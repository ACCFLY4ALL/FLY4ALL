"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageAdmin = exports.getDb = void 0;
var firebase_admin_1 = require("firebase-admin");
var db = null;
var storage = null;
var initializeFirebaseAdmin = function () {
    if (firebase_admin_1.default.apps.length > 0) {
        console.log("Firebase Admin SDK already initialized.");
        db = firebase_admin_1.default.firestore();
        storage = firebase_admin_1.default.storage();
        return;
    }
    try {
        var privateKey = process.env.FIREBASE_PRIVATE_KEY;
        if (!privateKey) {
            throw new Error("FIREBASE_PRIVATE_KEY environment variable is not set.");
        }
        // Correctly format the private key for both local and deployment environments
        var formattedPrivateKey = privateKey.includes('\\n') ? privateKey.replace(/\\n/g, '\n') : privateKey;
        var serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: formattedPrivateKey,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        };
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log("Firebase Admin SDK initialized successfully.");
        db = firebase_admin_1.default.firestore();
        storage = firebase_admin_1.default.storage();
    }
    catch (error) {
        console.error("Firebase Admin SDK initialization error: ", error);
    }
};
// Initialize on module load
initializeFirebaseAdmin();
var getDb = function () {
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
exports.getDb = getDb;
var getStorageAdmin = function () {
    if (!storage) {
        console.log("Firebase Storage is not available. Attempting to re-initialize...");
        initializeFirebaseAdmin();
        if (!storage) {
            console.error("Failed to re-initialize Firebase Storage.");
            return null;
        }
    }
    return storage;
};
exports.getStorageAdmin = getStorageAdmin;
