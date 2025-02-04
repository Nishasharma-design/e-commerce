// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCZWxg4UWEAM9worzcM4F4npp2f-gl43g",
  authDomain: "firestore-d7dad.firebaseapp.com",
  projectId: "firestore-d7dad",
  storageBucket: "firestore-d7dad.firebasestorage.app",
  messagingSenderId: "985867764197",
  appId: "1:985867764197:web:691b718c14e337f8f6af0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);