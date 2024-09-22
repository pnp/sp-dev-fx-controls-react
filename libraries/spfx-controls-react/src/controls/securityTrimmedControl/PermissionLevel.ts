/**
 * Permission level enum
 */
export enum PermissionLevel {
  /**
   * Checks permissions on the current web
   */
  currentWeb = 1,
  /**
   * Checks permissions in the current loaded list
   */
  currentList,
  /**
   * Checks permissions on the specified site URL
   */
  remoteWeb,
  /**
   * Checks permissions on the specified list/library URL in combination with the site URL
   */
  remoteListOrLib,
  /**
   * Check permissions on a specific item in a list/library
   */
  remoteListItem,
  /**
   * Check permissions on a specific folder
   */
  remoteFolder
}
