import { IUserInfo } from './models/IUserInfo';

export interface IUserPickerProps {
  userSelectionLimit?: number;
  label?: string | JSX.Element;
  required?: boolean;
  validationMessage?: string;
  messageType?: "error" | "success" | "warning" | "none" | undefined;
  onSelectedUsers?: (users: IUserInfo[]) => void;
  onRemoveSelectedUser?: (user: IUserInfo) => void;
  placeholder?: string;
  defaultSelectdUsers?: IUserInfo[];
}
