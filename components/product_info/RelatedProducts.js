import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";

const RelatedProducts = ({ relatedProducts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    center:true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
    <div className="related-products">
      <h2 className="text-4xl flex justify-center  font-semibold mb-3">Related Products</h2>
      <Slider {...settings} className="bg-[#390449]  mx-10 rounded-xl">
        {relatedProducts.map((Product) => (
          <div key={Product.id} className="recommend">
            <div className="image-container pt-5">
              <Image
                src={Product.images}
                alt={Product.name}
                width={200}
                height={200}
              />
            </div>
            <Link
              href={Product.productLink}
            >
              <div className="recommendation">
                <h4 className="text-md text-white pt-10 flex justify-center font-semibold mb-1">{Product.name} </h4>
              </div>
            </Link>
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .image-container {
          width: 200px;
          height: 200px;
          object-fit: contain;
          
          
          margin-left: auto;
          margin-right: auto;
          margin-top: auto;
          margin-bottom: auto;
          
          // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default RelatedProducts;
