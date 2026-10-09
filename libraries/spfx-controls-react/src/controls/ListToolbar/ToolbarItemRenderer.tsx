import * as React from 'react';
import {
  ToolbarButton,
  Tooltip,
} from '@fluentui/react-components';
import { IToolbarItemRendererProps } from './IToolbarItemRendererProps';

/**
 * Renders a single toolbar button with optional tooltip and label.
 */
export const ToolbarItemRenderer: React.FC<IToolbarItemRendererProps> = ({
  item,
  isLoading,
  itemClass,
  labelClass,
}) => {
  if (item.visible === false) return null;
  if (item.onRender) return item.onRender();

  const labelContent = labelClass ? (
    <span className={labelClass}>{item.label}</span>
  ) : (
    item.label
  );

  const button = item.label ? (
    <ToolbarButton
      className={itemClass}
      aria-label={item.ariaLabel || item.tooltip || item.label}
      icon={item.icon}
      onClick={item.onClick}
      disabled={item.disabled || isLoading}
      appearance={item.appearance}
    >
      {labelContent}
    </ToolbarButton>
  ) : (
    <ToolbarButton
      className={itemClass}
      aria-label={item.ariaLabel || item.tooltip || item.key}
      icon={item.icon}
      onClick={item.onClick}
      disabled={item.disabled || isLoading}
      appearance={item.appearance}
    />
  );

  if (item.tooltip) {
    return (
      <Tooltip content={item.tooltip} relationship="label">
        {button}
      </Tooltip>
    );
  }

  return button;
};
