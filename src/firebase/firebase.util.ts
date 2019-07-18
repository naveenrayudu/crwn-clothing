import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "",
    authDomain: "crwn-db-d8895.firebaseapp.com",
    databaseURL: "https://crwn-db-d8895.firebaseio.com",
    projectId: "crwn-db-d8895",
    storageBucket: "",
    messagingSenderId: "659966977912",
    appId: "1:659966977912:web:08bb2347b381cea8"
})

export const auth = firebase.auth();
export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

export default firebase;