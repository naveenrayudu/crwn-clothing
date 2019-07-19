import { Dispatch } from "redux";
import IDefaultAction from "../../models/interfaces/IActions";
import { SHOW_CART_DROPDOWN, ADD_TO_CART } from "./actionTypes";
import IItemData from "../../models/interfaces/IItemData";

export const showHideCart = () => (dispatch: Dispatch<IDefaultAction>) => {
    dispatch({
        type: SHOW_CART_DROPDOWN,
        payload: undefined
    })
}

export const addToCart = (cartItem: IItemData) => (dispatch: Dispatch<IDefaultAction>) => {
    dispatch({
        type: ADD_TO_CART,
        payload: cartItem
    })
}