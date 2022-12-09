import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  isSubmitButtonDisabled = () => {
    const { email, password } = this.state;
    const validEmail = email.includes('@') && email.includes('.com');
    const passwordLength = 6;
    return validEmail && password.length >= passwordLength;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(submitLogin(this.state));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          Login
          <br />
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              type="password"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            type="submit"
            disabled={ !this.isSubmitButtonDisabled() }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
