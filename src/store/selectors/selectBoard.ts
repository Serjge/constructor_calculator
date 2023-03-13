import { createSelector } from '@reduxjs/toolkit';

import { selectState } from 'store/store';

export const selectBoards = createSelector(selectState, state => state.board);
export const selectBoardNumberDisplay = createSelector(
  selectState,
  state => state.board.numberDisplay,
);
export const selectBoardNumbers = createSelector(
  selectState,
  state => state.board.numbers,
);
export const selectBoardOperators = createSelector(
  selectState,
  state => state.board.operators,
);
export const selectBoardEqualsSing = createSelector(
  selectState,
  state => state.board.equalsSing,
);
