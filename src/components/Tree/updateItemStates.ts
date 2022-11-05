import { Item } from '../CheckboxList/CheckboxList';
import { CheckboxState, ItemState } from './Tree';

export const updateItemStates = (oldState: ItemState[], items: Item[], clickedId: string) => {
  const newState = oldState.map((i) => ({ ...i }));

  // getters
  const getItemState = (id: string) => {
    return newState.filter((i) => i.id === id)[0].state;
  };

  // setters
  const updateParent = (id: string) => {
    const item = items.filter((i) => i.id === id)[0];
    const parent = items.filter((i) => i.id === item.parentId)[0];
    if (!parent) return;
    const childIds = items.filter((i) => i.parentId === parent.id).map((i) => i.id);
    const childStates = childIds.map((childId) => getItemState(childId));
    if (childStates.length === childStates.filter((s) => s === CheckboxState.CHECKED).length) {
      newState.filter((i) => i.id === parent.id)[0].state = CheckboxState.CHECKED;
    } else if (
      childStates.length === childStates.filter((s) => s === CheckboxState.UNCHECKED).length
    ) {
      newState.filter((i) => i.id === parent.id)[0].state = CheckboxState.UNCHECKED;
    } else {
      newState.filter((i) => i.id === parent.id)[0].state = CheckboxState.INDETERMINATE;
    }
    updateParent(parent.id);
  };

  const setUnchecked = (id: string) => {
    newState.filter((i) => i.id === id)[0].state = CheckboxState.UNCHECKED;
    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setUnchecked(childId));
    updateParent(id);
  };

  const setChecked = (id: string) => {
    newState.filter((i) => i.id === id)[0].state = CheckboxState.CHECKED;
    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setChecked(childId));
    updateParent(id);
  };

  // actual logic
  const itemState = getItemState(clickedId);
  if (itemState === CheckboxState.CHECKED) {
    setUnchecked(clickedId);
  } else {
    setChecked(clickedId);
  }
  return newState;
};
