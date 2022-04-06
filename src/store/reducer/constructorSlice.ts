import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BoardType } from 'types';

export type ConstructorState = {
  calculatorElements: BoardType[];
  selectedElements: BoardType[];
  isConstructor: boolean;
};

const initialState: ConstructorState = {
  calculatorElements: [
    {
      id: '1',
      type: 'numberDisplay',
      isDisable: false,
      dataCurrency: 'numberDisplay',
      isAddLayout: false,
      order: 1,
    },
    {
      id: '2',
      type: 'operators',
      isDisable: false,
      dataCurrency: 'operators',
      isAddLayout: false,
      order: 2,
    },
    {
      id: '3',
      type: 'numbers',
      isDisable: false,
      dataCurrency: 'numbers',
      isAddLayout: false,
      order: 3,
    },
    {
      id: '4',
      type: 'equalsSing',
      isDisable: false,
      dataCurrency: 'equalsSing',
      isAddLayout: false,
      order: 4,
    },
  ],
  selectedElements: [],
  isConstructor: true,
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<string>) => {
      const board = state.calculatorElements.find(({ id }) => id === action.payload);
      if (board) {
        state.selectedElements.push(board);
      }
    },
    setIsConstructor: (state, action: PayloadAction<boolean>) => {
      state.isConstructor = action.payload;
    },
  },
});

export const constructorReducer = constructorSlice.reducer;
