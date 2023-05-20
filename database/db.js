// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgEgqUoOixEFLcxLhv1DFFZ6NMzKI-9Vk",
  authDomain: "codesue-fa36f.firebaseapp.com",
  projectId: "codesue-fa36f",
  storageBucket: "codesue-fa36f.appspot.com",
  messagingSenderId: "462243194513",
  appId: "1:462243194513:web:b56f19c908cca76fdfc130",
  measurementId: "G-34MKB60NL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const services = { auth }

