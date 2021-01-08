import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import PaymentForm from "../components/PaymentForm";

const Payment = ({ token }) => {
  const location = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51I6yKZFoEfCJMKi06ffp5jOsOF1OlTYE5SmrmhbllgDivVxcfy1KM4c0mLrZnJDCvhkt5q5fFHBbD2WyLtgoLbRc00XHKtQzIe"
  );

  const { title, price } = location.state;
  return (
    <span>
      <Elements stripe={stripePromise}>
        <PaymentForm token={token} price={price} title={title} />
      </Elements>
    </span>
  );
};

export default Payment;
