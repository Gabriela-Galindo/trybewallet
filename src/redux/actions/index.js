export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const submitLogin = (loginInfo) => ({
  type: SUBMIT_LOGIN,
  payload: { ...loginInfo },
});
