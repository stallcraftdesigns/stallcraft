const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

// Load environment variables

require("dotenv").config();

// Load Firebase service account credentials
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

// Initialize Firebase App (Only if not already initialized)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
    });
}

// Export Firebase services
const db = getFirestore();
const auth = getAuth();
const adminStorage = getStorage(); // Firebase Storage

module.exports = { db, auth, adminStorage };
