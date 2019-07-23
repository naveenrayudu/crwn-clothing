import React from "react";
import { createStructuredSelector } from "reselect";
import { shopCollectionSelector } from "../../store/reducers/shop/shop.selector";
import ISHOP_DATA from "../../models/interfaces/IShopData";
import { connect } from "react-redux";
import { match, RouterProps } from "react-router";
import { AppState } from "../../store/reducers/rootReducer";
import CollectionItem from "../collection-item/collection-item.component";

import "./collections.styles.scss";

type CollectionsPageType = {
  collection: ISHOP_DATA | undefined;
};

type routeMatchParam = {
  match: match<{
    collectionsId: string;
  }>;
} & RouterProps;

const CollectionsPage: React.FC<CollectionsPageType & routeMatchParam> = ({
  collection,
  history
}) => {
  if (!collection) {
    return null;
  }

  const { title, items } = collection as ISHOP_DATA;
  return (
    <div className="collections-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} cartItem={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState, ownProps: routeMatchParam) =>
  createStructuredSelector<AppState, routeMatchParam, CollectionsPageType>({
    collection: shopCollectionSelector(ownProps.match.params.collectionsId)
  });

export default connect(mapStateToProps)(CollectionsPage);
