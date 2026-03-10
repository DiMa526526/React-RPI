import { CityOffer } from "./types/offer";

const APIRoute = {
  Offers: '/offers',
  Offer: '/offers',
  Comments: '/reviews',
  Login: '/login',
  Logout: '/logout',
};

const BACKEND_URL = 'http://localhost:5000';

const Settings = {
  rentOffersCount: 312,
} as const;

const AppRoute = {
  Main: "/",
  Login: "/login",
  Favorites: "/favorites",
  Offer: "/offer",
} as const;

const AuthorizationStatus = {
  Auth: "AUTH",
  NoAuth: "NO_AUTH",
  Unknown: "UNKNOWN",
};

const CITIES_LOCATION: CityOffer[] = [
  {
    name: "Paris",
    location: {
      latitude: 48.861904,
      longitude: 2.369178,
      zoom: 8,
    },
  },
  {
    name: "Cologne",
    location: {
      latitude: 50.925549,
      longitude: 6.958874,
      zoom: 8,
    },
  },
  {
    name: "Brussels",
    location: {
      latitude: 50.845206,
      longitude: 4.344161,
      zoom: 8,
    },
  },
  {
    name: "Amsterdam",
    location: {
      latitude: 52.365095,
      longitude: 4.874937,
      zoom: 8,
    },
  },
  {
    name: "Hamburg",
    location: {
      latitude: 53.550618,
      longitude: 9.941211,
      zoom: 8,
    },
  },
  {
    name: "Dusseldorf",
    location: {
      latitude: 51.21545,
      longitude: 6.844219,
      zoom: 8,
    },
  },
];

const SortOffersType = {
  Popular: "Popular",
  PriceToHigh: "Price: low to high",
  PriceToLow: "Price: high to low",
  TopRated: "Top rated first",
};

const TIMEOUT_SHOW_ERROR = 2000;

export {
  Settings,
  AppRoute,
  AuthorizationStatus,
  CITIES_LOCATION,
  SortOffersType,
  APIRoute,
  BACKEND_URL,
  TIMEOUT_SHOW_ERROR,
};
