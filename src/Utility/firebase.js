import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBCzcCRZlJFNyFysob1nocxjnWeQUYHBo",
  authDomain: "clone-f6bc7.firebaseapp.com",
  projectId: "clone-f6bc7",
  storageBucket: "clone-f6bc7.appspot.com",
  messagingSenderId: "16636586108",
  appId: "1:16636586108:web:b02af6ef85452c94ca81f9",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()




