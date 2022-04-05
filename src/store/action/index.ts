import { calculatorSlice, constructorSlice } from 'store/reducer';

export const { setValue, saveValue, getResult, setOperator } = calculatorSlice.actions;
export const { addElement } = constructorSlice.actions;
