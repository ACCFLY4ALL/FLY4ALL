
// To use this script, you need to set up your environment variables first.
// Make sure FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL are set.

import { getDb } from '../src/lib/firebase-admin';

async function checkDatabaseConnection() {
    console.log('جاري فحص الاتصال بقاعدة البيانات...');
    try {
        // Since getDb initializes admin on first call, we can just call it.
        const db = getDb();

        if (!db) {
            console.error('❌ فشل في الحصول على نسخة من قاعدة البيانات.');
            // The getDb function itself should have logged the detailed error.
            return;
        }

        // Perform a simple and fast query to confirm connectivity.
        // We are querying a non-existent collection on purpose to avoid reading data,
        // the goal is just to see if the SDK can communicate with the Firestore service.
        console.log('إرسال استعلام تجريبي إلى Firestore...');
        await db.collection('_health_check').limit(1).get();

        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح!');

    } catch (error) {
        console.error('❌ حدث خطأ أثناء الاتصال بقاعدة البيانات:');
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        console.log('\nالرجاء التأكد من صحة متغيرات البيئة الخاصة بـ Firebase (FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL) وأن الخدمة تعمل.');
    }
}

checkDatabaseConnection();

