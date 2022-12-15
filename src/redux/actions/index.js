export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const submitLogin = (loginInfo) => ({
  type: SUBMIT_LOGIN,
  payload: { ...loginInfo },
});

export const FETCH_API = 'FETCH_API';

export const fetchAPI = (param) => ({
  type: FETCH_API,
  payload: param,
});

export const APIcurrencies = () => async (dispatch) => {
  const result = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await result.json();
  const currencyList = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(fetchAPI(currencyList));
};

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (param) => ({
  type: SAVE_EXPENSES,
  payload: param,
});

export const apiExchangeRates = () => async () => {
  const result = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await result.json();
  return data;
};
