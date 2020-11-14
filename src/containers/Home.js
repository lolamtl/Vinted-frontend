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
      <div className="container1">
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
      </div>
      <div className="home">
        {data.offers.map((offer, index) => {
          return (
            <Link className="card" to={`/product/${offer._id}`} key={offer._id}>
              <div className="avatar">
                <img
                  className="avatarimg"
                  alt="avatar"
                  src={offer.owner.account.avatar.url}
                />
                <p className="username">{offer.owner.account.username}</p>
              </div>
              <img
                className="product"
                alt="robe"
                src={offer.product_image.url}
              />
              <div className="pricedescription">
                <p>{offer.product_price} €</p>
                {offer.product_details.map((product, index) => {
                  return (
                    <div className="description" key={index}>
                      <p>{product.TAILLE}</p>
                      <p>{product.MARQUE}</p>
                    </div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
      ;
      <br />
    </div>
  );
};

export default Home;
