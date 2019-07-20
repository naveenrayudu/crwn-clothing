import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";
import { AppState } from "../../store/reducers/rootReducer";
import IItemData from "../../models/interfaces/IItemData";
import CartItem from "../cart-item/cart-item.component";
import { cartItemsSelector, cartShowSelector } from "../../store/reducers/carts/cartSelector";
import { createStructuredSelector } from "reselect";

type cartDropdownType = {
  showCart: boolean;
  cartItems: {
    [id: string]: {
      item: IItemData;
      quantity: number;
      dateAdded: number;
    };
  };
};

const CartDropdown: React.FC<cartDropdownType> = ({ showCart, cartItems }) => {
  const generateCartItems = () => {
    const cartItemsToShow = [];
    for (let id in cartItems) {
      cartItemsToShow.push(
        <CartItem
          key={cartItems[id].dateAdded}
          item={cartItems[id].item}
          quantity={cartItems[id].quantity}
        />
      );
    }
    return cartItemsToShow.sort((a: any, b: any) => {
      if (a.key < b.key) return 1;
      if (a.key > b.key) return -1;
      return 0;
    });
  };

  return (
    <div className={`${!showCart ? "hideCart" : ""} cart-dropdown`}>
      <div className="cart-items">{generateCartItems()}</div>
      <CustomButton
        type="button"
        onClick={() => console.log("Clicked for checkout")}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<AppState, cartDropdownType>({
    showCart: cartShowSelector,
    cartItems: cartItemsSelector
})

export default connect(mapStateToProps)(CartDropdown);
