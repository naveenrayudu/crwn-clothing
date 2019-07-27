import { put, takeEvery, takeLatest, call, all} from 'redux-saga/effects';
import { FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS, COMPLETE_USER_PAYPAL_START } from '../../actions/actionTypes';
import { firestore, convertCollectionSnapshotToMap } from '../../../firebase/firebase.util';



function* fetchCollectionsAsync() {
    const collectionsSnapShot: firebase.firestore.QuerySnapshot = yield firestore.collection('collections').get();
    yield put({
        type: FETCH_COLLECTIONS_SUCCESS,
        payload: convertCollectionSnapshotToMap(collectionsSnapShot)
    })
}

function* fetchCollectionsStart() {
    yield takeLatest(
        FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

function* completePayPalPaymentAsync(action: {
    type: string,
    payload: {
        token: any,
        amount: number
    }
}) {
   const response:{
        isSuccess: boolean,
       errorMessage?: string
   } = yield fetch("/api/paypal/payment", {
        method: 'POST', 
        cache: 'no-cache', 
        headers: {
            'Content-Type': 'application/json'
        },
        referrer: 'no-referrer',
        body: JSON.stringify({
            token: action.payload.token,
            amount: action.payload.amount
        }), 
    })

    // clear the cart
    if(response.isSuccess) {
        console.log("Clear the cart");
    } else { // display the error to user.
        console.log(response.errorMessage);
    }
}

function* completePayPalPayment() {
    yield takeEvery(COMPLETE_USER_PAYPAL_START, completePayPalPaymentAsync)
}

export default function* ShopSagas() {
    yield all([
        call(fetchCollectionsStart),
        call(completePayPalPayment)
    ])
}