import { Dispatch } from "redux";
import IDefaultAction from "../../models/interfaces/IActions";
import { SHOW_CART_DROPDOWN } from "./actionTypes";

export const showHideCart = () => (dispatch: Dispatch<IDefaultAction>) => {
    dispatch({
        type: SHOW_CART_DROPDOWN,
        payload: undefined
    })
}