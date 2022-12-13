import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APIcurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(APIcurrencies());
  }

  currencyOptions = () => {
    const { currencyArray } = this.props;
    const optionsList = currencyArray.map((currency) => (
      <option key={ currency } value={ currency }>{currency}</option>
    ));
    return optionsList;
  };

  render() {
    return (
      <div>
        <form>
          Wallet
          <br />
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              id="value-input"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              id="description-input"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
            >
              {this.currencyOptions()}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartão de credito">Cartão de crédito</option>
              <option value="cartao de debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencyArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencyArray: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
