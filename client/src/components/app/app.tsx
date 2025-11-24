import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { MainPage } from "../../pages/main-page/main-page";
import { Login } from "../../pages/login/login";
import { Favorites } from "../../pages/favorites/favorites";
import { Offer } from "../../pages/offer/offer";
import { NotFound } from "../../pages/not-found/not-found";
import { PrivateRoute } from "../private-route/private-route";
import { offersList } from "../../mocks/offers-list";
import { offers } from "../../mocks/offers";

type AppMainPageProps = {
  rentalOffersCount: number;
};

function App({ rentalOffersCount }: AppMainPageProps): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              rentalOffersCount={rentalOffersCount}
              offersList={offersList}
            />
          }
        />

        <Route path={AppRoute.Login} element={<Login />} />

        <Route path={AppRoute.Favorites} element={<Favorites />} />

        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Offer offers={offers} offersList={offersList} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
