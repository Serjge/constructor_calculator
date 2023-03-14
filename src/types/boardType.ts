import { HTMLAttributes } from 'react';

export type BoardPropsType = HTMLAttributes<HTMLElement> & {
  desk?: 'elements' | 'layout';
};
