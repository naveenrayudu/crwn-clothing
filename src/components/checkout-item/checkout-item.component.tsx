import React from "react";
import IItemData from "../../models/interfaces/IItemData";

import "./checkout-item.styles.scss";
import { connect } from "react-redux";

import { Dispatch } from "redux";
import { CLEAR_FROM_CART_START, REMOVE_FROM_CART_START, ADD_TO_CART_START } from "../../store/actions/actionTypes";

const CheckoutItem: React.FC<{
  cartItem: IItemData;
  quantity: number;
  clearFromCart: any;
  removeFromCart: any;
  addToCart: any
}> = ({ cartItem, quantity, clearFromCart, removeFromCart, addToCart }) => {
  return (
    <div className="checkout-item" key={cartItem.id}>
      <div className="item-block">
        <img src={cartItem.imageUrl} alt={cartItem.name} />
      </div>
      <div className="item-block">
        <span>{cartItem.name}</span>
      </div>
      <div className="item-block">
        <span>
          <div onClick={() => removeFromCart(cartItem.id.toString())} className="arrow">&#10094;</div>
          {quantity}
          <div onClick={() => addToCart(cartItem)} className="arrow">&#10095;</div>
        </span>
      </div>
      <div className="item-block">
        <span>${cartItem.price}</span>
      </div>
      <div className="item-block">
        <span
          className="remove-button"
          onClick={() => clearFromCart(cartItem.id.toString())}
        >
          &#10005;
        </span>
      </div>
    </div>
  );
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clearFromCart: (id: string) => {
      dispatch({
        type: CLEAR_FROM_CART_START,
        payload: {
          id: id,
          showToaster: true
        }
      })
    },
    removeFromCart: (id: string) => {
      dispatch({
        type: REMOVE_FROM_CART_START,
        payload: {
          id: id,
          showToaster: true
        }
      })
    },
    addToCart: (cartItem: IItemData) => {
      dispatch({
        type: ADD_TO_CART_START,
        payload: {
          cartItem,
          showToaster: true
        }
      });
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
