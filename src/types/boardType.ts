import { ComponentsBoardsType } from 'types';

export type BoardType = {
  id: string;
  type: ComponentsBoardsType;
  isDisable: boolean;
  dataCurrency: ComponentsBoardsType;
  isAddLayout: boolean;
  order: number;
};
