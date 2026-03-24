import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';
import { makeFakeOffer } from './mocks';

const fakeUserInfo = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  avatarUrl: 'https://example.com/avatar.jpg',
  isPro: false,
  token: 'fake-token',
};

describe('Header — неавторизованный пользователь', () => {
  it('отображает ссылку Sign in', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('не отображает Sign out', () => {
    renderWithProviders(<Header />);
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });
});

describe('Header — авторизованный пользователь', () => {
  it('отображает email пользователя', () => {
    const offers = [
      { ...makeFakeOffer(), isFavorite: true },
      { ...makeFakeOffer(), isFavorite: false },
      { ...makeFakeOffer(), isFavorite: true },
    ];
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers,
      },
    });
    expect(screen.getByText(fakeUserInfo.email)).toBeInTheDocument();
  });

  it('отображает количество избранных предложений', () => {
    const offers = [
      { ...makeFakeOffer(), isFavorite: true },
      { ...makeFakeOffer(), isFavorite: false },
      { ...makeFakeOffer(), isFavorite: true },
    ];
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers,
      },
    });
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('отображает кнопку Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('не отображает ссылку Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });
});

describe.skip('Header — статус авторизации UNKNOWN', () => {
  it('отображает загрузку', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: 'UNKNOWN',
        user: null,
      },
    });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});