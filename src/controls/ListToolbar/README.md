# ListToolbar

A flexible toolbar component for building list and data grid command bars with support for grouping, far items, and custom rendering.

## Description

The `ListToolbar` component provides a powerful and flexible toolbar built with Fluent UI 9 components. It supports item grouping, left/right aligned items, dividers, tooltips, automatic overflow menu, responsive design, loading states, and custom rendering - making it ideal for list views, data grids, and any interface that needs a command bar.

## Features

- ✅ Left and right (far) item alignment
- ✅ Item grouping with automatic dividers
- ✅ Individual item dividers (before/after)
- ✅ Tooltip support
- ✅ Loading state with disabled items
- ✅ Custom item rendering
- ✅ Total count badge display
- ✅ Visibility control per item
- ✅ Accessibility support with aria labels
- ✅ Overflow menu — left items collapse into a "..." menu when space is limited
- ✅ Responsive design — far item labels auto-hide on small screens
- ✅ SharePoint & Teams theme support via `theme` and `context` props
- ✅ Fluent UI 9 theming with automatic Teams dark/high-contrast detection

## Installation

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import type { IListToolbarProps, IToolbarItem } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
```

## Props

### IListToolbarProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `IToolbarItem[]` | Yes | - | Array of toolbar items |
| `farItems` | `IToolbarItem[]` | No | `[]` | Items on the right side |
| `isLoading` | `boolean` | No | `false` | Loading state (disables items) |
| `ariaLabel` | `string` | No | `'Toolbar'` | Accessibility label |
| `totalCount` | `number` | No | - | Display item count badge |
| `className` | `string` | No | - | Additional CSS class |
| `showGroupDividers` | `boolean` | No | `true` | Show dividers between groups |
| `theme` | `Theme` | No | - | Fluent UI v8 theme (auto-converted to v9) |
| `context` | `BaseComponentContext` | No | - | SPFx component context (enables Teams theme detection) |

### IToolbarItem

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `key` | `string` | Yes | - | Unique identifier |
| `label` | `string` | No | - | Button text |
| `tooltip` | `string` | No | - | Tooltip content |
| `icon` | `ReactElement` | No | - | Icon element |
| `onClick` | `() => void` | No | - | Click handler |
| `disabled` | `boolean` | No | `false` | Disable the item |
| `visible` | `boolean` | No | `true` | Show/hide the item |
| `group` | `string` | No | `'default'` | Group name for grouping |
| `isFarItem` | `boolean` | No | `false` | Place on right side |
| `appearance` | `ToolbarButtonProps['appearance']` | No | - | Button appearance |
| `onRender` | `() => ReactElement` | No | - | Custom render function |
| `dividerAfter` | `boolean` | No | `false` | Add divider after item |
| `dividerBefore` | `boolean` | No | `false` | Add divider before item |
| `ariaLabel` | `string` | No | - | Accessibility label override |

## Usage Examples

### Basic Toolbar

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { AddRegular, EditRegular, DeleteRegular } from '@fluentui/react-icons';

const BasicToolbar = () => {
  const items = [
    { 
      key: 'new', 
      label: 'New', 
      icon: <AddRegular />, 
      onClick: () => console.log('New clicked') 
    },
    { 
      key: 'edit', 
      label: 'Edit', 
      icon: <EditRegular />, 
      onClick: () => console.log('Edit clicked') 
    },
    { 
      key: 'delete', 
      label: 'Delete', 
      icon: <DeleteRegular />, 
      onClick: () => console.log('Delete clicked') 
    },
  ];

  return <ListToolbar items={items} />;
};
```

### With Far Items

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { 
  AddRegular, 
  FilterRegular, 
  ArrowSortRegular,
  SettingsRegular 
} from '@fluentui/react-icons';

