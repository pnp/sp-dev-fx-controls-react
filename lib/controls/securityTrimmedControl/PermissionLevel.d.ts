/**
 * Permission level enum
 */
export declare enum PermissionLevel {
    /**
     * Checks permissions on the current web
     */
    currentWeb = 1,
    /**
     * Checks permissions in the current loaded list
     */
    currentList = 2,
    /**
     * Checks permissions on the specified site URL
     */
    remoteWeb = 3,
    /**
     * Checks permissions on the specified list/library URL in combination with the site URL
     */
    remoteListOrLib = 4,
    /**
     * Check permissions on a specific item in a list/library
     */
    remoteListItem = 5,
    /**
     * Check permissions on a specific folder
     */
    remoteFolder = 6
}
//# sourceMappingURL=PermissionLevel.d.ts.map