import { useEffect, useState } from "react";
import Image from "next/image";
import Papa from "papaparse";
import Cookies from "js-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Home() {
  const [csvData, setCSVData] = useState([]);
  const [userTopNData, setUserTopNData] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  useEffect(() => {
    // Load and parse CSV data
    async function loadCSVData() {
      try {
        const response = await fetch("/OrderHistory.csv");
        const text = await response.text();
        setCSVData(
          Papa.parse(text, { header: true, dynamicTyping: true }).data
        );
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    }
    loadCSVData();
  }, []);
  useEffect(() => {
    setIsLoading(true);
  }, [userTopNData]);
  useEffect(() => {
    // Retrieve the userId from the cookie
    const userIdFromCookie = Cookies.get("myCookie");

    // Fetch data from the JSON file in the public folder
    fetch("/formatted_top_n.json")
      .then((response) => response.json())
      .then(async (data) => {
        // Filter data based on the userId
        const userTopN = data[userIdFromCookie] || [];

        // Fetch product information from ProductsList.csv based on ProductId
        const response = await fetch("/ProductsList.csv");
        const csvText = await response.text();

        const parsedCSV = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
        }).data;

        const userTopNWithProductInfo = userTopN.map(
          ({ ProductId, Rating }) => {
            let productInfo = null;

            // Find productInfo using ProductId in parsedCSV
            for (let i = 0; i < parsedCSV.length; i++) {
              if (parsedCSV[i].ProductId == ProductId) {
                productInfo = parsedCSV[i];
                break;
              }
            }
            const productName = productInfo
              ? productInfo.product_name
              : "Unknown Product";
            let productImage = productInfo ? productInfo.image : "";
            const nn = productImage.split(",");
            productImage = nn[0];
            productImage = productImage.replace('"', "");
            productImage = productImage.replace('"', "");
            productImage = productImage.replace("[", "");
            return { ProductId, Rating, productName, productImage };
          }
        );
        setIsLoading(false);
        setUserTopNData(userTopNWithProductInfo);
      })
      .catch((error) => console.error("Error fetching top_n.json:", error));
  }, []);

  async function getProductName(ProductId) {
    const product = csvData.find((item) => item.ProductId === ProductId);
    return product ? product.Product_name : "Unknown Product";
  }

  async function getProductInfo(ProductId) {
    const product = csvData.find((item) => item.ProductId === ProductId);
    if (product) {
      return `${product.Brand} - ${product.ProductName}`;
    } else {
      return "Unknown Brand - Unknown Product";
    }
  }
  async function fetchRecommendations(product_id) {
    try {
      const response = await fetch("http://127.0.0.1:9010/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product_id }),
      });

      const data = await response.json();
      setRecommendedProducts(data); // Update the recommended products state
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, // Auto-advance slides
    autoplaySpeed: 2000, // Time between slide transitions (in milliseconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Top N Recommendations
        </h1>
        {isLoading ? (
          <Slider {...settings}>
            {userTopNData.map(
              ({ ProductId, Rating, productName, productImage }) => (
                <div key={ProductId} className="px-2">
                  <div className="bg-blue-900 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {productName}{" "}
                    </h3>
                    <Image
                      src={productImage}
                      alt={productName}
                      className="mb-2"
                      width={500}
                      height={500}
                      style={{ maxHeight: "150px", objectFit: "cover" }}
                    />
                    <p className="font-bold mt-2 text-white">
                      Rating: {Rating}
                    </p>
                    <div className="mt-4 space-x-2">
                      <Link
                        href={{
                          pathname: "/product",
                        }}
                        as={`/product?name=${productName} &id=${ProductId}`}
                      >
                        <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                          View
                        </button>
                      </Link>

                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                        // onClick={() => fetchRecommendations(ProductId)} // Call fetchRecommendations on button click
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        ) : (
          <p className="text-white">Loading...</p>
        )}
        <div>
          <h2>Recommended Products:</h2>
          <ul>
            {recommendedProducts.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
