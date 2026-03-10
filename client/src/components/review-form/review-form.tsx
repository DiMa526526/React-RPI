import { useState } from "react";
import { Review } from "../../types/review";
import { useAppDispatch } from "../../hooks";
import { addReviewAction } from "../../store/api-action";

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    rating: 0,
    review: "",
  });
  const [errors, setErrors] = useState<{ rating?: string; review?: string }>({});

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = formData.review.trim();
    const newErrors: { rating?: string; review?: string } = {};

    if (formData.rating === 0) {
      newErrors.rating = "Please set a rating.";
    }
    if (text.length < 50) {
      newErrors.review = "Describe your stay with at least 50 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(addReviewAction({ offerId, review: text, rating: formData.rating }));
        setFormData({ rating: 0, review: "" });
        setErrors({});
      } catch (error) {
        console.error('Failed to add review:', error);
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, review: e.target.value });
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((rating) => {
          const isActive = rating <= formData.rating;
          const starSrc = isActive ? "/img/star-active.svg" : "/img/star.svg";

          return (
            <div key={rating}>
              <input
                checked={formData.rating === rating}
                className="form__rating-input visually-hidden"
                name="rating"
                value={rating}
                id={`${rating}-stars`}
                type="radio"
                readOnly
              />
              <label
                htmlFor={`${rating}-stars`}
                className="reviews__rating-label form__rating-label"
                title={
                  ["", "terribly", "badly", "not bad", "good", "perfect"][
                    rating
                  ]
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleRatingChange(rating);
                }}
              >
                <img
                  className="form__star-image"
                  src={starSrc}
                  width="37"
                  height="33"
                  alt={`${rating} stars`}
                  style={{ pointerEvents: "none" }}
                />
              </label>
            </div>
          );
        })}
      </div>
      {errors.rating && <p style={{ color: 'red' }}>{errors.rating}</p>}
      <textarea
        value={formData.review}
        onChange={handleTextareaChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      {errors.review && <p style={{ color: 'red' }}>{errors.review}</p>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{" "}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export { ReviewForm };
