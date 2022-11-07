import { useCallback, useState } from 'react';
import items from '../../data/items.json';
import CheckboxList from '../CheckboxList/CheckboxList';
import { updateCheckboxStates } from './updateCheckboxStates';

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}

export type CheckboxItemState = {
  id: string;
  state: CheckboxState;
};

const defaultCheckboxStates: CheckboxItemState[] = items.map((i) => ({
  id: i.id,
  state: CheckboxState.UNCHECKED,
}));

const Tree = () => {
  const [checkboxStates, setCheckboxStates] = useState<CheckboxItemState[]>(defaultCheckboxStates);

  const getStateForId = useCallback(
    (id: string) => {
      return checkboxStates.filter((i) => i.id === id)[0].state;
    },
    [checkboxStates]
  );

  const handleClick = useCallback(
    (id: string) => {
      setCheckboxStates(updateCheckboxStates(checkboxStates, items, id));
    },
    [checkboxStates]
  );
  return <CheckboxList items={items} onClick={handleClick} getStateForId={getStateForId} />;
};

export default Tree;
