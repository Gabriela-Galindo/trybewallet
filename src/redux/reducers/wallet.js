import { FETCH_API, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_API: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  case SAVE_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      total: state.total
      + (action.payload.value
        * +action.payload.exchangeRates[action.payload.currency].ask),
    };
  }
  default:
    return state;
  }
};

export default wallet;
