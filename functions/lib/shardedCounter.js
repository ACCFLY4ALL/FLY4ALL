"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.readShardedCounter = readShardedCounter;
// functions/src/shardedCounter.ts
const admin = __importStar(require("firebase-admin"));
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
async function readShardedCounter(counterId) {
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
//# sourceMappingURL=shardedCounter.js.map