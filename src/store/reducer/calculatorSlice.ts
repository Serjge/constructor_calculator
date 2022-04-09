import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OperatorType } from 'types';

export type CalculatorState = {
  visibleValue: string;
  saveValue: string;
  operator: OperatorType | null;
};

const initialState: CalculatorState = {
  visibleValue: '',
  saveValue: '',
  operator: null,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      if (state.visibleValue !== 'Оператор не указан') {
        state.visibleValue = '';
      }
      state.visibleValue += action.payload;
    },
    setOperator: (state, action: PayloadAction<OperatorType | null>) => {
      state.operator = action.payload;

      if (state.visibleValue !== 'Оператор не указан') {
        state.saveValue = state.visibleValue;
      }
    },
    saveValue: state => {
      state.saveValue = state.visibleValue;
    },
    getResult: state => {
      switch (state.operator) {
        case '+':
          state.visibleValue = String(
            Number(state.saveValue) + Number(state.visibleValue),
          );
          break;

        case '-':
          state.visibleValue = String(
            Number(state.saveValue) - Number(state.visibleValue),
          );
          break;

        case '/':
          state.visibleValue = String(
            Number(state.saveValue) / Number(state.visibleValue),
          );
          break;

        case 'X':
          state.visibleValue = String(
            Number(state.saveValue) * Number(state.visibleValue),
          );
          break;

        default:
          if (state.visibleValue !== 'Оператор не указан') {
            state.saveValue = state.visibleValue;
          }
          state.visibleValue = 'Оператор не указан';
      }
    },
    resetValue: state => {
      state.visibleValue = '';
    },
  },
});

export const calculatorReducer = calculatorSlice.reducer;
