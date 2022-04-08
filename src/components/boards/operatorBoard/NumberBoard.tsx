import { HTMLAttributes, ReactElement } from 'react';

import { Button } from 'components';
import { WrapperBoard } from 'style';

type OperatorBoardPropsType = HTMLAttributes<HTMLElement> & {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
};

export const OperatorBoard = ({ ...props }: OperatorBoardPropsType): ReactElement => {
  const numbers = ['/', 'X', '-', '+'];
  return (
    <WrapperBoard {...props}>
      {numbers.map(number => (
        <Button typeButton="small" key={number}>
          {number}
        </Button>
      ))}
    </WrapperBoard>
  );
};
