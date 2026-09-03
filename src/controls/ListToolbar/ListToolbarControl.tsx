import * as React from 'react';
import {
  ToolbarButton,
  ToolbarDivider,
  Tooltip,
  Badge,
  Text,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { useListToolbarStyles } from './useListToolbarStyles';
import { IToolbarItem } from './IToolbarItem';
import { IListToolbarProps } from './IListToolbarProps';
import { useOverflowIndex } from './useOverflowIndex';
import { ToolbarItemRenderer } from './ToolbarItemRenderer';
import { groupItems, flattenWithDividers } from './helpers';

/* ------------------------------------------------------------------ */
/*  ListToolbar — main component                                      */
/* ------------------------------------------------------------------ */

export const ListToolbar: React.FunctionComponent<IListToolbarProps> = ({
  items,
  farItems = [],
  isLoading = false,
  ariaLabel = 'Toolbar',
  totalCount,
  className,
  showGroupDividers = true,
}) => {
  const styles = useListToolbarStyles();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);

  // ---- Separate regular vs far items ----
  const regularItems = React.useMemo(
    () => items.filter((i) => !i.isFarItem && i.visible !== false),
    [items],
  );

  const allFarItems = React.useMemo(() => {
    const fromItems = items.filter(
      (i) => i.isFarItem && i.visible !== false,
    );
    const fromFar = farItems.filter((i) => i.visible !== false);
    return [...fromItems, ...fromFar];
  }, [items, farItems]);

  const groupedFarItems = React.useMemo(
    () => groupItems(allFarItems),
    [allFarItems],
  );

  // ---- Build flat list of regular items (items + dividers) ----
  const flatItems = React.useMemo(
    () => flattenWithDividers(regularItems, showGroupDividers),
    [regularItems, showGroupDividers],
  );

  // ---- Custom overflow detection ----
  const overflowIndex = useOverflowIndex(
    toolbarRef, rightRef, measureRef, flatItems.length,
  );

  // Determine which actual items (not dividers) are hidden
  const visibleItemKeys = React.useMemo(() => {
    const keys = new Set<string>();
    for (let i = 0; i < overflowIndex && i < flatItems.length; i++) {
      if (flatItems[i].type === 'item') {
        keys.add(flatItems[i].key);
      }
    }
    return keys;
  }, [flatItems, overflowIndex]);

  const hiddenItems = React.useMemo(
    () => regularItems.filter((item) => !visibleItemKeys.has(item.key)),
    [regularItems, visibleItemKeys],
  );

  const hasOverflow = hiddenItems.length > 0;

  // ---- Render far items ----
  const renderFarGroup = (
    groupItemsList: IToolbarItem[],
    groupIndex: number,
    isLastGroup: boolean,
  ): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];

    for (const item of groupItemsList) {
      if (item.dividerBefore) {
        elements.push(<ToolbarDivider key={`${item.key}-divider-before`} />);
      }
      elements.push(
        <ToolbarItemRenderer
          key={item.key}
          item={item}
          isLoading={isLoading}
          itemClass={styles.farItemButton}
          labelClass={styles.farItemLabel}
        />,
      );
      if (item.dividerAfter) {
        elements.push(<ToolbarDivider key={`${item.key}-divider-after`} />);
      }
    }

    if (showGroupDividers && !isLastGroup) {
      elements.push(<ToolbarDivider key={`group-divider-${groupIndex}`} />);
    }

    return elements;
  };

  return (
    <div
      ref={toolbarRef}
      role="toolbar"
      aria-label={ariaLabel}
      className={`${styles.toolbar} ${className || ''}`}
    >
      {/* Hidden mirror — renders ALL items for measurement (never clipped) */}
      <div ref={measureRef} className={styles.measureSection} aria-hidden="true">
        {flatItems.map((flat) => {
          if (flat.type === 'divider') {
            return <ToolbarDivider key={flat.key} />;
          }
          return (
            <ToolbarItemRenderer
              key={flat.key}
              item={flat.item!}
              isLoading={isLoading}
              itemClass={styles.toolbarItem}
            />
          );
        })}
      </div>

      {/* Visible container — only renders items that fit + overflow menu */}
      <div ref={leftRef} className={styles.leftSection}>
        {flatItems.map((flat, idx) => {
          if (idx >= overflowIndex) return null;

          if (flat.type === 'divider') {
            return <ToolbarDivider key={flat.key} />;
          }
          return (
            <ToolbarItemRenderer
              key={flat.key}
              item={flat.item!}
              isLoading={isLoading}
              itemClass={styles.toolbarItem}
            />
          );
        })}

        {/* "..." overflow menu — right next to the last visible item */}
        {hasOverflow && (
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Tooltip
                content={`${hiddenItems.length} more actions`}
                relationship="label"
              >
                <ToolbarButton
                  className={styles.overflowButton}
                  icon={<MoreHorizontalRegular />}
                  aria-label={`${hiddenItems.length} more actions`}
                />
              </Tooltip>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {hiddenItems.map((item) => (
                  <MenuItem
                    key={item.key}
                    icon={item.icon}
                    disabled={item.disabled || isLoading}
                    onClick={item.onClick}
                  >
                    {item.label || item.tooltip || item.key}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        )}

        {/* Total count badge — inside left section */}
        {totalCount !== undefined && totalCount > 0 && (
          <Badge
            appearance="filled"
            color="informative"
            className={styles.countBadge}
          >
            <Text size={200}>{totalCount} items</Text>
          </Badge>
        )}
      </div>

      {/* Right side — far items (always visible) */}
      <div ref={rightRef} className={styles.rightGroup}>
        {allFarItems.length > 0 && (
          <div className={styles.farItemsContainer}>
            {Array.from(groupedFarItems.entries()).map(
              ([_groupName, groupItemsList], groupIndex) =>
                renderFarGroup(
                  groupItemsList,
                  groupIndex,
                  groupIndex === groupedFarItems.size - 1,
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListToolbar;
