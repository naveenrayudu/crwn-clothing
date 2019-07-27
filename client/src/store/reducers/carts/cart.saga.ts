import { put, takeLatest, all, call } from 'redux-saga/effects';
import { SHOW_CART_DROPDOWN, ADD_TO_CART, CLEAR_FROM_CART, REMOVE_FROM_CART, ADD_TO_CART_START, SHOW_CART_DROPDOWN_START, CLEAR_FROM_CART_START, REMOVE_FROM_CART_START } from '../../actions/actionTypes';
import AppMessages from '../../actions/actionMessages';
import IItemData from '../../../models/interfaces/IItemData';


const cartMessage = AppMessages.cart;

const showHideCart = function* () {
    yield takeLatest(SHOW_CART_DROPDOWN_START, function* () {
        yield put({
            type: SHOW_CART_DROPDOWN,
            payload: undefined
        });
    })
}

const addToCart = function* () {
    yield takeLatest(ADD_TO_CART_START, addToCartAsync)
}

const addToCartAsync = function* (action: {
    type: string,
    payload: {
        cartItem: IItemData,
        showToaster?: boolean
    }
}) {
    yield put({
        type: ADD_TO_CART,
        payload: action.payload.cartItem,
        showToaster: action.payload.showToaster,
        successMessage: cartMessage.item_add,
        errorMessage: cartMessage.item_add_error
    })
}

const clearFromCartAsync = function* (action: {
    type: string,
    payload: {
        id: string,
        showToaster?: boolean
    }
}) {
    yield put({
        type: CLEAR_FROM_CART,
        payload: action.payload.id,
        showToaster: action.payload.showToaster,
        successMessage: cartMessage.clear_item,
        errorMessage: cartMessage.clear_item_error
    })
}

const clearFromCart = function* () {
    yield takeLatest(CLEAR_FROM_CART_START, clearFromCartAsync);
}

const removeFromCart = function* () {
    yield takeLatest(REMOVE_FROM_CART_START, removeFromCartAsync);
}

const removeFromCartAsync = function* (action: {
    type: string,
    payload: {
        id: string,
        showToaster?: boolean
    }
}) {
    yield put({
        type: REMOVE_FROM_CART,
        payload: action.payload.id,
        showToaster: action.payload.showToaster,
        successMessage: cartMessage.remove_item,
        errorMessage: cartMessage.remove_item_error
    })
}

export default function* CartSagas () {
    yield all([
        call(showHideCart),
        call(addToCart),
        call(clearFromCart),
        call(removeFromCart)
    ])
}