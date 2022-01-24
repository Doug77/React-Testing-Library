import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 6 - Teste o componente <Pokemon.js />', () => {
  const pathUrl = '/pokemons/25';
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    expect(pokemonName).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    expect(pokemonType).toBe('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img');
    const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImg).toHaveAttribute('src', img);
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Teste se o card do Pokémon contém link para exibir detalhes deste Pokémon.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    expect(myHistory.location.pathname).toBe(pathUrl);
    expect(pokemonDetails).toHaveAttribute('href', pathUrl);
  });

  it('Teste se clicar no link de navegação é feito o redirecionamento.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();

    userEvent.click(pokemonDetails);
    const pokemonDetailsTitle = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(myHistory.location.pathname).toBe(pathUrl);
    expect(pokemonDetailsTitle).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    const checkboxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkboxFavorite);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);

    const img = '/star-icon.svg';
    const starImg = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(starImg).toHaveAttribute('src', img);
  });
});
