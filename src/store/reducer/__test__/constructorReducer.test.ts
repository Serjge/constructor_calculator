import { Board } from 'enum';
import {
  addBoard,
  deleteBoard,
  setCurrentBoardDragId,
  setIsConstructor,
  setLastElementLayoutDesk,
  setOrder,
  setOverBoard,
} from 'store/action';
import { constructorReducer, ConstructorStateType } from 'store/reducer';
import { BoardType } from 'types';

let initialState: ConstructorStateType;

enum ElementArray {
  Zero,
  First,
  Second,
  Third,
}

const value = '2';
let board: BoardType;
let id: string;

beforeEach(() => {
  initialState = {
    calculatorElements: [
      {
        id: '1',
        type: 'numberDisplay',
        isDisable: false,
        dataCurrency: 'numberDisplay',
        isAddLayout: false,
        order: 1,
        isOverBoard: false,
        isLastElementLayoutDesk: false,
      },
      {
        id: '2',
        type: 'operators',
        isDisable: false,
        dataCurrency: 'operators',
        isAddLayout: false,
        order: 2,
        isOverBoard: false,
        isLastElementLayoutDesk: false,
      },
      {
        id: '3',
        type: 'numbers',
        isDisable: false,
        dataCurrency: 'numbers',
        isAddLayout: false,
        order: 3,
        isOverBoard: false,
        isLastElementLayoutDesk: false,
      },
      {
        id: '4',
        type: 'equalsSing',
        isDisable: false,
        dataCurrency: 'equalsSing',
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

  board = {
    id: '1',
    type: 'numberDisplay',
    isDisable: false,
    dataCurrency: 'numberDisplay',
    isAddLayout: false,
    order: 1,
    isOverBoard: false,
    isLastElementLayoutDesk: false,
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

describe('constructor reducer action setCurrentBoardDragId', () => {
  test('set id board', () => {
    id = '2';
    const action = setCurrentBoardDragId(id);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.currentBoardDragId).toBe(id);
  });

  test('set null', () => {
    initialState.currentBoardDragId = value;
    const action = setCurrentBoardDragId(null);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.currentBoardDragId).toBe(null);
  });
});

describe('constructor reducer action addBoard', () => {
  test('add Number Display board to empty desk', () => {
    id = '1';
    const action = addBoard(board);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero].type).toBe(Board.NumberDisplay);
    expect(endState.selectedElements[ElementArray.Zero].id).toBe(id);
    expect(endState.selectedElements[ElementArray.Zero].isAddLayout).toBe(true);
    expect(endState.selectedElements[ElementArray.Zero].isDisable).toBe(true);
    expect(endState.calculatorElements[ElementArray.Zero].isDisable).toBe(true);
    expect(endState.calculatorElements[ElementArray.Zero].isAddLayout).toBe(true);
    expect(endState.lastBoardId).toBe(null);
  });

  test('add other board to empty desk', () => {
    board = initialState.calculatorElements[ElementArray.Second];
    id = '3';
    const action = addBoard(board);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero].type).toBe(Board.Numbers);
    expect(endState.selectedElements[ElementArray.Zero].id).toBe(id);
    expect(endState.selectedElements[ElementArray.Zero].isAddLayout).toBe(true);
    expect(endState.selectedElements[ElementArray.Zero].isDisable).toBe(false);
    expect(endState.calculatorElements[ElementArray.Second].isDisable).toBe(true);
    expect(endState.calculatorElements[ElementArray.Second].isAddLayout).toBe(true);
    expect(endState.lastBoardId).toBe(null);
  });

  test('add Number Display board to filled desk', () => {
    initialState.selectedElements[ElementArray.Zero] =
      initialState.calculatorElements[ElementArray.Third];
    id = '1';

    const action = addBoard(board);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero].type).toBe(Board.NumberDisplay);
    expect(endState.selectedElements[ElementArray.First].type).toBe(Board.EqualsSing);
    expect(endState.selectedElements[ElementArray.Zero].id).toBe(id);
  });

  test('add other board to filled desk where there is Number Display', () => {
    initialState.selectedElements[ElementArray.Zero] =
      initialState.calculatorElements[ElementArray.Zero];
    board = initialState.calculatorElements[ElementArray.Third];
    id = '1';

    const action = addBoard(board);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero].id).toBe(id);
    expect(endState.selectedElements[ElementArray.Zero].type).toBe(Board.NumberDisplay);
    expect(endState.selectedElements[ElementArray.First].type).toBe(Board.EqualsSing);
  });

  test('change flag to false last board to filled desk ', () => {
    initialState.selectedElements[ElementArray.Zero] =
      initialState.calculatorElements[ElementArray.Zero];
    initialState.selectedElements[ElementArray.Zero].isLastElementLayoutDesk = true;
    id = '1';
    initialState.lastBoardId = id;
    board = initialState.calculatorElements[ElementArray.Third];

    const action = addBoard(board);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero].isLastElementLayoutDesk).toBe(
      false,
    );
    expect(endState.selectedElements[ElementArray.First].type).toBe(Board.EqualsSing);
  });
});

