// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0EY938m_9PE-yIe9RVou3L6dnn2WSm5A",
  authDomain: "flashcards-saas-d446b.firebaseapp.com",
  projectId: "flashcards-saas-d446b",
  storageBucket: "flashcards-saas-d446b.appspot.com",
  messagingSenderId: "904385397248",
  appId: "1:904385397248:web:39942244b62d12b3d78ee5",
  measurementId: "G-KBVRCW7P7P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
