import { useParams } from "react-router-dom";
import { useState } from "react";
import { FullOffer, OffersList } from "../../types/offer";
import { NotFound } from "../not-found/not-found";
import { Header } from "../../components/header/header";
import { ReviewForm } from "../../components/review-form/review-form";
import { ReviewList } from "../../components/reviews-list/reviews-list";
import { Review } from "../../types/review";
import Map from "../../components/map/map";
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";

type OfferProps = {
  offers: FullOffer[];
  offersList: OffersList[];
  reviewList: Review[];
};

function Offer({ offers, offersList, reviewList }: OfferProps) {
  const params = useParams();
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const offer = offers.find((item) => item.id === params.id);
  if (!offer) {
    return <NotFound />;
  }

  const nearOffers = offersList
    .filter(
      (item) => item.id !== offer.id && item.city.name === offer.city.name
    )
    .slice(0, 3);

  return (
    <div className="page">
      <Header offersList={offersList} />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Photo stidio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    offer.isFavorite ? "offer__bookmark-button--active" : ""
                  }`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${(offer.rating / 5) * 100}%` }}
                  ></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      offer.host.isPro ? "offer__avatar-wrapper--pro" : ""
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviewList} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              cityLocation={offer.location}
              offers={nearOffers}
              hoveredOfferId={hoveredOfferId}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <CitiesCardList
              offersList={nearOffers}
              wrapperClassName="near-places__list places__list"
              cardClassName="near-places__card"
              onCardHover={setHoveredOfferId}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export { Offer };
