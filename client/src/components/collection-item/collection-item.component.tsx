import React from "react";
import IItemData from "../../models/interfaces/IItemData";

import "./collection-item.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ADD_TO_CART_START } from "../../store/actions/actionTypes";

type ICollectionItemType = {
  cartItem: IItemData;
  addToCart: any;
};

const CollectionItem: React.FC<ICollectionItemType> = ({
  addToCart,
  cartItem
}) => {
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
        <span className="price">${price}</span>
      </div>

      <CustomButton
        className="custom-button"
        type="button"
        inverted={true}
        onClick={() => addToCart(cartItem)}
      >
        ADD TO CART
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addToCart: (cartItem: IItemData) => {
      dispatch({
        type: ADD_TO_CART_START,
        payload: {
          cartItem,
          showToaster: true
        }
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);
