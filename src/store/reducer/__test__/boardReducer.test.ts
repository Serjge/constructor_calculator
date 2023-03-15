import { Board } from 'enum';
import { setLastElementLayoutDesk, setOverBoard } from 'store/action';
import { BoardStateType, boardReducer } from 'store/reducer';

export {};

let initialState: BoardStateType;

let board: Board;

beforeEach(() => {
  initialState = {
    overBoard: null,
    lastElementLayoutDesk: null,
  };
});
//

describe('board reducer action setOverBoard', () => {
  test('change flag to false last board to filled desk', () => {
    board = Board.Operators;
    const action = setOverBoard({ typeBoard: board });

    const endState = boardReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.overBoard).toBe(Board.Operators);
  });
});

describe('board reducer action setLastElementLayoutDesk', () => {
  test('change flag to true last board to filled desk', () => {
    board = Board.Operators;

    const action = setLastElementLayoutDesk({ typeBoard: board });

    const endState = boardReducer(initialState, action);

    expect(endState).not.toBe(initialState);
    expect(endState.lastElementLayoutDesk).toBe(Board.Operators);
  });
});
