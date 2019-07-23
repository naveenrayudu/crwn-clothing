import { Dispatch } from "redux";
import IDefaultAction, { IToasterAction } from "../../models/interfaces/IActions";
import { SHOW_CART_DROPDOWN, ADD_TO_CART, CLEAR_FROM_CART, REMOVE_FROM_CART } from "./actionTypes";
import IItemData from "../../models/interfaces/IItemData";
import AppMessages from "./actionMessages";

const cartMessage = AppMessages.cart;

export const showHideCart = () => (dispatch: Dispatch<IDefaultAction>) => {
    dispatch({
        type: SHOW_CART_DROPDOWN,
        payload: undefined
    })
}

export const addToCart = (cartItem: IItemData, showToaster?: boolean) => (dispatch: Dispatch<IToasterAction>) => {
    dispatch({
        type: ADD_TO_CART,
        payload: cartItem,
        showToaster: showToaster,
        successMessage: cartMessage.item_add,
        errorMessage: cartMessage.item_add_error
    })
}

export const clearFromCart = (id: string, showToaster?: boolean) => (dispatch: Dispatch<IToasterAction>) => {
    dispatch({
        type: CLEAR_FROM_CART,
        payload: id,
        showToaster: showToaster,
        successMessage: cartMessage.clear_item,
        errorMessage: cartMessage.clear_item_error
    })
}

export const removeFromCart = (id: string, showToaster?: boolean) => (dispatch: Dispatch<IToasterAction>) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
        showToaster: showToaster,
        successMessage: cartMessage.remove_item,
        errorMessage: cartMessage.remove_item_error
    })
}
