import { HTMLAttributes } from 'react';

import { Desk } from 'enum';

export type BoardPropsType = HTMLAttributes<HTMLElement> & {
  desk?: Desk;
};