const ToolbarWithFarItems = () => {
  const items = [
    { key: 'new', label: 'New Item', icon: <AddRegular />, onClick: () => {} },
  ];

  const farItems = [
    { key: 'filter', label: 'Filter', icon: <FilterRegular />, onClick: () => {} },
    { key: 'sort', label: 'Sort', icon: <ArrowSortRegular />, onClick: () => {} },
    { key: 'settings', icon: <SettingsRegular />, tooltip: 'Settings', onClick: () => {} },
  ];

  return <ListToolbar items={items} farItems={farItems} />;
};
```

### With Grouping

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { 
  AddRegular, 
  EditRegular, 
  CopyRegular,
  CutRegular,
  ClipboardPasteRegular,
  DeleteRegular 
} from '@fluentui/react-icons';

const GroupedToolbar = () => {
  const items = [
    // File operations group
    { key: 'new', label: 'New', icon: <AddRegular />, group: 'file', onClick: () => {} },
    { key: 'edit', label: 'Edit', icon: <EditRegular />, group: 'file', onClick: () => {} },
    
    // Clipboard group
    { key: 'copy', label: 'Copy', icon: <CopyRegular />, group: 'clipboard', onClick: () => {} },
    { key: 'cut', label: 'Cut', icon: <CutRegular />, group: 'clipboard', onClick: () => {} },
    { key: 'paste', label: 'Paste', icon: <ClipboardPasteRegular />, group: 'clipboard', onClick: () => {} },
    
    // Danger group
    { key: 'delete', label: 'Delete', icon: <DeleteRegular />, group: 'danger', onClick: () => {} },
  ];

  return <ListToolbar items={items} showGroupDividers={true} />;
};
```

### With Total Count

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { AddRegular, ArrowSyncRegular } from '@fluentui/react-icons';

const ToolbarWithCount = ({ items, totalCount }) => {
  const toolbarItems = [
    { key: 'new', label: 'New', icon: <AddRegular />, onClick: () => {} },
    { key: 'refresh', label: 'Refresh', icon: <ArrowSyncRegular />, onClick: () => {} },
  ];

  return (
    <ListToolbar 
      items={toolbarItems} 
      totalCount={totalCount}
    />
  );
};
```

### Loading State

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { AddRegular, DeleteRegular } from '@fluentui/react-icons';
import { useState } from 'react';

const LoadingToolbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    await performAction();
    setIsLoading(false);
  };

  const items = [
    { key: 'new', label: 'New', icon: <AddRegular />, onClick: handleAction },
    { key: 'delete', label: 'Delete', icon: <DeleteRegular />, onClick: handleAction },
  ];

  return <ListToolbar items={items} isLoading={isLoading} />;
};
```

### Conditional Visibility

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { EditRegular, DeleteRegular, ShareRegular } from '@fluentui/react-icons';

const ConditionalToolbar = ({ selectedItems, canEdit, canDelete }) => {
  const items = [
    { 
      key: 'edit', 
      label: 'Edit', 
      icon: <EditRegular />, 
      visible: selectedItems.length === 1 && canEdit,
      onClick: () => {} 
    },
    { 
      key: 'delete', 
      label: 'Delete', 
      icon: <DeleteRegular />, 
      visible: selectedItems.length > 0 && canDelete,
      onClick: () => {} 
    },
    { 
      key: 'share', 
      label: 'Share', 
      icon: <ShareRegular />, 
      visible: selectedItems.length > 0,
      onClick: () => {} 
    },
  ];

  return <ListToolbar items={items} />;
};
```

### With Custom Rendering

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { SearchBox, Dropdown, Option } from '@fluentui/react-components';
import { AddRegular } from '@fluentui/react-icons';

const CustomRenderToolbar = ({ onSearch, onFilterChange }) => {
  const items = [
    { key: 'new', label: 'New', icon: <AddRegular />, onClick: () => {} },
  ];

  const farItems = [
    {
      key: 'filter',
      onRender: () => (
        <Dropdown placeholder="Filter by status" onOptionSelect={onFilterChange}>
          <Option value="all">All</Option>
          <Option value="active">Active</Option>
          <Option value="completed">Completed</Option>
        </Dropdown>
      ),
    },
    {
      key: 'search',
      onRender: () => (
        <SearchBox 
          placeholder="Search..." 
          onChange={(e, data) => onSearch(data.value)}
        />
      ),
    },
  ];

  return <ListToolbar items={items} farItems={farItems} />;
};
```

### Document Library Toolbar

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { 
  AddRegular, 
  ArrowUploadRegular,
  FolderAddRegular,
  EditRegular,
  DeleteRegular,
  ShareRegular,
  DownloadRegular,
  GridRegular,
  ListRegular
} from '@fluentui/react-icons';

