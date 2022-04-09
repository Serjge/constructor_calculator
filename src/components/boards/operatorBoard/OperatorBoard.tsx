import { HTMLAttributes, memo, ReactElement } from 'react';

import { Button } from 'components';
import { WrapperBoard } from 'style';

type OperatorBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
  isDisable?: boolean;
};

const OPERATORS = ['/', 'X', '-', '+'];

export const OperatorBoard = memo(
  ({ ...props }: OperatorBoardPropsType): ReactElement => (
    <WrapperBoard {...props}>
      {OPERATORS.map(number => (
        <Button typeButton="small" key={number}>
          {number}
        </Button>
      ))}
    </WrapperBoard>
  ),
);
