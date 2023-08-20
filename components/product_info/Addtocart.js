import React from "react";
import Link from "next/link";
const AddToCartButton = ({productLink}) => {
  console.log(productLink);
  return (
    <Link href={productLink}>
      <button className="rounded-3xl text-white p-5 bg-black ">View On Flipkart</button>
    </Link>
  );
};

export default AddToCartButton;
