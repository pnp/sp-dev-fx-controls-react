import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ImageSize } from '../../../FileTypeIcon';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IProgressAction } from '../../../Progress';
import { IFilePickerResult } from '../../../FilePicker';
import { ITag } from 'office-ui-fabric-react';
import {
  IReadonlyTheme,

} from "@microsoft/sp-component-base";
export interface IControlsTestProps {
  context: WebPartContext;
  description: string;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  totalPages?: number;
  themeVariant?:  IReadonlyTheme;
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
  filePickerResult?: IFilePickerResult[];
  treeViewSelectedKeys?: string[];
  showAnimatedDialog?: boolean;
  showCustomisedAnimatedDialog?: boolean;
  showSuccessDialog?: boolean;
  showErrorDialog?: boolean;
  selectedTeam:ITag[];
  selectedTeamChannels:ITag[];

}
