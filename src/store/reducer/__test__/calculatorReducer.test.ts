import {
  getResult,
  resetValue,
  setIsConstructor,
  setOperator,
  setValue,
} from 'store/action';
import { calculatorReducer, CalculatorStateType } from 'store/reducer';
import { OperatorType } from 'types';

let initialState: CalculatorStateType;

const value = '2';
const longValue = '0.12345678910111';
const dotValue = '.';
const dotZero = '0.';
const errorUndefined = 'Не определено';
const errorOperatorNotSpecified = 'Оператор не указан';
const zeroValue = '0';
const divisionOperator: OperatorType = '/';
const multiplicationOperator: OperatorType = 'X';
const additionOperator: OperatorType = '+';
const subtractionOperator: OperatorType = '-';

beforeEach(() => {
  initialState = {
    visibleValue: '',
    saveValue: '',
    operator: null,
    isCompute: false,
  };
});

describe('calculator reducer action setValue', () => {
  test('set small value', () => {
    const action = setValue(value);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe(value);
    expect(endState.isCompute).toBe(true);
  });

  test('set value longer than 16 characters ', () => {
    initialState.visibleValue = longValue;
    const actionLongValue = setValue(longValue);

    const endStateLong = calculatorReducer(initialState, actionLongValue);

    expect(endStateLong).not.toBe(initialState);
    expect(endStateLong.visibleValue).toBe(longValue);

    const actionSmallValue = setValue(value);
    const endStateSmallValue = calculatorReducer(endStateLong, actionSmallValue);

    expect(endStateSmallValue).not.toBe(initialState);
    expect(endStateSmallValue.visibleValue).toBe(longValue);
    expect(endStateSmallValue.visibleValue).toBe(endStateLong.visibleValue);
  });

  test('set point value when no value', () => {
    const action = setValue(dotValue);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).not.toBe(dotValue);
    expect(endState.visibleValue).toBe(dotZero);
  });

  test('clearing errors undefined', () => {
    initialState.visibleValue = errorUndefined;

    const action = setValue(value);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe(value);
  });

  test('clearing errors operator not specified', () => {
    initialState.visibleValue = errorOperatorNotSpecified;

    const action = setValue(value);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe(value);
  });
});

describe('calculator reducer action setOperator', () => {
  test('set division operator', () => {
    const action = setOperator(divisionOperator);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.operator).toBe(divisionOperator);
  });

  test('set multiplication operator', () => {
    const action = setOperator(multiplicationOperator);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.operator).toBe(multiplicationOperator);
  });

  test('set addition operator', () => {
    const action = setOperator(additionOperator);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.operator).toBe(additionOperator);
  });

  test('set subtraction operator', () => {
    const action = setOperator(subtractionOperator);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.operator).toBe(subtractionOperator);
  });

  test('set null operator', () => {
    initialState.operator = subtractionOperator;

    const action = setOperator(null);

    const endStateNull = calculatorReducer(initialState, action);

    expect(endStateNull).not.toBe(initialState);
    expect(endStateNull.operator).toBe(null);
  });

  test('set operator when value initial', () => {
    const action = setOperator(subtractionOperator);

    const endState = calculatorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.operator).toBe(subtractionOperator);
    expect(endState.visibleValue).toBe(zeroValue);
  });
});

describe('calculator reducer action getResult', () => {
  test('get Result additions', () => {
    initialState.saveValue = value;
    initialState.visibleValue = zeroValue;
    initialState.operator = additionOperator;

    const actionResult = getResult();

    const endState = calculatorReducer(initialState, actionResult);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe(value);
  });

  test('get Result subtraction', () => {
    initialState.saveValue = zeroValue;
    initialState.visibleValue = value;
    initialState.operator = subtractionOperator;

    const actionResult = getResult();

    const endState = calculatorReducer(initialState, actionResult);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe(String(-value));
  });

  test('get Result multiplication', () => {
    initialState.saveValue = zeroValue;
    initialState.visibleValue = value;
    initialState.operator = multiplicationOperator;

    const actionResult = getResult();

    const endState = calculatorReducer(initialState, actionResult);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe(zeroValue);
  });

  test('get Result division', () => {
    initialState.visibleValue = value;
    initialState.operator = divisionOperator;

    const actionResult = getResult();

    const endState = calculatorReducer(initialState, actionResult);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe(zeroValue);
  });

  test('get Result division by zero', () => {
    initialState.saveValue = value;
    initialState.visibleValue = zeroValue;
    initialState.operator = divisionOperator;

    const actionResult = getResult();

    const endState = calculatorReducer(initialState, actionResult);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe(errorUndefined);
  });

  test('get Result division rounded value', () => {
    initialState.saveValue = '0.00121551122255';
    initialState.visibleValue = value;
    initialState.operator = divisionOperator;

    const actionResult = getResult();

    const endState = calculatorReducer(initialState, actionResult);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe('0.00060775561127');
  });
});

describe('calculator reducer action resetValue', () => {
  test('reset value', () => {
    initialState.visibleValue = value;

    const actionResult = resetValue();

    const endState = calculatorReducer(initialState, actionResult);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe('');
  });
});

describe('calculator reducer action setIsConstructor', () => {
  test('set is constructor', () => {
    initialState.visibleValue = value;

    const actionResult = setIsConstructor(false);

    const endState = calculatorReducer(initialState, actionResult);

    expect(endState).not.toBe(initialState);
    expect(endState.visibleValue).toBe('');
  });
});
