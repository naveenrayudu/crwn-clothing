import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { AppState } from '../../store/reducers/rootReducer';
import { shopIsLoadingSelector, shopCollectionPreviewSelector } from '../../store/reducers/shop/shop.selector';
import WithSpinner from '../hoc/with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';


const mapStateToProps = (state: AppState) => {
  return {
    isLoading: shopIsLoadingSelector(state),
    shopData: shopCollectionPreviewSelector(state)
  }
}


const CollectionsOverviewContainer = compose<React.ComponentType>(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;