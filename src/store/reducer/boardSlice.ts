import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board } from 'enum';
import { addBoard, deleteBoard, setOrder } from 'store/action';
import { BoardType } from 'types';

export type BoardStateType = {
  numberDisplay: BoardType;
  operators: BoardType;
  numbers: BoardType;
  equalsSing: BoardType;
};

const initialState: BoardStateType = {
  numberDisplay: {
    id: '1',
    type: Board.NumberDisplay,
    isDisable: false,
    isAddLayout: false,

    isOverBoard: false,
    isLastElementLayoutDesk: false,
  },
  operators: {
    id: '2',
    type: Board.Operators,
    isDisable: false,
    isAddLayout: false,
    isOverBoard: false,
    isLastElementLayoutDesk: false,
  },
  numbers: {
    id: '3',
    type: Board.Numbers,
    isDisable: false,
    isAddLayout: false,
    isOverBoard: false,
    isLastElementLayoutDesk: false,
  },
  equalsSing: {
    id: '4',
    type: Board.EqualsSing,
    isDisable: false,
    isAddLayout: false,
    isOverBoard: false,
    isLastElementLayoutDesk: false,
  },
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setOverBoard: (
      state,
      action: PayloadAction<{ isOverBoard: boolean; typeBoard: Board }>,
    ) => {
      const { typeBoard, isOverBoard } = action.payload;
      state[typeBoard].isOverBoard = isOverBoard;
    },

    setLastElementLayoutDesk: (
      state,
      action: PayloadAction<{
        typeBoard: Board;
        isLastElementLayoutDesk: boolean;
      }>,
    ) => {
      const { isLastElementLayoutDesk, typeBoard } = action.payload;
      state[typeBoard].isLastElementLayoutDesk = isLastElementLayoutDesk;
    },
  },

  extraReducers: builder => {
    builder.addCase(addBoard, (state, action) => {
      const { board } = action.payload;
      if (board === Board.NumberDisplay) {
        state[board].isDisable = true;
      }
      state[board].isAddLayout = true;

      Object.keys(state).forEach(key => {
        state[key as Board].isLastElementLayoutDesk = false;
        state[key as Board].isOverBoard = false;
      });
    });
    builder.addCase(deleteBoard, (state, action) => {
      state[action.payload].isAddLayout = false;
      state[action.payload].isDisable = false;
    });
    builder.addCase(setOrder, state => {
      Object.keys(state).forEach(key => {
        state[key as Board].isLastElementLayoutDesk = false;
        state[key as Board].isOverBoard = false;
      });
    });
  },
});

export const boardReducer = boardSlice.reducer;
