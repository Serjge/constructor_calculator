import { BoardType } from 'types';

const ONE = 1;
const MINUS_ONE = -1;

export const sortBoards = (a: BoardType, b: BoardType): number => {
  if (a.order > b.order) {
    return ONE;
  }
  return MINUS_ONE;
};
