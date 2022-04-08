import { createSelector } from '@reduxjs/toolkit';

import { selectState } from 'store/store';
import { sortBoards } from 'utils';

export const selectSelectedElements = createSelector(selectState, state =>
  state.constructorCalc.selectedElements.slice().sort(sortBoards),
);

export const selectSortSelectedElements = createSelector(selectState, state =>
  state.constructorCalc.selectedElements.slice().sort(sortBoards),
);

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

export const selectCurrentBoard = createSelector(
  [selectCalculatorElements, selectCurrentBoardDragId],
  (boards, currentBoardDragId) => boards.find(({ id }) => id === currentBoardDragId),
);
