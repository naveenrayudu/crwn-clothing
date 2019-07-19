import React from "react";
import IItemData from "../../models/interfaces/IItemData";

import './collection-item.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { addToCart } from "../../store/actions/cartActions";

type ICollectionItemType = {
  cartItem : IItemData,
  addToCart: any
}

const CollectionItem: React.FC<ICollectionItemType> = ({addToCart, cartItem}) => {
  const { name, imageUrl, price } = cartItem;
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

      <CustomButton type="button" inverted={true} onClick={() => addToCart(cartItem)}>ADD TO CART</CustomButton>
    </div>
  );
};

export default connect(null, {
  addToCart
})(CollectionItem);
