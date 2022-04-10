import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setIsConstructor } from 'store/action';
import { OperatorType } from 'types';

export type CalculatorState = {
  visibleValue: string;
  saveValue: string;
  operator: OperatorType | null;
  isCompute: boolean;
};

const ERRORS = ['Не определено', 'Оператор не указан', 'NaN'];

const initialState: CalculatorState = {
  visibleValue: '',
  saveValue: '',
  operator: null,
  isCompute: false,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      if (ERRORS.includes(state.visibleValue) || !state.isCompute) {
        state.visibleValue = '';
      }
      if (!state.isCompute) {
        state.isCompute = true;
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
          state.isCompute = false;
          break;

        case '-':
          state.visibleValue = String(
            Number(state.saveValue) - Number(state.visibleValue),
          );
          state.isCompute = false;
          break;

        case '/':
          if (state.visibleValue === '0' || state.visibleValue === '') {
            state.visibleValue = 'Не определено';
            break;
          }
          state.visibleValue = String(
            Number(state.saveValue) / Number(state.visibleValue),
          );
          state.isCompute = false;
          break;

        case 'X':
          state.visibleValue = String(
            Number(state.saveValue) * Number(state.visibleValue),
          );
          state.isCompute = false;
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
  extraReducers: builder => {
    builder.addCase(setIsConstructor, state => {
      state.visibleValue = '';
    });
  },
});

export const calculatorReducer = calculatorSlice.reducer;
