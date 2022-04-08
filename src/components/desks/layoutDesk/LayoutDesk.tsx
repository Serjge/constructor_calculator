import { DragEvent, memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Wrapper } from './style';

import { BOARD_COMPONENTS } from 'const';
import { useSetOverWhichBoard } from 'hooks';
import { Leaf } from 'icon/Leaf';
import {
  addBoard,
  deleteBoard,
  setCurrentBoardDragId,
  setLastElementLayoutDesk,
  setOrder,
} from 'store/action';
import {
  selectCurrentBoard,
  selectCurrentBoardDragId,
  selectLastBoardId,
  selectSortSelectedElements,
} from 'store/selectors';

const EMPTY_ARRAY = 0;

export const LayoutDesk = memo((): ReactElement => {
  const dispatch = useDispatch();

  const setOverWhichBoard = useSetOverWhichBoard();

  const lastBoardId = useSelector(selectLastBoardId);
  const currentBoard = useSelector(selectCurrentBoard);
  const selectedBoards = useSelector(selectSortSelectedElements);
  const currentBoardDragId = useSelector(selectCurrentBoardDragId);

  const dragOverHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setOverWhichBoard(e, '#F0F9FF', true);

    if (!currentBoard!.isAddLayout && !lastBoardId) {
      if (selectedBoards.length !== EMPTY_ARRAY) {
        dispatch(setLastElementLayoutDesk({ isLastElementLayoutDesk: true }));
      }
    }
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    setOverWhichBoard(e, 'none', false);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = 'none';
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, draggableBoardId: string): void => {
    e.preventDefault();

    e.currentTarget.style.background = 'none';

    if (currentBoard!.isAddLayout) {
      dispatch(setOrder({ draggableBoardId }));
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
    draggableBoardId: string,
  ): void => {
    if (currentBoardDragId !== draggableBoardId) {
      dispatch(setCurrentBoardDragId(draggableBoardId));
    }
  };

  if (selectedBoards.length === EMPTY_ARRAY) {
    return (
      <Wrapper
        onDrop={dropLayoutDeskHandler}
        onDragOver={e => dragOverHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
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
            onDragStart={(e: DragEvent<HTMLDivElement>) => dragStartHandler(e, board.id)}
            onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, board.id)}
            draggable={isDraggableNumberDisplay}
          />
        );
      })}
    </div>
  );
});
