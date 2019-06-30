import { css } from 'office-ui-fabric-react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';

import { Item } from '../IMultiSelectLookup';
import styles from '../MultiSelectLookup.module.scss';

export interface IElement {
  item: Item;
  handleItemRemove: (event: any) => void;
  showRemoveIcon?: boolean;
}

export const ItemElement = ({
  item,
  handleItemRemove,
  showRemoveIcon
}: IElement) => (
  <div
    key={item.value}
    className={css(
      styles.multiSelectLookup_sortableElement,
      item.isLocked ? styles.multiSelectLookup_sortableElement_locked : null
    )}
  >
    <span>{item.label}</span>

    {item.isLocked && (
      <Icon
        iconName={"LockSolid"}
        className={styles.multiSelectLookup_sortableElement_locked_lockedIcon}
      />
    )}

    {!item.isLocked && showRemoveIcon && (
      <IconButton
        iconProps={{ iconName: "Delete" }}
        title="Delete"
        ariaLabel="Delete"
        onClick={handleItemRemove}
      />
    )}
  </div>
);
