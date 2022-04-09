import { DragEvent, memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Wrapper } from './style';

import { Toggle } from 'components/toggle';
import { BOARD_COMPONENTS } from 'const';
import { Board } from 'enum';
import { useSetOverWhichBoard } from 'hooks';
import { Leaf } from 'icon';
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
  selectIsConstructor,
  selectLastBoardId,
  selectSortSelectedElements,
} from 'store/selectors';
import { WrapperDesk } from 'style';

const EMPTY_ARRAY = 0;

export const LayoutDesk = memo((): ReactElement => {
  const dispatch = useDispatch();

  const setOverWhichBoard = useSetOverWhichBoard();

  const lastBoardId = useSelector(selectLastBoardId);
  const currentBoard = useSelector(selectCurrentBoard);
  const selectedBoards = useSelector(selectSortSelectedElements);
  const currentBoardDragId = useSelector(selectCurrentBoardDragId);
  const isConstructor = useSelector(selectIsConstructor);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setOverWhichBoard(e, '#F0F9FF', true);

    if (!currentBoard!.isAddLayout && !lastBoardId) {
      if (selectedBoards.length !== EMPTY_ARRAY) {
        dispatch(setLastElementLayoutDesk({ isLastElementLayoutDesk: true }));
      }
    }
  };

  const handleDropToBoard = (
    e: DragEvent<HTMLDivElement>,
    draggableBoardId: string,
  ): void => {
    e.preventDefault();
    e.currentTarget.style.background = 'none';

    if (currentBoard!.isAddLayout) {
      dispatch(setOrder({ draggableBoardId }));
    }
    dispatch(setCurrentBoardDragId(null));
  };

  const handleDropToLayoutDesk = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();

    if (currentBoard) {
      if (!currentBoard.isAddLayout) {
        dispatch(addBoard(currentBoard));
      }
    }
    dispatch(setCurrentBoardDragId(null));
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    setOverWhichBoard(e, 'none', false);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = 'none';
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    draggableBoardId: string,
  ): void => {
    if (currentBoardDragId !== draggableBoardId) {
      dispatch(setCurrentBoardDragId(draggableBoardId));
    }
  };

  const deleteBoardToLayoutDesk = (boardId: string): void => {
    dispatch(deleteBoard(boardId));
  };

  const boards = selectedBoards.map(
    ({
      isAddLayout,
      id,
      type,
      isDisable,
      dataCurrency,
      isLastElementLayoutDesk,
      isOverBoard,
    }) => {
      const BoardComponent = BOARD_COMPONENTS[type];
      const isDraggableNumberDisplay = type !== Board.NumberDisplay;

      if (isConstructor) {
        return (
          <BoardComponent
            key={id}
            isDraggable={!isDisable}
            isOverBoard={isOverBoard}
            isAddLayout={isAddLayout}
            data-currency={dataCurrency}
            isOverDesk={isLastElementLayoutDesk}
            draggable={isDraggableNumberDisplay}
            onDragEnd={(e: DragEvent<HTMLDivElement>) => handleDragEnd(e)}
            onDragOver={(e: DragEvent<HTMLDivElement>) => handleDragOver(e)}
            onDragLeave={(e: DragEvent<HTMLDivElement>) => handleDragLeave(e)}
            onDrop={(e: DragEvent<HTMLDivElement>) => handleDropToBoard(e, id)}
            onDragStart={(e: DragEvent<HTMLDivElement>) => handleDragStart(e, id)}
            onDoubleClick={() => deleteBoardToLayoutDesk(id)}
          />
        );
      }

      return (
        <BoardComponent key={id} isAddLayout={isAddLayout} data-currency={dataCurrency} />
      );
    },
  );

  if (selectedBoards.length === EMPTY_ARRAY) {
    return (
      <div>
        <Toggle />
        <Wrapper
          data-currency="emptyDesk"
          onDrop={handleDropToLayoutDesk}
          onDragOver={e => handleDragOver(e)}
          onDragLeave={e => handleDragLeave(e)}
        >
          <Leaf />
          <div>
            <span>Перетащите сюда</span>любой элемент из левой панели
          </div>
        </Wrapper>
      </div>
    );
  }

  return (
    <div>
      <Toggle />
      {isConstructor ? (
        <WrapperDesk
          isVisible
          data-currency="filledDesk"
          onDrop={handleDropToLayoutDesk}
          onDragOver={(e: DragEvent<HTMLDivElement>) => handleDragOver(e)}
        >
          {boards}
        </WrapperDesk>
      ) : (
        <WrapperDesk isVisible data-currency="filledDesk">
          {boards}
        </WrapperDesk>
      )}
    </div>
  );
});
