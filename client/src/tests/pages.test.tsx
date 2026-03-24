import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoadingPage } from '../pages/loading-page/LoadingPage';
import { NotFound } from '../pages/not-found/not-found';

describe('LoadingPage', () => {
  it('should display loading message', () => {
    render(
      <MemoryRouter>
        <LoadingPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Загрузка предложений/i)).toBeInTheDocument();
  });

  it('should render the loading page container', () => {
    render(
      <MemoryRouter>
        <LoadingPage />
      </MemoryRouter>
    );
    const text = screen.getByText(/Загрузка предложений/i);
    expect(text).toBeInTheDocument();
  });
});

describe('PageNotFound', () => {
  it('should display 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('should display not found message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/The page you are looking for doesn't exist/i)).toBeInTheDocument();
  });
});
