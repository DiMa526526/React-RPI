import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import { Header } from "../../components/header/header";
import Map from "../../components/map/map";
import { useState, useMemo } from "react";
import { useAppSelector } from "../../hooks";
import { CitiesList } from "../../components/cities-list/cities-list";
import { CITIES_LOCATION } from "../../const";

function MainPage(): React.JSX.Element {
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  const selectedCity = useAppSelector((state) => state.city);
  const safeCity =
    selectedCity || CITIES_LOCATION.find((c) => c.name === "Paris")!;
  const allOffers = useAppSelector((state) => state.offers);

  const cityOffers = useMemo(() => {
    return allOffers.filter((offer) => offer.city.name === safeCity.name);
  }, [allOffers, safeCity.name]);

  const rentalOffersCount = cityOffers.length;

  return (
    <div className="page page--gray page--main">
      <Header offersList={cityOffers} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList selectedCity={safeCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {rentalOffersCount} places to stay in {safeCity.name}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                  onClick={() => setIsSortingOpen((v) => !v)}
                  role="button"
                  aria-expanded={isSortingOpen}
                >
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use href="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul
                  className={`places__options places__options--custom ${
                    isSortingOpen ? "places__options--opened" : ""
                  }`}
                  hidden={!isSortingOpen}
                >
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CitiesCardList
                  offersList={cityOffers}
                  onCardHover={setHoveredOfferId}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  cityLocation={safeCity.location}
                  offers={cityOffers}
                  hoveredOfferId={hoveredOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainPage };
