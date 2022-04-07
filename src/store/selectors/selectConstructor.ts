import { RootState } from 'store/types';
import { BoardType } from 'types';

export const selectCalculatorElements = (state: RootState): BoardType[] =>
  state.constructorCalc.calculatorElements;

export const selectSelectedElements = (state: RootState): BoardType[] =>
  state.constructorCalc.selectedElements;

export const selectIsConstructor = (state: RootState): boolean =>
  state.constructorCalc.isConstructor;

export const selectCurrentBoardDragId = (state: RootState): string | null =>
  state.constructorCalc.currentBoardDragId;
