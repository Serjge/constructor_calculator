import { configureStore } from '@reduxjs/toolkit';

import { calculatorReducer, constructorReducer } from 'store/reducer';
import { boardReducer } from 'store/reducer/boardSlice';
import { RootState } from 'store/types';

export const store = configureStore({
  reducer: {
    constructorCalc: constructorReducer,
    calculator: calculatorReducer,
    board: boardReducer,
  },
});
export const selectState = (state: RootState): RootState => state;
