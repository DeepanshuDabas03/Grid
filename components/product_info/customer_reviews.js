import React from 'react';

const ProductReviews = ({ reviews }) => {
  return (
    <div className="product-reviews">
      <h2>Product Reviews</h2>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p className="review-rating">{review.rating} / 5</p>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
