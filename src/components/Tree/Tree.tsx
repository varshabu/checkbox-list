import { useCallback, useState } from 'react';
import items from '../../data/items.json';
import CheckboxList from '../CheckboxList/CheckboxList';
import { updateItemStates } from './updateItemStates';

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}

export type ItemState = {
  id: string;
  state: CheckboxState;
};

const defaultItemStates: ItemState[] = items.map((i) => ({
  id: i.id,
  state: CheckboxState.UNCHECKED,
}));

const Tree = () => {
  const [itemStates, setItemStates] = useState<ItemState[]>(defaultItemStates);
  const getStateForId = useCallback(
    (id: string) => {
      return itemStates.filter((i) => i.id === id)[0].state;
    },
    [itemStates]
  );
  const clickHandler = useCallback(
    (id: string) => {
      setItemStates(updateItemStates(itemStates, items, id));
    },
    [itemStates]
  );
  return <CheckboxList items={items} onClick={clickHandler} getStateForId={getStateForId} />;
};

export default Tree;
