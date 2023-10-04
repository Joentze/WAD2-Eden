import { initializeApp } from 'firebase/app'
import { useFirestore } from 'vuefire'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyA0QRy8UHpLXE2zWyq3lj_NiP79IzC4zno",
    authDomain: "eden-8cdd1.firebaseapp.com",
    projectId: "eden-8cdd1",
    storageBucket: "eden-8cdd1.appspot.com",
    messagingSenderId: "863956894548",
    appId: "1:863956894548:web:77cf0edfb98eecc2477ec1",
    measurementId: "G-CMW3F2H5QG"
})

export const db = useFirestore()