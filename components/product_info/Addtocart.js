import React from "react";
import Link from "next/link";
const AddToCartButton = ({productLink}) => {
  console.log(productLink);
  return (
    <Link href={productLink}>
      <button className="add-to-cart-button">View On Flipkart</button>
    </Link>
  );
};

export default AddToCartButton;
