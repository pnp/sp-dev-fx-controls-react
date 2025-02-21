import { IUserPickerProps } from '../IUserPickerProps';
import { IUserInfo } from './IUserInfo';

export interface IGlobalState extends IUserPickerProps{
     selectedUsers: IUserInfo[];
}
