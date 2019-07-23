import SHOP_DATA, { Shop_Data_Type } from './shoppage.data';
import IDefaultAction from '../../../models/interfaces/IActions';
import { ADD_COLLECTIONS } from '../../actions/actionTypes';

// const INITIAL_STATE: Shop_Data_Type = SHOP_DATA;
const INITIAL_STATE: Shop_Data_Type = {};

const shopReducer = (state=INITIAL_STATE, action: IDefaultAction) => {
    switch (action.type) {
        case ADD_COLLECTIONS:
            return {
                ...action.payload
            }
        default:
           return state;
    }
}

export default shopReducer;
