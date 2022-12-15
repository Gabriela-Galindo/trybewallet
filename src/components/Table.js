import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
