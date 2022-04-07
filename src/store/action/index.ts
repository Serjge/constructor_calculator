import { calculatorSlice, constructorSlice } from 'store/reducer';

export const { setValue, saveValue, getResult, setOperator } = calculatorSlice.actions;
export const { addElement, setIsConstructor, setCurrentBoardDragId, addBoard } =
  constructorSlice.actions;
