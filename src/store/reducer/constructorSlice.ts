import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board } from 'enum';
import { BoardType } from 'types';

export type ConstructorState = {
  calculatorElements: BoardType[];
  selectedElements: BoardType[];
  isConstructor: boolean;
  currentBoardDragId: string | null;
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
      isOverBoard: false,
      isLastElementLayoutDesk: false,
    },
    {
      id: '2',
      type: 'operators',
      isDisable: false,
      dataCurrency: 'operators',
      isAddLayout: false,
      order: 2,
      isOverBoard: false,
      isLastElementLayoutDesk: false,
    },
    {
      id: '3',
      type: 'numbers',
      isDisable: false,
      dataCurrency: 'numbers',
      isAddLayout: false,
      order: 3,
      isOverBoard: false,
      isLastElementLayoutDesk: false,
    },
    {
      id: '4',
      type: 'equalsSing',
      isDisable: false,
      dataCurrency: 'equalsSing',
      isAddLayout: false,
      order: 4,
      isOverBoard: false,
      isLastElementLayoutDesk: false,
    },
  ],
  selectedElements: [],
  isConstructor: true,
  currentBoardDragId: null,
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
    setCurrentBoardDragId: (state, action: PayloadAction<string | null>) => {
      state.currentBoardDragId = action.payload;
    },
    addBoard: (state, action: PayloadAction<BoardType>) => {
      if (action.payload.type === Board.NumberDisplay) {
        state.selectedElements.unshift({
          ...action.payload,
          isAddLayout: true,
          isDisable: true,
          isLastElementLayoutDesk: false,
        });
      } else {
        state.selectedElements.push({
          ...action.payload,
          isAddLayout: true,
          isLastElementLayoutDesk: false,
        });
      }

      const index = state.calculatorElements.findIndex(
        ({ id }) => id === action.payload.id,
      );
      state.calculatorElements[index].isDisable = true;
      state.calculatorElements[index].isAddLayout = true;
    },
  },
});

export const constructorReducer = constructorSlice.reducer;
