import { memo, ReactElement } from 'react';

import { LeverToggle, WrapperToggle } from './style';

import { useToggleConstructor } from 'hooks';
import { AngleBrackets, Eye } from 'icon';

export const Toggle = memo((): ReactElement => {
  const {
    isConstructor,
    colorConstructor,
    onActiveConstructorClick,
    onActiveRuntimeClick,
    colorRuntime,
  } = useToggleConstructor();

  return (
    <WrapperToggle>
      <LeverToggle onClick={onActiveRuntimeClick} isActive={!isConstructor}>
        <Eye color={colorRuntime} />
        Runtime
      </LeverToggle>
      <LeverToggle onClick={onActiveConstructorClick} isActive={isConstructor}>
        <AngleBrackets color={colorConstructor} />
        Constructor
      </LeverToggle>
    </WrapperToggle>
  );
});
