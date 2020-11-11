import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = ({ data, product, setProduct }) => {
  return (
    <div>
      <Header />
      <Link to="/product">
        {data.offers.map((offer) => {
          return (
            <div
              key={offer._id}
              onClick={() => {
                const newProducts = [...product];
                newProducts.push({
                  title: offer.owner.account.username,
                  price: offer.product_price,
                });
                setProduct(newProducts);
              }}
            >
              <p>{offer.owner.account.username}</p>
              {offer.product_pictures.map((picture, index) => {
                return (
                  <div key={index}>
                    <img alt="robe" src={picture.url} />
                  </div>
                );
              })}
              <p>{offer.product_price} €</p>
              {offer.product_details.map((product) => {
                return (
                  <div key={product.EMPLACEMENT}>
                    <p>{product.TAILLE}</p>
                    <p>{product.MARQUE}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Link>

      {/* {data.map((element, index) => {
        return (key = { index } data = { element });
      })} */}
      <br />
    </div>
  );
};

export default Home;
