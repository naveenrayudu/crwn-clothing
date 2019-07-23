import React from "react";
import ISHOP_DATA from "../../models/interfaces/IShopData";
import CollectionItem from "../collection-item/collection-item.component";

import "./collections.styles.scss";

export type CollectionsPageType = {
  collection: ISHOP_DATA | undefined;
};


const CollectionsPage: React.FC<CollectionsPageType> = ({
  collection
}) => {
  if (!collection || !collection.items) {
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



export default CollectionsPage;
