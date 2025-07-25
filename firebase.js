
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa9snjF3mOXDEOD90MTG2g5TRLZ2O30Zs",
  authDomain: "fintra-55d15.firebaseapp.com",
  projectId: "fintra-55d15",
  storageBucket: "fintra-55d15.firebasestorage.app",
  messagingSenderId: "415999053615",
  appId: "1:415999053615:web:b13646d9d49e464b87dbda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app);
export const storage = getStorage(app);