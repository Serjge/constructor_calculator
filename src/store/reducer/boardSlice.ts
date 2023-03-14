import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board } from 'enum';
import { addBoard, setOrder } from 'store/action';

export type BoardStateType = {
  overBoard: Board | null;
  lastElementLayoutDesk: Board | null;
};

const initialState: BoardStateType = {
  overBoard: null,
  lastElementLayoutDesk: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setOverBoard: (state, action: PayloadAction<{ typeBoard: Board | null }>) => {
      const { typeBoard } = action.payload;

      state.overBoard = typeBoard;
    },

    setLastElementLayoutDesk: (
      state,
      action: PayloadAction<{
        typeBoard: Board | null;
      }>,
    ) => {
      const { typeBoard } = action.payload;
      state.lastElementLayoutDesk = typeBoard;
    },
  },

  extraReducers: builder => {
    builder.addCase(addBoard, state => {
      state.lastElementLayoutDesk = null;
      state.overBoard = null;
    });

    builder.addCase(setOrder, state => {
      state.lastElementLayoutDesk = null;
      state.overBoard = null;
    });
  },
});

export const boardReducer = boardSlice.reducer;
