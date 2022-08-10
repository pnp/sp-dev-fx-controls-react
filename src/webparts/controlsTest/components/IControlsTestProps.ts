import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ImageSize } from '../../../FileTypeIcon';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IProgressAction } from '../../../Progress';
import { IFilePickerResult } from '../../../FilePicker';
import { ITag } from 'office-ui-fabric-react';
import {
  IReadonlyTheme,

} from "@microsoft/sp-component-base";
import { ITermInfo } from '@pnp/sp/taxonomy';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comboBoxListItemPickerIds: any[];
  filePickerResult?: IFilePickerResult[];
  treeViewSelectedKeys?: string[];
  showAnimatedDialog?: boolean;
  showCustomisedAnimatedDialog?: boolean;
  showSuccessDialog?: boolean;
  showErrorDialog?: boolean;
  selectedTeam:ITag[];
  selectedTeamChannels:ITag[];
  filePickerDefaultFolderAbsolutePath?: string;
  errorMessage?: string;
  termPanelIsOpen?: boolean;
  actionTermId?: string;
  clickedActionTerm?: ITermInfo;
  selectedFilters?: string[];
}
