import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 5 - Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const headingPage = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(headingPage).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokemon).toHaveTextContent(/próximo pokémon/i);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const otherPokemon = screen.getByText(/charmander/i);
    expect(otherPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const encounteredPokemon = screen.getAllByTestId('pokemon-name');
    expect(encounteredPokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const numbersOfTypes = 7;
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btnTypePokemons = screen.getAllByTestId('pokemon-type-button');
    expect(btnTypePokemons).toHaveLength(numbersOfTypes);

    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(btnAll).toBeInTheDocument();

    const nextPokemon = screen.getByTestId('next-pokemon');
    expect(nextPokemon).toBeInTheDocument();

    const fireBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(fireBtn).toBeInTheDocument();
    userEvent.click(fireBtn);
    const pokemonFireType = screen.getByText(/charmander/i);
    expect(pokemonFireType).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const otherPokemonFireType = screen.getByText(/rapidash/i);
    expect(otherPokemonFireType).toBeInTheDocument();

    userEvent.click(btnAll);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btnDragon = screen.getByRole('button', {
      name: /dragon/i,
    });
    userEvent.click(btnDragon);

    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);

    const allPokemons = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(allPokemons).toBeInTheDocument();
  });
});
