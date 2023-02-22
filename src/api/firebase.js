import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIfrpuCgXtnzghBvFI1R_buLP0YC_TYqE",
  authDomain: "coinspy-fe313.firebaseapp.com",
  projectId: "coinspy-fe313",
  storageBucket: "coinspy-fe313.appspot.com",
  messagingSenderId: "318080754211",
  appId: "1:318080754211:web:175ff3626a6ac1dfecc796",
  measurementId: "G-X04JNNJ0LV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(app);

// auth
const auth = getAuth();

// provider
const googleProvider = new GoogleAuthProvider();

export const googleSignInWithPopup = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
