import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDblBgbCL1tsgTlA_CHOVmLIQtN-i76_Ws",
    authDomain: "slack-clone-b291d.firebaseapp.com",
    projectId: "slack-clone-b291d",
    storageBucket: "slack-clone-b291d.appspot.com",
    messagingSenderId: "996689130376",
    appId: "1:996689130376:web:52fcd38e63d0551145803d"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, collection, getDocs,addDoc, doc, signInWithPopup, setDoc, serverTimestamp, onSnapshot }; // Export Firestore functions as well

