import { DragEvent, FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Board } from 'enum';
import { useSetOverWhichBoard } from 'hooks';
import {
  addBoard,
  deleteBoard,
  setCurrentBoardDrag,
  setLastElementLayoutDesk,
  setOrder,
} from 'store/action';
import {
  selectCurrentBoard,
  selectCurrentBoardDrag,
  selectSelectedElements,
} from 'store/selectors';
import { selectBoards } from 'store/selectors/selectBoard';

type DraggableProps = {
  type: Board;
};

const LAST_ELEMENT_ARRAY = 1;

export const Draggable: FC<DraggableProps> = ({ type, children }) => {
  const dispatch = useDispatch();

  const setOverWhichBoard = useSetOverWhichBoard();

  const selectedBoards = useSelector(selectSelectedElements);
  const currentBoardDrag = useSelector(selectCurrentBoardDrag);
  const board = useSelector(selectBoards);
  const currentBoard = useSelector(selectCurrentBoard);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setOverWhichBoard(e, '#F0F9FF', true);
  };

  const handleDropToBoard =
    (draggableBoardId: string) =>
    (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      setOverWhichBoard(e, 'none', false);
      e.stopPropagation();

      const dragBoardLayoutDesk = selectedBoards.find(el => el === currentBoard);
      const destinationIndex = selectedBoards.findIndex(el => el === draggableBoardId);
      if (dragBoardLayoutDesk) {
        const sourceIndex = selectedBoards.findIndex(el => el === currentBoardDrag);
        const destinationBoard = selectedBoards[destinationIndex];

        if (destinationBoard !== Board.NumberDisplay) {
          dispatch(setOrder({ sourceIndex, destinationIndex }));
        }
      } else if (currentBoard) {
        if (!board[currentBoard].isAddLayout) {
          dispatch(addBoard({ board: currentBoard, destinationIndex }));
        }
      }
      dispatch(setCurrentBoardDrag(null));
      dispatch(
        setLastElementLayoutDesk({
          isLastElementLayoutDesk: false,
          typeBoard: selectedBoards[selectedBoards.length - LAST_ELEMENT_ARRAY],
        }),
      );
    };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    setOverWhichBoard(e, 'none', false);
    e.stopPropagation();
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = 'none';
    e.stopPropagation();
  };

  const handleDragStart = (draggableBoardId: Board) => () => {
    dispatch(setCurrentBoardDrag(draggableBoardId));
  };

  const deleteBoardToLayoutDesk = (boardId: Board) => () => {
    dispatch(deleteBoard(boardId));
  };

  const isDraggableNumberDisplay = type !== Board.NumberDisplay;

  return (
    <div
      data-currency={type}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropToBoard(type)}
      onDragStart={handleDragStart(type)}
      draggable={isDraggableNumberDisplay}
      onDoubleClick={deleteBoardToLayoutDesk(type)}
    >
      {children}
    </div>
  );
};
