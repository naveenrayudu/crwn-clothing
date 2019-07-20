import { createSelector } from 'reselect';
import { AppState } from '../rootReducer';
import { cartItemState } from './cartReducer';

const cart = (state: AppState) => state.cart;

export const cartItemsSelector = createSelector([cart], (cart) => {
    const cartItems = [];
    for (let id in cart.items) {
        cartItems.push(cart.items[id]);
    }
    return cartItems.sort((a: cartItemState, b: cartItemState) => {
        if (a.dateAdded < b.dateAdded) return 1;
        if (a.dateAdded > b.dateAdded) return -1;
        return 0;
      });
});

export const cartShowSelector = createSelector([cart], (cart) => cart.showCart);
export const cartItemsCountSelector = createSelector([cart], (cart) => cart.itemCount);
export const cartItemsTotalCalculator = createSelector([cartItemsSelector], (cartitems) => {
   return cartitems.reduce((acc, ini) =>  acc + (ini.item.price * ini.quantity), 0);
})
