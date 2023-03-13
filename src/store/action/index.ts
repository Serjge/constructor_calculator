import { calculatorSlice, constructorSlice } from 'store/reducer';
import { boardSlice } from 'store/reducer/boardSlice';

export const { setValue, getResult, setOperator, resetValue } = calculatorSlice.actions;
export const { setIsConstructor, setCurrentBoardDrag, addBoard, deleteBoard, setOrder } =
  constructorSlice.actions;

export const { setOverBoard, setLastElementLayoutDesk } = boardSlice.actions;
