import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyBrGW-FccDANyWSYDdT2-BVHIa_SmVw5bA",
    authDomain: "dezbate-ro.firebaseapp.com",
    projectId: "dezbate-ro",
    storageBucket: "dezbate-ro.appspot.com",
    messagingSenderId: "189754080959",
    appId: "1:189754080959:web:a3859a3177fef22d06500a",
    measurementId: "G-0J8T3QV225"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;