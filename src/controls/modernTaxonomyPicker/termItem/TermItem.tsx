import { IconButton } from 'office-ui-fabric-react/lib/components/Button/IconButton/IconButton';
import { classNamesFunction, styled } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { ITermItemProps, ITermItemStyleProps, ITermItemStyles } from '../modernTermPicker/ModernTermPicker.types';
import { getStyles } from './TermItem.styles';

const getClassNames = classNamesFunction<ITermItemStyleProps, ITermItemStyles>();

/**
 * {@docCategory TagPicker}
 */
export const TermItemBase = (props: ITermItemProps) => {
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
    termStoreInfo,
    languageTag,
  } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    selected,
    disabled,
  });

  let labels = props.item.labels.filter((name) => name.languageTag === languageTag && name.isDefault);
  if (labels.length === 0) {
    labels = props.item.labels.filter((name) => name.languageTag === props.termStoreInfo.defaultLanguageTag && name.isDefault);
  }

  return (
    <div
      className={classNames.root}
      role={'listitem'}
      key={index}
      data-selection-index={index}
      data-is-focusable={(enableTermFocusInDisabledPicker || !disabled) && true}
    >
      <span className={classNames.text} aria-label={labels[0].name} title={labels[0].name}>
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
