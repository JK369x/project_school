import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = ( {
    apiKey: "AIzaSyA1Avy8dyn7c_vN-gf8MOd9FNOqX-K2J8w",
    authDomain: "react-auth-e2d95.firebaseapp.com",
    projectId: "react-auth-e2d95",
    storageBucket: "react-auth-e2d95.appspot.com",
    messagingSenderId: "695560862013",
    appId: "1:695560862013:web:190b3eda92624692eaed54",
    measurementId: "G-F3DPXCGWN9"

  });
  

  const app = initializeApp(firebaseConfig)
  export const auth = getAuth(app);
  export const db = getFirestore(app)
  export const storage = getStorage(app)

  export default app
  
  