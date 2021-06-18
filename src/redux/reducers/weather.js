import {createSlice} from '@reduxjs/toolkit';

export const cities = createSlice({
  name: 'cities',
  initialState: {
    data: null,
    message: null,
    status: null,
  },
  reducers: {
    getCitiesSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
        message: null,
        status: 200,
      };
    },
  },
});
export const {getCitiesSuccess} = cities.actions;
