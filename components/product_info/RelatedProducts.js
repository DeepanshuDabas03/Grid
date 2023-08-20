import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const RelatedProducts = ({ relatedProducts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
      <h2 className="text-lg font-semibold mb-3">Related Products</h2>
      <Slider {...settings}>
        {relatedProducts.map((Product) => (
          <div key={Product.id} className="border p-4">
            <div className="image-container">
              <Image src={Product.images} alt={Product.name} width={200} height={200}  layout="responsive" />
            </div>
            <h3 className="text-md font-semibold mb-1">{Product.name}</h3>
            <button className="bg-blue-500 text-white py-1 px-4 rounded mt-2">
              Add to Cart
            </button>
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .image-container {
          width: 200px;
          height: 200px;
          object-fit: contain;
          background-color: white;
          border: 1px solid #ccc;
          margin-left: auto;
          margin-right: auto;
          margin-top:auto;
          margin-bottom:auto;
          borderRadius: '25%',
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default RelatedProducts;