describe('constructor reducer action deleteBoard', () => {
  test('delete board to filled desk', () => {
    initialState.selectedElements[ElementArray.Zero] =
      initialState.calculatorElements[ElementArray.Second];
    initialState.calculatorElements[ElementArray.Second].isAddLayout = true;
    initialState.calculatorElements[ElementArray.Second].isDisable = true;
    id = '3';
    const action = deleteBoard(id);

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero]).toBeUndefined();
    expect(endState.calculatorElements[ElementArray.Second].isDisable).toBe(false);
    expect(endState.calculatorElements[ElementArray.Zero].isAddLayout).toBe(false);
  });
});

describe('constructor reducer action setOverBoard', () => {
  test('change flag to false last board to filled desk', () => {
    initialState.selectedElements[ElementArray.Zero] =
      initialState.calculatorElements[ElementArray.First];
    initialState.selectedElements[ElementArray.Zero].isOverBoard = true;

    const action = setOverBoard({ isOverBoard: false, typeBoard: Board.Operators });

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero].isOverBoard).toBe(false);
  });
});

describe('constructor reducer action setLastElementLayoutDesk', () => {
  test('change flag to true last board to filled desk', () => {
    initialState.selectedElements[ElementArray.Zero] =
      initialState.calculatorElements[ElementArray.First];
    initialState.selectedElements[ElementArray.Zero].isLastElementLayoutDesk = false;

    const action = setLastElementLayoutDesk({ isLastElementLayoutDesk: true });

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero].isLastElementLayoutDesk).toBe(
      true,
    );
  });
});

describe('constructor reducer action setLastElementLayoutDesk', () => {
  test('change order board to filled desk', () => {
    initialState.selectedElements[ElementArray.Zero] =
      initialState.calculatorElements[ElementArray.First];
    initialState.selectedElements[ElementArray.First] =
      initialState.calculatorElements[ElementArray.Second];
    initialState.currentBoardDragId = '3';

    id = '2';
    const action = setOrder({ draggableBoardId: id });

    const endState = constructorReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.selectedElements[ElementArray.Zero].order).toBe(ElementArray.Third);
    expect(endState.selectedElements[ElementArray.First].order).toBe(ElementArray.Second);
  });

  test('change order Number Display board to filled desk', () => {
    initialState.selectedElements[ElementArray.Zero] =
      initialState.calculatorElements[ElementArray.Zero];
    initialState.selectedElements[ElementArray.First] =
      initialState.calculatorElements[ElementArray.Second];
    initialState.currentBoardDragId = '3';

    id = '1';
    const action = setOrder({ draggableBoardId: id });

    const endState = constructorReducer(initialState, action);

    expect(endState).toBe(initialState);
  });
});
