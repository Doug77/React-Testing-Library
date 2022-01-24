import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Requisito 4 - Teste o componente <NotFound.js />', () => {
  it('Teste se é exibido a mensagem No favorite pokemon found.', () => {
    const myHistory = createMemoryHistory();
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    myHistory.push('/page-not-found');
    const pageNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(pageNotFound).toBeInTheDocument();
  });

  it('Teste se página mostra uma imagem .gif', () => {
    const myHistory = createMemoryHistory();
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    render(
      <Router history={ myHistory }>
        <App />
      </Router>,
    );
    myHistory.push('/page-not-found');
    const pageNotFoundImg = screen.getByRole('img', {
      name: /pikachu crying because*/i,
    });
    expect(pageNotFoundImg).toHaveAttribute('src', imgSrc);
  });
});
