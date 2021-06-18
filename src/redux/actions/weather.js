import apiActions from '@apis';

export const getCities = params => {
  return apiActions
    .getCities(params)
    .then(resp => {
      return resp;
    })
    .catch(e => {
      console.log('getCities errr is ---', e);
      throw e;
    });
};
