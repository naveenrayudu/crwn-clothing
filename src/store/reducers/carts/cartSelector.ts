import {createSelector} from 'reselect';
import { AppState } from '../rootReducer';

const cart = (state: AppState) => state.cart;

export const cartItemsSelector = createSelector([cart], (cart) => cart.items);
export const cartShowSelector = createSelector([cart], (cart) => cart.showCart);
export const cartItemsCountSelector = createSelector([cart], (cart) => cart.itemCount);
