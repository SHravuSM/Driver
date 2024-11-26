import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfhBth9cq9-QaYmoXeQeXqNFI1CH_VD7A",
  authDomain: "vihar-70d82.firebaseapp.com",
  projectId: "vihar-70d82",
  storageBucket: "vihar-70d82.firebasestorage.app",
  messagingSenderId: "270779880218",
  appId: "1:270779880218:web:4a62f8fae9b7c087e252a3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);