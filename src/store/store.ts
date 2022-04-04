import { configureStore } from '@reduxjs/toolkit';

import { constructorReducer } from 'store/reducer';

export const store = configureStore({
  reducer: {
    constructor: constructorReducer,
  },
});
