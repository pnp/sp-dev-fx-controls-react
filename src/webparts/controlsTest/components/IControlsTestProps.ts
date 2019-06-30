import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { ImageSize } from '../../../FileTypeIcon';
import { Item } from '../../../MultiSelectLookup';
import { IProgressAction } from '../../../Progress';

export interface IControlsTestProps {
  context: WebPartContext;
  description: string;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
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
  multiSelectAvailableData: Item[];
  multiSelectSelectedData: Item[];
}
