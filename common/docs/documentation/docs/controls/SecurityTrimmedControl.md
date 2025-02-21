# SecurityTrimmedControl

This control is intended to be used when you want to show or hide components based on the user permissions. The control can be used to check the user's permissions on the current site / list were the solution is loaded, or on a remote site / list.

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { SecurityTrimmedControl, PermissionLevel } from "@pnp/spfx-controls-react/lib/SecurityTrimmedControl";
import { SPPermission } from '@microsoft/sp-page-context';
```

- You can use the `SecurityTrimmedControl` as follows in your solutions:

### Checking permissions on the current site

```jsx
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.currentWeb}
                        permissions={[SPPermission.viewPages]}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```

### Checking permissions on the current list

```jsx
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.currentList}
                        permissions={[SPPermission.addListItems]}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```

### Checking permissions on remote site

```jsx
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.remoteWeb}
                        remoteSiteUrl="https://<tenant>.sharepoint.com/sites/<siteName>"
                        permissions={[SPPermission.viewPages, SPPermission.addListItems]}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```

### Checking permissions on remote list / library

```jsx
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.remoteListOrLib}
                        remoteSiteUrl="https://<tenant>.sharepoint.com/sites/<siteName>"
                        relativeLibOrListUrl="/sites/<siteName>/<list-or-library-URL>"
                        permissions={[SPPermission.addListItems]}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```

### Show a control when the user doesn't have permissions

```jsx
<SecurityTrimmedControl context={this.props.context}
                        level={PermissionLevel.remoteListOrLib}
                        remoteSiteUrl="https://<tenant>.sharepoint.com/sites/<siteName>"
                        relativeLibOrListUrl="/sites/<siteName>/<list-or-library-URL>"
                        permissions={[SPPermission.addListItems]}
                        noPermissionsControl={<p>SOrry, you don't have permissions to this list.</p>}>
  {/* Specify the components to load when user has the required permissions */}
</SecurityTrimmedControl>
```

## Implementation

The `SecurityTrimmedControl` can be configured with the following properties:

| Property             | Type                 | Required | Description                                                                                                  |
| -------------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| context              | BaseComponentContext | yes      | Context of the web part, application customizer, field customizer, or list view command set.                 |
| permissions          | SPPermission[]       | yes      | The permissions to check for the user.                                                                       |
| level                | PermissionLevel      | yes      | Specify where to check the user permissions: current site or list / remote site or list.                     |
| remoteSiteUrl        | string               | no       | The URL of the remote site. Required when you want to check permissions on remote site or list.              |
| relativeLibOrListUrl | string               | no       | The relative URL of the list or library. Required when you want to check permissions on remote list.         |
| folderPath           | string               | no       | Specify the name of a folder to check the user permissions against. Will be overridden if itemId is present. |
| itemId               | number               | no       | Specify the ID of the item to check the user permissions against. Takes precedence over folder.              |
| className            | string               | no       | Specify the className to be used on the parent element.                                                      |
| noPermissionsControl | JSX.Element          | no       | Optional. Specify the control you want to render if user doesn't have permissions.                           |
| showLoadingAnimation | boolean              | no       | Optional. Specify should render loading animation.                                                           |

The `PermissionLevel` enum has the following values:

| Value | Description | Required properties |
| ---- | ---- | ---- |
| currentWeb | Checks permissions on the current web | `context`, `permissions` |
| currentList | Checks permissions in the current loaded list | `context`, `permissions` |
| remoteWeb | Checks permissions on the specified site URL | `context`, `permissions`, `remoteSiteUrl` |
| remoteListOrLib | Checks permissions on the specified list/library URL in combination with the site URL | `context`, `permissions`, `remoteSiteUrl`, `relativeLibOrListUrl` |
| remoteListItem | Check permissions on a specific item in a list/library | `context`, `permissions`, `remoteSiteUrl`, `relativeLibOrListUrl`, `itemId` |
| remoteFolder | Check permissions on a specific folder | `context`, `permissions`, `remoteSiteUrl`, `relativeLibOrListUrl`, `folderPath` |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/SecurityTrimmedControl)
