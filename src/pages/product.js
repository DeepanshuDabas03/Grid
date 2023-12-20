import React, { useState, useEffect } from "react";
import ProductPage from "./productpage";
import { useRouter } from "next/router";
import Papa from "papaparse";
const LoadingIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <p>Loading...</p>
    </div>
  );
};
const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [val, setVal] = useState(null);
  async function recProduct(ProductId) {
    const response = await fetch("ProductsList.csv");
    const csvText = await response.text();
    const parsedCSV = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
    }).data;
    let productInfo = null;

    for (let i = 0; i < parsedCSV.length; i++) {
      if (parsedCSV[i].ProductId == ProductId) {
        productInfo = parsedCSV[i];
        break;
      }
    }
    const name = productInfo ? productInfo.product_name : "Unknown Product";
    let images = productInfo ? productInfo.image : "";
    let description = productInfo ? productInfo.description : "";
    const nn = images.split(",");
    images = nn[0];
    images = images.replace('"', "");
    images = images.replace('"', "");
    images = images.replace("[", "");
    let productLink = productInfo ? productInfo.product_url : "";
    const id = ProductId;
    return { id, name, images, description ,productLink};
  }

  async function fetchRecommendations(ProductId) {
    try {
      const response = await fetch('/api/predict', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: ProductId }),
      });

      const recommend_id = await response.json();
      setRecommendedProducts(recommend_id); // Update the recommended products state
    } catch (error) {
      console.log("Error fetching recommendations:", error);
    }
  }

  async function getProduct(ProductId) {
    const response = await fetch("ProductsList.csv");
    const csvText = await response.text();
    const parsedCSV = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
    }).data;
    let productInfo = null;

    for (let i = 0; i < parsedCSV.length; i++) {
      if (parsedCSV[i].ProductId == ProductId) {
        productInfo = parsedCSV[i];
        break;
      }
    }
    const name = productInfo ? productInfo.product_name : "Unknown Product";
    let images = productInfo ? productInfo.image : "";
    let description = productInfo ? productInfo.description : "";
    let productLink = productInfo ? productInfo.product_url : "";
    const nn = images.split(",");
    images = nn[0];
    images = images.replace('"', "");
    images = images.replace('"', "");
    images = images.replace("[", "");
    await fetchRecommendations(ProductId);

    return { ProductId, name, images, description ,productLink};
  }
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const Arr = [];
      for (const recommend_id of recommendedProducts) {
        const Product = await recProduct(recommend_id);
        Arr.push(Product);
      }
      setRelatedProducts(Arr);
    };

    fetchRelatedProducts();
  }, [recommendedProducts]);
  useEffect(() => {
    if (relatedProducts.length > 0) {
      setIsLoading(true);
    }
  }, [relatedProducts]);
  useEffect(() => {
    if (isLoading && val) {
      setProduct({
        ProductId: val.id,
        name: val.name,
        images: val.images,
        description: val.description,
        productLink:val.productLink,
        relatedProducts,
      });
    }
  }, [isLoading]);
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const v = await getProduct(id); // Await the promise resolution
        setVal(v);
      }
    };
    if(id)
    fetchProduct();
  }, [id]);
  if (!product) {
    return <LoadingIndicator />;
  }

  return <ProductPage product={product} />;
};

export default Product;
