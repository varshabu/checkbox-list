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
  showInderminateState: boolean;
  nodeItems: CheckboxItem[];
  onClick?: (id: string) => void;
  checkboxState: CheckboxState;
  getIdState: (id: string) => CheckboxState;
  indentLevel?: number;
};

type CheckboxListProps = {
  /**
   * Array of checkboxes to be rendered
   */
  items: CheckboxItem[];
  /**
   * Check to show or hide indeterminate state
   */
  showInderminateState?: boolean;
  idsList?: string[];
  indentLevel?: number;
  /**
   * Onclick handler
   */
  onClick?: (id: string) => void;
  /**
   * Function to get state for particular id
   */
  getIdState: (id: string) => CheckboxState;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  getIdState,
  showInderminateState = true,
  idsList = [],
  indentLevel = 0,
  onClick = () => {},
}) => {
  if (!idsList.length) {
    idsList = items.filter((i) => !i.parentId).map((i) => i.id);
  }

  return (
    <ul
      className={classNames(styles.list, {
        [styles.verticalAlign]: indentLevel !== 0,
      })}
      style={{ paddingLeft: indentLevel === 0 ? indentLevel * 30 : 30 }}
    >
      {idsList.map((id) => {
        const item = items.filter((i) => i.id === id)[0];
        const checkboxState = getIdState(id);
        const nodeItems = items.filter((i) => i.parentId === item.id);
        return (
          <ListItem
            key={item.id}
            items={items}
            item={item}
            showInderminateState={showInderminateState}
            nodeItems={nodeItems}
            onClick={onClick}
            checkboxState={checkboxState}
            indentLevel={indentLevel}
            getIdState={getIdState}
          />
        );
      })}
    </ul>
  );
};

const ListItem = ({
  item,
  nodeItems,
  showInderminateState,
  onClick = () => {},
  checkboxState,
  items,
  indentLevel = 0,
  getIdState,
}: ListProps) => {
  const [expand, setExpand] = useState(true);

  const getChildNodes = (parentId: string) => {
    const nodeItems = items.filter((i) => i.parentId === parentId);
    if (!nodeItems.length) return null;
    return (
      <CheckboxList
        items={items}
        showInderminateState={showInderminateState}
        idsList={nodeItems.map((i) => i.id)}
        indentLevel={indentLevel + 1}
        onClick={onClick}
        getIdState={getIdState}
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
          isIndeterminate={showInderminateState && checkboxState === CheckboxState.INDETERMINATE}
        />
        <span>{item?.name}</span>
      </li>
      {expand && getChildNodes(item.id)}
    </React.Fragment>
  );
};

export default CheckboxList;
