import { createReducer } from "@reduxjs/toolkit";
import { AuthorizationStatus, CITIES_LOCATION } from "../const";
import { getCity } from "../utils";
import { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData, setOffer, setComments, setOfferLoadingStatus, setOfferNotFound } from "./action";
import type { AuthorizationStatusType } from "../types/authorization-status"; 
import type { OffersList, CityOffer, FullOffer } from "../types/offer";
import type { UserData } from '../types/user-data';
import { PayloadAction } from '@reduxjs/toolkit';
import { Review } from "../types/review";

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
    city: CityOffer | undefined;
    offers: OffersList[];
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    isOffersDataLoading: boolean;
    userData: UserData | null; // Added userData field
    offer: FullOffer | null;
    comments: Review[];
    isOfferLoading: boolean;
    isOfferNotFound: boolean;
}

const initialState: InitialState = {
    city: defaultCity,
    offers: [],
    authorizationStatus: AuthorizationStatus.Unknown,
    error: null,
    isOffersDataLoading: false,
    userData: null, // Initialize userData as null
    offer: null,
    comments: [],
    isOfferLoading: false,
    isOfferNotFound: false,
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(offersCityList, (state, action) => {
            state.offers = action.payload;
        })
        .addCase(requireAuthorization, (state, action) => {
            state.authorizationStatus = action.payload;
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(setOffersDataLoadingStatus, (state, action) => {
            state.isOffersDataLoading = action.payload;
        })
        .addCase(setUserData, (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload; // Handle userData updates
        })
        .addCase(setOffer, (state, action: PayloadAction<FullOffer>) => {
            state.offer = action.payload;
        })
        .addCase(setComments, (state, action: PayloadAction<Review[]>) => {
            state.comments = action.payload;
        })
        .addCase(setOfferLoadingStatus, (state, action: PayloadAction<boolean>) => {
            state.isOfferLoading = action.payload;
        })
        .addCase(setOfferNotFound, (state, action: PayloadAction<boolean>) => {
            state.isOfferNotFound = action.payload;
        })
        .addMatcher(
            (action) => action.type === 'data/fetchOffer/fulfilled',
            (state, action: PayloadAction<FullOffer>) => {
                state.offer = action.payload;
            }
        )
        .addMatcher(
            (action) => action.type === 'data/fetchComments/fulfilled',
            (state, action: PayloadAction<Review[]>) => {
                state.comments = action.payload;
            }
        );
});

export {reducer}