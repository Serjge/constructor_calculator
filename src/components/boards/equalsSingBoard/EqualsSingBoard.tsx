import React, { HTMLAttributes, ReactElement } from 'react';

import { Button } from 'components';
import { WrapperBoard } from 'style';

type EqualsSingBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
};

export const EqualsSingBoard = ({
  isAddLayout,
  isDraggable,
  ...props
}: EqualsSingBoardPropsType): ReactElement => (
  <WrapperBoard isDraggable={isDraggable} isAddLayout={isAddLayout} {...props}>
    <Button typeButton="long">=</Button>
  </WrapperBoard>
);
