import { HTMLAttributes, ReactElement } from 'react';

import { Button } from 'components/index';
import { WrapperBoard } from 'style';

type NumberBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
};

export const OperatorBoard = ({
  isAddLayout,
  isDraggable,
  ...props
}: NumberBoardPropsType): ReactElement => {
  const numbers = ['/', 'X', '-', '+'];
  return (
    <WrapperBoard isDraggable={isDraggable} isAddLayout={isAddLayout} {...props}>
      {numbers.map(number => (
        <Button typeButton="small" key={number}>
          {number}
        </Button>
      ))}
    </WrapperBoard>
  );
};
