import { DragEvent, useCallback } from 'react';

import { BOARD_TYPE } from 'const';
import { Board } from 'enum';
import { UseSetOverBoard } from 'hooks';

type UseQweType = (
  e: DragEvent<HTMLDivElement>,
  background: string,
  isOverBoard: boolean,
) => void;

export const useSetOverWhichBoard = (): UseQweType => {
  const setOverBoard = UseSetOverBoard();

  return useCallback(
    (e: DragEvent<HTMLDivElement>, background: string, isOverBoard: boolean): void => {
      const { currency } = e.currentTarget.dataset;

      if (currency === 'emptyDesk') {
        e.currentTarget.style.background = background;
      }

      if (BOARD_TYPE.includes(currency!)) {
        setOverBoard(currency, Board.Numbers, isOverBoard);
        setOverBoard(currency, Board.Operators, isOverBoard);
        setOverBoard(currency, Board.EqualsSing, isOverBoard);
      }
    },
    [],
  );
};
