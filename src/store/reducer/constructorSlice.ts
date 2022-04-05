import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BoardType } from 'types';

export type ConstructorState = {
  calculatorElements: BoardType[];
  selectedElements: BoardType[];
  isConstructor: boolean;
};

const initialState: ConstructorState = {
  calculatorElements: [
    { id: '1', type: 'numberDisplay', isDisable: false, dataCurrency: 'numberDisplay' },
    { id: '2', type: 'operators', isDisable: false, dataCurrency: 'operators' },
    { id: '3', type: 'numbers', isDisable: false, dataCurrency: 'numbers' },
    { id: '4', type: 'equalsSing', isDisable: false, dataCurrency: 'equalsSing' },
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