const DocumentLibraryToolbar = ({ selectedCount, onViewChange, view }) => {
  const items = [
    { key: 'new', label: 'New', icon: <AddRegular />, group: 'create', onClick: () => {} },
    { key: 'upload', label: 'Upload', icon: <ArrowUploadRegular />, group: 'create', onClick: () => {} },
    { key: 'newFolder', label: 'New Folder', icon: <FolderAddRegular />, group: 'create', onClick: () => {} },
    
    // Context-sensitive items
    { key: 'edit', label: 'Edit', icon: <EditRegular />, group: 'actions', visible: selectedCount === 1, onClick: () => {} },
    { key: 'share', label: 'Share', icon: <ShareRegular />, group: 'actions', visible: selectedCount > 0, onClick: () => {} },
    { key: 'download', label: 'Download', icon: <DownloadRegular />, group: 'actions', visible: selectedCount > 0, onClick: () => {} },
    { key: 'delete', label: 'Delete', icon: <DeleteRegular />, group: 'danger', visible: selectedCount > 0, dividerBefore: true, onClick: () => {} },
  ];

  const farItems = [
    { 
      key: 'gridView', 
      icon: <GridRegular />, 
      tooltip: 'Grid view',
      appearance: view === 'grid' ? 'primary' : undefined,
      onClick: () => onViewChange('grid') 
    },
    { 
      key: 'listView', 
      icon: <ListRegular />, 
      tooltip: 'List view',
      appearance: view === 'list' ? 'primary' : undefined,
      onClick: () => onViewChange('list') 
    },
  ];

  return (
    <ListToolbar 
      items={items} 
      farItems={farItems}
      totalCount={selectedCount > 0 ? selectedCount : undefined}
      ariaLabel="Document library toolbar"
    />
  );
};
```

### With Dividers

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { 
  SaveRegular, 
  ArrowUndoRegular, 
  ArrowRedoRegular,
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular
} from '@fluentui/react-icons';

const EditorToolbar = () => {
  const items = [
    { key: 'save', icon: <SaveRegular />, tooltip: 'Save', onClick: () => {}, dividerAfter: true },
    { key: 'undo', icon: <ArrowUndoRegular />, tooltip: 'Undo', onClick: () => {} },
    { key: 'redo', icon: <ArrowRedoRegular />, tooltip: 'Redo', onClick: () => {}, dividerAfter: true },
    { key: 'bold', icon: <TextBoldRegular />, tooltip: 'Bold', onClick: () => {} },
    { key: 'italic', icon: <TextItalicRegular />, tooltip: 'Italic', onClick: () => {} },
    { key: 'underline', icon: <TextUnderlineRegular />, tooltip: 'Underline', onClick: () => {} },
  ];

  return <ListToolbar items={items} showGroupDividers={false} />;
};
```

### SPFx Web Part Integration

When used inside a SharePoint Framework web part, pass `context` and `theme` to enable automatic theming (including Teams dark and high-contrast modes):

```tsx
import { ListToolbar } from '@pnp/spfx-controls-react/lib/controls/ListToolbar';
import { AddRegular, EditRegular } from '@fluentui/react-icons';
import { BaseComponentContext } from '@microsoft/sp-component-base';

interface IMyWebPartProps {
  context: BaseComponentContext;
}

const MyWebPartToolbar: React.FC<IMyWebPartProps> = ({ context }) => {
  const items = [
    { key: 'new', label: 'New', icon: <AddRegular />, onClick: () => {} },
    { key: 'edit', label: 'Edit', icon: <EditRegular />, onClick: () => {} },
  ];

  return (
    <ListToolbar
      items={items}
      context={context}
      ariaLabel="My web part toolbar"
    />
  );
};
```

> **Note:** When running inside Microsoft Teams, the component automatically detects the Teams theme (default, dark, high-contrast) and applies the matching Fluent UI 9 theme. In SharePoint, it converts the current v8 theme to a v9 theme using `createV9Theme`.

## Notes

- Items with the same `group` value are grouped together
- Use `isFarItem: true` or the `farItems` prop for right-aligned items
- `visible: false` completely hides an item from the toolbar
- `disabled: true` or `isLoading: true` disables item interaction
- Use `onRender` for complete control over item rendering
- Tooltips are automatically applied when `tooltip` is provided
- When space is limited, left-side items automatically collapse into a **"..." overflow menu**
- Far item labels are **hidden on small screens** (< 768px), showing only icons
- Pass `context` from your SPFx web part to enable **Teams theme detection**
- The component wraps content in a `FluentProvider` — no need to add your own

## Related Components

- `ButtonMenu` - For dropdown menu buttons
- `IconButton` - For icon-only buttons
- `GenericOverflowMenu` - For overflow menus
