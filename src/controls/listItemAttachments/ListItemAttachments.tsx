// Joao Mendes November 2018, SPFx reusable Control ListItemAttachments
import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Label } from "@fluentui/react/lib/Label";
import { Link } from '@fluentui/react/lib/Link';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from '@fluentui/react/lib/DetailsList';
import * as strings from 'ControlStrings';
import styles from './ListItemAttachments.module.scss';
import { UploadAttachment } from './UploadAttachment';
import { IListItemAttachmentFile } from './IListItemAttachmentFile';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardPreview,
  IDocumentCardPreviewImage
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import { IListItemAttachmentsProps } from './IListItemAttachmentsProps';
import { IListItemAttachmentsState } from './IListItemAttachmentsState';
import { AttachmentsDisplayMode } from './AttachmentsDisplayMode';
import SPservice from "../../services/SPService";
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import utilities from './utilities';
import { Placeholder } from "../placeholder";
import * as telemetry from '../../common/telemetry';

interface IPreviewImageCollection {
  [fileName: string]: IDocumentCardPreviewImage;
}

export class ListItemAttachments extends React.Component<IListItemAttachmentsProps, IListItemAttachmentsState> {
  private _spservice: SPservice;
  private previewImages: IPreviewImageCollection = {};
  private _utilities: utilities;

  constructor(props: IListItemAttachmentsProps) {
    super(props);

    telemetry.track('ReactListItemAttachments', {});
    this.state = {
      file: null,
      hideDialog: true,
      dialogMessage: '',
      attachments: [],
      deleteAttachment: false,
      disableButton: false,
      showPlaceHolder: false,
      fireUpload: false,
      filesToUpload: [],
      itemId: props.itemId
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context, this.props.webUrl);
    this._utilities = new utilities();
  }

