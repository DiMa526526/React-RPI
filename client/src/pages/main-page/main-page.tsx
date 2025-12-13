import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import { Header } from "../../components/header/header";
import Map from "../../components/map/map";
import { useState, useMemo } from "react";
import { useAppSelector } from "../../hooks";
import { CitiesList } from "../../components/cities-list/cities-list";
import { CITIES_LOCATION, SortOffersType } from "../../const";
import { SortOptions } from "../../components/sort-options/sort-options";
import { SortOffer } from "../../types/sort";
import { sortOffersByType } from "../../utils";

function MainPage(): React.JSX.Element {
  const [activeSort, setActiveSort] = useState<SortOffer>(
    SortOffersType.Popular
  );
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  const selectedCity = useAppSelector((state) => state.city);
  const safeCity =
    selectedCity || CITIES_LOCATION.find((c) => c.name === "Paris")!;
  const allOffers = useAppSelector((state) => state.offers);

  const cityOffers = useMemo(() => {
    return allOffers.filter((offer) => offer.city.name === safeCity.name);
  }, [allOffers, safeCity.name]);

  const sortedCityOffers = useMemo(
    () => sortOffersByType(cityOffers, activeSort),
    [cityOffers, activeSort]
  );

  const rentalOffersCount = sortedCityOffers.length;

  return (
    <div className="page page--gray page--main">
      <Header offersList={sortedCityOffers} />

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
              <SortOptions
                activeSorting={activeSort}
                onChange={(newSorting) => setActiveSort(newSorting)}
              />
              <div className="cities__places-list places__list tabs__content">
                <CitiesCardList
                  offersList={sortedCityOffers}
                  onCardHover={setHoveredOfferId}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  cityLocation={safeCity.location}
                  offers={sortedCityOffers}
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
