import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlzPzz5fkTTm5oy1uK-eyuTgCy2Jo7MDM",
  authDomain: "l1mitless.firebaseapp.com",
  projectId: "l1mitless",
  storageBucket: "l1mitless.firebasestorage.app",
  messagingSenderId: "941491136081",
  appId: "1:941491136081:web:07f2c465e93eff7fd9ba70",
  measurementId: "G-C0NQR9BRG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Database)
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

export { db, auth };
