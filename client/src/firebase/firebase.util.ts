import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ISignedInUserInfo } from '../models/interfaces/IUserAccount';
import IItemData from '../models/interfaces/IItemData';
import ISHOP_DATA from '../models/interfaces/IShopData';
import { Shop_Data_Type } from '../store/reducers/shop/shop.reducer';


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

export const getCurrentuser = async () => {
    return new Promise((resolve, reject) => {
        const unsubscriber =  auth.onAuthStateChanged((userAuth) => {
            unsubscriber();
            resolve(userAuth)
        }, reject);
    });
}

export const createAndSetUpDocsForCollection = (collectionName: string, documents: Object[]) => {
   const collectionRef = firestore.collection(collectionName);
    const batch = firestore.batch();

    documents.forEach(doc => {
        batch.set(collectionRef.doc(), doc);
    })

    batch.commit().then((datas) => {
        console.log(datas);
    })
}


export const convertCollectionSnapshotToMap =  (collections: firebase.firestore.QuerySnapshot) => {
    const collectionsArray: ISHOP_DATA[] = collections.docs.map(doc => {
        const {title, items} = doc.data() as {
            title: string,
            items: IItemData[]
        };

        return {
            title,
            items,
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id
        }
    });

    return collectionsArray.reduce((acc, ini)=> {
        acc[ini.title.toLowerCase()] = ini;
        return acc;
    }, {
        
    } as Shop_Data_Type)
}


export default firebase;