import { Theme } from '@fluentui/react';
import { BaseComponentContext } from '@microsoft/sp-component-base';

import { IUserInfo } from './IUserInfo';

export interface IGlobalState  {
     context: BaseComponentContext
     theme: Theme | undefined
     selectedUsers: IUserInfo[];
}
