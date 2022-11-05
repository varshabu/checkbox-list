import { FC } from 'react';
import classnames from 'classnames';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
  /**
   * prop to hold checked or unchecked state
   */
  isChecked?: boolean;
  /**
   * prop to hold indeterminate state
   */
  isIndeterminate?: boolean;
  /**
   * onClick handler
   */
  onClick?: () => void;
};

const Checkbox: FC<CheckboxProps> = ({
  isChecked = false,
  isIndeterminate = false,
  onClick = () => {},
}) => {
  return (
    <span
      className={classnames(styles.checkbox, {
        [styles.isIndeterminate]: isIndeterminate,
        [styles.isChecked]: isChecked,
      })}
      onClick={onClick}
    />
  );
};

export default Checkbox;
