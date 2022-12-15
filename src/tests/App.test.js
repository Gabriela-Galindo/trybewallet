import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Testa se o componente App é renderizado corretamente', () => {
  it('Testa se possui uma tag h1 com o texto "Hello, TrybeWallet!"', () => {
    renderWithRouterAndRedux(<App />);
    const heading = screen.getByRole('heading', { name: /hello, trybewallet!/i });
    expect(heading).toBeInTheDocument();
  });
});

describe('Testa se o componente Login é renderizado corretamente', () => {
  it('Testa se possui um texto escrito "Login"', () => {
    renderWithRouterAndRedux(<App />);
    const loginHeading = screen.getByText(/login/i);
    expect(loginHeading).toBeInTheDocument();
  });
  it('Testa se possui o campo de email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });
  it('Testa se possui o campo de senha', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });
  it('Testa se possui um botão com texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeInTheDocument();
  });
  it('Testa se, ao clicar no botão entrar, é redirecionado para a página de Carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/carteira');
  });
});
describe('Testa se o componente Wallet é renderizado corretamente', () => {
  it('Testa se possui input value', () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
  });
  it('Testa se possui input description', () => {
    renderWithRedux(<Wallet />);
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
  });
  it('Testa se possui input currency', () => {
    renderWithRedux(<Wallet />);
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
  });
  it('Testa se possui input method', () => {
    renderWithRedux(<Wallet />);
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
  });
  it('Testa se possui input tag', () => {
    renderWithRedux(<Wallet />);
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  });
  it('Testa se possui um botão com texto "Adicionar despesa"', () => {
    renderWithRedux(<Wallet />);
    const buttonExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonExpense).toBeInTheDocument();
  });
});
