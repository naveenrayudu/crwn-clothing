import {combineReducers} from 'redux';
import currentUser from './users/userReducer';

const rootReducer = combineReducers({
    user: currentUser
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
