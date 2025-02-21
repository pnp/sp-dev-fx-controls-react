import * as React from "react";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import { Icon } from "@fluentui/react/lib/Icon";
import { IDocumentLibraryBrowserProps } from "./IDocumentLibraryBrowserProps";
import { IDocumentLibraryBrowserState } from "./IDocumentLibraryBrowserState";
import { ILibrary } from "../../../../services/FileBrowserService.types";

import styles from "./DocumentLibraryBrowser.module.scss";
import * as strings from "ControlStrings";

/**
 * This would have been better done as an Office Fabric TileList, but it isn't available yet for production use
 */
export class DocumentLibraryBrowser extends React.Component<
  IDocumentLibraryBrowserProps,
  IDocumentLibraryBrowserState
> {

  constructor(props: IDocumentLibraryBrowserProps) {
    super(props);

    this.state = {
      isLoading: true,
      lists: []
    };
  }

  public async componentDidMount(): Promise<void> {
    const lists = await this.props.fileBrowserService.getSiteMediaLibraries(this.props.includePageLibraries);
    this.setState({
      lists: lists,
      isLoading: false
    });
  }

  public render(): React.ReactElement<IDocumentLibraryBrowserProps> {

    const { lists, isLoading } = this.state;

    return (
      <div className={styles.documentLibraryBrowserContainer}>
        {isLoading && <Spinner label={strings.Loading} />}
        <Stack wrap horizontal horizontalAlign="start" verticalAlign="center">
          {lists.map((list, index) =>
            this._onRenderLibraryTile(list, index)
          )}
        </Stack>
      </div>
    );
  }

   /**
   * Renders a cell for search suggestions
   */
  private _onRenderLibraryTile = (item: ILibrary, index: number | undefined): JSX.Element => {

    return (
      <div
        key={item.absoluteUrl}
        className={styles.filePickerFolderCardTile}
        data-is-focusable={true}
        onClick={(_event) => this._handleOpenLibrary(item)}
      >
          <div className={styles.filePickerFolderCardImage}>
            <Icon
              className={styles.filePickerFolderCoverBack}
              imageProps={{
                src: strings.FolderBackPlate
            }} />
            <Icon
              className={styles.filePickerFolderCoverFront}
              imageProps={{
                src: strings.FolderFrontPlate
            }} />
          </div>
            <div className={styles.filePickerFolderCardTitle}>
              {item.title}
          </div>
      </div>
    );
  }



  /**
   * Calls parent when library is opened
   */
  private _handleOpenLibrary = (library: ILibrary): void => {
    this.props.onOpenLibrary(library);
  }
}
