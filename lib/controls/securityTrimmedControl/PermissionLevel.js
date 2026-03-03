/**
 * Permission level enum
 */
export var PermissionLevel;
(function (PermissionLevel) {
    /**
     * Checks permissions on the current web
     */
    PermissionLevel[PermissionLevel["currentWeb"] = 1] = "currentWeb";
    /**
     * Checks permissions in the current loaded list
     */
    PermissionLevel[PermissionLevel["currentList"] = 2] = "currentList";
    /**
     * Checks permissions on the specified site URL
     */
    PermissionLevel[PermissionLevel["remoteWeb"] = 3] = "remoteWeb";
    /**
     * Checks permissions on the specified list/library URL in combination with the site URL
     */
    PermissionLevel[PermissionLevel["remoteListOrLib"] = 4] = "remoteListOrLib";
    /**
     * Check permissions on a specific item in a list/library
     */
    PermissionLevel[PermissionLevel["remoteListItem"] = 5] = "remoteListItem";
    /**
     * Check permissions on a specific folder
     */
    PermissionLevel[PermissionLevel["remoteFolder"] = 6] = "remoteFolder";
})(PermissionLevel || (PermissionLevel = {}));
//# sourceMappingURL=PermissionLevel.js.map