import * as React from 'react';
import styles from './FileTilesList.module.scss';
import { IFile } from '../../../../services/FileBrowserService.types';
import { FileTile } from '../FileTile';
import { Selection, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { List } from 'office-ui-fabric-react/lib/List';

export interface IFileTilesListProps {
  items: IFile[];
}

export interface IFileTilesListState { }

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;


export class FileTilesList extends React.Component<IFileTilesListProps, IFileTilesListState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _selection: Selection;

  constructor(props: IFileTilesListProps) {
    super(props);

    this._selection = new Selection({ onSelectionChanged: this._onSelectionChanged });
  }

  public render(): React.ReactElement<IFileTilesListProps> {
    return (
      <SelectionZone selection={this._selection}>
        {/* //https://developer.microsoft.com/en-us/fabric#/controls/web/focuszone
        //https://developer.microsoft.com/en-us/fabric#/controls/web/list */}

        <List
          className={styles.tilesList}
          items={this.props.items}
          getItemCountForPage={this._getItemCountForPage}
          getPageHeight={this._getPageHeight}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderCell}
        />
      </SelectionZone>
    );
  }

  private _onRenderCell = (item: any, index: number | undefined) => {
    return (
      <FileTile fileItem={item} width={100 / this._columnCount}/>
    )
  }

  private _onSelectionChanged = () => {
    console.log("Selection changed");
  }

  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  };

  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  };
}

