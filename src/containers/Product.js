import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Product = ({ setUser }) => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <div className="productpage">
      <img
        className="productimage"
        alt="t-shirt"
        src={data.product_image.url}
      />
      <div className="productdescription">
        <div>
          <p className="price">{data.product_price} €</p>
          <div className="listproduct">
            {data.product_details.map((product, index) => {
              const keys = Object.keys(product);
              return (
                <ul className="detailslist">
                  <li className="keyproduct" key={index}>
                    {keys[0]}
                  </li>
                  <li className="namekey" key={index}>
                    {product[keys[0]]}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className="endcard">
          <p className="marquename">{data.product_name}</p>
          <p className="paragraphe">{data.product_description}</p>
          <div className="saler">
            {data.owner.account.avatar ? (
              <img
                className="avatarimage"
                alt="modemusthaves"
                src={data.owner.account.avatar.url}
              />
            ) : (
              data.owner.account.avatar
            )}
            <p className="surname">{data.owner.account.username}</p>
          </div>
        </div>
        <button
          onClick={() => {
            history.push("/payment", { title: data.title });
          }}
          className="buy"
        >
          Acheter
        </button>
      </div>
    </div>
  );
};

export default Product;
