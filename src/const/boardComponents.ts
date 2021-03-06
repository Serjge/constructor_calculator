import {
  EqualsSingBoard,
  NumberBoard,
  NumberDisplayBoard,
  OperatorBoard,
} from 'components';

export const BOARD_COMPONENTS = {
  numberDisplay: NumberDisplayBoard,
  equalsSing: EqualsSingBoard,
  numbers: NumberBoard,
  operators: OperatorBoard,
};

export const BOARD_TYPE = ['numbers', 'operators', 'equalsSing'];
