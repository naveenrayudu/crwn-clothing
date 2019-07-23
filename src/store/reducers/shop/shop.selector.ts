import { createSelector } from 'reselect';
import { AppState } from '../rootReducer';
import { Shop_Data_Type } from './shop.reducer';


const shop = (state: AppState) => state.shop;
export const shopCollectionsSelector = createSelector(shop, (shopData: Shop_Data_Type) => shopData);
export const shopCollectionSelector = (collectionUrlParam: string) => {
    return createSelector([shopCollectionsSelector], collections => {
        return collections[collectionUrlParam];
    })
}

export const shopCollectionPreviewSelector = createSelector([shopCollectionsSelector], (shopCollection: Shop_Data_Type) => {
   return Object.keys(shopCollection).map(key => {
        const shopCollectionItem = {...shopCollection[key]};
        return shopCollectionItem;
    })
})
