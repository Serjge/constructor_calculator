import { calculatorSlice, constructorSlice } from 'store/reducer';

export const { setValue, getResult, setOperator, resetValue } = calculatorSlice.actions;
export const {
  setIsConstructor,
  setCurrentBoardDragId,
  addBoard,
  deleteBoard,
  setOverBoard,
  setLastElementLayoutDesk,
  setOrder,
} = constructorSlice.actions;
