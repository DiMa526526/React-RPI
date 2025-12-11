import { CityOffer, OffersList } from "./types/offer";

export function getCity(
  cityName: string,
  cities: CityOffer[]
): CityOffer | undefined {
  return cities.find(city => city.name === cityName);
}

export const getOfferByCity = (
  offers: OffersList[],
  cityName: string
): OffersList[] => {
  return offers.filter(offer => offer.city.name === cityName);
}