  /**
   * componentDidMount lifecycle hook
   */
  public async componentDidMount(): Promise<void> {
    await this.loadAttachments();
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

  public async uploadAttachments(itemId: number): Promise<void> {
    if (this.state.filesToUpload) {
      let updatedItem: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
      for (const file of this.state.filesToUpload) {
        updatedItem = await this._spservice.addAttachment(
          this.props.listId,
          itemId,
          file.name,
          file,
          this.props.webUrl);
      }
      
      // Notify parent component of the ETag change (use the last updated item)
      if (updatedItem && this.props.onAttachmentChange) {
        this.props.onAttachmentChange(updatedItem);
      }
    }
    return new Promise<void>((resolve, reject) => {
      this.setState({
        filesToUpload: [],
        itemId: itemId
      }, () => this.loadAttachments().then(resolve));
    });
  }

  protected loadAttachmentsPreview(files: IListItemAttachmentFile[]): Promise<void> {
    const filePreviewImages = files.map(file => this.loadAttachmentPreview(file));
    return Promise.all(filePreviewImages).then(filePreviews => {
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
  }
  /**
   * Load Item Attachments
   */
  private async loadAttachments(): Promise<void> {
    if (this.state.itemId) {
      await this._spservice.getListItemAttachments(this.props.listId, this.state.itemId).then(async (files: IListItemAttachmentFile[]) => {
        await this.loadAttachmentsPreview(files);
      }).catch((error: Error) => {
        this.setState({
          fireUpload: false,
          hideDialog: false,
          dialogMessage: strings.ListItemAttachmentserrorLoadAttachments.replace('{0}', error.message)
        });
      });
    }
    else if (this.state.filesToUpload && this.state.filesToUpload.length > 0) {
      const files = this.state.filesToUpload.map(file => ({
        FileName: file.name,
        ServerRelativeUrl: undefined
      }));
      await this.loadAttachmentsPreview(files);
    }
    else {
      this.setState({
        fireUpload: false,
        hideDialog: true,
        dialogMessage: '',
        showPlaceHolder: true
      });
    }
  }

  /**
   * Close the dialog
   */
  private _closeDialog = (): void => {
    this.setState({
      fireUpload: false,
      hideDialog: true,
      dialogMessage: '',
      file: null,
      deleteAttachment: false,
    });

    this.loadAttachments().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }

  /**
   * Attachment uploaded event handler
   */
  private _onAttachmentUpload = async (file: File): Promise<void> => {
    // load Attachments
    if (!this.state.itemId) {
      const files = this.state.filesToUpload || [];
      files.push(file);
      this.setState({
        filesToUpload: [...files]
      });
    }
    await this.loadAttachments();
  }

  /**
   * On delete attachment event handler
   *
   * @param file
   */
  private onDeleteAttachment = (file: IListItemAttachmentFile): void => {
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
  private onConfirmedDeleteAttachment = async (): Promise<void> => {
    // Delete Attachment
    const { file } = this.state;

    this.setState({
      fireUpload: false,
      disableButton: true,
    });

    try {
      if (this.state.itemId) {
        const updatedItem = await this._spservice.deleteAttachment(file.FileName, this.props.listId, this.state.itemId, this.props.webUrl);
        
        // Notify parent component of the ETag change
        if (updatedItem && this.props.onAttachmentChange) {
          this.props.onAttachmentChange(updatedItem);
        }
      }
      else {
        const filesToUpload = this.state.filesToUpload;
        const fileToRemove = filesToUpload.find(f => f.name === file.FileName);
        if (fileToRemove) {
          filesToUpload.splice(filesToUpload.indexOf(fileToRemove), 1);
        }
        const attachments = this.state.attachments;
        const attachmentToRemove = attachments.find(attachment => attachment.FileName === file.FileName);
        if (attachmentToRemove) {
          attachments.splice(attachments.indexOf(attachmentToRemove), 1);

        }
        this.setState({
          filesToUpload: [...filesToUpload],
          attachments: [...attachments]
        });
      }
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
   * Get file extension from filename
   * @param fileName - The file name to extract extension from
   * @returns The file extension (without the dot) or empty string if no extension
   */
  private getFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
      return '';
    }
    return fileName.substring(lastDotIndex + 1).toLowerCase();
  }

  /**
   * Renders attachments in tile/thumbnail mode using DocumentCard components
   * @returns JSX element containing attachment tiles
   */
  private renderTiles (): JSX.Element {
    const { openAttachmentsInNewWindow } = this.props;
    return <React.Fragment>{
      this.state.attachments.map(file => {
              const fileName = file.FileName;
              const previewImage = this.previewImages[fileName];
              const clickDisabled = !this.state.itemId;
              return (
                <div key={fileName} className={styles.documentCardWrapper}>
                  <TooltipHost
                    content={fileName}
                    calloutProps={{ gapSpace: 0, isBeakVisible: true }}
                    closeDelay={200}
                    directionalHint={DirectionalHint.rightCenter}>

                    <DocumentCard
                      onClickHref={!clickDisabled && !openAttachmentsInNewWindow && `${file.ServerRelativeUrl}?web=1`}
                      onClick={!clickDisabled && openAttachmentsInNewWindow && (() => window.open(`${file.ServerRelativeUrl}?web=1`, "_blank"))} // JJ - 20200613 - needed to support Microsoft Teams
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
            })
          }</React.Fragment>
  }

  /**
   * Renders attachments in list mode using DetailsList component
   * Supports both normal and compact display modes
   * @returns JSX element containing attachment list
   */
  private renderDetailsList (): JSX.Element {
    const { displayMode, openAttachmentsInNewWindow } = this.props;
        const columns = [
            {
              key: 'columnFileType',
              name: 'File Type',
              iconName: 'Page',
              isIconOnly: true,
              minWidth: 16,
              maxWidth: 16,
              onRender: (file: IListItemAttachmentFile) => {
                const fileExtension = this.getFileExtension(file.FileName);
                const previewImage = this.previewImages[file.FileName];
                const iconUrl = previewImage?.previewImageSrc || '';
                return (
                  <TooltipHost content={`${fileExtension || 'file'}`}>
                    <img src={iconUrl} className={styles.detailsListIcon} alt={`${fileExtension} file icon`} />
                  </TooltipHost>
                );
              },
            },
            {
              key: 'columnFileName',
              name: 'File Name',
              fieldName: 'FileName',
              minWidth: 150,
              maxWidth: 800,
              isResizable: true,
              onRender: (file: IListItemAttachmentFile) => {
                const clickDisabled = !this.state.itemId;

                if (clickDisabled) {
                  return <span>{file.FileName}</span>;
                }

                if (openAttachmentsInNewWindow) {
                  return (
                    <Link
                      className={styles.detailsListLink}
                      onClick={() => window.open(`${file.ServerRelativeUrl}?web=1`, "_blank")}
                    >
                      {file.FileName}
                    </Link>
                  );
                }

                return (
                  <Link className={styles.detailsListLink} href={`${file.ServerRelativeUrl}?web=1`}>
                    {file.FileName}
                  </Link>
                );
              }
            },
            { 
              key: 'columnDeleteIcon', 
              name: '', 
              minWidth: 32,
              maxWidth: 32,
              isResizable: true,
              onRender: (file: IListItemAttachmentFile) => {
                return (
                  <IconButton
                    className={styles.detailsListIcon}
                    iconProps={{ iconName: "Delete" }}
                    disabled={this.props.disabled}
                    onClick={
                              (ev) => { 
                                ev.preventDefault();
                                ev.stopPropagation();
                                this.onDeleteAttachment(file); }} />

                );
              },
            }
    ];
    return <DetailsList
            className={styles.detailsList}
            items={this.state.attachments}
            columns={columns}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            compact={displayMode === AttachmentsDisplayMode.DetailsListCompact}
          />
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IListItemAttachmentsProps> {
    const { displayMode } = this.props;
    return (
      <div className={styles.ListItemAttachments}>
        <UploadAttachment
          listId={this.props.listId}
          itemId={this.state.itemId}
          disabled={this.props.disabled}
          context={this.props.context}
          onAttachmentUpload={this._onAttachmentUpload}
          fireUpload={this.state.fireUpload}
          onUploadDialogClosed={() => this.setState({ fireUpload: false })}
          onAttachmentChange={this.props.onAttachmentChange}
        />

        {
          this.state.showPlaceHolder ?
            <Placeholder
              iconName='Upload'
              iconText={this.props.label || strings.ListItemAttachmentslPlaceHolderIconText}
              description={this.props.description || strings.ListItemAttachmentslPlaceHolderDescription}
              buttonLabel={strings.ListItemAttachmentslPlaceHolderButtonLabel}
              hideButton={this.props.disabled}
              onConfigure={() => this.setState({ fireUpload: true })} />
            :

            <>
              {(!displayMode || displayMode === AttachmentsDisplayMode.Tiles) && this.renderTiles()}
              {(displayMode === AttachmentsDisplayMode.DetailsList || displayMode === AttachmentsDisplayMode.DetailsListCompact) && this.renderDetailsList()}
            </>
            }
        {!this.state.hideDialog &&

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
