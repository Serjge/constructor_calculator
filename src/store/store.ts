import { configureStore } from '@reduxjs/toolkit';

import { calculatorReducer, constructorReducer } from 'store/reducer';

export const store = configureStore({
  reducer: {
    constructorCalc: constructorReducer,
    calculator: calculatorReducer,
  },
});
