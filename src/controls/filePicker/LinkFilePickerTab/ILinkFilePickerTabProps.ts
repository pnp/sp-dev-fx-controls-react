import { IFilePickerTab } from "../FilePicker.types";

export interface ILinkFilePickerTabProps extends IFilePickerTab {
  allowExternalTenantLinks: boolean;
}
