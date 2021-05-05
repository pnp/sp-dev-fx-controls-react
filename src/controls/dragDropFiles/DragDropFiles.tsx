import * as React from 'react';
import styles from './DragDropFiles.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IDragDropFilesState, IDragDropFilesProps } from './IDragDropFiles';
import * as strings from 'ControlStrings';

/**
 * DragDropFiles Class Control
 */
export class DragDropFiles extends React.Component<IDragDropFilesProps, IDragDropFilesState> {
  private dragCounter = 0;
  private dropRef = React.createRef<HTMLDivElement>();
  private _LabelMessage;
  private _IconName;
  private _dropEffect;
  private _enable;

  constructor(props: IDragDropFilesProps) {
    super(props);
    // Initialize state
    this.state = {
      dragStatus: false
    };

  }

  /**
 * Lifecycle hook when component is mounted
 */
  public componentDidMount(): void {
    const { dropEffect, enable } = this.props;
    if (dropEffect == undefined || dropEffect == "") {
      this._dropEffect = "copy";
    } else {
      this._dropEffect = dropEffect;
    }
    if (enable == undefined) {
      this._enable = true;
    } else {
      this._enable = enable;
    }
    // Add EventListeners for drag zone area
    let divDropArea = this.dropRef.current;
    if (this._enable == true) {
      divDropArea.addEventListener('dragenter', this.handleonDragEnter);
      divDropArea.addEventListener('dragleave', this.handleonDragLeave);
      divDropArea.addEventListener('dragover', this.handleonDragOver);
      divDropArea.addEventListener('drop', this.handleonDrop);
    }
  }

  /**
   * Stop listeners from onDragOver event.
   * @param e
   */
  private handleonDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      e.dataTransfer.dropEffect = e.dataTransfer.dropEffect = this.props.dropEffect;
    }
  }
  /**
   * Stop listeners from onDragEnter event, enable drag and drop view.
   * @param e
   */
  private handleonDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      e.dataTransfer.dropEffect = this._dropEffect;
      this.setState({ dragStatus: true });
    }
  }
  /**
   * Stop listeners from ondragenter event, disable drag and drop view.
   * @param e
   */
  private handleonDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ dragStatus: false });
    }
  }
  /**
  * Stop listeners from onDrop event and load files to property onDrop.
  * @param e
  */
  private handleonDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragStatus: false });
    if (e.dataTransfer && e.dataTransfer.items) {
      this.props.onDrop(await this.getFilesAsync(e));
    }
    e.dataTransfer.clearData();
    this.dragCounter = 0;
  }

  /**
     * Add File to Array Files of type File[]
     * https://www.meziantou.net/upload-files-and-directories-using-an-input-drag-and-drop-or-copy-and-paste-with.htm 
     * @param dataTransfer 
     */
  private getFilesAsync = async (e) => {
    const Customfiles = e.dataTransfer;
    const items = Customfiles.items;
    const Directory = [];
    let entry: any;
    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        /**
         * This method retrieves Files from Folders
         * defensive code to only use method when exist in browser if not only return files. 
         * https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
        */
        if (item.getAsEntry) {
          entry = item.getAsEntry();
          if (entry.isDirectory) {
            Directory.push(entry);
          } else {
            const file = item.getAsFile();
            if (file) {
              file.fullPath = "";
              files.push(file);
            }
          }
        } else if (item.webkitGetAsEntry) {
          entry = item.webkitGetAsEntry();
          if (entry.isDirectory) {
            Directory.push(entry);
          } else {
            const file = item.getAsFile();
            if (file) {
              file.fullPath = "";
              files.push(file);
            }
          }
        } else if ("function" == typeof item.getAsFile) {
          const file = item.getAsFile();
          if (file) {
            file.fullPath = "";
            files.push(file);
          }
        }
        continue;
      }
    }
    if (Directory.length > 0) {
      const entryContent = await this.readEntryContentAsync(Directory);
      files.push(...entryContent);
    }
    return files;
  }

  // Returns a promise with all the files of the directory hierarchy
  /**
   * 
   * @param entry 
   */
  private readEntryContentAsync = (Directory) => {
    return new Promise<File[]>((resolve, reject) => {
      let reading = 0;
      const contents: File[] = [];
      Directory.forEach(entry => {
        readEntry(entry, "");
      });

      function readEntry(entry, path) {
        if (entry.isDirectory) {
          readReaderContent(entry.createReader());
        } else {
          reading++;
          entry.file(file => {
            reading--;
            file.fullPath = path;
            contents.push(file);

            if (reading === 0) {
              resolve(contents);
            }
          });
        }
      }

      function readReaderContent(reader) {
        reading++;

        reader.readEntries((entries) => {
          reading--;
          for (const entry of entries) {
            readEntry(entry, entry.fullPath);
          }

          if (reading === 0) {
            resolve(contents);
          }
        });
      }
    });
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IDragDropFilesProps> {
    let { dragStatus } = this.state;
    let { labelMessage, iconName } = this.props;

    if (labelMessage == undefined || labelMessage == "") {
      this._LabelMessage = "";
    } else {
      this._LabelMessage = labelMessage;
    }
    if (iconName == undefined || iconName == "") {
      this._IconName = "";
    } else {
      this._IconName = iconName;
    }
    return (
      <div className={(dragStatus && this._enable) ? styles.DragDropFilesArea : styles.DragDropFilesAreaLeave}
        ref={this.dropRef}>
        {(dragStatus && this._enable) &&
          <div className={styles.DragDropFilesAreaBorder}>
            <div className={styles.DragDropFilesAreaZone}>
              <Icon iconName={this._IconName} className="ms-IconExample" />
              <div>{this._LabelMessage}</div>
            </div>
          </div>
        }
        {this.props.children}
      </div>
    );
  }
}
