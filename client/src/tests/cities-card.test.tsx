import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CitiesCard } from '../components/cities-card/cities-card';
import { makeFakeOffer, makeFakeStore } from './mocks';
import { reducer as rootReducer } from '../store/reducer';

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: makeFakeStore(),
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </Provider>
  );
};

describe('CitiesCard Component', () => {
  it('отображает заголовок объявления на карточке', () => {
    const offer = makeFakeOffer();
    renderWithProviders(
      <CitiesCard {...offer} />
    );
    expect(screen.getByRole('heading', { name: offer.title })).toBeInTheDocument();
  });

  it('цена объявления присутствует в разметке', () => {
    const offer = makeFakeOffer();
    renderWithProviders(
      <CitiesCard {...offer} />
    );
    expect(screen.getByText(new RegExp(`€${offer.price}`))).toBeInTheDocument();
  });

  it('метка "Premium" отображается когда isPremium = true', () => {
    const offer = { ...makeFakeOffer(), isPremium: true };
    renderWithProviders(
      <CitiesCard {...offer} />
    );
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('метка "Premium" отсутствует когда isPremium = false', () => {
    const offer = { ...makeFakeOffer(), isPremium: false };
    renderWithProviders(
      <CitiesCard {...offer} />
    );
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href (/offer/id)', () => {
    const offer = makeFakeOffer();
    renderWithProviders(
      <CitiesCard {...offer} />
    );
    const links = screen.getAllByRole('link');
    const offerLink = links.find(link => link.getAttribute('href') === `/offer/${offer.id}`);
    expect(offerLink).toBeInTheDocument();
  });
});
