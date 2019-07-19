import IDefaultAction from "../../../models/interfaces/IActions";
import { SHOW_CART_DROPDOWN } from "../../actions/actionTypes";

export type cartState = {
    showCart: boolean
}

const INITIAL_STATE: cartState = {
    showCart: false
}

const cartReducer = (state = INITIAL_STATE, action: IDefaultAction) => {
    switch (action.type) {
        case SHOW_CART_DROPDOWN:
            return {
                ...state,
                showCart: !state.showCart
            }
        default:
          return state;
    }
}

export default cartReducer;