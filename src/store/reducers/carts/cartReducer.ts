import IDefaultAction from "../../../models/interfaces/IActions";
import { SHOW_CART_DROPDOWN, ADD_TO_CART } from "../../actions/actionTypes";
import IItemData from "../../../models/interfaces/IItemData";

export type cartState = {
    showCart: boolean,
    itemCount: number,
    items: {
        [id: string] : {
            item: IItemData,
            quantity: number,
            dateAdded: number
        }
    }
}

const INITIAL_STATE: cartState = {
    showCart: false,
    itemCount: 0,
    items: {}
}

const cartReducer = (state = INITIAL_STATE, action: IDefaultAction) => {
    switch (action.type) {
        case SHOW_CART_DROPDOWN:
            return {
                ...state,
                showCart: !state.showCart
            }
        case ADD_TO_CART:
           const items = {...state.items};
           const cartItemToAdd = action.payload as IItemData;
           if(items[cartItemToAdd.id]) {
                items[cartItemToAdd.id].quantity++;
                items[cartItemToAdd.id].dateAdded = new Date().getTime() 
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
        default:
          return state;
    }
}

export default cartReducer;