import { useState } from "react";
import { Link } from "react-router-dom";
import { OffersList } from "../../types/offer";

type CitiesCardProps = Omit<OffersList, "city" | "location"> & {
  cardClassName?: string;
};

export function CitiesCard({
  id,
  title,
  type,
  price,
  previewImage,
  isPremium,
  rating,
  cardClassName = "cities__card",
}: CitiesCardProps) {
  const [, setOfferId] = useState<string>("");

  const displayType =
    type === "apartment"
      ? "Apartment"
      : type === "room"
      ? "Private room"
      : "House";

  const imageWrapperClassName = cardClassName.replace(
    "__card",
    "__image-wrapper"
  );

  return (
    <article
      className={`${cardClassName} place-card`}
      onMouseOver={() => setOfferId(id)}
      onMouseOut={() => setOfferId("")}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating: {rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{displayType}</p>
      </div>
    </article>
  );
}
