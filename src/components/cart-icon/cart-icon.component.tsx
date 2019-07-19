import React from "react";
import { connect } from "react-redux";
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";

import "./cart-item.styles.scss";
import { showHideCart } from "../../store/actions/cartActions";
import { AppState } from "../../store/reducers/rootReducer";

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
    itemCount: state.cart.itemCount
  };
};

export default connect(
  mapStateToProps,
  {
    showHideCart
  }
)(CartIcon);
