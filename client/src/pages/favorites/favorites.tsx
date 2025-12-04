// pages/favorites.tsx
import { Logo } from "../../components/logo/logo";
import { offersList } from "../../mocks/offers-list";
import { Header } from "../../components/header/header";
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";

function Favorites() {
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);

  if (favoriteOffers.length === 0) {
    return (
      <div className="page">
        <Header offersList={offersList} />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <p>No favorites yet.</p>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header offersList={offersList} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <CitiesCardList
                    offersList={favoriteOffers}
                    wrapperClassName="favorites__places"
                    cardClassName="favorites__card"
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="Rent service logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export { Favorites };
