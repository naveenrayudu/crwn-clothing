import React from "react";
import { Route, match } from "react-router";
import { connect } from "react-redux";
import { loadCollections } from "../../store/actions/collectionActions";
import { AppState } from "../../store/reducers/rootReducer";
import { shopIsLoadingSelector } from "../../store/reducers/shop/shop.selector";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionsContainer from "../../components/collections/collections.container";

type ShopPageType = {
  match: match;
  loadCollections: any;
  isLoading: boolean;
};

class ShopPage extends React.Component<ShopPageType> {
  componentDidMount() {
    this.props.loadCollections();
  }

  render() {
    const { match } = this.props;
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
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    isLoading: shopIsLoadingSelector(state)
  };
};

const mapDispatchToProps = {
  loadCollections
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);
