import React, { Dispatch, DragEvent, ReactElement, SetStateAction } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Wrapper } from './style';

import { BOARD_COMPONENTS } from 'const';
import { Desks } from 'enum';
import { Leaf } from 'icon/Leaf';
import { addBoard, setCurrentBoardDragId } from 'store/action';
import { selectCalculatorElements } from 'store/selectors';
import { selectCurrentBoardDragId } from 'store/selectors/selectConstructor';
import { BoardType } from 'types';
import { sortBoards } from 'utils';

type LayoutDeskPropsType = {
  twoBoards: BoardType[];
  setTwoBoards: Dispatch<SetStateAction<BoardType[]>>;
  setOneBoards: Dispatch<SetStateAction<BoardType[]>>;
  oneBoards: BoardType[];
};

const ZERO = 0;

export const LayoutDesk = ({
  setOneBoards,
  oneBoards,
  twoBoards,
  setTwoBoards,
}: LayoutDeskPropsType): ReactElement => {
  const dispatch = useDispatch();

  const boards = useSelector(selectCalculatorElements);
  // const boards2 = useSelector(selectSelectedElements);
  const currentBoardDragId = useSelector(selectCurrentBoardDragId);

  const currentBoard = boards.find(({ id }) => currentBoardDragId === id);

  const dragOverHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const { currency } = e.currentTarget.dataset;
    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = ' #F0F9FF';
    }
    if (currency === 'operators') {
      setTwoBoards(
        twoBoards.map(board =>
          board.type === 'operators' ? { ...board, isOverBoard: true } : board,
        ),
      );
    }
    if (currency === 'numbers') {
      setTwoBoards(
        twoBoards.map(board =>
          board.type === 'numbers' ? { ...board, isOverBoard: true } : board,
        ),
      );
    }
    if (currency === 'equalsSing') {
      setTwoBoards(
        twoBoards.map(board =>
          board.type === 'equalsSing' ? { ...board, isOverBoard: true } : board,
        ),
      );
    }

    if (!currentBoard!.isAddLayout) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const indexLastBoard = twoBoards.length - 1;
      const lastElement = twoBoards[indexLastBoard];
      setTwoBoards(
        twoBoards.map(board =>
          board.id === lastElement.id
            ? { ...board, isLastElementLayoutDesk: true }
            : board,
        ),
      );
    }
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    const { currency } = e.currentTarget.dataset;
    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = 'none';
    }
    if (currency === 'operators') {
      setTwoBoards(
        twoBoards.map(board =>
          board.type === 'operators' ? { ...board, isOverBoard: false } : board,
        ),
      );
    }
    if (currency === 'numbers') {
      setTwoBoards(
        twoBoards.map(board =>
          board.type === 'numbers' ? { ...board, isOverBoard: false } : board,
        ),
      );
    }
    if (currency === 'equalsSing') {
      setTwoBoards(
        twoBoards.map(board =>
          board.type === 'equalsSing' ? { ...board, isOverBoard: false } : board,
        ),
      );
    }
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = 'none';
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, draggableBoard: BoardType): void => {
    e.preventDefault();
    e.currentTarget.style.background = 'none';
    if (currentBoard!.isAddLayout) {
      setTwoBoards(
        twoBoards.map(board => {
          if (board.type === 'numberDisplay') {
            return board;
          }
          if (board.id === draggableBoard!.id) {
            return {
              ...board,
              order: currentBoard!.order,
              isLastElementLayoutDesk: false,
              isOverBoard: false,
            };
          }
          if (board.id === currentBoard!.id) {
            return {
              ...board,
              order: draggableBoard!.order,
              isLastElementLayoutDesk: false,
              isOverBoard: false,
            };
          }
          return { ...board, isLastElementLayoutDesk: false, isOverBoard: false };
        }),
      );
    }
    dispatch(setCurrentBoardDragId(null));
  };

  const onDoubleClick = (draggableBoard: BoardType): void => {
    setTwoBoards(twoBoards.filter(item => item.id !== draggableBoard.id));

    setOneBoards(
      oneBoards.map(board =>
        board.id === draggableBoard.id
          ? { ...board, isDisable: false, isAddLayout: false }
          : board,
      ),
    );
  };

  const dropLayoutDeskHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();

    if (currentBoard) {
      if (!currentBoard.isAddLayout) {
        dispatch(addBoard(currentBoard));
        if (currentBoard.type === 'numberDisplay') {
          twoBoards.unshift(currentBoard);
        } else {
          twoBoards.push(currentBoard);
        }
        setOneBoards(
          oneBoards.map(board =>
            board.id === currentBoard!.id
              ? { ...board, isDisable: true, isAddLayout: true }
              : board,
          ),
        );

        setTwoBoards(
          twoBoards.map(board => {
            if (board.id === currentBoard.id) {
              return {
                ...board,
                isAddLayout: true,
                isDisable: currentBoard.type === 'numberDisplay',
                isLastElementLayoutDesk: false,
              };
            }
            return { ...board, isLastElementLayoutDesk: false };
          }),
        );
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

  if (twoBoards.length === ZERO) {
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
      {twoBoards.sort(sortBoards).map(board => {
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
            onDoubleClick={() => onDoubleClick(board)}
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
