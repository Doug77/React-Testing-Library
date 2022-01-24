import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Requisito 1 - Teste componente <App.js />', () => {
  it('Teste se é redirecionada para a página inicial.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const pageHome = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(pageHome).toBeInTheDocument();
  });

  it('Teste se é redirecionada para a página About.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const pageAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(pageAbout).toBeInTheDocument();
  });

  it('Teste se é redirecionada para a página de Pokémons Favoritados.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavoritePokemons);
    const pageFavoritePokemons = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });
    expect(pageFavoritePokemons).toBeInTheDocument();
  });

  it('Teste se é redirecionada para a página Not Found.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    myHistory.push('/xablau');
    const pageNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
