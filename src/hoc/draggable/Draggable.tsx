import { DragEvent, FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Board } from 'enum';
import { useSetOverWhichBoard } from 'hooks';
import {
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

type DraggableProps = {
  id: string;
  type: string;
  desk?: 'elements' | 'layout';
  isDisable?: boolean;
};

export const Draggable: FC<DraggableProps> = ({
  id,
  type,
  desk = 'layout',
  children,
  isDisable,
}) => {
  const dispatch = useDispatch();

  const setOverWhichBoard = useSetOverWhichBoard();

  const lastBoardId = useSelector(selectLastBoardId);
  const currentBoard = useSelector(selectCurrentBoard);
  const selectedBoards = useSelector(selectSortSelectedElements);
  const currentBoardDragId = useSelector(selectCurrentBoardDragId);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setOverWhichBoard(e, '#F0F9FF', true);

    if (!currentBoard!.isAddLayout && !lastBoardId) {
      if (selectedBoards.length !== EMPTY_ARRAY) {
        dispatch(setLastElementLayoutDesk({ isLastElementLayoutDesk: true }));
      }
    }
  };

  const handleDropToBoard =
    (draggableBoardId: string) =>
    (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.currentTarget.style.background = 'none';

      if (currentBoard!.isAddLayout) {
        dispatch(setOrder({ draggableBoardId }));
      }
      dispatch(setCurrentBoardDragId(null));
    };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    setOverWhichBoard(e, 'none', false);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = 'none';
  };

  const handleDragStart = (draggableBoardId: string) => () => {
    if (currentBoardDragId !== draggableBoardId) {
      dispatch(setCurrentBoardDragId(draggableBoardId));
    }
  };

  const deleteBoardToLayoutDesk = (boardId: string) => () => {
    dispatch(deleteBoard(boardId));
  };

  const isDraggableNumberDisplay = type !== Board.NumberDisplay;

  if (desk === 'elements') {
    return (
      <div data-currency={type} onDragStart={handleDragStart(id)} draggable={!isDisable}>
        {children}
      </div>
    );
  }

  return (
    <div
      data-currency={type}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropToBoard(id)}
      onDragStart={handleDragStart(id)}
      draggable={isDraggableNumberDisplay}
      onDoubleClick={deleteBoardToLayoutDesk(id)}
    >
      {children}
    </div>
  );
};
