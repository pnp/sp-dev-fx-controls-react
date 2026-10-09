# DetailsList control

This control renders tabular data with selectable rows, custom columns, grouping,
virtualization, infinite scrolling, column resizing, column reordering, and row
drag and drop.

The control is generic, so the item type is shared by the columns, renderers,
groups, selection callbacks, and drag-and-drop callbacks.

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control and the types you need from the `DetailsList` module:

```TypeScript
import {
  DetailsList,
  DetailsListSelectionMode,
  IColumn,
} from "@pnp/spfx-controls-react/lib/DetailsList";
```

- Define the item type, columns, and items in your component:

```TypeScript
interface IProject {
  id: number;
  name: string;
  owner: string;
  status: "Active" | "Archived";
}

const projects: IProject[] = [
  { id: 1, name: "Intranet refresh", owner: "Maya Patel", status: "Active" },
  { id: 2, name: "Launch checklist", owner: "Alex Kim", status: "Archived" },
];

const columns: IColumn<IProject>[] = [
  {
    key: "name",
    name: "Project",
    fieldName: "name",
    minWidth: 180,
    isRowHeader: true,
  },
  {
    key: "owner",
    name: "Owner",
    fieldName: "owner",
    minWidth: 140,
  },
  {
    key: "status",
    name: "Status",
    fieldName: "status",
    minWidth: 100,
  },
];
```

- Use the `DetailsList` control in your component as follows:

```TypeScript
const [selectedProjects, setSelectedProjects] = React.useState<readonly IProject[]>([]);

<DetailsList
  items={projects}
  columns={columns}
  getKey={(project) => project.id}
  selectionMode={DetailsListSelectionMode.multiple}
  onSelectionChanged={({ selectedItems }) => setSelectedProjects(selectedItems)}
  ariaLabelForGrid="Projects"
/>
```

The control uses Fluent UI 9 components internally. Render it inside a Fluent UI
9 `FluentProvider` when the surrounding application provides a custom Fluent UI
9 theme.

## Selection

The `selectionMode` property controls whether rows can be selected. Use
`selectedKeys` for a controlled selection or `defaultSelectedKeys` for an
initial selection.

```TypeScript
const [selectedKeys, setSelectedKeys] = React.useState<ReadonlySet<number>>(new Set());

<DetailsList
  items={projects}
  columns={columns}
  getKey={(project) => project.id}
  selectionMode={DetailsListSelectionMode.multiple}
  selectedKeys={selectedKeys}
  onSelectionChanged={({ selectedKeys: nextKeys }) => {
    setSelectedKeys(new Set(Array.from(nextKeys).map((key) => Number(key))));
  }}
/>
```

`CheckboxVisibility` can be used to show checkboxes always, on hover, or never.
The `disabledItemKeys` property prevents specific rows from being selected.

## Grouping

Groups use indexes into the flattened `items` array. `startIndex` identifies the
first item in a group and `count` identifies how many items it contains.

```TypeScript
import {
  DetailsList,
  DetailsListSelectionMode,
  IDetailsListGroup,
} from "@pnp/spfx-controls-react/lib/DetailsList";

const groupedProjects: IProject[] = [
  { id: 1, name: "Intranet refresh", owner: "Maya Patel", status: "Active" },
  { id: 2, name: "Launch checklist", owner: "Alex Kim", status: "Active" },
  { id: 3, name: "Legacy migration", owner: "João Mendes", status: "Archived" },
];

const groups: IDetailsListGroup<IProject>[] = [
  { key: "active", name: "Active", startIndex: 0, count: 2 },
  { key: "archived", name: "Archived", startIndex: 2, count: 1, isCollapsed: true },
];

<DetailsList
  items={groupedProjects}
  columns={columns}
  groups={groups}
  onToggleGroup={(group, isCollapsed) => {
    console.log(`${group.name} collapsed: ${isCollapsed}`);
  }}
  selectionMode={DetailsListSelectionMode.none}
/>
```

Use `onRenderGroupHeader` when a solution needs a custom group header. The
default group header provides the expand and collapse interaction and aligns the
group label with the leading edge of the list.

## Sorting, resizing, and custom cells

Sorting is controlled by the consuming component. Update the items and the
column sort state in `onColumnClick`:

