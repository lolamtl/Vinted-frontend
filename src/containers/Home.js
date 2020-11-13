import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imgDéchirée from "../assets/déchirée-img.svg";
import vetements from "../assets/vetements.jpg";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <div>
      <img className="vetements" alt="vetements" src={vetements} />
      <img className="déchirée" alt="déchirée" src={imgDéchirée} />
      <p className="block">
        Prêts à faire du tri <br />
        dans vos placards ?
        <br />
        <Link className="startsale" to="/login">
          Commencer à vendre
        </Link>
      </p>
      {data.offers.map((offer, index) => {
        return (
          <Link to={`/product/${offer._id}`} key={offer._id}>
            <p>{offer.owner.account.username}</p>
            <img alt="robe" src={offer.product_image.url} />
            <p>{offer.product_price} €</p>
            {offer.product_details.map((product, index) => {
              return (
                <div key={index}>
                  <p>{product.TAILLE}</p>
                  <p>{product.MARQUE}</p>
                </div>
              );
            })}
          </Link>
        );
      })}
      <br />
    </div>
  );
};

export default Home;
