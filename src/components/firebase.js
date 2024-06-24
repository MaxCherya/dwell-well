import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhGzbq5IyaEoAiQJZt_LrglN4q8uTM2W0",
  authDomain: "dwell-well-661f7.firebaseapp.com",
  projectId: "dwell-well-661f7",
  storageBucket: "dwell-well-661f7.appspot.com",
  messagingSenderId: "895222931290",
  appId: "1:895222931290:web:a32f37816de1f644b19d63"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);