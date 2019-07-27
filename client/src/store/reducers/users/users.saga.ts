import { signInWithGoogle, createOrSetUpUserBySignIn, auth, getCurrentuser } from "../../../firebase/firebase.util";
import { takeEvery, put, call, take, all } from "redux-saga/effects";
import { SET_USER_GOOGLE_SIGN_IN_START, SET_SIGN_IN_USER, SET_USER_SIGN_OUT_START, SET_USER_EMAIL_SIGN_IN_START, SET_USER_SIGN_UP_START, VERIFY_USER_SESSION } from "../../actions/actionTypes";
import { ISignedInUserInfo } from "../../../models/interfaces/IUserAccount";

const setUserGoogleSignIn = function* () {
    yield takeEvery(SET_USER_GOOGLE_SIGN_IN_START, setUserGoogleSignInAsync);
}

const updateUserLoginState = function* (user: firebase.User | null, displayName?: string) {
    if (user) {
        const currentUser = {} as ISignedInUserInfo;
        currentUser.displayName = displayName || user.displayName;
        currentUser.email = user.email;
        currentUser.emailVerified = user.emailVerified;
        currentUser.photoUrl = user.photoURL;
        currentUser.uid = user.uid;

        const userRef: firebase.firestore.DocumentReference = yield createOrSetUpUserBySignIn(currentUser, {});
        const fireStoreUser = yield userRef.get();
        yield put({
            type: SET_SIGN_IN_USER,
            payload: fireStoreUser.data()
        })
    } else {
        yield put({
            type: SET_SIGN_IN_USER,
            payload: undefined
        })
    }
}


const setUserGoogleSignInAsync = function* () {
    try {
        const loggedInuser: firebase.auth.UserCredential = yield signInWithGoogle();
        yield call(updateUserLoginState, loggedInuser!.user);
    } catch (error) {
        yield call(updateUserLoginState, null);
    }
}


const setUserSignOut = function* () {
    yield takeEvery(SET_USER_SIGN_OUT_START, setUserSignOutAsync);
}

const setUserSignOutAsync = function* () {
    yield auth.signOut();
    yield put({
        type: SET_SIGN_IN_USER,
        payload: undefined
    })
}

const setUserEmailSignIn = function* () {
    yield takeEvery(SET_USER_EMAIL_SIGN_IN_START, setUserEmailSignInAsync)
}

const setUserEmailSignInAsync = function* (action: {
    type: string,
    payload: {
        email: string,
        password: string,
        errorCallback: any
    }
}) {

    try {
        const loggedInuser: firebase.auth.UserCredential = yield auth.signInWithEmailAndPassword(
            action.payload.email,
            action.payload.password
        )
        yield call(updateUserLoginState, loggedInuser!.user);
    } catch (error) {
        yield call(updateUserLoginState, null);
        if (action.payload.errorCallback) {
            action.payload.errorCallback(error);
        }
    }
}

const setUserRegister = function* () {
    yield takeEvery(SET_USER_SIGN_UP_START, setUserRegisterAsync)
}

const setUserRegisterAsync = function* (action: {
    type: string,
    payload: {
        email: string,
        password: string,
        displayName: string,
        errorCallback: any
    }
}) {
    try {
        const loggedInuser: firebase.auth.UserCredential = yield auth.createUserWithEmailAndPassword(
            action.payload.email,
            action.payload.password
        )
        yield call(updateUserLoginState, loggedInuser!.user, action.payload.displayName);
    } catch (error) {
        yield call(updateUserLoginState, null);
        if (action.payload.errorCallback) {
            action.payload.errorCallback(error);
        }
    }
}

 const getCurrentUser = function* () {
    yield take(VERIFY_USER_SESSION);
    console.log('Verifying session');
    yield call(getCurrentUserAsync);
}

const getCurrentUserAsync = function*() {
    try {
        const user =  yield call(getCurrentuser);
        yield call(updateUserLoginState, user)
    } catch (error) {
        
    }
}

export default function* UserSagas() {
    yield all([
        call(getCurrentUser),
        call(setUserRegister),
        call(setUserEmailSignIn),
        call(setUserSignOut),
        call(setUserGoogleSignIn)
    ])
}