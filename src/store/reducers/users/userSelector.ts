import {createSelector} from 'reselect';
import { AppState } from '../rootReducer';

const user = (state: AppState) => state.user;
export const reselectCurrentUser = createSelector([user], user => user.currentUser);
