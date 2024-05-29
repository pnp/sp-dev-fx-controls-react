import { PositioningShorthand } from '@fluentui/react-positioning';
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseComponentContext,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';

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
  theme?: IReadonlyTheme | undefined;
  context: BaseComponentContext;
  secondaryTextPropertyName?: "jobTitle" | "department" | "mail" | "officeLocation" | "mobilePhone" | "businessPhones" | "userPrincipalName"  ;
  positioning?: PositioningShorthand;
}
