import { createSelector } from '@reduxjs/toolkit';

import { selectState } from 'store/store';

export const selectVisibleValue = createSelector(
  selectState,
  state => state.calculator.visibleValue,
);

export const selectSaveValue = createSelector(
  selectState,
  state => state.calculator.saveValue,
);

export const selectOperator = createSelector(
  selectState,
  state => state.calculator.operator,
);
