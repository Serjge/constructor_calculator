import { HTMLAttributes, ReactElement } from 'react';

import { NumberDisplay } from 'components/index';
import { WrapperBoard } from 'style';

type NumberBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
};
export const NumberDisplayBoard = ({
  isAddLayout,
  isDraggable,
  ...props
}: NumberBoardPropsType): ReactElement => (
  <WrapperBoard isAddLayout={isAddLayout} isDraggable={isDraggable} {...props}>
    <NumberDisplay />
  </WrapperBoard>
);
