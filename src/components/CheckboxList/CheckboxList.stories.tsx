import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useCallback, useState } from 'react';
import items from '../../data/items.json';
import { CheckboxState, CheckboxItemState } from '../Tree/Tree';
import { updateCheckboxStates } from '../Tree/updateCheckboxStates';

import CheckboxList from './CheckboxList';

export default {
  title: 'CheckboxList',
  component: CheckboxList,
  argTypes: {},
} as ComponentMeta<typeof CheckboxList>;

const defaultItemStates: CheckboxItemState[] = items.map((i) => ({
  id: i.id,
  state: CheckboxState.UNCHECKED,
}));

const Template: ComponentStory<typeof CheckboxList> = () => {
  const [itemStates, setItemStates] = useState<CheckboxItemState[]>(defaultItemStates);
  const getIdState = useCallback(
    (id: string) => {
      return itemStates.filter((i) => i.id === id)[0].state;
    },
    [itemStates]
  );
  const clickHandler = useCallback(
    (id: string) => {
      setItemStates(updateCheckboxStates(itemStates, items, id));
    },
    [itemStates]
  );
  return <CheckboxList items={items} onClick={clickHandler} getIdState={getIdState} />;
};

export const Default = Template.bind({});
