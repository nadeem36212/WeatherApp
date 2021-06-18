import XHR from './api';
import * as ROUTES from './urls';
export const getCities = async params => {
  const body = JSON.stringify({});
  const res = await XHR.post(ROUTES.LOGIN, body, null);
  return res;
};
