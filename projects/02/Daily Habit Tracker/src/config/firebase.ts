import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { firebaseConnection } from '@/lib/firebase-connection';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore with offline persistence
const db = getFirestore(app);

// Enable offline persistence and connection management
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db, {
    synchronizeTabs: true,
    forceOwnership: false
  }).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firebase persistence failed - multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firebase persistence not supported');
    }
  });

  // Initialize connection manager
  firebaseConnection;
}

export { app, auth, db };