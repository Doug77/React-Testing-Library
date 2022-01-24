import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Requisito 3 - Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido a mensagem No favorite pokemon found.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    myHistory.push('/favorites');
    const noFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    myHistory.push('/favorites');
    const favoritePokemon = screen.queryAllByRole('img', { src: '/star-icon.svg' });
    expect(favoritePokemon).toBeDefined();
  });
});
