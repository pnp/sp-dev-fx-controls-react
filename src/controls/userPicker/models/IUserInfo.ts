import {
  Presence,
  User,
} from '@microsoft/microsoft-graph-types';

export interface IUserInfo extends User {
  userPhoto: string;
  presence: Presence | undefined;
}