```TypeScript
import { ColumnActionsMode } from "@pnp/spfx-controls-react/lib/DetailsList";

const [projectItems, setProjectItems] = React.useState<IProject[]>(projects);

const sortableColumns: IColumn<IProject>[] = columns.map((column) => ({
  ...column,
  isResizable: true,
  columnActionsMode: ColumnActionsMode.clickable,
  onColumnClick: (_event, clickedColumn) => {
    const fieldName = clickedColumn.fieldName;
    if (fieldName !== "name" && fieldName !== "owner" && fieldName !== "status") {
      return;
    }
    setProjectItems((currentProjects) => [...currentProjects].sort((left, right) =>
      left[fieldName].localeCompare(right[fieldName]),
    ));
  },
}));

<DetailsList
  items={projectItems}
  columns={sortableColumns}
  onColumnResize={(column, width, columnIndex) => {
    console.log(`Column ${columnIndex} (${column.name}) resized to ${width}`);
  }}
/>
```

Set `isResizable` on a column to enable its resize handle. Users can resize with
the pointer, use the keyboard arrow keys, or double-click the handle to
auto-fit the column. Use `minWidth` and `maxWidth` to constrain the result.

Use `onRender` on an individual `IColumn` or `onRenderItemColumn` on the control
to render icons, badges, links, and row actions:

```TypeScript
import { CheckmarkCircle20Filled } from "@fluentui/react-icons";

const columnsWithIcons: IColumn<IProject>[] = [
  {
    key: "status",
    name: "Status",
    fieldName: "status",
    minWidth: 120,
    onRender: (project) => (
      <div style={{ alignItems: "center", display: "flex", gap: "6px" }}>
        {project.status === "Active" && <CheckmarkCircle20Filled aria-hidden={true} />}
        <span>{project.status}</span>
      </div>
    ),
  },
];
```

## Column drag and drop

Pass `columnReorderOptions` to allow users to drag column headers into a new
order. Frozen columns remain at the beginning or end of the list.

```TypeScript
import {
  ColumnDragEndLocation,
  IColumnReorderOptions,
} from "@pnp/spfx-controls-react/lib/DetailsList";

const columnReorderOptions: IColumnReorderOptions<IProject> = {
  frozenColumnCountFromStart: 1,
  frozenColumnCountFromEnd: 1,
  onColumnDrop: ({ draggedColumn, targetColumn }) => {
    console.log(`Moved ${draggedColumn.name} before ${targetColumn.name}`);
  },
  onDragEnd: (location) => {
    if (location === ColumnDragEndLocation.header) {
      console.log("Column order updated");
    }
  },
};

<DetailsList
  items={projects}
  columns={columns}
  columnReorderOptions={columnReorderOptions}
/>
```

## Row drag and drop

Use `dragDropEvents` to implement scenarios such as prioritizing a work queue,
reordering a playlist, or moving files between an ordered list.

```TypeScript
import { IDetailsListRowDragDropEvents } from "@pnp/spfx-controls-react/lib/DetailsList";

const dragDropEvents: IDetailsListRowDragDropEvents<IProject> = {
  canDrag: (project) => project.status === "Active",
  canDrop: (draggedProject, targetProject) => draggedProject.id !== targetProject.id,
  onDragStart: (project) => console.log(`Dragging ${project.name}`),
  onDrop: (draggedProject, targetProject, targetIndex) => {
    console.log(`Move ${draggedProject.name} before row ${targetIndex}`);
    console.log(`Target row: ${targetProject.name}`);
  },
};

<DetailsList
  items={projects}
  columns={columns}
  dragDropEvents={dragDropEvents}
/>
```

## Infinite scrolling and loading states

Set `enableInfiniteScroll` and provide `onLoadMore` for a list backed by a
paged API. `hasNextPage` prevents another request after the final page.

```TypeScript
<DetailsList
  items={projects}
  columns={columns}
  height={400}
  enableInfiniteScroll={true}
  infiniteScrollThreshold={120}
  onLoadMore={async () => {
    const nextPage = await loadNextProjectPage();
    setProjects((currentProjects) => [...currentProjects, ...nextPage.items]);
    setHasNextPage(nextPage.hasNextPage);
  }}
  hasNextPage={hasNextPage}
  isLoadingMore={isLoadingMore}
  loadingMoreMessage="Loading more projects..."
/>
```

