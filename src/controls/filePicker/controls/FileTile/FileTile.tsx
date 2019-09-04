import * as React from 'react';
import * as strings from 'ControlStrings';
import styles from './FileTile.module.scss';

import { DocumentCard, DocumentCardPreview, IDocumentCardPreviewProps, DocumentCardTitle, DocumentCardActivity } from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { IFile } from '../../../../services/FileBrowserService.types';

export interface IFileTileProps {
  fileItem: IFile;
  //width: number;
}

export interface IFileTileState { }

export class FileTile extends React.Component<IFileTileProps, IFileTileState> {
  public render(): React.ReactElement<IFileTileProps> {

    return (
      <div data-is-focusable={true} role="listitem">
        <DocumentCard>
          <DocumentCardPreview {...this._getDocumentPreviewProps()} />
          <DocumentCardTitle
            title={this._getFileName()}
            shouldTruncate={true}
          />
          <DocumentCardActivity
            activity={`Last modified ${this.props.fileItem.modified}`}
            people={[{ name: this.props.fileItem.modifiedBy, initials: "", profileImageSrc: "" }]}
          />
        </DocumentCard>
      </div>
    );
  }

  private _getDocumentPreviewProps = (): IDocumentCardPreviewProps => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          name: this._getFileName(),
          url: this.props.fileItem.absoluteUrl,
          previewImageSrc: strings.PhotoIconUrl,
          iconSrc: strings.PhotoIconUrl,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        }
      ]
    };

    return previewProps
  }

  private _getImgSrc = () => {
    const file = this.props.fileItem;

    if (file.isFolder) {
      return strings.FolderBackPlate;
    }
    else if (file.absoluteUrl.indexOf(".png") >= 0) {
      return file.absoluteUrl;
    }
    else {
      return strings.PhotoIconUrl;
    }
  }

  private _getFileName = () => {
    let fileName = "No fileName";
    const file = this.props.fileItem;
    if (file.absoluteUrl) {
      const tokens = file.absoluteUrl.split("/");
      fileName = tokens[tokens.length - 1];
    }

    return fileName;
  }
}
