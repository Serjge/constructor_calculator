import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board } from 'enum';

export type ConstructorStateType = {
  calculatorElements: Board[];
  selectedElements: Board[];
  isConstructor: boolean;
  currentBoardDrag: Board | null;
  lastBoardId: Board | null;
};

const ZERO_DELETE_ELEMENT = 0;
const ONE_DELETE_ELEMENT = 1;

const initialState: ConstructorStateType = {
  calculatorElements: [
    Board.NumberDisplay,
    Board.Operators,
    Board.Numbers,
    Board.EqualsSing,
  ],
  selectedElements: [],
  isConstructor: true,
  currentBoardDrag: null,
  lastBoardId: null,
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setIsConstructor: (state, action: PayloadAction<boolean>) => {
      state.isConstructor = action.payload;
    },

    setCurrentBoardDrag: (state, action: PayloadAction<Board | null>) => {
      state.currentBoardDrag = action.payload;
    },

    addBoard: (
      state,
      action: PayloadAction<{ board: Board; destinationIndex?: number }>,
    ) => {
      const { destinationIndex, board } = action.payload;

      if (board === Board.NumberDisplay) {
        state.selectedElements.unshift(board);
      } else if (
        destinationIndex !== undefined &&
        state.selectedElements[destinationIndex] !== Board.NumberDisplay
      ) {
        state.selectedElements.splice(destinationIndex, ZERO_DELETE_ELEMENT, board);
      } else {
        state.selectedElements.push(board);
      }

      state.lastBoardId = null;
    },

    deleteBoard: (state, action: PayloadAction<Board>) => {
      state.selectedElements = state.selectedElements.filter(el => el !== action.payload);
    },

    setOrder: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>,
    ) => {
      const { destinationIndex, sourceIndex } = action.payload;
      const sourceBoard = state.selectedElements[sourceIndex];

      if (sourceBoard !== Board.NumberDisplay) {
        state.selectedElements.splice(sourceIndex, ONE_DELETE_ELEMENT);
        state.selectedElements.splice(destinationIndex, ZERO_DELETE_ELEMENT, sourceBoard);
      }
    },
  },
});

export const constructorReducer = constructorSlice.reducer;