For an initial load, use `isLoading` and `loadingMessage`. The control also
supports shimmer placeholders through `enableShimmer`, `shimmerLines`,
`ariaLabelForShimmer`, and `onRenderCustomPlaceholder`. Use `emptyState` when
there are no items to display.

## Virtualization

Virtualization is useful for large lists. Set a fixed `height`, enable
`enableVirtualization`, and adjust `overscanCount` when the application needs
more rows rendered just outside the viewport.

```TypeScript
<DetailsList
  items={projects}
  columns={columns}
  height={480}
  enableVirtualization={true}
  rowHeight={40}
  overscanCount={5}
  onShouldVirtualize={(itemCount) => itemCount > 50}
/>
```

## Implementation

The `DetailsList` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| items | readonly T[] | yes | Items to render in the list. |
| columns | readonly IColumn&lt;T&gt;[] | yes | Columns to render and their rendering, sorting, grouping, and resizing configuration. |
| getKey | (item: T, index: number) =&gt; React.Key | no | Returns the stable key for a row. The index is used when this is not provided. |
| setKey | string | no | Key used to identify the list instance. |
| height | number | no | Height of the scrollable viewport. Required for practical virtualization and infinite scrolling. |
| compact | boolean | no | Renders rows with a compact layout. |
| layoutMode | DetailsListLayoutMode | no | Uses `fixedColumns` or `justified` column layout. |
| constrainMode | ConstrainMode | no | Uses `unconstrained` or `horizontalConstrained` horizontal layout. |
| isHeaderVisible | boolean | no | Controls whether the column header is rendered. |
| selectionMode | DetailsListSelectionMode | no | Uses `none`, `single`, or `multiple` row selection. |
| checkboxVisibility | CheckboxVisibility | no | Uses `onHover`, `always`, or `hidden` selection checkboxes. |
| selectedKeys | ReadonlySet&lt;React.Key&gt; or readonly React.Key[] | no | Controlled selected row keys. |
| defaultSelectedKeys | readonly React.Key[] | no | Initial selected row keys for an uncontrolled list. |
| disabledItemKeys | ReadonlySet&lt;React.Key&gt; or readonly React.Key[] | no | Row keys that cannot be selected or invoked. |
| onSelectionChanged | (change: IDetailsListSelectionChange&lt;T&gt;) =&gt; void | no | Called after the selected rows change. |
| onActiveItemChanged | (item: T, index: number, event: React.FocusEvent&lt;HTMLElement&gt;) =&gt; void | no | Called when the active row changes. |
| onItemInvoked | (item: T, index: number, event: React.SyntheticEvent) =&gt; void | no | Called when a row is invoked. |
| onItemContextMenu | (item: T, index: number, event: React.MouseEvent&lt;HTMLElement&gt;) =&gt; void or boolean | no | Handles a row context menu. Return `true` when the event is handled. |
| onColumnHeaderClick | (event: React.MouseEvent&lt;HTMLElement&gt;, column: IColumn&lt;T&gt;) =&gt; void | no | Handles a column header click, commonly used for sorting. |
| onColumnHeaderContextMenu | (column: IColumn&lt;T&gt;, event: React.MouseEvent&lt;HTMLElement&gt;) =&gt; void | no | Handles a column header context menu. |
| onColumnResize | (column: IColumn&lt;T&gt;, width: number, columnIndex: number) =&gt; void | no | Called after a column is resized. |
| columnReorderOptions | IColumnReorderOptions&lt;T&gt; | no | Enables column drag and drop and optionally freezes columns at either edge. |
| dragDropEvents | IDetailsListRowDragDropEvents&lt;T&gt; | no | Enables row drag and drop callbacks. |
| groups | readonly IDetailsListGroup&lt;T&gt;[] | no | Group definitions for the flattened items array. |
| onToggleGroup | (group: IDetailsListGroup&lt;T&gt;, isCollapsed: boolean) =&gt; void | no | Called when a group is expanded or collapsed. |
| enableVirtualization | boolean | no | Enables viewport-based row rendering. |
| rowHeight | number | no | Row height used by virtualization. |
| groupHeaderHeight | number | no | Group header height used by virtualization. |
| overscanCount | number | no | Number of extra rows rendered outside the viewport. |
| onShouldVirtualize | (itemCount: number) =&gt; boolean | no | Determines whether virtualization is used for the current item count. |
| enableInfiniteScroll | boolean | no | Enables loading more rows near the end of the viewport. |
| infiniteScrollThreshold | number | no | Distance from the end of the viewport that triggers `onLoadMore`. |
| onLoadMore | () =&gt; void or Promise&lt;void&gt; | no | Loads the next page of items. |
| hasNextPage | boolean | no | Indicates whether another page is available. |
| isLoadingMore | boolean | no | Displays the loading-more state while the next page is being loaded. |
| isLoading | boolean | no | Displays the initial loading state. |
| enableShimmer | boolean | no | Renders shimmer rows while loading. |
| shimmerLines | number | no | Number of shimmer rows. |
| loadingMessage | React.ReactNode | no | Content shown during the initial loading state. |
| loadingMoreMessage | React.ReactNode | no | Content shown while loading another page. |
| emptyState | React.ReactNode | no | Content shown when there are no items. |
| ariaLabelForGrid | string | no | Accessible label for the list grid. |
| getRowAriaLabel | (item: T) =&gt; string | no | Returns the accessible label for a row. |
| styles | IDetailsListStyles | no | Inline style object for the root, viewport, grid, header, rows, cells, and group headers. |

