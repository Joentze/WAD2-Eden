import { initializeApp } from "firebase/app";
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { useFirebaseAuth, useFirestore } from "vuefire";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const isTestLocally = false;

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyA0QRy8UHpLXE2zWyq3lj_NiP79IzC4zno",
  authDomain: "eden-8cdd1.firebaseapp.com",
  projectId: "eden-8cdd1",
  storageBucket: "eden-8cdd1.appspot.com",
  messagingSenderId: "863956894548",
  appId: "1:863956894548:web:77cf0edfb98eecc2477ec1",
  measurementId: "G-CMW3F2H5QG",
});

export const db = useFirestore();
export const auth = useFirebaseAuth();
export const storage = getStorage(firebaseApp);
const functions = getFunctions(firebaseApp);
if (isTestLocally && window.location.hostname.includes("localhost")) {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectAuthEmulator(auth!, "http://127.0.0.1:9099");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}
