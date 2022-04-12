import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board } from 'enum';
import { BoardType, ComponentsBoardsType } from 'types';

export type ConstructorStateType = {
  calculatorElements: BoardType[];
  selectedElements: BoardType[];
  isConstructor: boolean;
  currentBoardDragId: string | null;
  lastBoardId: string | null;
};

const initialState: ConstructorStateType = {
  calculatorElements: [
    {
      id: '1',
      type: 'numberDisplay',
      isDisable: false,
      isAddLayout: false,
      order: 1,
      isOverBoard: false,
      isLastElementLayoutDesk: false,
    },
    {
      id: '2',
      type: 'operators',
      isDisable: false,
      isAddLayout: false,
      order: 2,
      isOverBoard: false,
      isLastElementLayoutDesk: false,
    },
    {
      id: '3',
      type: 'numbers',
      isDisable: false,
      isAddLayout: false,
      order: 3,
      isOverBoard: false,
      isLastElementLayoutDesk: false,
    },
    {
      id: '4',
      type: 'equalsSing',
      isDisable: false,
      isAddLayout: false,
      order: 4,
      isOverBoard: false,
      isLastElementLayoutDesk: false,
    },
  ],
  selectedElements: [],
  isConstructor: true,
  currentBoardDragId: null,
  lastBoardId: null,
};

const LAST_ELEMENT_ARRAY = 1;

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
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
        });
      } else {
        state.selectedElements.push({
          ...action.payload,
          isAddLayout: true,
        });
      }

      if (state.lastBoardId) {
        const LastBoardIndex = state.selectedElements.findIndex(
          ({ id }) => id === state.lastBoardId,
        );

        state.selectedElements[LastBoardIndex].isLastElementLayoutDesk = false;
      }

      const boardIndex = state.calculatorElements.findIndex(
        ({ id }) => id === action.payload.id,
      );

      state.calculatorElements[boardIndex].isDisable = true;
      state.calculatorElements[boardIndex].isAddLayout = true;
      state.lastBoardId = null;
    },

    deleteBoard: (state, action: PayloadAction<string>) => {
      const index = state.calculatorElements.findIndex(({ id }) => id === action.payload);

      state.calculatorElements[index].isDisable = false;
      state.calculatorElements[index].isAddLayout = false;

      state.selectedElements = state.selectedElements.filter(
        ({ id }) => id !== action.payload,
      );
    },

    setOverBoard: (
      state,
      action: PayloadAction<{ isOverBoard: boolean; typeBoard: ComponentsBoardsType }>,
    ) => {
      const { typeBoard, isOverBoard } = action.payload;

      const index = state.selectedElements.findIndex(({ type }) => type === typeBoard);

      state.selectedElements[index].isOverBoard = isOverBoard;
    },

    setLastElementLayoutDesk: (
      state,
      action: PayloadAction<{
        isLastElementLayoutDesk: boolean;
      }>,
    ) => {
      const { isLastElementLayoutDesk } = action.payload;

      const isCurrentBoardOnLayoutDesk = state.selectedElements.find(
        ({ id }) => id === state.currentBoardDragId,
      );

      if (isCurrentBoardOnLayoutDesk !== undefined) {
        const lastBoardId =
          state.selectedElements[state.selectedElements.length - LAST_ELEMENT_ARRAY].id;

        state.lastBoardId = lastBoardId;

        const index = state.selectedElements.findIndex(({ id }) => id === lastBoardId);

        state.selectedElements[index].isLastElementLayoutDesk = isLastElementLayoutDesk;
      }
    },

    setOrder: (state, action: PayloadAction<{ draggableBoardId: string }>) => {
      const { draggableBoardId } = action.payload;
      const currentBoardId = state.currentBoardDragId;

      const draggableBoardIndex = state.selectedElements.findIndex(
        ({ id }) => id === draggableBoardId,
      );
      const currentBoardIndex = state.selectedElements.findIndex(
        ({ id }) => id === currentBoardId,
      );

      const draggableBoardOrder = state.selectedElements[draggableBoardIndex].order;

      const currentBoardOrder = state.selectedElements[currentBoardIndex].order;

      if (draggableBoardId !== '1') {
        state.selectedElements[currentBoardIndex].order = draggableBoardOrder;
        state.selectedElements[currentBoardIndex].isOverBoard = false;

        state.selectedElements[draggableBoardIndex].order = currentBoardOrder;
        state.selectedElements[draggableBoardIndex].isOverBoard = false;
      }
    },
  },
});

export const constructorReducer = constructorSlice.reducer;
