import { useDispatch } from 'react-redux';

import { getResult, resetValue, setOperator, setValue } from 'store/action';
import { OperatorType } from 'types';

type UseCalcReturnType = {
  setOperatorClick: (operator: OperatorType) => void;
  getResultClick: () => void;
  setNumberClick: (number: string) => void;
};

export const useCalc = (): UseCalcReturnType => {
  const dispatch = useDispatch();

  const setOperatorClick = (operator: OperatorType): void => {
    dispatch(setOperator(operator));
    dispatch(resetValue());
  };

  const getResultClick = (): void => {
    dispatch(getResult());
    dispatch(setOperator(null));
  };

  const setNumberClick = (number: string): void => {
    dispatch(setValue(number));
  };

  return { setOperatorClick, getResultClick, setNumberClick };
};
