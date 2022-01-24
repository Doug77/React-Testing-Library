import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Requisito 2 - Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const aboutPokedex = screen.getByText(
      /this application simulates a pokédex*/i,
    );
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const headerAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(headerAbout).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const text1AboutPokedex = screen.getByText(
      /this application simulates a pokédex.*/i,
    );

    const text2AboutPokedex = screen.getByText(
      /one can filter pokémons by type*/i,
    );

    expect(text1AboutPokedex).toBeInTheDocument();
    expect(text2AboutPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex.', () => {
    const myHistory = createMemoryHistory();
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const imagePokedex = screen.getByRole('img', { src: srcImg });
    expect(imagePokedex.src).toBe(srcImg);
  });
});
