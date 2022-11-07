import { CheckboxItem } from '../CheckboxList/CheckboxList';
import { CheckboxState, CheckboxItemState } from './Tree';

export const updateCheckboxStates = (
  oldState: CheckboxItemState[],
  items: CheckboxItem[],
  clickedId: string
) => {
  const newState = oldState.map((i) => ({ ...i }));

  const getItemState = (id: string) => {
    return newState.filter((i) => i.id === id)[0].state;
  };

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

  const itemState = getItemState(clickedId);
  if (itemState === CheckboxState.CHECKED) {
    setUnchecked(clickedId);
  } else {
    setChecked(clickedId);
  }
  return newState;
};
