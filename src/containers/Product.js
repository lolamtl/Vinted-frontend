import React from "react";
import Header from "../components/Header";

const Product = ({ product }) => {
  return (
    <div>
      <Header />
      <div>
        {product.map((product, index) => {
          return <div>{product.title}</div>;
        })}
      </div>
    </div>
  );
};

export default Product;
