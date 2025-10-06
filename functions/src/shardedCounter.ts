// functions/src/shardedCounter.ts
import * as admin from "firebase-admin";

// Ensure Firebase is initialized. If this file is used standalone,
// you might need initialization logic here as well.
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

/**
 * Reads the total value of a sharded counter.
 * @param {string} counterId The ID of the counter to read.
 * @return {Promise<number>} A promise that resolves with the total count.
 */
export async function readShardedCounter(counterId: string): Promise<number> {
  const shardsQuery = db.collection("counters")
    .doc(counterId)
    .collection("shards");
  const shardsSnap = await shardsQuery.get();
  let total = 0;
  shardsSnap.forEach((s) => {
    total += Number(s.data().count || 0);
  });
  return total;
}
