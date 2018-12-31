import * as React from 'react';
import * as lodash from 'lodash';

import styles from "./attachments.module.scss";
import {PrimaryButton, IconButton} from 'office-ui-fabric-react/lib/Button';
import {autobind} from '@uifabric/utilities/lib';
import {IAttachment} from "./IAttachment";
import {AttachmentsDataService, IAttachmentsDataService} from "../../services/AttachmentsDataService";

export interface IAttachmentsProps {
  itemId: string;
  listName: string;
  headerClassName?: string;
  showAsLinks?: boolean;
}

export interface IAttachmentsState {
  file: any;
  status: string;
  attachments: IAttachment[];
}

export class AttachmentsState implements IAttachmentsState {
  constructor(
    public file: any = null,
    public status: string = "",
    public attachments: IAttachment[] = []
  ) {
  }
}

export default class Attachments extends React.Component<IAttachmentsProps, IAttachmentsState> {
  private attachmentService: IAttachmentsDataService = new AttachmentsDataService();

  constructor(props) {
    super(props);
    this.state = new AttachmentsState();

    this._getAttachments();

  }

  public shouldComponentUpdate(nextProps: Readonly<IAttachmentsProps>, nextState: Readonly<IAttachmentsState>) {
    if ((lodash.isEqual(nextState, this.state) && lodash.isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  @autobind
  private async _getAttachments(): Promise<void> {

    try {

      var _attachments = await this.attachmentService.getAttachments("SL_Requests", this.props.itemId);

      this.setState({
        attachments: _attachments,
        file: null
      });

    } catch (e) {

      console.error(e);
      return null;

    }

  }


  private _handleFile = e => {
    var _file: any = e.target.files[0];
    this.setState({
      file: _file
    });
  }

  @autobind
  private async _handleFileUpload(): Promise<void> {

    this.setState({
      status: "start"
    });

    var file: any = this.state.file;
    try {

      var _attachments = await this.attachmentService.uploadAttachment("SL_Requests", this.props.itemId, file);

      this.setState({
        attachments: _attachments,
        file: null,
        status: "done"
      });

    } catch (e) {
      this.setState({
        status: e.message
      });
      console.log(e.message);

    }

  }

  @autobind
  private async _deleteAttachment(e): Promise<void> {

    this.setState({
      status: "start"
    });

    try {

      var fileName = e.currentTarget.id;
      var _attachments = await this.attachmentService.deleteAttachment("SL_Requests", this.props.itemId, fileName);

      this.setState({
        attachments: _attachments,
        file: null,
        status: "done"
      });

    } catch (e) {
      this.setState({
        status: e.message
      });
      console.log(e.message);

    }

  }

  public render(): React.ReactElement<IAttachmentsProps> {
    return (
      <div className={styles.SPAttachments}>
        <h2 className={this.props.headerClassName}>Attachments</h2>
        <div className={styles.controls}>
          <div>
            <input
              type="file"
              onChange={this._handleFile}
            />
          </div>
          {this.state.file && this.state.file.name &&
          <div className={styles.uploadButton}>
            <PrimaryButton
              disabled={!this.state.file.name}
              text={this.state.file.name ? "Upload" : "Add"}
              onClick={this._handleFileUpload}
            />
          </div>
          }
        </div>
        <div className={styles.clear}/>
        <div>
          {this.state.attachments && this.state.attachments.length > 0 && this.state.attachments.map((att, index) => {
            return <ul>
              <li className={styles.attachment}>
                <IconButton
                  onClick= {this._deleteAttachment }
                  id={att.FileName}
                  iconProps={ { iconName: 'Delete' } }
                  title='Delete'
                />
                {this.props.showAsLinks &&
                  <a href={att.ServerRelativeUrl}>{att.FileName}</a>
                }
                {!this.props.showAsLinks &&
                  <span>{att.FileName}</span>
                }
                </li>
            </ul>;
          })
          }
        </div>

      </div>
    );
  }

}

{/*
<span onClick={this._deleteAttachment(att.FileName)}>
                <Icon iconName="Delete"/>
              </span>*/}
