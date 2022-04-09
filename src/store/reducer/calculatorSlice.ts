import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OperatorType } from 'types';

export type CalculatorState = {
  visibleValue: string;
  saveValue: string;
  operator: OperatorType | null;
};

const initialState: CalculatorState = {
  visibleValue: '3213',
  saveValue: '',
  operator: null,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.visibleValue += action.payload;
    },
    setOperator: (state, action: PayloadAction<OperatorType | null>) => {
      state.operator = action.payload;
      state.saveValue = state.visibleValue;
    },
    saveValue: state => {
      state.saveValue = state.visibleValue;
    },
    getResult: state => {
      state.visibleValue = state.saveValue + state.visibleValue;
    },
    resetValue: state => {
      state.visibleValue = '';
    },
  },
});

export const calculatorReducer = calculatorSlice.reducer;
