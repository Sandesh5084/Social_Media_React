import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBZKxsLiXs5prhgLDleuxuiYm0lNYDZdHU",
    authDomain: "social-media-be85f.firebaseapp.com",
    projectId: "social-media-be85f",
    storageBucket: "social-media-be85f.appspot.com",
    messagingSenderId: "217803024160",
    appId: "1:217803024160:web:338dae4bf3846db85a1945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Provider = new GoogleAuthProvider();
export const db = new getFirestore(app);