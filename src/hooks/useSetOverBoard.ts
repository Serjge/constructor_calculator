import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Board } from 'enum';
import { setOverBoard } from 'store/action';
import { selectSelectedElements } from 'store/selectors';
import { selectBoards } from 'store/selectors/selectBoard';

type UseSetOverBoardType = (
  currency: string | undefined,
  typeBoard: Board,
  setIsOverBoard: boolean,
) => void;

export const UseSetOverBoard = (): UseSetOverBoardType => {
  const dispatch = useDispatch();

  const selectedBoards = useSelector(selectSelectedElements);
  const board = useSelector(selectBoards);

  return useCallback(
    (currency: string | undefined, typeBoard: Board, setIsOverBoard: boolean): void => {
      if (currency === typeBoard) {
        const { isOverBoard } = board[typeBoard];
        if (setIsOverBoard) {
          if (!isOverBoard) {
            dispatch(setOverBoard({ isOverBoard: setIsOverBoard, typeBoard }));
          }
        }

        if (!setIsOverBoard) {
          if (isOverBoard) {
            dispatch(setOverBoard({ isOverBoard: setIsOverBoard, typeBoard }));
          }
        }
      }
    },
    [selectedBoards],
  );
};
