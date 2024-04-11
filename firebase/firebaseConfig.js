// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFp0EoKIGvAlcrJF0f4KYqThjs_kiExYg",
    authDomain: "web-cloud-ynov-91cf3.firebaseapp.com",
    projectId: "web-cloud-ynov-91cf3",
    storageBucket: "web-cloud-ynov-91cf3.appspot.com",
    messagingSenderId: "649797077452",
    appId: "1:649797077452:web:1b94137119e0a5a249f569",
    measurementId: "G-R907EQM7R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);