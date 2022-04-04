import { RootState } from 'store/types';
import { OperatorType } from 'types';

export const selectVisibleValue = (state: RootState): string =>
  state.calculator.visibleValue;
export const selectSaveValue = (state: RootState): string => state.calculator.saveValue;
export const selectOperator = (state: RootState): OperatorType | null =>
  state.calculator.operator;
