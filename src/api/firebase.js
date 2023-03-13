import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
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
console.log(auth);

// ----------Database----------

// db
export const firestoreDb = getFirestore();

// ----------Authentication----------

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
  const userSnapshot = await getDoc(userDocRef);

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
      console.log(err);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const SignInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = async (obj) => {
  if (!obj) return;
  return await updateProfile(auth.currentUser, obj);
};

// Sign out

export const SignOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
};

// auth state observer : listening to the auth changes

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
