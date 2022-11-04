import { IconButton } from 'office-ui-fabric-react/lib/components/Button/IconButton/IconButton';
import { classNamesFunction, styled } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { ITermItemProps, ITermItemStyleProps, ITermItemStyles } from '../modernTermPicker/ModernTermPicker.types';
import { getStyles } from './TermItem.styles';

const getClassNames = classNamesFunction<ITermItemStyleProps, ITermItemStyles>();

/**
 * {@docCategory TagPicker}
 */
export const TermItemBase = (props: ITermItemProps): JSX.Element => {
  const {
    theme,
    styles,
    selected,
    disabled,
    enableTermFocusInDisabledPicker,
    children,
    className,
    index,
    onRemoveItem,
    removeButtonAriaLabel,
  } = props;

  const classNames = getClassNames(styles, {
    theme: theme,
    className,
    selected,
    disabled,
  });

  return (
    <div
      className={classNames.root}
      role={'listitem'}
      key={index}
      data-selection-index={index}
      data-is-focusable={(enableTermFocusInDisabledPicker || !disabled) && true}
    >
      <span className={classNames.text} aria-label={children as string} title={children as string}>
        {children}
      </span>
      <IconButton
        onClick={onRemoveItem}
        disabled={disabled}
        iconProps={{ iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }}
        className={classNames.close}
        ariaLabel={removeButtonAriaLabel}
      />
    </div>
  );
};

export const TermItem = styled<ITermItemProps, ITermItemStyleProps, ITermItemStyles>(TermItemBase, getStyles, undefined, {
  scope: 'TermItem',
});
