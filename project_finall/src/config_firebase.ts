import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = firebase.initializeApp( {
    apiKey: "AIzaSyA1Avy8dyn7c_vN-gf8MOd9FNOqX-K2J8w",
    authDomain: "react-auth-e2d95.firebaseapp.com",
    projectId: "react-auth-e2d95",
    storageBucket: "react-auth-e2d95.appspot.com",
    messagingSenderId: "695560862013",
    appId: "1:695560862013:web:190b3eda92624692eaed54",
    measurementId: "G-F3DPXCGWN9"

  });
  
  export default firebaseConfig