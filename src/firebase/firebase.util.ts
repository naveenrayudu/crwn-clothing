import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ISignedInUserInfo } from '../models/interfaces/IUserAccount';

firebase.initializeApp({
    apiKey: "AIzaSyBGHIw6SKOlWnQHBdkNjIWJZbOS8N28p8c",
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

export const getServerTimeStamp = ():firebase.firestore.Timestamp => {
    return firebase.firestore.Timestamp.now()
}

export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

export const createOrSetUpUserBySignIn = async (userAuth: ISignedInUserInfo, additionalData: {}) => {
    if(!userAuth)
        return;

    const userDoc = firestore.doc(`/users/${userAuth.uid}`);
    const userSnapShot = await userDoc.get();

    try {
        if(!userSnapShot.exists) {
            await userDoc.set({
                ...userAuth,
                ...additionalData,
                createdAt: getServerTimeStamp(),
                recentLogin: getServerTimeStamp()
            })
        } else {
           await userDoc.update({
                recentLogin: getServerTimeStamp()
            })
        }
    } catch (error) {
        console.log(error);
    }

    return userDoc;
}


export default firebase;