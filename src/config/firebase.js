// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPyytezc5RjSwJOGLMvY3y4DD3MXxOaKM",
  authDomain: "micomidafavorita-3bf0d.firebaseapp.com",
  projectId: "micomidafavorita-3bf0d",
  storageBucket: "micomidafavorita-3bf0d.firebasestorage.app",
  messagingSenderId: "1070615101131",
  appId: "1:1070615101131:web:ba3896b8c2bc99af63a54e",
  measurementId: "G-FPR2ZZCZF5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
