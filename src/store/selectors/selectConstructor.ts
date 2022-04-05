import { RootState } from 'store/types';
import { BoardType } from 'types';

export const selectCalculatorElements = (state: RootState): BoardType[] =>
  state.constructor.calculatorElements;

export const selectSelectedElements = (state: RootState): BoardType[] =>
  state.constructor.selectedElements;

export const selectIsConstructor = (state: RootState): boolean =>
  state.constructor.isConstructor;
