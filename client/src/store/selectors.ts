import { createSelector } from 'reselect';
import { State } from '../types/state';
import { AuthorizationStatusType } from '../types/authorization-status';

export const selectFavoriteOffers = createSelector(
  (state: State) => state.offers,
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const getAuthorizationStatus = (state: State): AuthorizationStatusType =>
 state.authorizationStatus;

export const selectOffer = (state: State) => state.offer;

export const selectComments = (state: State) => state.comments;

export const selectIsOfferLoading = (state: State) => state.isOfferLoading;

export const selectIsOfferNotFound = (state: State) => state.isOfferNotFound;
