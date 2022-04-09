import React, { HTMLAttributes, memo, ReactElement } from 'react';

import { Button } from 'components';
import { WrapperBoard } from 'style';

type EqualsSingBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
  isDisable?: boolean;
};

export const EqualsSingBoard = memo(
  ({ ...props }: EqualsSingBoardPropsType): ReactElement => (
    <WrapperBoard {...props}>
      <Button typeButton="long">=</Button>
    </WrapperBoard>
  ),
);
