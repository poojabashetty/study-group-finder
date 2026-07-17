import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7Pd327QdfVHfbdhjPT1K9aLM3hIGX3uU",
  authDomain: "study-group-finder-13512.firebaseapp.com",
  projectId: "study-group-finder-13512",
  storageBucket: "study-group-finder-13512.firebasestorage.app",
  messagingSenderId: "2341757209",
  appId: "1:2341757209:web:b35bb528ba827fea1ce588",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;