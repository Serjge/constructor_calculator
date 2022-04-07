import React, { HTMLAttributes, ReactElement } from 'react';

import { Button } from 'components';
import { WrapperBoard } from 'style';

type NumberBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
};

export const EqualsSingBoard = ({
  isAddLayout,
  isDraggable,
  ...props
}: NumberBoardPropsType): ReactElement => (
  <WrapperBoard isDraggable={isDraggable} isAddLayout={isAddLayout} {...props}>
    <Button typeButton="long">=</Button>
  </WrapperBoard>
);
