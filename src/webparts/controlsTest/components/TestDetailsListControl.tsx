import * as React from 'react';
import * as strings from 'ControlStrings';

import {
  Button,
  FluentProvider,
  IdPrefixProvider,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MessageBar,
  Text,
  makeStyles,
  tokens,
  webLightTheme,
} from '@fluentui/react-components';
import {
  CalendarLtr20Regular,
  Checkmark20Regular,
  CheckmarkCircle20Filled,
  Clock20Regular,
  Copy20Regular,
  Delete20Regular,
  Document20Regular,
  Drag20Regular,
  ErrorCircle20Regular,
  MoreHorizontal20Regular,
  Person20Regular,
} from '@fluentui/react-icons';

import {
  CheckboxVisibility,
  ColumnDragEndLocation,
  ColumnActionsMode,
  ConstrainMode,
  DetailsList,
  DetailsListLayoutMode,
  DetailsListSelectionMode,
} from '../../../DetailsList';
import type {
  IColumn,
  IColumnReorderOptions,
  IDetailsListGroup,
  IDetailsListRowDragDropEvents,
  IDetailsListSelectionChange,
} from '../../../DetailsList';

const INITIAL_ITEM_COUNT = 8;
const LOAD_PAGE_SIZE = 6;
const LOAD_DELAY_MS = 450;
const DETAILS_LIST_HEIGHT = 360;
const SORT_KEYS: readonly SortKey[] = ['name', 'category', 'owner', 'priority', 'status', 'dueDate', 'updatedAt'];

const useShowcaseStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
  cell: {
    alignItems: 'center',
    display: 'flex',
    columnGap: '6px',
    minWidth: 0,
  },
  mutedIcon: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  statusCell: {
    alignItems: 'center',
    display: 'flex',
    columnGap: '6px',
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    columnGap: '2px',
  },
});

type WorkItemStatus = 'Complete' | 'In progress' | 'In review' | 'Not started';
type WorkItemPriority = 'High' | 'Medium' | 'Low';
type SortKey = 'name' | 'category' | 'owner' | 'priority' | 'status' | 'dueDate' | 'updatedAt';
type ContextMenuAction = 'complete' | 'duplicate' | 'delete';

interface IDetailsListShowcaseItem {
  id: string;
  name: string;
  category: string;
  status: WorkItemStatus;
  owner: string;
  priority: WorkItemPriority;
  dueDate: string;
  updatedAt: string;
}

interface ISortState {
  key: SortKey;
  descending: boolean;
}

type IBaseDetailsListShowcaseItem = Omit<IDetailsListShowcaseItem, 'owner' | 'priority' | 'dueDate'>;

