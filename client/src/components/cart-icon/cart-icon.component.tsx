import React from "react";
import { connect } from "react-redux";
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";

import "./cart-item.styles.scss";
import { AppState } from "../../store/reducers/rootReducer";
import { cartItemsCountSelector } from "../../store/reducers/carts/cartSelector";
import { SHOW_CART_DROPDOWN_START } from "../../store/actions/actionTypes";
import { Dispatch } from "redux";

type cartIconProps = {
  showHideCart: any;
  itemCount: number;
};

const CartIcon: React.FC<cartIconProps> = ({ showHideCart, itemCount }) => {
  return (
    <div className="cart-icon" onClick={showHideCart}>
      <ShoppingBagIcon className="cart-icon-svg" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    itemCount: cartItemsCountSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showHideCart: () => dispatch({
      type: SHOW_CART_DROPDOWN_START
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