## `IColumn` properties

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| key | string | yes | Unique column key. |
| name | string | yes | Display name for the column header. |
| fieldName | keyof T &amp; string | no | Item property rendered by the default cell renderer. |
| minWidth | number | yes | Minimum column width. |
| maxWidth | number | no | Maximum column width. |
| isResizable | boolean | no | Enables pointer, keyboard, and double-click resizing. |
| isRowHeader | boolean | no | Marks the column as the row header for accessibility. |
| isSorted | boolean | no | Displays the sorted state. Sorting is handled by the consuming component. |
| isSortedDescending | boolean | no | Indicates descending sort direction. |
| isGrouped | boolean | no | Marks the column as the grouping column. |
| columnActionsMode | ColumnActionsMode | no | Uses `disabled`, `clickable`, or `hasDropdown`. |
| onRender | (item: T, index: number, column: IColumn&lt;T&gt;) =&gt; React.ReactNode | no | Renders an individual cell. |
| onRenderHeader | (column: IColumn&lt;T&gt;) =&gt; React.ReactNode | no | Renders a custom column header. |
| onColumnClick | (event, column) =&gt; void | no | Handles a column header click. |
| onColumnResize | (width: number) =&gt; void | no | Handles a resize for this column. |

## `IColumnReorderOptions` properties

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| frozenColumnCountFromStart | number | no | Number of columns that remain at the beginning of the list. |
| frozenColumnCountFromEnd | number | no | Number of columns that remain at the end of the list. |
| onColumnDragStart | (dragStarted: boolean) =&gt; void | no | Called when column dragging starts or ends. |
| onColumnDrop | (details: IDetailsListColumnDragDropDetails&lt;T&gt;) =&gt; void | no | Called after a column is dropped. |
| onDragEnd | (location: ColumnDragEndLocation) =&gt; void | no | Called when column dragging ends. |

## Enums

### `DetailsListSelectionMode`

| Name | Value |
| ---- | ---- |
| none | 0 |
| single | 1 |
| multiple | 2 |

### `CheckboxVisibility`

| Name | Value |
| ---- | ---- |
| onHover | 0 |
| always | 1 |
| hidden | 2 |

### `DetailsListLayoutMode`

| Name | Value |
| ---- | ---- |
| fixedColumns | 0 |
| justified | 1 |

### `ConstrainMode`

| Name | Value |
| ---- | ---- |
| unconstrained | 0 |
| horizontalConstrained | 1 |

### `ColumnActionsMode`

| Name | Value |
| ---- | ---- |
| disabled | 0 |
| clickable | 1 |
| hasDropdown | 2 |

### `ColumnDragEndLocation`

| Name | Value |
| ---- | ---- |
| outside | 0 |
| surface | 1 |
| header | 2 |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/DetailsList)
