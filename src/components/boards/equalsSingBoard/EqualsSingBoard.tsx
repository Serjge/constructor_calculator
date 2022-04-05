import React, { ReactElement } from 'react';

import { Button } from 'components';
import { WrapperBoard } from 'style';

export const EqualsSingBoard = ({ ...props }): ReactElement => (
  <WrapperBoard {...props}>
    <Button typeButton="long">=</Button>
  </WrapperBoard>
);
