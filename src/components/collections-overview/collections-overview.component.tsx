import React from "react";
import CollectionPreview from "../collection-preview/collection-preview.component";
import ISHOP_DATA from "../../models/interfaces/IShopData";

export interface IShopPageProps {
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


export default CollectionsOverview;
