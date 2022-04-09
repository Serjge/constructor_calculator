import { HTMLAttributes, memo, ReactElement } from 'react';

import { NumberDisplay } from 'components/index';
import { WrapperBoard } from 'style';

type NumberDisplayBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
  isDisable?: boolean;
};
export const NumberDisplayBoard = memo(
  ({ ...props }: NumberDisplayBoardPropsType): ReactElement => (
    <WrapperBoard {...props}>
      <NumberDisplay />
    </WrapperBoard>
  ),
);
