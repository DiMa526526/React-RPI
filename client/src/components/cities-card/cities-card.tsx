import { Link } from "react-router-dom";
import { BACKEND_URL, AuthorizationStatus } from '../../const';
import { OffersList } from "../../types/offer";
import { useAppSelector } from "../../hooks";
import { getAuthorizationStatus } from "../../store/selectors";

type CitiesCardProps = OffersList & {
  cardClassName?: string;
  onCardHover?: (id: string | null) => void;
  isFavorite?: boolean; 
  onToggleFavorite?: (id: string) => void;
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
  onToggleFavorite,
}: CitiesCardProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
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

  const isFavoritesCard = cardClassName === 'favorites__card';
  const imageWidth = isFavoritesCard ? '150px' : '260px';
  const imageHeight = isFavoritesCard ? '110px' : '200px';

  const handleMouseEnter = () => {
    onCardHover?.(id);
  };

  const handleMouseLeave = () => {
    onCardHover?.(null);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(id);
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
              backgroundImage: `url(${previewImage && previewImage.startsWith('/static') ? `${BACKEND_URL}${previewImage}` : previewImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: imageWidth,
              height: imageHeight,
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
          {authorizationStatus === AuthorizationStatus.Auth && (
            <button
              className={`place-card__bookmark-button button ${
                isFavorite ? "place-card__bookmark-button--active" : ""
              }`}
              type="button"
              onClick={handleToggleFavorite}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use href="/img/sprite.svg#icon-bookmark" style={isFavorite ? {stroke: '#4481c3', fill: '#4481c3'} : {}}></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          )}
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
