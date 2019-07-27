import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { Dispatch } from "redux";
import { COMPLETE_USER_PAYPAL_START } from "../../store/actions/actionTypes";
import { connect } from "react-redux";

const StripeButton: React.FC<{ price: number, completePayPalPayment: any }> = ({ price, completePayPalPayment }) => {
  const priceForStripe = price * 100;
  const onToken = (token: Token) => {
    completePayPalPayment(token.id, priceForStripe);
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      description={`Your total is $${price}.`}
      image="https://svgshare.com/i/CUz.svg"
      amount={priceForStripe}
      currency="USD"
      stripeKey="pk_test_k6pGT3sHhKbsGWz9ZMs9DzmN"
      panelLabel="Pay Now"
      token={onToken}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    completePayPalPayment: (token: any, amount: number) => {
      dispatch({
        type: COMPLETE_USER_PAYPAL_START,
        payload: {
          token,
          amount
        }
      })
    }
  }
}

export default connect(null, mapDispatchToProps) (StripeButton);
