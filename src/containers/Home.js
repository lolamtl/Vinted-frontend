import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imgDéchirée from "../assets/déchirée-img.svg";
import vetements from "../assets/vetements.jpg";
import Loader from "react-loader-spinner";

const Home = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-back-end.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <Loader type="Puff" color="#00BFFF" height={100} width={100} />
  ) : (
    <div>
      <div className="container1">
        <img className="vetements" alt="vetements" src={vetements} />
        <img className="déchirée" alt="déchirée" src={imgDéchirée} />
        <p className="block">
          Prêts à faire du tri <br />
          dans vos placards ?
          <br />
          <Link className="startsale" to={token ? "/publish" : "/login"}>
            Commencer à vendre
          </Link>
        </p>
      </div>
      <div className="home">
        {data.offers.map((offer, index) => {
          return (
            <div key={index}>
              <Link
                className="card"
                to={`/product/${offer._id}`}
                key={offer._id}
              >
                <div className="avatar">
                  {offer.owner.account.avatar ? (
                    <img
                      className="avatarimg"
                      alt="avatar"
                      src={offer.owner.account.avatar.url}
                    />
                  ) : (
                    offer.owner.account.avatar
                  )}
                  <p className="username">{offer.owner.account.username}</p>
                </div>
                <img
                  className="product"
                  alt={offer.product_name}
                  src={offer.product_image.secure_url}
                />
                <div className="pricedescription">
                  <p>{offer.product_name}</p>
                  <p>{offer.product_price} €</p>
                  {offer.product_details.map((product, index) => {
                    return (
                      <div className="description" key={index}>
                        <p>{product[1]}</p>
                        <p>{product[0]}</p>
                      </div>
                    );
                  })}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <br />
    </div>
  );
};

export default Home;
