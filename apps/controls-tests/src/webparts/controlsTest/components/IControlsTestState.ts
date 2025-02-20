import {
  ImageSize,
  IProgressAction,
  IFilePickerResult,
} from '@pnp/spfx-controls-react';
import { ITag } from '@fluentui/react';
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from '@pnp/sp/taxonomy';

export interface IControlsTestState {
  imgSize: ImageSize;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any[];
  iFrameDialogOpened?: boolean;
  iFramePanelOpened?: boolean;
  authorEmails: string[];
  selectedList: string | undefined;
  progressActions: IProgressAction[];
  currentProgressActionIndex?: number;
  dateTimeValue?: Date;
  richTextValue: string | undefined;
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
  selectedTeam: ITag[];
  selectedTeamChannels: ITag[];
  filePickerDefaultFolderAbsolutePath?: string;
  errorMessage?: string;
  termPanelIsOpen?: boolean;
  actionTermId?: string;
  clickedActionTerm?: ITermInfo;
  selectedFilters?: string[];
  termStoreInfo: ITermStoreInfo | null | undefined; // eslint-disable-line @rushstack/no-new-null
  termSetInfo: ITermSetInfo | null | undefined; // eslint-disable-line @rushstack/no-new-null
  testTerms: ITermInfo[];
}
