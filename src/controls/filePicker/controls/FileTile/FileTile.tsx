import * as React from 'react';
import * as strings from 'ControlStrings';
import styles from './FileTile.module.scss';
import { IFile } from '../../../../../lib/services/FileBrowserService.types';

export interface IFileTileProps {
  fileItem: IFile;
  width: number;
}

export interface IFileTileState {}

export class FileTile extends React.Component<IFileTileProps, IFileTileState> {
  public render(): React.ReactElement<IFileTileProps> {
//https://developer.microsoft.com/en-us/fabric#/controls/web/list
    return (

      <div className={styles.tile}
      data-is-focusable={true}
      style={{
        width: this.props.width + '%'
      }}
    >
      <div className={styles.tileSizer}>
        <div className={styles.tilePadder}>
          <img src={this._getImgSrc()} className={styles.tileImage} />
          <span className={styles.tileLabel}>{this._getFileName()}</span>
        </div>
      </div>
    </div>
    );
  }

  private _getImgSrc = () => {
    const file = this.props.fileItem;

    if (file.isFolder) {
      return strings.FolderBackPlate;
    }
    else if (file.absoluteRef.indexOf(".png") >= 0) {
      return file.absoluteRef;
    }
    else {
      return strings.PhotoIconUrl;
    }
  }

  private _getFileName = () => {
    let fileName = "No fileName";
    const file = this.props.fileItem;
    if (file.absoluteRef) {
      const tokens = file.absoluteRef.split("/");
      fileName = tokens[tokens.length - 1];
    }

    return fileName;
  }
}
