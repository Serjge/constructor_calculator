import { HTMLAttributes } from 'react';

import { Board } from 'enum';

export type BoardType = {
  id: string;
  type: Board;
  isDisable: boolean;
  isAddLayout: boolean;
  isOverBoard: boolean;
  isLastElementLayoutDesk: boolean;
};

export type BoardPropsType = HTMLAttributes<HTMLElement> & {
  isDisable?: boolean;
  desk?: 'elements' | 'layout';
};
