import { put, takeEvery, takeLatest, call, all } from 'redux-saga/effects';
import { FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS, COMPLETE_USER_PAYPAL_START, CHECK_OUT_COMPLETE_SUCCESS } from '../../actions/actionTypes';
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
        amount: number,
        callback: any
    }
}) {
    try {
        const response: {
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

        console.log(response);

        // clear the cart
        if (response.isSuccess) {
            yield put({
                type: CHECK_OUT_COMPLETE_SUCCESS,
                payload: undefined
            })

            action.payload.callback(true);
        } else { // display the error to user.
            action.payload.callback(false);
        }
    } catch (error) {
        debugger;
        action.payload.callback(false);
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