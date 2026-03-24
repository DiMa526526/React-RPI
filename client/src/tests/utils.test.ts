import { describe, it, expect } from 'vitest';
import { getOfferByCity, sortOffersByType, getCity, formatReviewDate } from '../utils';
import { makeFakeOffer } from './mocks';
import { SortOffersType, CITIES_LOCATION } from '../const';


describe('getOffersByCity', () => {
  it('возвращает только объявления указанного города', () => {
    const paris = CITIES_LOCATION[0];
    const cologne = CITIES_LOCATION[1];
    const parisOffer = { ...makeFakeOffer(), city: paris };
    const cologneOffer = { ...makeFakeOffer(), city: cologne };


    const result = getOfferByCity([parisOffer, cologneOffer], 'Paris');


    expect(result).toHaveLength(1);
    expect(result[0].city.name).toBe('Paris');
  });


  it('возвращает пустой массив, если город не найден', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];
    expect(getOfferByCity(offers, 'Tokyo')).toHaveLength(0);
  });


  it('возвращает пустой массив при пустом списке предложений', () => {
    expect(getOfferByCity([], 'Paris')).toEqual([]);
  });
});
describe('sortOffersByType', () => {
  it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];


    const result = sortOffersByType([...offers], SortOffersType.PriceToHigh);


    expect(result[0].price).toBe(100);
    expect(result[2].price).toBe(300);
  });


  it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 300 },
    ];


    const result = sortOffersByType([...offers], SortOffersType.PriceToLow);


    expect(result[0].price).toBe(300);
  });


  it('сортирует по рейтингу (Popular)', () => {
    const offers = [
      { ...makeFakeOffer(), rating: 3 },
      { ...makeFakeOffer(), rating: 5 },
      { ...makeFakeOffer(), rating: 4 },
    ];


    const result = sortOffersByType([...offers], SortOffersType.Popular);


    expect(result[0].rating).toBe(5);
  });


  it('не изменяет исходный массив', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];


    const copy = [...offers];


    sortOffersByType(offers, SortOffersType.PriceToHigh);


    expect(offers).toEqual(copy);
  });

  it('возвращает пустой массив при пустом входе', () => {
    const result = sortOffersByType([], SortOffersType.Popular);
    expect(result).toEqual([]);
  });
});

describe('getCity', () => {
  it('возвращает город по имени', () => {
    const result = getCity('Paris', CITIES_LOCATION);
    expect(result).toBeDefined();
    expect(result?.name).toBe('Paris');
  });

  it('возвращает undefined, если город не найден', () => {
    const result = getCity('Tokyo', CITIES_LOCATION);
    expect(result).toBeUndefined();
  });
});

describe('formatReviewDate', () => {
  it('форматирует дату корректно', () => {
    const result = formatReviewDate('2023-05-15T00:00:00.000Z');
    expect(result).toBe('May 2023');
  });

  it('возвращает исходную строку при некорректной дате', () => {
    const result = formatReviewDate('invalid-date');
    expect(result).toBe('invalid-date');
  });
});
