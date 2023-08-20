import React from "react";

const ProductInformation = ({ name, description, price, rating }) => {
  return (
    <div className="product-info">
      <h1 className="product-name">{name}</h1>
      <p className="product-description flex justify-center text-xl">{description}</p>

      {/* Add review components */}
    </div>
  );
};

export default ProductInformation;
