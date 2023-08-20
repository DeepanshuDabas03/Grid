import React, { useState } from 'react';

const ProductImages = ({ images }) => {

  return (
    <div className="product-images">
      <img
        src={images}
        alt="Product"
        className="product-image"
      />
    </div>
  );
};

export default ProductImages;
