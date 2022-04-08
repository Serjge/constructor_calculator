import React, { DragEvent, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Wrapper } from './style';

import { BOARD_COMPONENTS } from 'const';
import { Board, Desks } from 'enum';
import { Leaf } from 'icon/Leaf';
import {
  addBoard,
  deleteBoard,
  setCurrentBoardDragId,
  setLastElementLayoutDesk,
  setOrder,
  setOverBoard,
} from 'store/action';
import {
  selectCalculatorElements,
  selectCurrentBoardDragId,
  selectSelectedElements,
} from 'store/selectors';
import { selectLastBoardId } from 'store/selectors/selectConstructor';
import { BoardType } from 'types';

const EMPTY_ARRAY = 0;

export const LayoutDesk = (): ReactElement => {
  const dispatch = useDispatch();

  const boards = useSelector(selectCalculatorElements);
  const selectedBoards = useSelector(selectSelectedElements);
  const currentBoardDragId = useSelector(selectCurrentBoardDragId);
  const lastBoardId = useSelector(selectLastBoardId);

  const currentBoard = boards.find(({ id }) => currentBoardDragId === id);

  const dragOverHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const { currency } = e.currentTarget.dataset;
    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = ' #F0F9FF';
    }
    if (currency === 'operators') {
      const { isOverBoard } = selectedBoards.find(
        ({ type }) => type === Board.Operators,
      )!;

      if (!isOverBoard) {
        dispatch(setOverBoard({ isOverBoard: true, typeBoard: Board.Operators }));
      }
    }
    if (currency === 'numbers') {
      const { isOverBoard } = selectedBoards.find(({ type }) => type === Board.Numbers)!;

      if (!isOverBoard) {
        dispatch(setOverBoard({ isOverBoard: true, typeBoard: Board.Numbers }));
      }
    }
    if (currency === 'equalsSing') {
      const { isOverBoard } = selectedBoards.find(
        ({ type }) => type === Board.EqualsSing,
      )!;

      if (!isOverBoard) {
        dispatch(setOverBoard({ isOverBoard: true, typeBoard: Board.EqualsSing }));
      }
    }

    if (!currentBoard!.isAddLayout && !lastBoardId) {
      if (selectedBoards.length !== EMPTY_ARRAY) {
        dispatch(setLastElementLayoutDesk({ isLastElementLayoutDesk: true }));
      }
    }
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    const { currency } = e.currentTarget.dataset;
    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = 'none';
    }
    if (currency === Board.Operators) {
      const { isOverBoard } = selectedBoards.find(
        ({ type }) => type === Board.Operators,
      )!;

      if (isOverBoard) {
        dispatch(setOverBoard({ isOverBoard: false, typeBoard: Board.Operators }));
      }
    }
    if (currency === Board.Numbers) {
      const { isOverBoard } = selectedBoards.find(({ type }) => type === Board.Numbers)!;

      if (isOverBoard) {
        dispatch(setOverBoard({ isOverBoard: false, typeBoard: Board.Numbers }));
      }
    }
    if (currency === Board.EqualsSing) {
      const { isOverBoard } = selectedBoards.find(
        ({ type }) => type === Board.EqualsSing,
      )!;

      if (isOverBoard) {
        dispatch(setOverBoard({ isOverBoard: false, typeBoard: Board.EqualsSing }));
      }
    }
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = 'none';
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, draggableBoard: BoardType): void => {
    e.preventDefault();

    e.currentTarget.style.background = 'none';
    if (currentBoard!.isAddLayout) {
      dispatch(setOrder({ draggableBoardId: draggableBoard.id }));
    }
    dispatch(setCurrentBoardDragId(null));
  };

  const onDoubleClick = (boardId: string): void => {
    dispatch(deleteBoard(boardId));
  };

  const dropLayoutDeskHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();

    if (currentBoard) {
      if (!currentBoard.isAddLayout) {
        dispatch(addBoard(currentBoard));
      }
    }
    dispatch(setCurrentBoardDragId(null));
  };

  const dragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    board: number,
    draggableBoard: BoardType,
  ): void => {
    if (currentBoardDragId !== draggableBoard.id) {
      dispatch(setCurrentBoardDragId(draggableBoard.id));
    }
  };

  if (selectedBoards.length === EMPTY_ARRAY) {
    return (
      <Wrapper
        onDrop={dropLayoutDeskHandler}
        onDragOver={e => dragOverHandler(e)}
        onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
        data-currency="emptyDesk"
      >
        <Leaf />
        <div>
          <span>Перетащите сюда</span>любой элемент из левой панели
        </div>
      </Wrapper>
    );
  }

  return (
    <div
      style={{ margin: '30px', width: '243px', height: '480px' }}
      onDrop={dropLayoutDeskHandler}
      onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
      data-currency="filledDesk"
    >
      {selectedBoards.map(board => {
        const BoardComponent = BOARD_COMPONENTS[board.type];
        const isDraggableNumberDisplay = board.type !== 'numberDisplay';
        return (
          <BoardComponent
            isOverBoard={board.isOverBoard}
            isOverDesk={board.isLastElementLayoutDesk}
            isAddLayout={board.isAddLayout}
            isDraggable={!board.isDisable}
            key={board.id}
            data-currency={board.dataCurrency}
            onDoubleClick={() => onDoubleClick(board.id)}
            onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
            onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
            onDragStart={(e: DragEvent<HTMLDivElement>) =>
              dragStartHandler(e, Desks.Layout, board)
            }
            onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, board)}
            onDragCapture={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            draggable={isDraggableNumberDisplay}
          />
        );
      })}
    </div>
  );
};
