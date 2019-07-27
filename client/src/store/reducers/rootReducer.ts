import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import currentUser from './users/userReducer';
import cartReducer from './carts/cartReducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: currentUser,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>

export default persistedReducer;
