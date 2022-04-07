import { HTMLAttributes, ReactElement } from 'react';

import { NumberDisplay } from 'components/index';
import { WrapperBoard } from 'style';

type NumberDisplayBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
};
export const NumberDisplayBoard = ({
  isAddLayout,
  isDraggable,
  ...props
}: NumberDisplayBoardPropsType): ReactElement => (
  <WrapperBoard isAddLayout={isAddLayout} isDraggable={isDraggable} {...props}>
    <NumberDisplay />
  </WrapperBoard>
);
