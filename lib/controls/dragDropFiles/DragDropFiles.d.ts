import * as React from 'react';
import { IDragDropFilesState, IDragDropFilesProps } from './IDragDropFiles';
/**
 * DragDropFiles Class Control
 */
export declare class DragDropFiles extends React.Component<IDragDropFilesProps, IDragDropFilesState> {
    private dragCounter;
    private dropRef;
    private _LabelMessage;
    private _IconName;
    private _dropEffect;
    private _enable;
    constructor(props: React.PropsWithChildren<IDragDropFilesProps>);
    /**
   * Lifecycle hook when component is mounted
   */
    componentDidMount(): void;
    /**
     * Stop listeners from onDragOver event.
     * @param e
     */
    private handleonDragOver;
    /**
     * Stop listeners from onDragEnter event, enable drag and drop view.
     * @param e
     */
    private handleonDragEnter;
    /**
     * Stop listeners from ondragenter event, disable drag and drop view.
     * @param e
     */
    private handleonDragLeave;
    /**
    * Stop listeners from onDrop event and load files to property onDrop.
    * @param e
    */
    private handleonDrop;
    /**
       * Add File to Array Files of type File[]
       * https://www.meziantou.net/upload-files-and-directories-using-an-input-drag-and-drop-or-copy-and-paste-with.htm
       * @param dataTransfer
       */
    private getFilesAsync;
    /**
     *
     * @param entry
     */
    private readEntryContentAsync;
    /**
     * Default React component render method
     */
    render(): React.ReactElement<IDragDropFilesProps>;
}
//# sourceMappingURL=DragDropFiles.d.ts.map