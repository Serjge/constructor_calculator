import { HTMLAttributes } from 'react';

import { Board } from 'enum';

export type BoardType = {
  type: Board;
  isDisable: boolean;
  isAddLayout: boolean;
  isLastElementLayoutDesk: boolean;
};

export type BoardPropsType = HTMLAttributes<HTMLElement> & {
  isDisable?: boolean;
  desk?: 'elements' | 'layout';
};
