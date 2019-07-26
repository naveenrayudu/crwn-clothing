import { all, fork } from "redux-saga/effects";
import ShopSagas from "./shop/shop.saga";
import CartSagas from "./carts/cart.saga";
import UserSagas from "./users/users.saga";

export default function* rootSaga() {
    yield all([
        fork(ShopSagas),
        fork(CartSagas),
        fork(UserSagas)
    ])
}