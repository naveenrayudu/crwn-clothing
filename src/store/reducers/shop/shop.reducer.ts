import SHOP_DATA, { Shop_Data_Type } from './shoppage.data';
import IDefaultAction from '../../../models/interfaces/IActions';

const INITIAL_STATE: Shop_Data_Type = SHOP_DATA;

const shopReducer = (state=INITIAL_STATE, action: IDefaultAction) => {
    switch (action.type) {
        default:
           return state;
    }
}

export default shopReducer;
