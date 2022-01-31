import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// apiKey: "AIzaSyCXTA4lMfCFmmOIe9Ti8-4pZ75D_G-EmTA",
// authDomain: "development-fefbe.firebaseapp.com",
// projectId: "development-fefbe",
// storageBucket: "development-fefbe.appspot.com",
// messagingSenderId: "642435839318",
// appId: "1:642435839318:web:70b0108eacc623e2e852f7"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
