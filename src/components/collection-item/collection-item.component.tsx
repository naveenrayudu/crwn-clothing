import React from "react";
import IItemData from "../../models/interfaces/IItemData";

import './collection-item.styles.scss';

const CollectionItem: React.FC<IItemData> = ({ id, name, imageUrl, price }) => {
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
};

export default CollectionItem;
