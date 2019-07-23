import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { AppState } from "../../store/reducers/rootReducer";
import { shopCollectionPreviewSelector } from "../../store/reducers/shop/shop.selector";
import CollectionPreview from "../collection-preview/collection-preview.component";
import ISHOP_DATA from "../../models/interfaces/IShopData";

interface IShopPageProps {
  shopData: ISHOP_DATA[];
}

const CollectionsOverview: React.FC<IShopPageProps> = ({ shopData = [] }) => {
  return (
    <div className="collections-overview">
      {shopData.map(collection => (
        <CollectionPreview {...collection} key={collection.id} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector<AppState, IShopPageProps>({
  shopData: shopCollectionPreviewSelector
});

export default connect(mapStateToProps)(CollectionsOverview);
