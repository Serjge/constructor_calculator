import { memo, ReactElement } from 'react';

import { NumberDisplay } from 'components';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const NumberDisplayBoard = memo(
  ({ ...props }: BoardPropsType): ReactElement => (
    <WrapperBoard {...props}>
      <NumberDisplay />
    </WrapperBoard>
  ),
);
