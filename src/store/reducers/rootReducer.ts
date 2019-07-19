import {combineReducers} from 'redux';
import currentUser from './users/userReducer';
import cartReducer from './carts/cartReducer';

const rootReducer = combineReducers({
    user: currentUser,
    cart: cartReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
