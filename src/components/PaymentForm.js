import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = ({ token, title }) => {
  const [succeed, setSucceed] = useState(false);
  const [data, setData] = useState({});
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "tok_1HoX2PHSgw8vJOn1VrtrSBcs",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      // Requête vers notre serveur
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          title: "Le Titre de l'annonce",
          amount: 1000,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setSucceed(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div>
      {succeed ? (
        <p>Paiment validé !</p>
      ) : (
        <div className="paiement">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <p>Commande</p>
              <p>{data.product_price}</p>

              <p className="lastdetails">
                Il ne vous reste plus qu'un étape pour vous offrir
                {data.product_name}. Vous allez payer 3.89 € (frais de
                protection et frais de port inclus).
              </p>
            </div>
            <CardElement className="cardelement" />
            <button className="pay" type="submit">
              Pay
            </button>
          </form>
        </div>
      )}
    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { fromPublish: true },
      }}
    />
  );
};

export default PaymentForm;
