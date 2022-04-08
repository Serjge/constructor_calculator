import { createSelector } from '@reduxjs/toolkit';

import { selectState } from 'store/store';
import { sortBoards } from 'utils';

export const selectSelectedElements = createSelector(selectState, state =>
  state.constructorCalc.selectedElements.slice().sort(sortBoards),
);

export const selectSortSelectedElements = createSelector([selectSelectedElements], a => {
  a.slice().sort(sortBoards);
  return a;
});

export const selectCalculatorElements = createSelector(
  selectState,
  state => state.constructorCalc.calculatorElements,
);

export const selectIsConstructor = createSelector(
  selectState,
  state => state.constructorCalc.isConstructor,
);

export const selectCurrentBoardDragId = createSelector(
  selectState,
  state => state.constructorCalc.currentBoardDragId,
);

export const selectLastBoardId = createSelector(
  selectState,
  state => state.constructorCalc.lastBoardId,
);
