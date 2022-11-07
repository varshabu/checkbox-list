import classNames from 'classnames';
import React, { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';
import { CheckboxState } from '../Tree/Tree';
import styles from './CheckboxList.module.scss';

export type CheckboxItem = {
  id: string;
  name: string;
  parentId: string | null;
};

export type ListProps = {
  item: CheckboxItem;
  items: CheckboxItem[];
  nodeItems: CheckboxItem[];
  onClick?: (id: string) => void;
  checkboxState: CheckboxState;
  getStateForId: (id: string) => CheckboxState;
  indentLevel?: number;
};

type CheckboxListProps = {
  items: CheckboxItem[];
  idsToRender?: string[];
  indentLevel?: number;
  onClick?: (id: string) => void;
  getStateForId: (id: string) => CheckboxState;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  getStateForId,
  idsToRender = [],
  indentLevel = 0,
  onClick = () => {},
}) => {
  if (!idsToRender.length) {
    idsToRender = items.filter((i) => !i.parentId).map((i) => i.id);
  }

  return (
    <ul
      className={classNames(styles.list, {
        [styles.verticalAlign]: indentLevel !== 0,
      })}
      style={{ paddingLeft: indentLevel === 0 ? indentLevel * 30 : 30 }}
    >
      {idsToRender.map((id) => {
        const item = items.filter((i) => i.id === id)[0];
        const checkboxState = getStateForId(id);
        const nodeItems = items.filter((i) => i.parentId === item.id);
        return (
          <ListItem
            key={item.id}
            items={items}
            item={item}
            nodeItems={nodeItems}
            onClick={onClick}
            checkboxState={checkboxState}
            indentLevel={indentLevel}
            getStateForId={getStateForId}
          />
        );
      })}
    </ul>
  );
};

const ListItem = ({
  item,
  nodeItems,
  onClick = () => {},
  checkboxState,
  items,
  indentLevel = 0,
  getStateForId,
}: ListProps) => {
  const [expand, setExpand] = useState(true);

  const getChildNodes = (parentId: string) => {
    const nodeItems = items.filter((i) => i.parentId === parentId);
    if (!nodeItems.length) return null;
    return (
      <CheckboxList
        items={items}
        idsToRender={nodeItems.map((i) => i.id)}
        indentLevel={indentLevel + 1}
        onClick={onClick}
        getStateForId={getStateForId}
      />
    );
  };

  return (
    <React.Fragment>
      <li>
        {nodeItems.length > 0 ? (
          <button className={styles.button} onClick={() => setExpand(!expand)}>
            {expand ? <Icon name='collapse' /> : <Icon name='expand' />}
          </button>
        ) : (
          <span className={styles.emptyState}></span>
        )}
        <Checkbox
          onClick={() => onClick(item.id)}
          isChecked={checkboxState === CheckboxState.CHECKED}
          isIndeterminate={checkboxState === CheckboxState.INDETERMINATE}
        />
        <span>{item?.name}</span>
      </li>
      {expand && getChildNodes(item.id)}
    </React.Fragment>
  );
};

export default CheckboxList;
