import { createSelector } from '@reduxjs/toolkit';

import { selectState } from 'store/store';

export const selectSelectedElements = createSelector(
  selectState,
  state => state.constructorCalc.selectedElements,
);

export const selectCalculatorElements = createSelector(
  selectState,
  state => state.constructorCalc.calculatorElements,
);

export const selectIsConstructor = createSelector(
  selectState,
  state => state.constructorCalc.isConstructor,
);

export const selectCurrentBoardDrag = createSelector(
  selectState,
  state => state.constructorCalc.currentBoardDrag,
);

export const selectLastBoardId = createSelector(
  selectState,
  state => state.constructorCalc.lastBoardId,
);

export const selectCurrentBoard = createSelector(
  selectState,
  state => state.constructorCalc.currentBoardDrag,
);
