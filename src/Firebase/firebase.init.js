// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe1-sD3g2CkJ2AFr-oAGimGUr7KxGoChE",
  authDomain: "nstu-blood-brigade.firebaseapp.com",
  projectId: "nstu-blood-brigade",
  storageBucket: "nstu-blood-brigade.firebasestorage.app",
  messagingSenderId: "362754603360",
  appId: "1:362754603360:web:6e608c7c99beb1db844605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
