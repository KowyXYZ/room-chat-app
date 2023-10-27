// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyD7n8MCFcs-See4aRUVQI_aYbtlp__Sg",
  authDomain: "chat-app-a0102.firebaseapp.com",
  projectId: "chat-app-a0102",
  storageBucket: "chat-app-a0102.appspot.com",
  messagingSenderId: "294108649003",
  appId: "1:294108649003:web:9bb634c7817a764552fc6e",
  measurementId: "G-KE3VV5VVKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
