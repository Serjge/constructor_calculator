import { DragEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BOARD_TYPE } from 'const';
import { Board } from 'enum';
import { setOverBoard } from 'store/action';
import { selectCurrentBoardDrag } from 'store/selectors';

type UseSetOverWhichBoardType = (
  e: DragEvent<HTMLDivElement>,
  background: string,
) => void;

export const useSetOverWhichBoard = (): UseSetOverWhichBoardType => {
  const currentBoardDrag = useSelector(selectCurrentBoardDrag);
  const dispatch = useDispatch();

  return (e: DragEvent<HTMLDivElement>, background: string): void => {
    const { currency } = e.currentTarget.dataset;

    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = background;
    }

    if (BOARD_TYPE.includes(currency!) && currentBoardDrag !== currency) {
      dispatch(setOverBoard({ typeBoard: currency as Board }));
    }
  };
};
