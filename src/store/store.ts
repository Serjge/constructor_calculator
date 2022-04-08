import { configureStore } from '@reduxjs/toolkit';

import { calculatorReducer, constructorReducer } from 'store/reducer';
import { RootState } from 'store/types';

export const store = configureStore({
  reducer: {
    constructorCalc: constructorReducer,
    calculator: calculatorReducer,
  },
});
export const selectState = (state: RootState): RootState => state;
