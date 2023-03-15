import { Board } from 'enum';
import {
  addBoard,
  deleteBoard,
  setCurrentBoardDrag,
  setIsConstructor,
} from 'store/action';
import { constructorReducer, ConstructorStateType } from 'store/reducer';

let initialState: ConstructorStateType;

enum ElementArray {
  Zero,
  First,
  Second,
  Third,
}

let board: Board;

beforeEach(() => {
  initialState = {
    calculatorElements: [
      Board.NumberDisplay,
      Board.Operators,
      Board.Numbers,
      Board.EqualsSing,
    ],
    selectedElements: [],
    isConstructor: true,
    currentBoardDrag: null,
    lastBoardId: null,
  };
});

describe('constructor reducer action setIsConstructor', () => {
  test('set value', () => {
    const action = setIsConstructor(false);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.isConstructor).toBe(false);
  });
});

describe('constructor reducer action setCurrentBoardDrag', () => {
  test('set id board', () => {
    board = Board.Operators;
    const action = setCurrentBoardDrag(board);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.currentBoardDrag).toBe(board);
  });

  test('set null', () => {
    initialState.currentBoardDrag = Board.Operators;
    const action = setCurrentBoardDrag(null);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.currentBoardDrag).toBe(null);
  });
});

describe('constructor reducer action addBoard', () => {
  test('add Number Display board to empty desk', () => {
    board = Board.NumberDisplay;
    const action = addBoard({ board });

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.calculatorElements[ElementArray.Zero]).toBe(Board.NumberDisplay);
    expect(endState.selectedElements[ElementArray.Zero]).toBe(Board.NumberDisplay);
    expect(endState.lastBoardId).toBe(null);
  });

  test('add other board to empty desk', () => {
    board = Board.Numbers;

    const action = addBoard({ board });

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero]).toBe(Board.Numbers);
    expect(endState.lastBoardId).toBe(null);
  });

  test('add Number Display board to filled desk', () => {
    initialState.selectedElements[ElementArray.Zero] = Board.EqualsSing;
    board = Board.NumberDisplay;

    const action = addBoard({ board });

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero]).toBe(Board.NumberDisplay);
    expect(endState.selectedElements[ElementArray.First]).toBe(Board.EqualsSing);
  });

  test('add other board to filled desk where there is Number Display', () => {
    initialState.selectedElements[ElementArray.Zero] = Board.NumberDisplay;
    board = Board.EqualsSing;

    const action = addBoard({ board });

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero]).toBe(Board.NumberDisplay);
    expect(endState.selectedElements[ElementArray.First]).toBe(Board.EqualsSing);
  });
});

describe('constructor reducer action deleteBoard', () => {
  test('delete board to filled desk', () => {
    initialState.selectedElements[ElementArray.Zero] = Board.Numbers;

    const action = deleteBoard(Board.Numbers);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero]).toBeUndefined();
    expect(endState.calculatorElements[ElementArray.Second]).toBe(Board.Numbers);
  });
});
