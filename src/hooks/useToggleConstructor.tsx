import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import { setIsConstructor } from 'store/action';
import { useAppSelector } from 'store/hooks';
import { selectIsConstructor } from 'store/selectors';

type UseToggleConstructorReturnType = {
  isConstructor: boolean;
  onActiveConstructorClick: () => void;
  onActiveRuntimeClick: () => void;
  colorConstructor: string;
  colorRuntime: string;
};

export const useToggleConstructor = (): UseToggleConstructorReturnType => {
  const dispatch = useDispatch();

  const isConstructor = useAppSelector(selectIsConstructor);

  const { mainColor, secondFontColor } = useTheme();

  const onActiveConstructorClick = (): void => {
    if (!isConstructor) {
      dispatch(setIsConstructor(true));
    }
  };

  const onActiveRuntimeClick = (): void => {
    if (isConstructor) {
      dispatch(setIsConstructor(false));
    }
  };

  const getColor = (isActive: boolean): string => {
    if (isActive) {
      return mainColor;
    }
    return secondFontColor;
  };

  const colorConstructor = getColor(isConstructor);

  const colorRuntime = getColor(!isConstructor);

  return {
    isConstructor,
    onActiveConstructorClick,
    onActiveRuntimeClick,
    colorConstructor,
    colorRuntime,
  };
};
