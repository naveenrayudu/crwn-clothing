import React, { useState } from "react";

import "./checkout.styles.scss";
import { AppState } from "../../store/reducers/rootReducer";
import {
  cartItemsSelector,
  cartItemsTotalCalculator
} from "../../store/reducers/carts/cartSelector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { cartItemState } from "../../store/reducers/carts/cartReducer";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { withRouter, RouteComponentProps } from "react-router";
import StripeButton from "../../components/stripe-button/stripe-button.component";

type checkoutPageType = {
  cartItems: cartItemState[];
  totalCost: number;
};

const CheckoutPage: React.FC<checkoutPageType & RouteComponentProps> = ({
  cartItems,
  totalCost
}) => {
  const [checkOutStatus, updateCheckoutStatus] = useState(null);

  return (
    <div className="checkout-page">
      {checkOutStatus === true ? (
        <div className="checkout-success">Checkout success!!!</div>
      ) : null}

      {
        checkOutStatus === false ?  (
          <div className="checkout-failure">Error ooccured while doing your payment!!!</div>
        ) : null
      }

      <div className="checkout-table-display">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Description</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price</span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        <div className="checkout-table-body">
          {cartItems.map(cartItem => (
            <CheckoutItem
              cartItem={cartItem.item}
              quantity={cartItem.quantity}
              key={cartItem.item.id}
            />
          ))}
        </div>

        <div className="total-cost">
          <span className="total-cost--label">
            TOTAL COST: <span className="currency-symbol">$</span>
          </span>
          {totalCost}
        </div>
      </div>

      {totalCost > 0 ? (
        <div className="checkout-pay-btn">
          <StripeButton price={totalCost} paymentCallback={updateCheckoutStatus} />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector<AppState, checkoutPageType>({
  cartItems: cartItemsSelector,
  totalCost: cartItemsTotalCalculator
});

export default withRouter(connect(mapStateToProps)(CheckoutPage));
