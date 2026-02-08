import * as React from 'react';

import {
  makeStyles,
  shorthands,
  Button,
  Text,
} from '@fluentui/react-components';

import {
  AddRegular,
  EditRegular,
  DeleteRegular,
  CopyRegular,
  ArrowUploadRegular,
  FilterRegular,
  ArrowSortRegular,
  SettingsRegular,
  GridRegular,
  ListRegular,
  ShareRegular,
  ArrowDownloadRegular,
  PinRegular,
  FolderAddRegular,
  RenameRegular,
  InfoRegular,
  ArchiveRegular,
  TagRegular,
} from '@fluentui/react-icons';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { ListToolbar } from '../../../controls/ListToolbar';
import { IToolbarItem } from '../../../controls/ListToolbar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap:'10px',
    height: 'fit-content',
    width: '100%',
  },
});

export interface ITestControlProps {
  context: WebPartContext;
  themeVariant: any;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>,
) => {
  const { themeVariant, context } = props;

  const styles = useStyles();

  const [selectedCount, setSelectedCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [view, setView] = React.useState<'grid' | 'list'>('list');

  // Callback handler for toolbar item clicks
  const onToolbarItemClick = React.useCallback(
    (action: string) => {
      console.log(`Toolbar action selected: ${action}`);

      switch (action) {
        case 'new':
          console.log('Creating new item...');
          break;
        case 'newFolder':
          console.log('Creating new folder...');
          break;
        case 'upload':
          console.log('Opening upload dialog...');
          break;
        case 'edit':
          console.log('Editing selected item...');
          break;
        case 'rename':
          console.log('Renaming selected item...');
          break;
        case 'copy':
          console.log(`Copying ${selectedCount} item(s)...`);
          break;
        case 'share':
          console.log(`Sharing ${selectedCount} item(s)...`);
          break;
        case 'download':
          console.log(`Downloading ${selectedCount} item(s)...`);
          break;
        case 'pin':
          console.log(`Pinning ${selectedCount} item(s)...`);
          break;
        case 'tag':
          console.log(`Tagging ${selectedCount} item(s)...`);
          break;
        case 'archive':
          console.log(`Archiving ${selectedCount} item(s)...`);
          break;
        case 'details':
          console.log('Opening details panel...');
          break;
        case 'delete':
          console.log(`Deleting ${selectedCount} item(s)...`);
          setSelectedCount(0);
          break;
        case 'filter':
          console.log('Opening filter panel...');
          break;
        case 'sort':
          console.log('Opening sort options...');
          break;
        case 'settings':
          console.log('Opening settings...');
          break;
        default:
          break;
      }
    },
    [selectedCount],
  );

  // Regular items (left side) with grouping
  const items: IToolbarItem[] = React.useMemo(
    () => [
      // Create group
      {
        key: 'new',
        label: 'New',
        icon: <AddRegular />,
        appearance: 'primary',
        group: 'create',
        onClick: () => onToolbarItemClick('new'),
      },
      {
        key: 'newFolder',
        label: 'New Folder',
        icon: <FolderAddRegular />,
        appearance: 'subtle',
        group: 'create',
        onClick: () => onToolbarItemClick('newFolder'),
      },
      {
        key: 'upload',
        label: 'Upload',
        icon: <ArrowUploadRegular />,
        appearance: 'subtle',
        group: 'create',
        onClick: () => onToolbarItemClick('upload'),
      },
      // Edit group
      {
        key: 'edit',
        label: 'Edit',
        icon: <EditRegular />,
        group: 'edit',
        appearance: 'subtle',
        visible: selectedCount === 1,
        onClick: () => onToolbarItemClick('edit'),
      },
      {
        key: 'rename',
        label: 'Rename',
        icon: <RenameRegular />,
        group: 'edit',
        appearance: 'subtle',
        visible: selectedCount === 1,
        onClick: () => onToolbarItemClick('rename'),
      },
      {
        key: 'copy',
        label: 'Copy',
        icon: <CopyRegular />,
        group: 'edit',
        appearance: 'subtle',
        visible: selectedCount > 0,
        onClick: () => onToolbarItemClick('copy'),
      },
      // Share & Download group
      {
        key: 'share',
        label: 'Share',
        icon: <ShareRegular />,
        group: 'share',
        appearance: 'subtle',
        visible: selectedCount > 0,
        onClick: () => onToolbarItemClick('share'),
      },
      {
        key: 'download',
        label: 'Download',
        icon: <ArrowDownloadRegular />,
        group: 'share',
        appearance: 'subtle',
        visible: selectedCount > 0,
        onClick: () => onToolbarItemClick('download'),
      },
      // Organize group
      {
        key: 'pin',
        label: 'Pin to top',
        icon: <PinRegular />,
        group: 'organize',
        appearance: 'subtle',
        visible: selectedCount > 0,
        onClick: () => onToolbarItemClick('pin'),
      },
      {
        key: 'tag',
        label: 'Tag',
        icon: <TagRegular />,
        group: 'organize',
        appearance: 'subtle',
        visible: selectedCount > 0,
        onClick: () => onToolbarItemClick('tag'),
      },
      {
        key: 'archive',
        label: 'Archive',
        icon: <ArchiveRegular />,
        group: 'organize',
        appearance: 'subtle',
        visible: selectedCount > 0,
        onClick: () => onToolbarItemClick('archive'),
      },
      // Info group (always visible)
      {
        key: 'details',
        label: 'Details',
        icon: <InfoRegular />,
        group: 'info',
        appearance: 'subtle',
        visible: selectedCount === 1,
        onClick: () => onToolbarItemClick('details'),
      },
      // Danger group
      {
        key: 'delete',
        label: 'Delete',
        icon: <DeleteRegular />,
        group: 'danger',
        appearance: 'subtle',
        visible: selectedCount > 0,
        dividerBefore: true,
        onClick: () => onToolbarItemClick('delete'),
      },
    ],
    [selectedCount, onToolbarItemClick],
  );

  // Far items (right side)
  const farItems: IToolbarItem[] = React.useMemo(
    () => [
      {
        key: 'filter',
        label: 'Filter',
        icon: <FilterRegular />,
        appearance: 'transparent',
        onClick: () => onToolbarItemClick('filter'),
      },
      {
        key: 'sort',
        label: 'Sort',
        icon: <ArrowSortRegular />,
        appearance: 'transparent',
        onClick: () => onToolbarItemClick('sort'),
        dividerAfter: true,
      },
      {
        key: 'gridView',
        icon: <GridRegular />,
        tooltip: 'Grid view',
        appearance: view === 'grid' ? 'primary' : 'transparent',
        onClick: () => {
          setView('grid');
          onToolbarItemClick('gridView');
        },
      },
      {
        key: 'listView',
        icon: <ListRegular />,
        tooltip: 'List view',
        appearance: view === 'list' ? 'primary' : 'transparent',
        onClick: () => {
          setView('list');
          onToolbarItemClick('listView');
        },
      },
      {
        key: 'settings',
        icon: <SettingsRegular />,
        tooltip: 'Settings',
        appearance: 'transparent',
        onClick: () => onToolbarItemClick('settings'),
      },
    ],
    [view, onToolbarItemClick],
  );

  return (
    <div className={styles.root}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px 0' }}>
        <Text weight="semibold">Simulate selection:</Text>
        <Button size="small" appearance="outline" onClick={() => setSelectedCount(0)}>
          No selection
        </Button>
        <Button size="small" appearance="outline" onClick={() => setSelectedCount(1)}>
          1 item selected
        </Button>
        <Button size="small" appearance="outline" onClick={() => setSelectedCount(5)}>
          5 items selected
        </Button>
        <Text>Current: {selectedCount} selected</Text>
      </div>
      <ListToolbar
        items={items}
        farItems={farItems}
        context={context}
        theme={themeVariant}
        isLoading={isLoading}
        totalCount={selectedCount > 0 ? selectedCount : undefined}
        showGroupDividers={true}
        ariaLabel="Document library toolbar"
      />
    </div>
  );
};
