import React from "react";
import ISHOP_DATA from "../../models/interfaces/IShopData";

import './collection-preview.styles.scss';
import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview: React.FC<ISHOP_DATA> = ({ title, items }) => {
    return (
        <div className="collection-preview">
            <h1 className="title">{title}</h1>
            <div className="preview">
                {items.map(item => (
                   <CollectionItem key={item.id} cartItem={item}></CollectionItem>
                ))}
            </div>
        </div>
    );
};

export default CollectionPreview;
