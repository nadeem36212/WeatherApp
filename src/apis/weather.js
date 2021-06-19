import XHR from './api';
import * as ROUTES from './urls';

export const getCities = async params => {
  const url = ROUTES.GET_CITIES_LIST + ROUTES.API_URL + ROUTES.API_KEY;
  const res = await XHR.get(url, null, null);
  return res;
};
