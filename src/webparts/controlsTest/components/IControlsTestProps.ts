import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ImageSize } from '../../../FileTypeIcon';
import { DisplayMode, ISPEventObserver } from '@microsoft/sp-core-library';
import { IProgressAction } from '../../../Progress';
import { IFilePickerResult } from '../../../FilePicker';
import { ThemeProvider } from '@microsoft/sp-component-base';

export interface IControlsTestProps {
  context: WebPartContext;
  description: string;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  totalPages?: number;
  themeProvider: ThemeProvider;
  observer: ISPEventObserver;
}

export interface IControlsTestState {
  imgSize: ImageSize;
  items: any[];
  initialValues: any[];
  iFrameDialogOpened?: boolean;
  iFramePanelOpened?: boolean;
  authorEmails: string[];
  selectedList: string;
  progressActions: IProgressAction[];
  currentProgressActionIndex?: number;
  dateTimeValue: Date;
  richTextValue: string;
  currentCarouselElement: JSX.Element;
  canMovePrev: boolean;
  canMoveNext: boolean;
  comboBoxListItemPickerListId: string;

  filePickerResult?: IFilePickerResult;
}
