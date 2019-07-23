
import IDefaultAction from '../../../models/interfaces/IActions';
import { ADD_COLLECTIONS } from '../../actions/actionTypes';
import ISHOP_DATA from '../../../models/interfaces/IShopData';

export type Shop_Data_Type = {
    [key: string] :  ISHOP_DATA
  }

  
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
