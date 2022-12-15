import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APIcurrencies, saveExpenses, apiExchangeRates } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(APIcurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  currencyOptions = () => {
    const { currencyArray } = this.props;
    const optionsList = currencyArray.map((currency) => (
      <option key={ currency } value={ currency }>{currency}</option>
    ));
    return optionsList;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const exchangeRates = await dispatch(apiExchangeRates());
    const objResult = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(saveExpenses(objResult));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
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
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              id="description-input"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {this.currencyOptions()}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
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
            onClick={ this.handleSubmit }
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
