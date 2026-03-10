import { createAction } from "@reduxjs/toolkit";
import { CityOffer, OffersList, FullOffer } from "../types/offer";
import { AuthorizationStatusType } from "../types/authorization-status";
import type { UserData } from "../types/user-data";
import { Review } from "../types/review";

const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({payload: city}));

const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({payload: offers}));

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

const setError = createAction('setError', (error: string | null) => ({
    payload: error
}));

const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setUserData = createAction<UserData>('user/setUserData');

const setOffer = createAction<FullOffer>('offer/setOffer');

const setComments = createAction<Review[]>('offer/setComments');

const setOfferLoadingStatus = createAction<boolean>('offer/setOfferLoadingStatus');

const setOfferNotFound = createAction<boolean>('offer/setOfferNotFound');

export { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setOffer, setComments, setOfferLoadingStatus, setOfferNotFound };