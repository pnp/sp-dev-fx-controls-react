import * as React from 'react';

import { IUploadFilePickerTabProps } from './IUploadFilePickerTabProps';
import { IUploadFilePickerTabState } from './IUploadFilePickerTabState';
import { IFilePickerResult } from '../FilePicker.types';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/components/Button';
import { css } from '@fluentui/react/lib/Utilities';

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
        <div className={css(styles.tab, styles.tabOffset)}>
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
          {this.props.renderCustomUploadTabContent && this.props.renderCustomUploadTabContent(this.state.filePickerResult)}
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

  private _loadPreiview = (file: File): Promise<string | undefined> => {
    return new Promise<string | undefined>(resolve => {
      if (!GeneralHelper.isImage(file.name)) {
        resolve(undefined);
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
  }

  /**
   * Gets called when a file is uploaded
   */
  private _handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }

    // Get the files that were uploaded
    const files = event.target.files;

    // Grab the first file -- there should always only be one
    const file: File = files[0];

    const filePickerResult: IFilePickerResult = {
      fileAbsoluteUrl: null,
      fileName: file.name,
      fileSize: file.size,
      fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(file.name),
      downloadFileContent: () => { return Promise.resolve(file); }
    };

    if (GeneralHelper.isImage(file.name)) {
      // Convert to base64 image
      filePickerResult.previewDataUrl = await this._loadPreiview(file);
    }
    this.setState({
      filePickerResult,
      filePreview: filePickerResult.previewDataUrl
    });

    this.props.onChange([filePickerResult]);
  }

  /**
   * Saves base64 encoded image back to property pane file picker
   */
  private _handleSave = (): void => {
    this.props.onSave([this.state.filePickerResult]);
  }

  /**
   * Closes tab without saving
   */
  private _handleClose = (): void => {
    this.props.onClose();
  }
}
