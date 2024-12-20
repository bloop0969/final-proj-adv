import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDoX4TDk9H1kWDNvMKd9nCGXFuJWVBSzB8",
  authDomain: "store-manager-5e743.firebaseapp.com",
  projectId: "store-manager-5e743",
  storageBucket: "store-manager-5e743.firebasestorage.app",
  messagingSenderId: "383321831521",
  appId: "1:383321831521:web:bf0ed9948bb1e78f96d220"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);