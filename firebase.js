import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBjBcm8tgcu3SwVtn1Tl7NuFiueDU3kC7o",
    authDomain: "al-nasr-2c3c6.firebaseapp.com",
    projectId: "al-nasr-2c3c6",
    storageBucket: "al-nasr-2c3c6.appspot.com",
    messagingSenderId: "950318009740",
    appId: "1:950318009740:web:94a7256322f533e4b51aa9",
    measurementId: "G-MJTP5WTVLX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();