import { createSelector } from '@reduxjs/toolkit';

import { selectState } from 'store/store';

export const selectBoards = createSelector(selectState, state => state.board.desks);
export const selectBoardNumberDisplay = createSelector(
  selectState,
  state => state.board.desks.numberDisplay,
);
export const selectBoardNumbers = createSelector(
  selectState,
  state => state.board.desks.numbers,
);
export const selectBoardOperators = createSelector(
  selectState,
  state => state.board.desks.operators,
);
export const selectBoardEqualsSing = createSelector(
  selectState,
  state => state.board.desks.equalsSing,
);
export const selectIsOverBoard = createSelector(
  selectState,
  state => state.board.isOverBoard,
);
