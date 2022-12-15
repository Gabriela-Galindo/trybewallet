import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, updateTotal } from '../redux/actions';

class Table extends Component {
  handleDelete = ({ target }) => {
    const targetDescription = target.parentNode.parentNode.firstChild.innerHTML;
    const { dispatch } = this.props;
    dispatch(deleteExpenses(targetDescription));
    dispatch(updateTotal());
  };

  renderTable = () => {
    const { expenses } = this.props;
    const expensesInfo = expenses.map((info) => {
      const { id, value, description, method, tag, currency, exchangeRates } = info;
      const valor = +value;
      const cambio = +exchangeRates[currency].ask;
      const valorConvertido = valor * cambio;
      return (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ valor.toFixed(2) }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ cambio.toFixed(2) }</td>
          <td>{ valorConvertido.toFixed(2) }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
            >
              Editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ this.handleDelete }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
    return expensesInfo;
  };

  render() {
    return (
      <div>
        Tabela
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