const BASE_SHOWCASE_ITEMS: readonly IBaseDetailsListShowcaseItem[] = [
  { id: 'project-01', name: 'Project charter', category: 'Planning', status: 'Complete', updatedAt: '2026-07-28T09:00:00Z' },
  { id: 'project-02', name: 'Risk register', category: 'Planning', status: 'In progress', updatedAt: '2026-07-30T14:30:00Z' },
  { id: 'project-03', name: 'Design system', category: 'Design', status: 'In review', updatedAt: '2026-08-01T10:15:00Z' },
  { id: 'project-04', name: 'Accessibility audit', category: 'Design', status: 'Complete', updatedAt: '2026-08-02T16:00:00Z' },
  { id: 'project-05', name: 'API contract', category: 'Engineering', status: 'In progress', updatedAt: '2026-08-03T11:45:00Z' },
  { id: 'project-06', name: 'Integration tests', category: 'Engineering', status: 'Not started', updatedAt: '2026-08-04T08:20:00Z' },
  { id: 'project-07', name: 'Release notes', category: 'Launch', status: 'Not started', updatedAt: '2026-08-05T13:10:00Z' },
  { id: 'project-08', name: 'Support handover', category: 'Launch', status: 'In progress', updatedAt: '2026-08-06T15:25:00Z' },
  { id: 'project-09', name: 'User interviews', category: 'Research', status: 'Complete', updatedAt: '2026-08-07T09:40:00Z' },
  { id: 'project-10', name: 'Usage analytics', category: 'Research', status: 'In review', updatedAt: '2026-08-08T12:05:00Z' },
  { id: 'project-11', name: 'Roadmap update', category: 'Planning', status: 'In progress', updatedAt: '2026-08-09T10:00:00Z' },
  { id: 'project-12', name: 'Wireframe refresh', category: 'Design', status: 'Complete', updatedAt: '2026-08-09T16:35:00Z' },
  { id: 'project-13', name: 'Performance budget', category: 'Engineering', status: 'In review', updatedAt: '2026-08-10T09:50:00Z' },
  { id: 'project-14', name: 'Deployment checklist', category: 'Launch', status: 'Not started', updatedAt: '2026-08-10T14:15:00Z' },
  { id: 'project-15', name: 'Feedback synthesis', category: 'Research', status: 'Complete', updatedAt: '2026-08-11T11:30:00Z' },
  { id: 'project-16', name: 'Sprint summary', category: 'Planning', status: 'Complete', updatedAt: '2026-08-11T17:20:00Z' },
  { id: 'project-17', name: 'Component inventory', category: 'Design', status: 'In progress', updatedAt: '2026-08-12T08:45:00Z' },
  { id: 'project-18', name: 'Error handling', category: 'Engineering', status: 'In review', updatedAt: '2026-08-12T12:40:00Z' },
  { id: 'project-19', name: 'Demo script', category: 'Launch', status: 'Complete', updatedAt: '2026-08-12T15:05:00Z' },
  { id: 'project-20', name: 'Satisfaction survey', category: 'Research', status: 'Not started', updatedAt: '2026-08-12T16:55:00Z' },
  { id: 'project-21', name: 'Dependency review', category: 'Engineering', status: 'Complete', updatedAt: '2026-08-13T08:10:00Z' },
  { id: 'project-22', name: 'Launch announcement', category: 'Launch', status: 'In progress', updatedAt: '2026-08-13T09:25:00Z' },
  { id: 'project-23', name: 'Research archive', category: 'Research', status: 'Complete', updatedAt: '2026-08-13T10:45:00Z' },
  { id: 'project-24', name: 'Quarterly goals', category: 'Planning', status: 'In review', updatedAt: '2026-08-13T11:15:00Z' },
];

const SHOWCASE_OWNERS: readonly string[] = ['Maya Patel', 'João Mendes', 'Alex Kim', 'Sofia Rossi', 'Daniel Chen'];
const SHOWCASE_PRIORITIES: readonly WorkItemPriority[] = ['High', 'Medium', 'Low', 'Medium', 'High'];

const SHOWCASE_ITEMS: readonly IDetailsListShowcaseItem[] = BASE_SHOWCASE_ITEMS.map((item, index) => ({
  ...item,
  owner: SHOWCASE_OWNERS[index % SHOWCASE_OWNERS.length],
  priority: SHOWCASE_PRIORITIES[index % SHOWCASE_PRIORITIES.length],
  dueDate: new Date(Date.UTC(2026, 7, 14 + index)).toISOString(),
}));

const getSortValue = (item: IDetailsListShowcaseItem, key: SortKey): string => {
  return item[key];
};

const getStatusIcon = (status: WorkItemStatus): React.ReactElement => {
  switch (status) {
    case 'Complete':
      return <CheckmarkCircle20Filled />;
    case 'In progress':
      return <Clock20Regular />;
    case 'In review':
      return <ErrorCircle20Regular />;
    default:
      return <Document20Regular />;
  }
};

