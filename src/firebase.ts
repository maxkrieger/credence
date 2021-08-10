import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE ?? "{}");
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

auth.signInAnonymously().catch((err) => console.log(err));
