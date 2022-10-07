import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyBVgrZt-wq-xPtKyg19ozKJ3YYG3LCoP2o",
    authDomain: "react-journal-fb3b9.firebaseapp.com",
    projectId: "react-journal-fb3b9",
    storageBucket: "react-journal-fb3b9.appspot.com",
    messagingSenderId: "663370222935",
    appId: "1:663370222935:web:15f8f86b46f5b9e3694212"
}

export const FirebaseApp = initializeApp( firebaseConfig )

export const FirebaseAuth = getAuth( FirebaseApp )

export const FirebaseDB = getFirestore( FirebaseApp )
