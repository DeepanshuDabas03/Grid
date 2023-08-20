import React, { useState } from 'react';

const ProductQuantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    // Implement your quantity change logic here
    setQuantity(newQuantity);
  };

  return (
    <div className="product-quantity">
      <h1>Quantity:</h1>
      <div className="quantity-controls">
        <button
          className="decrement-button"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button
          className="increment-button"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;
