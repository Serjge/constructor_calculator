import { memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { getResult, setOperator } from 'store/action';
import { selectIsConstructor } from 'store/selectors';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const EqualsSingBoard = memo(
  ({ isAddLayout, ...props }: BoardPropsType): ReactElement => {
    const dispatch = useDispatch();

    const isConstructor = useSelector(selectIsConstructor);

    const handleClick = (): void => {
      dispatch(getResult());
      dispatch(setOperator(null));
    };

    return (
      <WrapperBoard isAddLayout={isAddLayout} isVisible={isConstructor} {...props}>
        {isConstructor ? (
          <Button typeButton="long">=</Button>
        ) : (
          <Button
            onClick={handleClick}
            isAddLayout={isAddLayout}
            isVisible={isConstructor}
            typeButton="long"
          >
            =
          </Button>
        )}
      </WrapperBoard>
    );
  },
);
