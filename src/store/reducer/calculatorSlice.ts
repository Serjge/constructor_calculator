import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setIsConstructor } from 'store/action';
import { OperatorType } from 'types';

export type CalculatorStateType = {
  visibleValue: string;
  saveValue: string;
  operator: OperatorType | null;
  isCompute: boolean;
};

const ERRORS = ['Не определено', 'Оператор не указан', 'NaN'];

const initialState: CalculatorStateType = {
  visibleValue: '',
  saveValue: '',
  operator: null,
  isCompute: false,
};

const MAX_LENGTH_NUMBER = 16;
const MAX_LENGTH_DECIMAL_NUMBER = 14;

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

      if (state.visibleValue.length === MAX_LENGTH_NUMBER) {
        return;
      }

      if (action.payload === '.' && state.visibleValue === '') {
        state.visibleValue = '0';
      }

      state.visibleValue += action.payload;
    },
    setOperator: (state, action: PayloadAction<OperatorType | null>) => {
      if (state.visibleValue === '') {
        state.visibleValue = '0';
      }
      state.operator = action.payload;

      if (state.visibleValue !== 'Оператор не указан') {
        state.saveValue = state.visibleValue;
      }
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

          if (state.visibleValue.length >= MAX_LENGTH_NUMBER) {
            state.visibleValue = String(
              Number(state.visibleValue).toFixed(MAX_LENGTH_DECIMAL_NUMBER),
            );
          }

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
