# SecurityTrimmedControl

This control is intended to be used when you want to show or hide components based on the user its permissions. The control can be used to check the user’s permissions on the current site / list were the solution is loaded, or on a remote site / list. 

## Usage
### Checking permissions on the current site
```
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.currentWeb}
                        permissions={[SPPermission.viewPages]}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```

### Checking permissions on the current list
```
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.currentList}
                        permissions={[SPPermission.addListItems]}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```

### Checking permissions on remote site
```
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.remoteWeb}
                        remoteSiteUrl="https://<tenant>.sharepoint.com/sites/<siteName>"
                        permissions={[SPPermission.viewPages, SPPermission.addListItems]}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```

### Checking permissions on remote list / library
```
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.remoteListOrLib}
                        remoteSiteUrl="https://<tenant>.sharepoint.com/sites/<siteName>"
                        relativeLibOrListUrl="/sites/<siteName>/<list-or-library-URL>"
                        permissions={[SPPermission.addListItems]}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```
