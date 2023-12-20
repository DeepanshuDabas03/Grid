import React from "react";
import NavBar from "../../components/Header";
import Footer from "../../components/Footer";
import ProductImages from "../../components/product_info/ProductImages";
import ProductInformation from "../../components/product_info/ProductInfo";
import AddToCartButton from "../../components/product_info/Addtocart";
import RelatedProducts from "../../components/product_info/RelatedProducts";

const links = [
  { url: "/about", text: "About" },
  { url: "/contact", text: "Contact" },
  { url: "/terms", text: "Terms of Service" },
];

const companyInfo = "Copyright © 2023 Snatkart";

const ProductsPage = ({ product }) => {
  return (
    <div className="">
      <NavBar />
      <div className="product-page">
        {product && product.images && <ProductImages images={product.images} />}
        <div className="product-details">
          {product && product.name && product.description && <ProductInformation name={product.name} description={product.description} />}
          {product && product.productLink && <AddToCartButton productLink={product.productLink} />}
        </div>
      </div>
      {product && product.relatedProducts && <RelatedProducts relatedProducts={product.relatedProducts} />}
      <Footer links={links} companyInfo={companyInfo} />
    </div>
  );
};

export default ProductsPage;
