import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { OffersList, FullOffer } from '../types/offer.js';
import {offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {AuthData, UserData} from '../types/user-data';
import { setUserData } from './action';
import { Review } from '../types/review';
import { setOfferLoadingStatus, setOfferNotFound } from './action';

const fetchOffersAction = createAsyncThunk<void, undefined, {
 dispatch: AppDispatch;
 state: State;
 extra: AxiosInstance;
}>(
 'data/fetchOffers',
 async (_arg, {dispatch, extra: api}) => {
   dispatch(setOffersDataLoadingStatus(true));
   const {data} = await api.get<OffersList[]>(APIRoute.Offers);
   dispatch(setOffersDataLoadingStatus(false));
   dispatch(offersCityList(data));
 },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'user/checkAuth',
   async (_arg, {dispatch, extra: api}) => {
     const token = localStorage.getItem('rent-service-token');

     if (!token) {
       dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
       return;
     }

     try {
       const { data } = await api.get<UserData>(APIRoute.Login);
       dispatch(requireAuthorization(AuthorizationStatus.Auth));
       dispatch(setUserData(data)); // Dispatch action to update userData
     } catch {
       dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
     }
   },
 );

const loginAction = createAsyncThunk<
  UserData,       
  AuthData,       
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<{ token: string }>(APIRoute.Login, { email, password });
      saveToken(data.token);
      const { data: userData } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(userData));
      return userData;
    } catch (err) {
      console.error('Login error:', err);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      return rejectWithValue('Login failed');
    }
  }
);


const logoutAction = createAsyncThunk<void, undefined, {
 dispatch: AppDispatch;
 state: State;
 extra: AxiosInstance;
}>(
 'user/logout',
 async (_arg, {dispatch, extra: api}) => {
   await api.delete(APIRoute.Logout);
   dropToken();
   dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
 },
);

const clearErrorAction = createAsyncThunk(
   'clearError',
   (_, { dispatch }) => {
     setTimeout(
       () => dispatch(setError(null)),
       TIMEOUT_SHOW_ERROR,
     );
   },
 );

const fetchOfferAction = createAsyncThunk<FullOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(true));
    dispatch(setOfferNotFound(false));
    try {
      const { data } = await api.get<FullOffer>(`${APIRoute.Offer}/${offerId}`);
      dispatch(setOfferLoadingStatus(false));
      return data;
    } catch (error) {
      dispatch(setOfferLoadingStatus(false));
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 404) {
        dispatch(setOfferNotFound(true));
      }
      throw error;
    }
  },
);

const fetchCommentsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);

const addReviewAction = createAsyncThunk<Review, { offerId: string; review: string; rating: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ offerId, review, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, { comment: review, rating });
    // После добавления, обновить комментарии
    dispatch(fetchCommentsAction(offerId));
    return data;
  },
);

const toggleFavoriteAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/toggleFavorite',
  async (offerId, { dispatch, extra: api, getState }) => {
    const state = getState() as State;
    const offer = state.offers.find((o) => o.id === offerId);
    const status = offer && offer.isFavorite ? 0 : 1;

    await api.post(`${APIRoute.Offers}/favorite/${offerId}/${status}`);
    // After changing, refresh offers
    dispatch(fetchOffersAction());
  },
);

export {fetchOffersAction, fetchOfferAction, fetchCommentsAction, addReviewAction, toggleFavoriteAction, checkAuthAction, loginAction, logoutAction, clearErrorAction}
