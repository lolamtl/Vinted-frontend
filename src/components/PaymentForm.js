import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = ({ token, title, price }) => {
  const [succeed, setSucceed] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        // name: "5faea64473d23200179af0fb",
        name: "L'id de l'acheteur",
      });

      const response = await axios.post(
        "https://vinted-back-end.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: title,
          amount: price,
        }
      );
      if (response.data.status === "succeeded") {
        setSucceed(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div>
      {succeed ? (
        <div>
          <h1>Bientôt chez vous !</h1>
          <p>
            Paiement validé ! Votre produit sera expédié sous 48h après
            confirmation par le vendeur de votre commande.
          </p>
        </div>
      ) : (
        <div className="paiement">
          <form className="form" onSubmit={handleSubmit}>
            <p className="resume">Résumé de la Commande</p>
            <div>
              <div className="frais">
                <div className="commande">
                  <p>Commande</p>
                  <p>{price} €</p>
                </div>
                <div className="commande">
                  <p>Frais protection acheteurs </p>
                  <p>1.00€</p>
                </div>
                <div className="commande">
                  <p>Frais de port </p>
                  <p>2.00€</p>
                </div>
              </div>
              <span className="transaction">
                <div className="commande">
                  <p>Total</p>
                  <p>{price + 3} €</p>
                </div>
                <p className="lastdetails">
                  Il ne vous reste plus qu'une étape pour vous offrir {title}.
                  Vous allez payer {price + 3} € (frais de protection et frais
                  de port inclus).
                </p>
              </span>
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
