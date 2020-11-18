import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = ({ token }) => {
  const location = useLocation();
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
