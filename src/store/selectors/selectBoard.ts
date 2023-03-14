import { createSelector } from '@reduxjs/toolkit';

import { selectState } from 'store/store';

export const selectOverBoard = createSelector(
  selectState,
  state => state.board.overBoard,
);
export const selectLastElementLayoutDesk = createSelector(
  selectState,
  state => state.board.lastElementLayoutDesk,
);
