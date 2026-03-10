import { Header } from "../../components/header/header";
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectFavoriteOffers } from '../../store/selectors';
import { toggleFavoriteAction } from '../../store/api-action';

function Favorites() {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavoriteAction(id));
  };

  const offersByCity = favoriteOffers.reduce((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, typeof favoriteOffers>);

  const cities = Object.keys(offersByCity);

  if (favoriteOffers.length === 0) {
    return (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
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

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((cityName) => (
                <li key={cityName} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{cityName}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <CitiesCardList
                      offersList={offersByCity[cityName]}
                      wrapperClassName="favorites__places"
                      cardClassName="favorites__card"
                      onCardHover={() => {}}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </div>
                </li>
              ))}
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