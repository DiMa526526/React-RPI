import { Logo } from "../../components/logo/logo";
import { FavoriteCardList } from "../../components/favorite-card-list/favorite-card-list";
import { offersList } from "../../mocks/offers-list";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/header";

function Favorites() {
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);

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
                  <FavoriteCardList offersList={favoriteOffers} />
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
