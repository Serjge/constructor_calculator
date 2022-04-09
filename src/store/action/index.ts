import { calculatorSlice, constructorSlice } from 'store/reducer';

export const { setValue, saveValue, getResult, setOperator, resetValue } =
  calculatorSlice.actions;
export const {
  setIsConstructor,
  setCurrentBoardDragId,
  addBoard,
  deleteBoard,
  setOverBoard,
  setLastElementLayoutDesk,
  setOrder,
} = constructorSlice.actions;
