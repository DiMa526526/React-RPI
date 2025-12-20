import { Link } from "react-router-dom";
import { OffersList } from "../../types/offer";

type CitiesCardProps = OffersList & {
  cardClassName?: string;
  onCardHover?: (id: string | null) => void;
  isFavorite?: boolean; 
};

export function CitiesCard({
  id,
  title,
  type,
  price,
  previewImage,
  isPremium,
  isFavorite,
  rating,
  cardClassName = "cities__card",
  onCardHover,
}: CitiesCardProps) {
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

  const handleMouseEnter = () => {
    onCardHover?.(id);
  };

  const handleMouseLeave = () => {
    onCardHover?.(null);
  };


  return (
    <article
      className={`${cardClassName} place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <div 
            className="place-card__image"
            style={{
              backgroundImage: `url(${previewImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '150px',
              height: '200px',
            }}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use href="/img/sprite.svg#icon-bookmark" style={isFavorite ? {stroke: '#4481c3', fill: '#4481c3'} : {}}></use>
          </svg>
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
