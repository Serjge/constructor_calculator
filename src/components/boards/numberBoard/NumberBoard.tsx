import { ReactElement } from 'react';

import { Button } from 'components/index';
import { WrapperBoard } from 'style';

export const NumberBoard = ({ ...props }): ReactElement => {
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];
  return (
    <WrapperBoard {...props}>
      {numbers.map(number => (
        <Button typeButton={number === '0' ? 'medium' : 'default'} key={number}>
          {number}
        </Button>
      ))}
    </WrapperBoard>
  );
};
