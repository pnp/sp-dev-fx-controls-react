import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, } from '@fluentui/react/lib/Button';
import { IUploadAttachmentProps } from './IUploadAttachmentProps';
import { IUploadAttachmentState } from './IUploadAttachmentState';
import SPservice from "../../services/SPService";
import * as strings from 'ControlStrings';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import styles from './ListItemAttachments.module.scss';

export class UploadAttachment extends React.Component<IUploadAttachmentProps, IUploadAttachmentState> {
  private _spservice: SPservice;
  private fileInput;
  private _isFileExplorerOpen = false;

  constructor(props: IUploadAttachmentProps) {
    super(props);

    this.state = {
      hideDialog: true,
      dialogMessage: '',
      isLoading: false,
    };

    // Get SPService
    this._spservice = new SPservice(this.props.context);
    this.fileInput = React.createRef();
  }

  /**
   * componentDidUpdate lifecycle hook
   *
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IUploadAttachmentProps, prevState: IUploadAttachmentState): void {
    if (this.props.fireUpload && !this._isFileExplorerOpen) {
      this.fileInput.current.value = '';
      this.fileInput.current.click();
      this._isFileExplorerOpen = true;
    }
  }

  /**
   * On attachment upload event
   */
  private onAttachmentUpload = (): void => {
    // fire click event
    this.fileInput.current.value = '';
    this.fileInput.current.click();
  }

  /**
   * Add a new attachment
   */
  private addAttachment = (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    this.setState({
      isLoading: true
    });

    const reader = new FileReader();
    const file = e.target.files[0];
    return new Promise<void>((resolve, reject)=>{
      reader.onloadend = async () => {

        try {
          if(this.props.itemId && this.props.itemId > 0){
            await this._spservice.addAttachment(this.props.listId, this.props.itemId, file.name, file, this.props.webUrl);
          }

          this.props.onAttachmentUpload(file);
          this.setState({
            isLoading: false
          });
          resolve();
        } catch (error) {
          this.setState({
            hideDialog: false,
            isLoading: false,
            dialogMessage: strings.ListItemAttachmentsuploadAttachmentErrorMsg.replace('{0}', file.name).replace('{1}', error.message)
          });
          reject(error);
        }
        this._isFileExplorerOpen = false;
      };
      reader.readAsDataURL(file);
    });

  }

  /**
   * Close dialog
   */
  private closeDialog = (): void => {
    this.setState({
      hideDialog: true,
      dialogMessage: '',
    });
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IUploadAttachmentProps> {
    return (
      <div>
        <input id="file-picker"
               style={{ display: 'none' }}
               type="file"
               onChange={(e) => this.addAttachment(e)}
               ref={this.fileInput} />
        <div className={styles.uploadBar}>
          <CommandBar
            items={[{
              key: 'Add',
              name: strings.ListItemAttachmentsCommandBarAddAttachmentLabel,
              iconProps: {
                iconName: 'Upload'
              },
              onClick: this.onAttachmentUpload,
              disabled: this.props.disabled
            }]}
          />
        </div>
        <div>
          {
            this.state.isLoading ? <ProgressIndicator label={strings.ListItemAttachmentsloadingMessage} /> : ""
          }
        </div>
        <Dialog
          hidden={this.state.hideDialog}
          type={DialogType.normal}
          onDismiss={this.closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: strings.ListItemAttachmentsuploadAttachmentDialogTitle,
            subText: this.state.dialogMessage
          }}
          modalProps={{
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }} >
          <DialogFooter>
            <PrimaryButton onClick={this.closeDialog}>OK</PrimaryButton>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
