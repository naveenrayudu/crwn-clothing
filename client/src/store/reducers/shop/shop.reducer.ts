
import IDefaultAction from '../../../models/interfaces/IActions';
import { FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_ERROR } from '../../actions/actionTypes';
import ISHOP_DATA from '../../../models/interfaces/IShopData';

export type Shop_Data_Type = {
    [key: string]: ISHOP_DATA
}

export type Shop_Store_Type = {
    collections: Shop_Data_Type,
    isLoading: boolean
}

// const INITIAL_STATE: Shop_Data_Type = SHOP_DATA;
const INITIAL_STATE: Shop_Store_Type = {
    collections: {} as Shop_Data_Type,
    isLoading: false
};

const shopReducer = (state = INITIAL_STATE, action: IDefaultAction) => {
    switch (action.type) {
        case FETCH_COLLECTIONS_START:
            console.log('Start')
            return {
                ...state,
                isLoading: true
            }
        case FETCH_COLLECTIONS_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case FETCH_COLLECTIONS_SUCCESS:
            console.log('Success')
            return {
                ...state,
                collections: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}

export default shopReducer;
