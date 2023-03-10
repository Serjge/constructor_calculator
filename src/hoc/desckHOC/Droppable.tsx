import { DragEvent, FC, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useSetOverWhichBoard } from 'hooks';
import { addBoard, setCurrentBoardDragId, setLastElementLayoutDesk } from 'store/action';
import {
  selectCurrentBoard,
  selectLastBoardId,
  selectSortSelectedElements,
} from 'store/selectors';

const EMPTY_ARRAY = 0;

export const Droppable: FC = ({ children }): ReactElement => {
  const dispatch = useDispatch();

  const setOverWhichBoard = useSetOverWhichBoard();

  const lastBoardId = useSelector(selectLastBoardId);
  const currentBoard = useSelector(selectCurrentBoard);
  const selectedBoards = useSelector(selectSortSelectedElements);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setOverWhichBoard(e, '#F0F9FF', true);

    if (!currentBoard!.isAddLayout && !lastBoardId) {
      if (selectedBoards.length !== EMPTY_ARRAY) {
        dispatch(setLastElementLayoutDesk({ isLastElementLayoutDesk: true }));
      }
    }
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

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropToLayoutDesk}
    >
      {children}
    </div>
  );
};
