import { useEffect, useState } from "react";
import Image from "next/image";
import Papa from "papaparse";
import Cookies from "js-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Home() {
  const [userTopNData, setUserTopNData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [isloading1, setIsloading1] = useState(false); // Add isLoading state
  const [product_ids, setProduct_ids] = useState([]); // Add isLoading state
  const [relatedProducts, setRelatedProducts] = useState([]);


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
            let productLink = productInfo ? productInfo.product_url : "";
            return {
              ProductId,
              Rating,
              productName,
              productImage,
              productLink,
            };
          }
        );
        setIsLoading(false);
        setUserTopNData(userTopNWithProductInfo);
      })
      .catch((error) => console.error("Error fetching top_n.json:", error));
  }, []);
  async function newProduct(ProductId) {
    let productInfo = null;
    const response = await fetch("/ProductsList.csv");
    const csvText = await response.text();

    const parsedCSV = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
    }).data;
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
    let productLink = productInfo ? productInfo.product_url : "";
    console.log(productLink);
    const nn = productImage.split(",");
    productImage = nn[0];
    productImage = productImage.replace('"', "");
    productImage = productImage.replace('"', "");
    productImage = productImage.replace("[", "");

    return { ProductId, productName, productImage, productLink };
  }
  useEffect(() => {
    // Fetch recommended product IDs from recommendations.json
    setIsloading1(false);
    fetch("/recommendations.json")
      .then((response) => response.json())
      .then((data) => {
        const userId = 15; // Update with the actual userID
        const userRecommendations = data[userId] || [];
        const productIds = userRecommendations.map(
          (recommendation) => recommendation.ProductId
        );
        setProduct_ids(productIds);
      })
      .catch((error) =>
        console.error("Error fetching recommendations.json:", error)
      );
  }, []);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const Arr = [];
      for (const recommend_id of product_ids) {
        const Product = await newProduct(recommend_id);

        Arr.push(Product);
      }
      setRelatedProducts(Arr);
    };

    fetchRelatedProducts();
  }, [product_ids]);

  useEffect(() => {
    if (relatedProducts.length > 0) {
      setIsloading1(true);
    }
  }, [relatedProducts]);

  const settings = {
    centerMode: true,
  centerPadding: '90px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Auto-advance slides
    autoplaySpeed: 2000, // Time between slide transitions (in milliseconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,centerMode: true,
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
    <div className="bg-white text-black py-8 w-screen">
      <div className="m-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold rounded-3xl bg-yellow-300 text-black flex justify-center mt-8 mb-8">
          Top N Recommendations
        </h1>
        {isLoading ? (
          <Slider {...settings}>
            {userTopNData.map(
              ({
                ProductId,
                Rating,
                productName,
                productImage,
                productLink,
              }) => (
                <div key={ProductId} className="px-2">
                  <div className="bg-[#1D41FF] text-white mx-10 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg flex justify-center  font-semibold  mb-2">
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
                    <p className="font-bold flex justify-center  mt-2 ">
                      Rating: {Rating}
                    </p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <Link
                        href={{
                          pathname: "/product",
                          query: { id: ProductId },
                        }}
                        as={`/product?name=${productName} &id=${ProductId}`}
                      >
                        <button className="px-4 py-2 bg-gray-800  rounded hover:bg-gray-700">
                          View
                        </button>
                      </Link>
                      <Link href={productLink}>
                        <button className="px-4 py-2 bg-gray-800  rounded hover:bg-gray-700">
                          View on Flipkart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        ) : (
          <p className="">Loading...</p>
        )}
        <div>
          <h2 className="text-3xl rounded-3xl font-bold bg-yellow-300 text-black flex justify-center mt-8 mb-8">
            Top Picks For You
          </h2>
          {isloading1 ? (
            <Slider {...settings}>
              {relatedProducts.map(
                ({ ProductId, productName, productImage, productLink }) => (
                  <div key={ProductId} className="px-2">
                    <div className="bg-[#12665F] text-white mx-10 p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold flex justify-center mb-2">
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

                      <div className="mt-4 flex justify-center space-x-2">
                        <Link
                          href={{
                            pathname: "/product",
                          }}
                          as={`/product?name=${productName} &id=${ProductId}`}
                        >
                          <button className="px-4 py-2 bg-gray-800  rounded hover:bg-gray-700">
                            View
                          </button>
                        </Link>
                        <Link href={productLink}>
                          <button className="px-4 py-2 bg-gray-800  rounded hover:bg-gray-700">
                            View on Flipkart
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )}
            </Slider>
          ) : (
            <p className="">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
