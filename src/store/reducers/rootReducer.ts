import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import currentUser from './users/userReducer';
import cartReducer from './carts/cartReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: currentUser,
    cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>

export default persistedReducer;
