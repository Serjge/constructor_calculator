import React, { ReactElement, DragEvent, SetStateAction, Dispatch } from 'react';

import { Wrapper } from 'components/desks/layoutDesk/style';
import { BOARD_COMPONENTS } from 'const';
import { Desks } from 'enum';
import { Leaf } from 'icon/Leaf';
import { BoardType } from 'types';
import { sortBoards } from 'utils';

type LayoutDeskPropsType = {
  twoBoards: BoardType[];
  setTwoBoards: Dispatch<SetStateAction<BoardType[]>>;
  setOneBoards: Dispatch<SetStateAction<BoardType[]>>;
  oneBoards: BoardType[];
  currentBoard: BoardType | null;
  setCurrentBoard: Dispatch<SetStateAction<BoardType | null>>;
};

const ZERO = 0;

export const LayoutDesk = ({
  setOneBoards,
  oneBoards,
  currentBoard,
  setCurrentBoard,
  twoBoards,
  setTwoBoards,
}: LayoutDeskPropsType): ReactElement => {
  const dragOverHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const { currency } = e.currentTarget.dataset;
    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = ' #F0F9FF';
    }
    if (currency === 'numberDisplay') {
      e.currentTarget.style.cursor = 'not-allowed';
      // e.currentTarget.style.background = ' red ';
    }
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    const { currency } = e.currentTarget.dataset;
    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = 'none';
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
            e.currentTarget.style.cursor = 'not-allowed';
            return board;
          }
          if (board.id === draggableBoard!.id) {
            return { ...board, order: currentBoard!.order };
          }
          if (board.id === currentBoard!.id) {
            return { ...board, order: draggableBoard!.order };
          }
          return board;
        }),
      );
    }
  };

  const onDoubleClick = (draggableBoard: BoardType): void => {
    setTwoBoards(twoBoards.filter(item => item.id !== draggableBoard.id));
    setOneBoards(
      oneBoards.map(board =>
        board.id === draggableBoard.id ? { ...board, isDisable: false } : board,
      ),
    );
  };

  const dropLayoutDeskHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (currentBoard) {
      if (!currentBoard.isAddLayout) {
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
          twoBoards.map(board =>
            board.id === currentBoard.id ? { ...board, isAddLayout: true } : board,
          ),
        );
      }
    }
  };
  const dragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    board: number,
    draggableBoard: BoardType,
  ): void => {
    setCurrentBoard(draggableBoard);
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
      {twoBoards.sort(sortBoards).map(item => {
        const BoardComponent = BOARD_COMPONENTS[item.type];
        const isDraggableNumberDisplay = item.type !== 'numberDisplay';
        return (
          <BoardComponent
            key={item.id}
            data-currency={item.dataCurrency}
            onDoubleClick={() => onDoubleClick(item)}
            style={{ opacity: item.isDisable ? '0.5' : '1' }}
            onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
            onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
            onDragStart={(e: DragEvent<HTMLDivElement>) =>
              dragStartHandler(e, Desks.Layout, item)
            }
            onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, item)}
            onDragCapture={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            draggable={isDraggableNumberDisplay}
          />
        );
      })}
    </div>
  );
};
