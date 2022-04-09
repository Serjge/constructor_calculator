import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setOverBoard } from 'store/action';
import { selectSelectedElements } from 'store/selectors';
import { ComponentsBoardsType } from 'types';

type UseSetOverBoardType = (
  currency: string | undefined,
  typeBoard: ComponentsBoardsType,
  setIsOverBoard: boolean,
) => void;

export const UseSetOverBoard = (): UseSetOverBoardType => {
  const dispatch = useDispatch();

  const selectedBoards = useSelector(selectSelectedElements);

  return useCallback(
    (
      currency: string | undefined,
      typeBoard: ComponentsBoardsType,
      setIsOverBoard: boolean,
    ): void => {
      if (currency === typeBoard) {
        const { isOverBoard } = selectedBoards.find(({ type }) => type === typeBoard)!;

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
