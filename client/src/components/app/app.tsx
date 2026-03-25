import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { MainPage } from "../../pages/main-page/main-page";
import { Login } from "../../pages/login/login";
import { Favorites } from "../../pages/favorites/favorites";
import { Offer } from "../../pages/offer/offer";
import { NotFound } from "../../pages/not-found/not-found";
import { PrivateRoute } from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import { LoadingPage } from "../../pages/loading-page/LoadingPage"

function App(): React.JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <LoadingPage />;
}
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />

        <Route path={AppRoute.Login} element={<Login />} />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Offer />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
