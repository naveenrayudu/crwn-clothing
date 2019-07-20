import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";
import { AppState } from "../../store/reducers/rootReducer";
import CartItem from "../cart-item/cart-item.component";
import {
  cartItemsSelector,
  cartShowSelector
} from "../../store/reducers/carts/cartSelector";
import { createStructuredSelector } from "reselect";
import { withRouter, RouteComponentProps } from "react-router";
import { cartItemState } from "../../store/reducers/carts/cartReducer";
import { showHideCart } from "../../store/actions/cartActions";

type cartDropdownType = {
  showCart: boolean;
  cartItems: cartItemState[];
};
type cartDropdownWithRouteType = RouteComponentProps & cartDropdownType;

const CartDropdown: React.FC<cartDropdownWithRouteType & {showHideCart: any}> = ({
  showCart,
  cartItems,
  showHideCart,
  history
}) => {
  const generateCartItems = () => {
    return cartItems.map(item => {
      return (
        <CartItem
          key={item.dateAdded}
          item={item.item}
          quantity={item.quantity}
        />
      );
    });
  };

  return (
    <div className={`${!showCart ? "hideCart" : ""} cart-dropdown`}>
      {!Object.keys(cartItems).length ? (
        <div className="empty-message">Your cart is empty</div>
      ) : (
        <React.Fragment>
          <div className="cart-items">{generateCartItems()}</div>
          <CustomButton
            type="button"
            onClick={() => {
              showHideCart();
              history.push("/checkout");
            }}
          >
            GO TO CHECKOUT
          </CustomButton>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector<AppState, cartDropdownType>({
  showCart: cartShowSelector,
  cartItems: cartItemsSelector
});

export default withRouter(connect(mapStateToProps, {
  showHideCart
})(CartDropdown));
