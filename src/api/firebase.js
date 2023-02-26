import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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
const firebaseApp = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(firebaseApp);

// provider
const googleProvider = new GoogleAuthProvider();

// auth
export const auth = getAuth();

// db
export const firestoreDb = getFirestore();

// Sign in with google
export const googleSignInWithPopup = () =>
  signInWithPopup(auth, googleProvider);

// create User Document from auth

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(firestoreDb, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  // if  user data does not exists, create document
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log(`user creating error ${err.message}`);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign out

export const SignOutUser = async () => {
  try {
    const res = await signOut(auth);
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};
