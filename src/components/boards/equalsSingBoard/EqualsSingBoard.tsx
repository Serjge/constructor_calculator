import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Button } from 'components';
import { selectIsConstructor } from 'store/selectors';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const EqualsSingBoard = memo(
  ({ isAddLayout, ...props }: BoardPropsType): ReactElement => {
    const isConstructor = useSelector(selectIsConstructor);

    return (
      <WrapperBoard isAddLayout={isAddLayout} isVisible={isConstructor} {...props}>
        <Button isAddLayout={isAddLayout} isVisible={isConstructor} typeButton="long">
          =
        </Button>
      </WrapperBoard>
    );
  },
);
