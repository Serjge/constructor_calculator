import { ReactElement } from 'react';

import { Button } from 'components/index';
import { WrapperBoard } from 'style';

export const OperatorBoard = ({ ...props }): ReactElement => {
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
