import { configureStore } from '@reduxjs/toolkit';

import { calculatorReducer, constructorReducer } from 'store/reducer';

export const store = configureStore({
  reducer: {
    constructor: constructorReducer,
    calculator: calculatorReducer,
  },
});
