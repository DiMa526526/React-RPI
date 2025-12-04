import React from "react";
import { Review } from "../../types/review";
import { ReviewItem } from "../reviews-item/reviews-item";

type ReviewListProps = {
  reviews: Review[];
};

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{" "}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
};
