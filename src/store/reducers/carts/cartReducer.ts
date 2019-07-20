import IDefaultAction from "../../../models/interfaces/IActions";
import { SHOW_CART_DROPDOWN, ADD_TO_CART, CLEAR_FROM_CART, REMOVE_FROM_CART } from "../../actions/actionTypes";
import IItemData from "../../../models/interfaces/IItemData";

export type cartItemState = {
    item: IItemData,
    quantity: number,
    dateAdded: number
}

export type cartState = {
    showCart: boolean,
    itemCount: number,
    items: {
        [id: string]: cartItemState
    }
}

const INITIAL_STATE: cartState = {
    showCart: false,
    itemCount: 0,
    items: {}
}


const cartClearReducer = (state = INITIAL_STATE, action: IDefaultAction) => {
    switch (action.type) {
        case REMOVE_FROM_CART:
        case CLEAR_FROM_CART:
            const cartItemsToClear = { ...state.items };
            delete cartItemsToClear[action.payload];

            return {
                ...state,
                items: cartItemsToClear,
                itemCount: state.itemCount - state.items[action.payload].quantity
            }
        default:
            return state;
    }
}

const cartReducer = (state = INITIAL_STATE, action: IDefaultAction) => {
    switch (action.type) {
        case SHOW_CART_DROPDOWN:
            return {
                ...state,
                showCart: !state.showCart
            }
        case ADD_TO_CART:
            const items = { ...state.items };
            const cartItemToAdd = action.payload as IItemData;
            if (items[cartItemToAdd.id]) {
                items[cartItemToAdd.id].quantity++;
            } else {
                items[cartItemToAdd.id] = {
                    item: cartItemToAdd,
                    quantity: 1,
                    dateAdded: new Date().getTime()
                }
            }

            return {
                ...state,
                items: items,
                itemCount: state.itemCount + 1
            }
        case CLEAR_FROM_CART:
              return cartClearReducer(state, action);

        case REMOVE_FROM_CART:
            const cartItemsToDelete = { ...state.items };
            if (cartItemsToDelete[action.payload].quantity === 1) {
                debugger;
                return cartClearReducer(state, action);
            }
            else {
                cartItemsToDelete[action.payload].quantity--;
                return {
                    ...state,
                    items: cartItemsToDelete,
                    itemCount: state.itemCount - 1
                }
            }

        default:
            return state;
    }
}

export default cartReducer;