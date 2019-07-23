import IDefaultAction from "../../models/interfaces/IActions";
import { Dispatch } from "redux";
import { FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_ERROR, FETCH_COLLECTIONS_SUCCESS } from "./actionTypes";
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.util";

export const loadCollections = () => (dispatch: Dispatch<IDefaultAction>) => {
    dispatch({
        type: FETCH_COLLECTIONS_START,
        payload: true
    })

    firestore.collection('collections').get()
    .then(collections => {
        convertCollectionSnapshotToMap(collections)
        dispatch({
            type: FETCH_COLLECTIONS_SUCCESS,
            payload: convertCollectionSnapshotToMap(collections)
        })
    })
    .catch(error => {
        dispatch({
            type: FETCH_COLLECTIONS_ERROR,
            payload: error
        })
    })
}

