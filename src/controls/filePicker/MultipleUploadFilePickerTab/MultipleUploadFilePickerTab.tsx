import * as React from 'react';

import { IMultipleUploadFilePickerTabProps } from './IMultipleUploadFilePickerTabProps';
import { IMultipleUploadFilePickerTabState } from './IMultipleUploadFilePickerTabState';
import { IFilePickerResult } from '../FilePicker.types';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/components/Button';
import { css } from '@fluentui/react/lib/Utilities';
import { DragDropFiles } from '../../dragDropFiles/DragDropFiles';

import * as strings from 'ControlStrings';
import styles from './MultipleUploadFilePickerTab.module.scss';



export default class MultipleUploadFilePickerTab extends React.Component<IMultipleUploadFilePickerTabProps, IMultipleUploadFilePickerTabState> {
  constructor(props: IMultipleUploadFilePickerTabProps) {
    super(props);
    this.state = {
      filePickerResult: undefined
    };
  }

  private displayFileNames = (filesResult: IFilePickerResult[]): JSX.Element[] => {
    const result: JSX.Element[] = [];
    for (let i = 0; i < filesResult.length; i++) {
      result.push(<div key={i.toString()} className={styles.localTabFilename}>{filesResult[i].fileName}</div>);
    }
    return result;
  }

  public render(): React.ReactElement<IMultipleUploadFilePickerTabProps> {
    const { filePickerResult } = this.state;
    const acceptedFilesExtensions = this.props.accepts ? this.props.accepts.join(",") : null;

    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{strings.UploadLinkLabel + " " + strings.OneDriveRootFolderName}</h2>
        </div>
        <div className={css(styles.tab, styles.tabOffset)}>
          <DragDropFiles
            iconName="BulkUpload"
            onDrop={this._handleFileUpload}
          >
            <div className={styles.localTabDragDropFile}>
              <input
                className={styles.localTabInput}
                type="file" id="fileInput"
                accept={acceptedFilesExtensions} multiple={true} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this._handleFileUploadExplorer(event)}
              />
              <label className={styles.localTabLabel} htmlFor="fileInput">
                {strings.UploadLinkLabel + " " + strings.OneDriveRootFolderName}
              </label>
            </div>
          </DragDropFiles>

          <div>
            {(filePickerResult) ? this.displayFileNames(filePickerResult) : ""}
          </div>

          {this.props.renderCustomMultipleUploadTabContent && this.props.renderCustomMultipleUploadTabContent(this.state.filePickerResult)}
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!filePickerResult}
              onClick={() => this._handleSave()} className={styles.actionButton}>{strings.ListItemAttachmentslPlaceHolderButtonLabel + " " + strings.OneDriveRootFolderName}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Gets called when files are uploaded via drag and drop
   */
  private _handleFileUpload = (files: File[]): void => {
    if (files.length < 1) {
      return;
    } else {
      const filePickerResultsArray: IFilePickerResult[] = [];
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const filePickerResult: IFilePickerResult = {
          fileAbsoluteUrl: null,
          fileName: file.name,
          fileSize: file.size,
          fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(file.name),
          downloadFileContent: () => { return Promise.resolve(file); }
        };
        filePickerResultsArray.push(filePickerResult);
      }

      this.setState({
        filePickerResult: filePickerResultsArray
      });

      this.props.onChange(filePickerResultsArray);
    }
  }

  /**
   * Gets called when files are uploaded via file explorer
   */
  private _handleFileUploadExplorer = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || event.target.files.length < 1) {
      return;
    } else {
      const files: File[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file: File = event.target.files.item(i);
        files.push(file);
      }
      this._handleFileUpload(files);
    }
  }

  /**
   * Saves base64 encoded image back to property pane file picker
   */
  private _handleSave = (): void => {
    this.props.onSave(this.state.filePickerResult);
  }

  /**
   * Closes tab without saving
   */
  private _handleClose = (): void => {
    this.props.onClose();
  }
}
