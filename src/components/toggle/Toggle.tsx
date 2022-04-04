import { ReactElement } from 'react';

import { LeverToggle, WrapperToggle } from './style';

import { useToggleConstructor } from 'hooks/useToggleConstructor';
import { AngleBrackets, Eye } from 'icon';

export const Toggle = (): ReactElement => {
  const {
    isToggle,
    colorConstructor,
    onActiveConstructorClick,
    onActiveRuntimeClick,
    colorRuntime,
  } = useToggleConstructor();

  return (
    <WrapperToggle>
      <LeverToggle onClick={onActiveRuntimeClick} isActive={!isToggle}>
        <Eye color={colorRuntime} />
        Runtime
      </LeverToggle>
      <LeverToggle onClick={onActiveConstructorClick} isActive={isToggle}>
        <AngleBrackets color={colorConstructor} />
        Constructor
      </LeverToggle>
    </WrapperToggle>
  );
};
