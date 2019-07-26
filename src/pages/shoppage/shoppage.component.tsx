import React, { useEffect } from "react";
import { Route, match } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../../store/reducers/rootReducer";
import { shopIsLoadingSelector } from "../../store/reducers/shop/shop.selector";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionsContainer from "../../components/collections/collections.container";
import { Dispatch } from "redux";
import { FETCH_COLLECTIONS_START } from "../../store/actions/actionTypes";

type ShopPageType = {
  match: match;
  loadCollections: any;
  isLoading: boolean;
};

const ShopPage: React.FC<ShopPageType> = ({ loadCollections, match }) => {
  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionsId`}
        component={CollectionsContainer}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isLoading: shopIsLoadingSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadCollections: () =>
      dispatch({
        type: FETCH_COLLECTIONS_START
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);
