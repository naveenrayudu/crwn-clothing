import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../store/reducers/rootReducer";
import {
  shopIsLoadingSelector,
  shopCollectionSelector
} from "../../store/reducers/shop/shop.selector";
import CollectionsPage from "./collections.component";
import WithSpinner from "../hoc/with-spinner/with-spinner.component";
import { match, RouterProps } from "react-router";

export type routeMatchParam = {
  match: match<{
    collectionsId: string;
  }>;
} & RouterProps;

const mapStateToProps = (state: AppState, ownProps: routeMatchParam) => {
  return {
    isLoading: shopIsLoadingSelector(state),
    collection: shopCollectionSelector(ownProps.match.params.collectionsId)(state)
  };
};

const CollectionsContainer = compose<React.ComponentType>(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsPage);

export default CollectionsContainer;
