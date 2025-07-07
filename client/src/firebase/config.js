// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkWbUnoKeK4lixIyMtyOieCgo9tTSCpnc",
    authDomain: "mern-estate-f8097.firebaseapp.com",
    projectId: "mern-estate-f8097",
    storageBucket: "mern-estate-f8097.appspot.com",
    messagingSenderId: "46421333576",
    appId: "1:46421333576:web:9c3b84ba1895e807546a7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
