import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.cities = action.payload.cities;
    },
  },
});

export const { addCity } = citiesSlice.actions;

const store = configureStore({
  reducer: citiesSlice.reducer,
});

export default store;
