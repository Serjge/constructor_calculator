import { Desk, DraggableCursor } from 'enum';

export const getCursor = (
  desk: Desk,
  isDisable: boolean,
  isConstructor: boolean,
  isNumberDisplay?: boolean,
): DraggableCursor => {
  if (
    (desk === Desk.elements && isDisable) ||
    (isNumberDisplay && isDisable && isConstructor)
  ) {
    return DraggableCursor.NotMove;
  }

  if (
    (desk === Desk.layout && isDisable && isConstructor) ||
    (desk === Desk.elements && !isDisable)
  ) {
    return DraggableCursor.Move;
  }

  return DraggableCursor.Default;
};
