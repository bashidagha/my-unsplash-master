// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgR3t2kfJs2WKZ9Ufgqkj95jhJWKvSMmw",
  authDomain: "http-react-69e72.firebaseapp.com",
  databaseURL: "https://http-react-69e72-default-rtdb.firebaseio.com",
  projectId: "http-react-69e72",
  storageBucket: "http-react-69e72.appspot.com",
  messagingSenderId: "277897967614",
  appId: "1:277897967614:web:380dc8f81e791cbc74b2af",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
