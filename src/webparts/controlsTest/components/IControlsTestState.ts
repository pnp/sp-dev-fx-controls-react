import { ImageSize } from "../../../FileTypeIcon";
import { IProgressAction } from "../../../Progress";
import { IFilePickerResult } from "../../../FilePicker";
import { ITag } from "@fluentui/react";
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from "@pnp/sp/taxonomy";
import { IFilterBarItem } from "../../../FilterBar";

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
  selectedTeam: ITag[];
  selectedTeamChannels: ITag[];
  filePickerDefaultFolderAbsolutePath?: string;
  errorMessage?: string;
  termPanelIsOpen?: boolean;
  actionTermId?: string;
  clickedActionTerm?: ITermInfo;
  selectedFilters?: string[];
  termStoreInfo: ITermStoreInfo;
  termSetInfo: ITermSetInfo;
  testTerms: ITermInfo[];
  selectedUrlImagePicker: string;
  isOpenHoverReactionBar: boolean;
  isOpenShareDialog: boolean;
  filters: IFilterBarItem[];
}
