import React from "react";
import {connect} from 'react-redux';
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";

import "./cart-item.styles.scss";
import { showHideCart } from "../../store/actions/cartActions";

type cartIconProps = {
    showHideCart: any
} 

const CartIcon: React.FC<cartIconProps> = ({showHideCart}) => {
  return (
      <div className="cart-icon" onClick={showHideCart}>
        <ShoppingBagIcon className="cart-icon-svg" />
        <span className="item-count">0</span>
      </div>
  );
};




export default connect(null, {
    showHideCart
})(CartIcon);
