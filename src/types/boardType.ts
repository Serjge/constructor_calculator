import { HTMLAttributes } from 'react';

import { ComponentsBoardsType } from 'types';

export type BoardType = {
  id: string;
  type: ComponentsBoardsType;
  isDisable: boolean;
  dataCurrency: ComponentsBoardsType;
  isAddLayout: boolean;
  order: number;
  isOverBoard: boolean;
  isLastElementLayoutDesk: boolean;
};

export type BoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
  isDisable?: boolean;
  isVisible?: boolean;
};
