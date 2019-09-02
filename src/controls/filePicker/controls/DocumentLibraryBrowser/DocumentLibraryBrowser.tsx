import * as React from 'react';
import styles from './DocumentLibraryBrowser.module.scss';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { css } from "@uifabric/utilities/lib/css";
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

import { IDocumentLibraryBrowserProps, IDocumentLibraryBrowserState } from '.';
import * as strings from 'ControlStrings';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ILibrary } from '../../../../services/FileBrowserService.types';

/**
 * This would have been better done as an Office Fabric TileList, but it isn't available yet for production use
 */
export class DocumentLibraryBrowser extends React.Component<IDocumentLibraryBrowserProps, IDocumentLibraryBrowserState> {
  constructor(props: IDocumentLibraryBrowserProps) {
    super(props);

    this.state = {
      isLoading: true,
      lists: []
    };
  }

  public async componentDidMount() {
    const lists = await this.props.fileBrowserService.getSiteMediaLibraries();
    this.setState({
      lists: lists,
      isLoading: false
    });
  }

  public render(): React.ReactElement<IDocumentLibraryBrowserProps> {
    if (this.state.isLoading) {
      return (<Spinner label={strings.Loading} />);
    }
    return (
      <FocusZone>
        <List
          className={styles.folderList}
          items={this.state.lists}
          onRenderCell={this._onRenderCell}
        />
      </FocusZone>
    );
  }

  /**
   * Renders a file folder cover
   */
  private _onRenderCell = (item: ILibrary, index: number | undefined): JSX.Element => {
    // const folderBlackPlateIcon = item.iconPath ? item.iconPath : strings.FolderBackPlate;
    // const folderFrontPlateIcon = item.iconPath ? item.iconPath : strings.FolderFrontPlate;

    return (
      <div className={styles.listCell} data-is-focusable={true}>
        <div className={styles.cell}>
          <div className={styles.cellContent}>
            <a className={styles.link} onClick={(_event) => this._handleOpenLibrary(item)} >
              <span className={styles.aboveNameplate}>
                <span className={styles.content}>
                  <div className={css(styles.folderCover, styles.isLarge)}>
                    <img src={strings.FolderBackPlate} className={styles.folderCoverBack}></img>
                    <img src={strings.FolderFrontPlate} className={styles.folderCoverFront} />
                  </div>
                </span>
              </span>
              <span className={styles.namePlate}><span className={styles.name}>{item.title}</span></span>
            </a>
          </div>
        </div>
      </div>
    );
  }

/**
 * Calls parent when library is opened
 */
  private _handleOpenLibrary = (library: ILibrary) => {
    this.props.onOpenLibrary(library);
  }
}
