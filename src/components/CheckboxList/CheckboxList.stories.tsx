import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useCallback, useState } from 'react';
import items from '../../data/items.json';
import { CheckboxState, ItemState } from '../Tree/Tree';
import { updateItemStates } from '../Tree/updateItemStates';

import CheckboxList from './CheckboxList';

export default {
  title: 'CheckboxList',
  component: CheckboxList,
  argTypes: {},
} as ComponentMeta<typeof CheckboxList>;

const defaultItemStates: ItemState[] = items.map((i) => ({
  id: i.id,
  state: CheckboxState.UNCHECKED,
}));

const Template: ComponentStory<typeof CheckboxList> = () => {
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

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: {
      code: 'Your code snippet goes here.',
      language: 'javascript',
      type: 'auto',
    },
  },
};
