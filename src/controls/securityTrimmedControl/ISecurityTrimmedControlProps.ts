import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { FieldCustomizerContext, ListViewCommandSetContext } from '@microsoft/sp-listview-extensibility';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPPermission } from '@microsoft/sp-page-context';
import { PermissionLevel } from '.';

export interface ISecurityTrimmedControlProps {
  /**
   * Context of the web part, application customizer, field customizer, or list view command set.
   */
  context: WebPartContext | ApplicationCustomizerContext | FieldCustomizerContext | ListViewCommandSetContext;
  /**
   * The permissions to check for the user.
   */
  permissions: SPPermission[];
  /**
   * Specify where to check the user permissions: current site or list / remote site or list.
   */
  level: PermissionLevel;
  /**
   * The URL of the remote site. Required when you want to check permissions on remote site or list.
   */
  remoteSiteUrl?: string;
  /**
   * The relative URL of the list or library. Required when you want to check permissions on remote list.
   */
  relativeLibOrListUrl?: string;
}