const wait = (duration: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

export const TestDetailsListControl: React.FunctionComponent = () => {
  const styles = useShowcaseStyles();
  const [items, setItems] = React.useState<IDetailsListShowcaseItem[]>(() => (
    SHOWCASE_ITEMS.slice(0, INITIAL_ITEM_COUNT)
  ));
  const [sortState, setSortState] = React.useState<ISortState>();
  const [collapsedGroups, setCollapsedGroups] = React.useState<ReadonlySet<string>>(() => new Set<string>());
  const [selectedItems, setSelectedItems] = React.useState<readonly IDetailsListShowcaseItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [contextMenuTarget, setContextMenuTarget] = React.useState<HTMLElement>();
  const [contextMenuItem, setContextMenuItem] = React.useState<IDetailsListShowcaseItem>();
  const [statusMessage, setStatusMessage] = React.useState('Select a work item, use its action buttons, or open the row context menu.');

  const hasNextPage = React.useMemo(() => {
    const loadedIds = new Set(items.map((item) => item.id));
    return SHOWCASE_ITEMS.some((item) => !loadedIds.has(item.id));
  }, [items]);

  const selectedKeys = React.useMemo(() => {
    return new Set(selectedItems.map((item) => item.id));
  }, [selectedItems]);

  const sortedItems = React.useMemo(() => {
    const nextItems = [...items];

    if (!sortState) {
      return nextItems;
    }

    const direction = sortState.descending ? -1 : 1;
    return nextItems.sort((left, right) => {
      const result = getSortValue(left, sortState.key).localeCompare(getSortValue(right, sortState.key));
      return result === 0 ? left.id.localeCompare(right.id) : direction * result;
    });
  }, [items, sortState]);

  const groupedData = React.useMemo(() => {
    const itemsByCategory = new Map<string, IDetailsListShowcaseItem[]>();

    sortedItems.forEach((item) => {
      const categoryItems = itemsByCategory.get(item.category) || [];
      categoryItems.push(item);
      itemsByCategory.set(item.category, categoryItems);
    });

    const groupedItems: IDetailsListShowcaseItem[] = [];
    const groups: IDetailsListGroup<IDetailsListShowcaseItem>[] = [];

    itemsByCategory.forEach((categoryItems, category) => {
      const startIndex = groupedItems.length;
      groupedItems.push(...categoryItems);
      groups.push({
        key: category,
        name: category,
        startIndex,
        count: categoryItems.length,
        isCollapsed: collapsedGroups.has(category),
      });
    });

    return { items: groupedItems, groups };
  }, [collapsedGroups, sortedItems]);

  const handleColumnHeaderClick = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, column: IColumn<IDetailsListShowcaseItem>): void => {
      if (SORT_KEYS.indexOf(column.key as SortKey) < 0) {
        return;
      }

      const key = column.key as SortKey;
      const descending = sortState && sortState.key === key ? !sortState.descending : false;
      setSortState({ key, descending });
      setStatusMessage(`Sorted by ${column.name} (${descending ? 'descending' : 'ascending'}).`);
    },
    [sortState]
  );

  const handleSelectionChanged = React.useCallback(
    (change: IDetailsListSelectionChange<IDetailsListShowcaseItem>): void => {
      setSelectedItems(change.selectedItems);
      setStatusMessage(`${change.selectedItems.length} row(s) selected.`);
    },
    []
  );

  const handleToggleGroup = React.useCallback(
    (group: IDetailsListGroup<IDetailsListShowcaseItem>, isCollapsed: boolean): void => {
      setCollapsedGroups((currentGroups) => {
        const nextGroups = new Set(currentGroups);
        if (isCollapsed) {
          nextGroups.add(group.key);
        } else {
          nextGroups.delete(group.key);
        }
        return nextGroups;
      });
    },
    []
  );

  const handleLoadMore = React.useCallback(async (): Promise<void> => {
    if (isLoadingMore || !hasNextPage) {
      return;
    }

    setIsLoadingMore(true);
    setStatusMessage('Loading more rows...');
    await wait(LOAD_DELAY_MS);

    setItems((currentItems) => {
      const loadedIds = new Set(currentItems.map((item) => item.id));
      const nextItems = SHOWCASE_ITEMS
        .filter((item) => !loadedIds.has(item.id))
        .slice(0, LOAD_PAGE_SIZE);
      return [...currentItems, ...nextItems];
    });
    setIsLoadingMore(false);
    setStatusMessage('More rows loaded. Scroll again to continue.');
  }, [hasNextPage, isLoadingMore]);

  const handleDrop = React.useCallback(
    (
      draggedItem: IDetailsListShowcaseItem,
      targetItem: IDetailsListShowcaseItem,
      _targetIndex: number,
      _event: React.DragEvent<HTMLElement>
    ): void => {
      if (draggedItem.id === targetItem.id) {
        return;
      }

      setItems((currentItems) => {
        const sourceIndex = currentItems.findIndex((item) => item.id === draggedItem.id);
        const targetIndex = currentItems.findIndex((item) => item.id === targetItem.id);
        if (sourceIndex < 0 || targetIndex < 0) {
          return currentItems;
        }

        const nextItems = [...currentItems];
        const [movedItem] = nextItems.splice(sourceIndex, 1);
        const insertionIndex = targetIndex > sourceIndex ? targetIndex - 1 : targetIndex;
        nextItems.splice(insertionIndex, 0, movedItem);
        return nextItems;
      });
      setSortState(undefined);
      setStatusMessage(`Moved ${draggedItem.name} before ${targetItem.name}.`);
    },
    []
  );

  const dragDropEvents = React.useMemo<IDetailsListRowDragDropEvents<IDetailsListShowcaseItem>>(() => ({
    canDrag: () => true,
    canDrop: (draggedItem, targetItem) => draggedItem.id !== targetItem.id,
    onDragStart: (item) => setStatusMessage(`Dragging ${item.name}...`),
    onDrop: handleDrop,
  }), [handleDrop]);

  const handleComplete = React.useCallback((item: IDetailsListShowcaseItem): void => {
    setItems((currentItems) => currentItems.map((currentItem) => (
      currentItem.id === item.id
        ? { ...currentItem, status: 'Complete', updatedAt: new Date().toISOString() }
        : currentItem
    )));
    setStatusMessage(`Marked ${item.name} as complete.`);
  }, []);

  const dismissContextMenu = React.useCallback((): void => {
    setContextMenuTarget(undefined);
    setContextMenuItem(undefined);
  }, []);

  const openContextMenu = React.useCallback((item: IDetailsListShowcaseItem, target: HTMLElement): void => {
    setContextMenuItem(item);
    setContextMenuTarget(target);
  }, []);

  const handleContextMenu = React.useCallback(
    (item: IDetailsListShowcaseItem, _index: number, event: React.MouseEvent<HTMLElement>): boolean => {
      event.preventDefault();
      openContextMenu(item, event.currentTarget);
      return true;
    },
    [openContextMenu]
  );

  const handleContextMenuAction = React.useCallback((action: ContextMenuAction): void => {
    if (!contextMenuItem) {
      return;
    }

    if (action === 'complete') {
      handleComplete(contextMenuItem);
    } else if (action === 'delete') {
      setItems((currentItems) => currentItems.filter((item) => item.id !== contextMenuItem.id));
      setSelectedItems((currentItems) => currentItems.filter((item) => item.id !== contextMenuItem.id));
      setStatusMessage(`Deleted ${contextMenuItem.name}.`);
    } else {
      const duplicatedItem: IDetailsListShowcaseItem = {
        ...contextMenuItem,
        id: `${contextMenuItem.id}-copy-${Date.now()}`,
        name: `${contextMenuItem.name} (copy)`,
      };
      setItems((currentItems) => [...currentItems, duplicatedItem]);
      setStatusMessage(`Duplicated ${contextMenuItem.name}.`);
    }

    dismissContextMenu();
  }, [contextMenuItem, dismissContextMenu, handleComplete]);

  const columnReorderOptions = React.useMemo<IColumnReorderOptions<IDetailsListShowcaseItem>>(() => ({
    frozenColumnCountFromStart: 1,
    frozenColumnCountFromEnd: 1,
    onColumnDragStart: (dragStarted) => {
      setStatusMessage(dragStarted ? 'Dragging a column. Drop it where it belongs.' : 'Column drag ended.');
    },
    onColumnDrop: ({ draggedColumn, targetColumn }) => {
      setStatusMessage(`Moved ${draggedColumn.name} before ${targetColumn.name}.`);
    },
    onDragEnd: (location) => {
      if (location === ColumnDragEndLocation.header) {
        setStatusMessage('Column order updated.');
      }
    },
  }), []);

  const handleColumnResize = React.useCallback((column: IColumn<IDetailsListShowcaseItem>, width: number): void => {
    setStatusMessage(`Resized ${column.name} to ${Math.round(width)} pixels.`);
  }, []);

  const renderRowActions = React.useCallback((item: IDetailsListShowcaseItem): React.ReactNode => (
    <div className={styles.actions} data-selection-disabled={true}>
      <Button
        appearance="subtle"
        size="small"
        icon={<Checkmark20Regular />}
        aria-label={`Mark ${item.name} complete`}
        title="Mark complete"
        disabled={item.status === 'Complete'}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          handleComplete(item);
        }}
      />
      <Button
        appearance="subtle"
        size="small"
        icon={<MoreHorizontal20Regular />}
        aria-label={`More actions for ${item.name}`}
        title="More actions"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          openContextMenu(item, event.currentTarget);
        }}
      />
    </div>
  ), [handleComplete, openContextMenu, styles.actions]);

  const columns = React.useMemo<readonly IColumn<IDetailsListShowcaseItem>[]>(() => {
    const getSortProps = (key: SortKey): Pick<IColumn<IDetailsListShowcaseItem>, 'isSorted' | 'isSortedDescending'> => ({
      isSorted: sortState && sortState.key === key,
      isSortedDescending: sortState && sortState.key === key && sortState.descending,
    });

    return [
      {
        key: 'name',
        name: 'Work item',
        fieldName: 'name',
        minWidth: 210,
        isResizable: true,
        isRowHeader: true,
        columnActionsMode: ColumnActionsMode.clickable,
        ...getSortProps('name'),
        onColumnClick: handleColumnHeaderClick,
        onRender: (item) => (
          <div className={styles.cell}>
            <Drag20Regular className={styles.mutedIcon} aria-hidden={true} />
            <Document20Regular className={styles.mutedIcon} aria-hidden={true} />
            <Text truncate={true}>{item.name}</Text>
          </div>
        ),
      },
      {
        key: 'category',
        name: 'Category',
        fieldName: 'category',
        minWidth: 120,
        isResizable: true,
        isGrouped: true,
        columnActionsMode: ColumnActionsMode.clickable,
        ...getSortProps('category'),
        onColumnClick: handleColumnHeaderClick,
      },
      {
        key: 'owner',
        name: 'Owner',
        fieldName: 'owner',
        minWidth: 135,
        isResizable: true,
        columnActionsMode: ColumnActionsMode.clickable,
        ...getSortProps('owner'),
        onColumnClick: handleColumnHeaderClick,
        onRender: (item) => (
          <div className={styles.cell}>
            <Person20Regular className={styles.mutedIcon} aria-hidden={true} />
            <Text truncate={true}>{item.owner}</Text>
          </div>
        ),
      },
      {
        key: 'priority',
        name: 'Priority',
        fieldName: 'priority',
        minWidth: 90,
        isResizable: true,
        columnActionsMode: ColumnActionsMode.clickable,
        ...getSortProps('priority'),
        onColumnClick: handleColumnHeaderClick,
      },
      {
        key: 'status',
        name: 'Status',
        fieldName: 'status',
        minWidth: 125,
        isResizable: true,
        columnActionsMode: ColumnActionsMode.clickable,
        ...getSortProps('status'),
        onColumnClick: handleColumnHeaderClick,
        onRender: (item) => (
          <div className={styles.statusCell}>
            {getStatusIcon(item.status)}
            <Text truncate={true}>{item.status}</Text>
          </div>
        ),
      },
      {
        key: 'dueDate',
        name: 'Due',
        fieldName: 'dueDate',
        minWidth: 105,
        isResizable: true,
        columnActionsMode: ColumnActionsMode.clickable,
        ...getSortProps('dueDate'),
        onColumnClick: handleColumnHeaderClick,
        onRender: (item) => (
          <div className={styles.cell}>
            <CalendarLtr20Regular className={styles.mutedIcon} aria-hidden={true} />
            <Text>{new Date(item.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Text>
          </div>
        ),
      },
      {
        key: 'updatedAt',
        name: 'Updated',
        fieldName: 'updatedAt',
        minWidth: 110,
        isResizable: true,
        columnActionsMode: ColumnActionsMode.clickable,
        ...getSortProps('updatedAt'),
        onColumnClick: handleColumnHeaderClick,
        onRender: (item) => new Date(item.updatedAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        name: 'Actions',
        minWidth: 88,
        maxWidth: 88,
        isIconOnly: true,
        ariaLabel: 'Work item actions',
        columnActionsMode: ColumnActionsMode.disabled,
        onRender: renderRowActions,
      },
    ];
  }, [handleColumnHeaderClick, renderRowActions, sortState, styles]);

  return (
    <IdPrefixProvider value="test-details-list-control">
    <FluentProvider theme={webLightTheme} applyStylesToPortals={true} style={{ padding: '20px' }}>
      <div className={styles.root}>
      <Text size={500}>DetailsList samples</Text>
      <Text>
        Project delivery queue: sort or resize a column, collapse a category, scroll to load more work, drag rows to reprioritise them, drag column headers to personalise the view, or use row actions and the context menu.
      </Text>
      <DetailsList
        items={groupedData.items}
        columns={columns}
        onColumnResize={handleColumnResize}
        columnReorderOptions={columnReorderOptions}
        groups={groupedData.groups}
        getKey={(item) => item.id}
        setKey="DetailsListShowcase"
        height={DETAILS_LIST_HEIGHT}
        compact={true}
        layoutMode={DetailsListLayoutMode.justified}
        constrainMode={ConstrainMode.horizontalConstrained}
        selectionMode={DetailsListSelectionMode.multiple}
        checkboxVisibility={CheckboxVisibility.always}
        selectedKeys={selectedKeys}
        onSelectionChanged={handleSelectionChanged}
        onToggleGroup={handleToggleGroup}
        onItemContextMenu={handleContextMenu}
        dragDropEvents={dragDropEvents}
        enableVirtualization={true}
        overscanCount={4}
        enableInfiniteScroll={true}
        infiniteScrollThreshold={160}
        onLoadMore={handleLoadMore}
        hasNextPage={hasNextPage}
        isLoadingMore={isLoadingMore}
        rowHeight={40}
        groupHeaderHeight={32}
        ariaLabelForGrid={strings.DetailsListAriaLabel}
        loadingMoreMessage={<Text>{strings.DetailsListLoadingMore}</Text>}
        emptyState={<Text>{strings.DetailsListNoItems}</Text>}
      />
      <MessageBar aria-live="polite">{statusMessage}</MessageBar>
      {contextMenuTarget && contextMenuItem && (
        <Menu
          open={true}
          positioning={{ target: contextMenuTarget, position: 'below', align: 'start' }}
          onOpenChange={(_event, data) => {
            if (!data.open) {
              dismissContextMenu();
            }
          }}
        >
          <MenuPopover>
            <MenuList aria-label={`${strings.DetailsListAriaLabel} row actions`}>
              <MenuItem icon={<Checkmark20Regular />} onClick={() => handleContextMenuAction('complete')}>
                Mark complete
              </MenuItem>
              <MenuItem icon={<Copy20Regular />} onClick={() => handleContextMenuAction('duplicate')}>
                Duplicate row
              </MenuItem>
              <MenuItem icon={<Delete20Regular />} onClick={() => handleContextMenuAction('delete')}>
                Delete row
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      )}
      </div>
    </FluentProvider>
    </IdPrefixProvider>
  );
};

TestDetailsListControl.displayName = 'TestDetailsListControl';
