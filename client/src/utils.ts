import { SortOffersType } from "./const";
import { CityOffer, OffersList } from "./types/offer";
import { SortOffer } from "./types/sort";

export function getCity(
  cityName: string,
  cities: CityOffer[]
): CityOffer | undefined {
  return cities.find((city) => city.name === cityName);
}

export const getOfferByCity = (
  offers: OffersList[],
  cityName: string
): OffersList[] => {
  return offers.filter((offer) => offer.city.name === cityName);
};

export function sortOffersByType(
  offers: OffersList[],
  type: SortOffer
): OffersList[] {
  const sorted = [...offers];
  switch (type) {
    case SortOffersType.PriceToHigh:
      return sorted.sort((a, b) => a.price - b.price);
    case SortOffersType.PriceToLow:
      return sorted.sort((a, b) => b.price - a.price);
    case SortOffersType.TopRated:
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export function formatReviewDate(dateStr: string): string {
  // Try parsing the date string to a Date; if it fails, return the original string
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    // try parse month-year like 'March 2024' -> Date should handle it, but if not, return original
    return dateStr;
  }
  // Format month and year in English: e.g., 'March 2024'
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}
