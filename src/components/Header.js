import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    const totalValue = total.toFixed(2);
    return (
      <div>
        <h2 data-testid="email-field">{ email }</h2>
        <h2 data-testid="total-field">{ totalValue }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
