// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0SgKeJRPpHZbwJxpVbAKkwN_cJXQN_3Y",
  authDomain: "shipment-delivery-51a2a.firebaseapp.com",
  projectId: "shipment-delivery-51a2a",
  storageBucket: "shipment-delivery-51a2a.firebasestorage.app",
  messagingSenderId: "129352466333",
  appId: "1:129352466333:web:69547b254ced7ee704b974",
  measurementId: "G-JV79VREFG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };