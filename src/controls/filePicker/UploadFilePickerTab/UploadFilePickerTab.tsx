import * as React from 'react';

import { IUploadFilePickerTabProps, IUploadFilePickerTabState } from '.';
import { IFilePickerResult } from '../FilePicker.types';
import { GeneralHelper } from '../../../common/utilities';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';

import * as strings from 'ControlStrings';
import styles from './UploadFilePickerTab.module.scss';



export default class UploadFilePickerTab extends React.Component<IUploadFilePickerTabProps, IUploadFilePickerTabState> {
  constructor(props: IUploadFilePickerTabProps) {
    super(props);
    this.state = {
      filePickerResult: undefined
    };
  }

  public render(): React.ReactElement<IUploadFilePickerTabProps> {
    const { filePickerResult, filePreview } = this.state;
    const fileName: string = filePickerResult ? filePickerResult.fileName : null;
    const acceptedFilesExtensions = this.props.accepts ? this.props.accepts.join(",") : null;

    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{strings.UploadFileHeader}</h2>
        </div>
        <div className={styles.tab}>
          <input
            className={styles.localTabInput}
            type="file" id="fileInput"
            accept={acceptedFilesExtensions} multiple={false} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this._handleFileUpload(event)}
          />
          {
            fileName && filePreview &&
            /** Display image preview */
            <div className={styles.localTabSinglePreview}>
                <img className={styles.localTabSinglePreviewImage} src={filePreview} alt={filePickerResult.fileName} />
                <span>{fileName}</span>
            </div>
          }
          <div>
            <label className={styles.localTabFilename}>{
              (!filePreview && fileName ? fileName : "")
            }</label>
          </div>
          <label className={styles.localTabLabel} htmlFor="fileInput">{
            (fileName ? strings.ChangeFileLinkLabel : strings.ChooseFileLinkLabel)
          }</label>
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!filePickerResult}
              onClick={() => this._handleSave()} className={styles.actionButton}>{strings.AddFileButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Gets called when a file is uploaded
   */
  private _handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }

    // Get the files that were uploaded
    let files = event.target.files;

    // Grab the first file -- there should always only be one
    const file: File = files[0];

    const filePickerResult: IFilePickerResult = {
      fileAbsoluteUrl: null,
      fileName: file.name,
      fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(file.name),
      downloadFileContent: () => { return Promise.resolve(file); }
    };

    if (GeneralHelper.isImage(file.name)) {
      // Convert to base64 image
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState({
          filePreview: reader.result as string
        });
      };
    }
    this.setState({
      filePickerResult,
      filePreview: undefined
    });
  }

  /**
   * Saves base64 encoded image back to property pane file picker
   */
  private _handleSave = () => {
    this.props.onSave(this.state.filePickerResult);
  }

  /**
   * Closes tab without saving
   */
  private _handleClose = () => {
    this.props.onClose();
  }
}
