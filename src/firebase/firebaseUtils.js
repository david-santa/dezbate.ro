import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyBrGW-FccDANyWSYDdT2-BVHIa_SmVw5bA",
    authDomain: "dezbate-ro.firebaseapp.com",
    databaseURL: "https://dezbate-ro-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dezbate-ro",
    storageBucket: "dezbate-ro.appspot.com",
    messagingSenderId: "189754080959",
    appId: "1:189754080959:web:a3859a3177fef22d06500a",
    measurementId: "G-0J8T3QV225"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot);

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (e) {
            console.log(e.message);
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;