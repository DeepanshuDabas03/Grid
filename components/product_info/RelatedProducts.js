import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RelatedProducts = ({ relatedProducts }) => {
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
  relatedProducts.map((Product) => {
    console.log(Product);
  });
  console.log(relatedProducts);
  return (
    <div className="related-products">
      <h2 className="text-lg font-semibold mb-3">Related Products</h2>
      <Slider {...settings}>
        {relatedProducts.map((Product) => (
          <div key={Product.id} className="border p-4">
            <img src={Product.image} alt={Product.name} className="mb-2" />
            <h3 className="text-md font-semibold mb-1">{Product.name}</h3>
            <button className="bg-blue-500 text-white py-1 px-4 rounded mt-2">
              Add to Cart
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RelatedProducts;
