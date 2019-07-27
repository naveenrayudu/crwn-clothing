import { put, takeLatest, call, all} from 'redux-saga/effects';
import { FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS } from '../../actions/actionTypes';
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

export default function* ShopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}