export interface IDragDropFilesProps {
  /**
 * Specifies the dropEffect, default is 'none'
 * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect
 */
  dropEffect?: string;
  /**
  * Specifies the label of the file picker button
  */
  labelMessage?: string;

  /**
   * Specifies the icon to display
   */
  iconName?: string;
  /**  
  * Handler to return the files from drag and drop. 
  **/
  onDrop?: any;
  /**
  * Specify if drag and drop option is enable.
  **/
  enable?: boolean;
}

export interface IDragDropFilesState {
  dragStatus?: boolean;
}
