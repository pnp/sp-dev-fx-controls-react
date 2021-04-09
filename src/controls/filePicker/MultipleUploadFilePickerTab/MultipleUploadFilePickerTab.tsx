import * as React from 'react';

import { IMultipleUploadFilePickerTabProps } from './IMultipleUploadFilePickerTabProps';
import { IMultipleUploadFilePickerTabState } from './IMultipleUploadFilePickerTabState';
import { IFilePickerResult } from '../FilePicker.types';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { DragDropFiles } from '../../dragDropFiles/DragDropFiles';

import * as strings from 'ControlStrings';
import styles from './MultipleUploadFilePickerTab.module.scss';



export default class MultipleUploadFilePicketTab extends React.Component<IMultipleUploadFilePickerTabProps, IMultipleUploadFilePickerTabState> {
  private _files: File[] = [];

  constructor(props: IMultipleUploadFilePickerTabProps) {
    super(props);
    this.state = {
      filePickerResult: undefined
    };
  }

 private displayFileNames = (filesResult) =>{
  const result = [];
  for (var i = 0; i < filesResult.length; i++) {
    result.push(<div key={i.toString()} className={styles.localTabFilename}>{filesResult[i].name}</div>);
  }
  return result;
}

  public render(): React.ReactElement<IMultipleUploadFilePickerTabProps> {
    const { filesResult } = this.state;
    const acceptedFilesExtensions = this.props.accepts ? this.props.accepts.join(",") : null;

    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{strings.UploadLinkLabel+" "+strings.OneDriveRootFolderName}</h2>
        </div>
        <div className={css(styles.tab, styles.tabOffset)}>
          <DragDropFiles
            iconName="BulkUpload"
            onDrop={this._handleFileUpload}
          >
            <div className={styles.localTabDragDropFile}>
              {strings.UploadLinkLabel+" "+strings.OneDriveRootFolderName}
            </div>
          </DragDropFiles>

          <div>
            {(filesResult) ? this.displayFileNames(filesResult) : ""}
          </div>

          {this.props.renderCustomMultipleUploadTabContent && this.props.renderCustomMultipleUploadTabContent(this.state.filePickerResult)}
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!filesResult}
              onClick={() => this._handleSave()} className={styles.actionButton}>{strings.ListItemAttachmentslPlaceHolderButtonLabel+" "+strings.OneDriveRootFolderName}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Gets called when files are uploaded
   */
  private _handleFileUpload = (files) => {
    if (files.length < 1) {
      return;
    }else{
      this.setState({
        filesResult: files
      });
    }
  }

  /**
   * Saves base64 encoded image back to property pane file picker
   */
  private _handleSave = () => {
    if(this.state.filesResult)
    {
      const files: File[] = this.state.filesResult;
      for (var i = 0; i < files.length; i++) {
        const filePickerResult: IFilePickerResult = {
          fileAbsoluteUrl: null,
          fileName: files[i].name,
          fileSize: files[i].size,
          fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(files[i].name),
          downloadFileContent: () => { return Promise.resolve(files[i]); }
        };
        this.props.onSave(filePickerResult);
      }
    }
  }

  /**
   * Closes tab without saving
   */
  private _handleClose = () => {
    this.props.onClose();
  }
}
