# FolderExplorer control

This control allows you to explore a folder structure by clinking on a folder to load it's sub-folders and using a breadcrumb navigation to navigate back to a previous level.
It also allows the user to create a new folder at the current level being explored.

Here is an example of the control:

![FolderExplorer](../assets/FolderExplorer.png)

`FolderExplorer` folder creation:

![FolderExplorer add folder](../assets/FolderExplorer-new.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
import { FolderExplorer, IFolder } from "@pnp/spfx-controls-react/lib/FolderExplorer";
```

- Use the `FolderExplorer` control in your code as follows:

```TypeScript
<FolderExplorer context={this.props.context}
                rootFolder={{
                  Name: 'Documents',
                  ServerRelativeUrl: `/sites/TestSite/Shared Documents`
                }}
                defaultFolder={{
                  Name: 'Documents',
                  ServerRelativeUrl: `/sites/TestSite/Shared Documents`
                }}
                onSelect={this._onFolderSelect}
                canCreateFolders={true} />
```

- The `onSelect` change event returns the selected folder and can be implemented as follows:

```TypeScript
private _onFolderSelect = (folder: IFolder): void => {
  console.log('selected folder', folder);
}
```

## Implementation

The `FolderExplorer` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| context | WebPartContext \| ExtensionContext | yes | The context object of the SPFx loaded webpart or customizer. |
| siteAbsoluteUrl | string | no | The absolute url of the target site. Only required if not the current site. |
| rootFolder | IFolder | yes | The lowest level folder that can be explored. This can be the root folder of a library. If site url is provided, it will allow the user to select a document library |
| defaultFolder | IFolder | yes | The default folder to be explored. |
| canCreateFolders | boolean | no | Allow current user to create folders on the target location. If enabled, you need to ensure that the user has the required permissions. |
| hiddenBreadcrumb | boolean | no | Hide the breadcrumb control. |
| initialBreadcrumbItems | IBreadcrumbItem | no | Additional items to be added to the beginning of the breadcrumb. |
| hiddenFilterBox | boolean | no | Hide the filter box |
| onSelect | (folder: IFolder): void | no | Callback function called after a folder is selected. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/FolderExplorer)
