import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board } from 'enum';
import { addBoard, deleteBoard, setOrder } from 'store/action';
import { BoardType } from 'types';

export type BoardStateType = {
  desks: {
    numberDisplay: BoardType;
    operators: BoardType;
    numbers: BoardType;
    equalsSing: BoardType;
  };
  isOverBoard: Board | null;
};

const initialState: BoardStateType = {
  desks: {
    numberDisplay: {
      type: Board.NumberDisplay,
      isDisable: false,
      isAddLayout: false,
      isLastElementLayoutDesk: false,
    },
    operators: {
      type: Board.Operators,
      isDisable: false,
      isAddLayout: false,
      isLastElementLayoutDesk: false,
    },
    numbers: {
      type: Board.Numbers,
      isDisable: false,
      isAddLayout: false,
      isLastElementLayoutDesk: false,
    },
    equalsSing: {
      type: Board.EqualsSing,
      isDisable: false,
      isAddLayout: false,
      isLastElementLayoutDesk: false,
    },
  },

  isOverBoard: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setOverBoard: (state, action: PayloadAction<{ typeBoard: Board | null }>) => {
      const { typeBoard } = action.payload;

      state.isOverBoard = typeBoard;
    },

    setLastElementLayoutDesk: (
      state,
      action: PayloadAction<{
        typeBoard: Board;
        isLastElementLayoutDesk: boolean;
      }>,
    ) => {
      const { isLastElementLayoutDesk, typeBoard } = action.payload;
      state.desks[typeBoard].isLastElementLayoutDesk = isLastElementLayoutDesk;
    },
  },

  extraReducers: builder => {
    builder.addCase(addBoard, (state, action) => {
      const { board } = action.payload;

      if (board === Board.NumberDisplay) {
        state.desks[board].isDisable = true;
      }
      state.desks[board].isAddLayout = true;

      Object.keys(state.desks).forEach(key => {
        state.desks[key as Board].isLastElementLayoutDesk = false;
      });
      state.isOverBoard = null;
    });

    builder.addCase(deleteBoard, (state, action) => {
      state.desks[action.payload].isAddLayout = false;
      state.desks[action.payload].isDisable = false;
    });

    builder.addCase(setOrder, state => {
      Object.keys(state.desks).forEach(key => {
        state.desks[key as Board].isLastElementLayoutDesk = false;
      });
      state.isOverBoard = null;
    });
  },
});

export const boardReducer = boardSlice.reducer;
