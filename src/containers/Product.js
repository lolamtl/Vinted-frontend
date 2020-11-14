import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        <p>{data.product_price} €</p>
        {data.product_details.map((product, index) => {
          const keys = Object.keys(product);
          return (
            <p key={index}>
              {keys[0]} {product[keys[0]]}
            </p>
          );
        })}
        <p>{data.product_name}</p>
        <p>{data.product_description}</p>
        <img
          className="avatarimage"
          alt="modemusthaves"
          src={data.owner.account.avatar.url}
        />
        <p>{data.owner.account.username}</p>
        <button>Acheter</button>
      </div>
    </div>
  );
};

export default Product;
