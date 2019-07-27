import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";

const StripeButton: React.FC<{ price: number }> = ({ price }) => {
  const priceForStripe = price * 100;
  const onToken = (token: Token) => {
    console.log(token);
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

export default StripeButton;
