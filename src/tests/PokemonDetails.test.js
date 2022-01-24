import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 7 - Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    const pokemonName = screen.getByText(/pikachu details/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonDetails).not.toBeInTheDocument();

    const pokemonSummary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(pokemonSummary).toBeInTheDocument();

    const pokemonDescription = screen.getByText(
      /roasts hard berries with electricity to make/i,
    );
    expect(pokemonDescription).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas com as localizações do pokémon.', () => {
    const imgMap = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const pokemonLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });

    expect(pokemonLocation).toBeInTheDocument();

    const pokemonLocationImg = screen.getAllByAltText(/pikachu location/i);
    expect(pokemonLocationImg).toHaveLength(2);
    expect(pokemonLocationImg[1]).toHaveAttribute('src', imgMap);

    const firstTMap = screen.getByText('Kanto Viridian Forest');
    expect(firstTMap).toBeInTheDocument();

    const secondMap = screen.getByText('Kanto Power Plant');
    expect(secondMap).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon'
  + 'através da página de detalhes.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);

    const favorites = screen.getAllByRole('img');

    expect(favorites[1]).toBeInTheDocument();
    expect(favorites[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favorites[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');

    userEvent.click(checkboxFavorite);

    expect(favorites[1]).not.toBeInTheDocument();

    const labelForFavorite = screen.getByText('Pokémon favoritado?');
    expect(labelForFavorite).toBeInTheDocument();
  });
});
