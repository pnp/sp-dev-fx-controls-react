// Joao Mendes November 2018, SPFx reusable Control ListItemAttachments
import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from "office-ui-fabric-react/lib/Label";
import * as strings from 'ControlStrings';
import styles from './ListItemAttachments.module.scss';
import { UploadAttachment } from './UploadAttachment';
import { IListItemAttachmentFile } from './IListItemAttachmentFile';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardPreview,
  IDocumentCardPreviewImage
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { IListItemAttachmentsProps } from '.';
import { IListItemAttachmentsState } from '.';
import SPservice from "../../services/SPService";
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import utilities from './utilities';
import { Placeholder } from "../placeholder";

interface IPreviewImageCollection {
  [fileName: string]: IDocumentCardPreviewImage;
}

export class ListItemAttachments extends React.Component<IListItemAttachmentsProps, IListItemAttachmentsState> {
  private _spservice: SPservice;
  private previewImages: IPreviewImageCollection;
  private _utilities: utilities;

  constructor(props: IListItemAttachmentsProps) {
    super(props);

    this.state = {
      file: null,
      hideDialog: true,
      dialogMessage: '',
      attachments: [],
      deleteAttachment: false,
      disableButton: false,
      showPlaceHolder: false,
      fireUpload: false
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context);
    this._utilities = new utilities();
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount() {
    this.loadAttachments();
  }

  private async loadAttachmentPreview(file: IListItemAttachmentFile): Promise<IDocumentCardPreviewImage> {
    return this._utilities.GetFileImageUrl(file).then(previewImageUrl => {
      return {
        name: file.FileName,
        previewImageSrc: previewImageUrl,
        iconSrc: '',
        imageFit: ImageFit.center,
        width: 187,
        height: 130,
      };
    });
  }

  /**
   * Load Item Attachments
   */
  private async loadAttachments() {
    this._spservice.getListItemAttachments(this.props.listId, this.props.itemId).then((files: IListItemAttachmentFile[]) => {
      const filePreviewImages = files.map(file => this.loadAttachmentPreview(file));
      return Promise.all(filePreviewImages).then(filePreviews => {
        this.previewImages = {};
        filePreviews.forEach(preview => {
          this.previewImages[preview.name] = preview;
        });

        this.setState({
          fireUpload: false,
          hideDialog: true,
          dialogMessage: '',
          attachments: files,
          showPlaceHolder: files.length === 0 ? true : false
        });
      });
    }).catch((error: Error) => {
      this.setState({
        fireUpload: false,
        hideDialog: false,
        dialogMessage: strings.ListItemAttachmentserrorLoadAttachments.replace('{0}', error.message)
      });
    });
  }

  /**
   * Close the dialog
   */
  private _closeDialog = () => {
    this.setState({
      fireUpload: false,
      hideDialog: true,
      dialogMessage: '',
      file: null,
      deleteAttachment: false,
    });

    this.loadAttachments();
  }

  /**
   * Attachment uploaded event handler
   */
  private _onAttachmentUpload = () => {
    // load Attachments
    this.loadAttachments();
  }

  /**
   * On delete attachment event handler
   *
   * @param file
   */
  private onDeleteAttachment = (file: IListItemAttachmentFile) => {
    this.setState({
      fireUpload: false,
      hideDialog: false,
      deleteAttachment: true,
      file: file,
      dialogMessage: strings.ListItemAttachmentsconfirmDelete.replace('{0}', file.FileName),
    });
  }

  /**
   * Delete the attachment once it was confirmed
   */
  private onConfirmedDeleteAttachment = async () => {
    // Delete Attachment
    const { file } = this.state;

    this.setState({
      fireUpload: false,
      disableButton: true,
    });

    try {
      await this._spservice.deleteAttachment(file.FileName, this.props.listId, this.props.itemId, this.props.webUrl);

      this.setState({
        fireUpload: false,
        hideDialog: false,
        deleteAttachment: false,
        disableButton: false,
        file: null,
        dialogMessage: strings.ListItemAttachmentsfileDeletedMsg.replace('{0}', file.FileName),
      });
    } catch (error) {
      this.setState({
        fireUpload: false,
        hideDialog: false,
        file: null,
        deleteAttachment: false,
        dialogMessage: strings.ListItemAttachmentsfileDeleteError.replace('{0}', file.FileName).replace('{1}', error.message)
      });
    }
  }

  /**
   * Default React render method
   */
  public render() {
    return (
      <div className={styles.ListItemAttachments}>
        <UploadAttachment
          listId={this.props.listId}
          itemId={this.props.itemId}
          disabled={this.props.disabled}
          context={this.props.context}
          onAttachmentUpload={this._onAttachmentUpload}
          fireUpload={this.state.fireUpload}
        />

        {
          this.state.showPlaceHolder ?
            <Placeholder
              iconName='Upload'
              iconText={strings.ListItemAttachmentslPlaceHolderIconText}
              description={strings.ListItemAttachmentslPlaceHolderDescription}
              buttonLabel={strings.ListItemAttachmentslPlaceHolderButtonLabel}
              onConfigure={() => this.setState({ fireUpload: true })} />
            :

            this.state.attachments.map(file => {
              const fileName = file.FileName;
              const previewImage = this.previewImages[fileName];
              return (
                <div key={fileName} className={styles.documentCardWrapper}>
                  <TooltipHost
                    content={fileName}
                    calloutProps={{ gapSpace: 0, isBeakVisible: true }}
                    closeDelay={200}
                    directionalHint={DirectionalHint.rightCenter}>

                    <DocumentCard
                      onClickHref={`${file.ServerRelativeUrl}?web=1`}
                      className={styles.documentCard}>
                      <DocumentCardPreview previewImages={[previewImage]} />
                      <Label className={styles.fileLabel}>{fileName}</Label>
                      <DocumentCardActions
                        actions={
                          [
                            {
                              iconProps: {
                                iconName: 'Delete',
                                title: strings.ListItemAttachmentsActionDeleteIconTitle,
                              },
                              title: strings.ListItemAttachmentsactionDeleteTitle,
                              text: strings.ListItemAttachmentsactionDeleteTitle,
                              disabled: this.props.disabled,
                              onClick: (ev) => {
                                ev.preventDefault();
                                ev.stopPropagation();
                                this.onDeleteAttachment(file);
                              }
                            },
                          ]
                        }
                      />
                    </DocumentCard>
                  </TooltipHost>
                </div>
              );
            })}
        {

          <Dialog
            hidden={this.state.hideDialog}
            type={DialogType.normal}
            onDismiss={this._closeDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: strings.ListItemAttachmentsdialogTitle,
              subText: this.state.dialogMessage
            }}
            modalProps={{
              isBlocking: true,
              containerClassName: 'ms-dialogMainOverride'
            }} >
            <DialogFooter>
              <div style={{ marginBottom: 7 }}>
                {
                  this.state.disableButton ? <Spinner size={SpinnerSize.medium} /> : null
                }
              </div>
              {
                this.state.deleteAttachment ? (<PrimaryButton disabled={this.state.disableButton} onClick={this.onConfirmedDeleteAttachment}>{strings.ListItemAttachmentsdialogOKbuttonLabelOnDelete}</PrimaryButton>) : null
              }
              {
                this.state.deleteAttachment ? (<DefaultButton disabled={this.state.disableButton} onClick={this._closeDialog}>{strings.ListItemAttachmentsdialogCancelButtonLabel}</DefaultButton>)
                  : <PrimaryButton onClick={this._closeDialog}>{strings.ListItemAttachmentsdialogOKbuttonLabel}</PrimaryButton>
              }
            </DialogFooter>
          </Dialog>
        }
      </div>
    );
  }
}
