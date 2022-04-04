import { useState } from 'react';

import { useTheme } from 'styled-components';

type UseToggleConstructorReturnType = {
  isToggle: boolean;
  onActiveConstructorClick: () => void;
  onActiveRuntimeClick: () => void;
  colorConstructor: string;
  colorRuntime: string;
};

export const useToggleConstructor = (): UseToggleConstructorReturnType => {
  const [isToggle, setIsToggle] = useState(true);

  const { mainColor, secondFontColor } = useTheme();

  const onActiveConstructorClick = (): void => setIsToggle(true);

  const onActiveRuntimeClick = (): void => setIsToggle(false);

  const getColor = (isActive: boolean): string => {
    if (isActive) {
      return mainColor;
    }
    return secondFontColor;
  };

  const colorConstructor = getColor(isToggle);

  const colorRuntime = getColor(!isToggle);

  return {
    isToggle,
    onActiveConstructorClick,
    onActiveRuntimeClick,
    colorConstructor,
    colorRuntime,
  };
};
