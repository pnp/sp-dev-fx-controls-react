# Migrating from v1 to v2

Most of the controls have no breaking changes when moving from v1 to v2. However, some APIs were changed to make the library more stable and controls behavior more even.

Also, we've bumped up React and Fluent UI versions used in the library. It means you will need to update the `package.json` file in your SPFx projects.

The below guide is an overview of what it takes to migrate from v1 to v2.  If we missed something, please let us know on the issues list so we can update the guide. Thanks!

## v2 Supports SharePoint Online **only**

V2 of Reusable Controls is based on SharePoint Framework 1.11. Due to this change, it does not support SharePoint on-premises. **Please, use v1 if you plan to deploy your solution on-premises.**

## React and Fluent UI versions

V2 of Reusable Controls uses React.js v16.8.5 and Fluent UI (Office UI Fabric React) v6.214.0.

Although it is not necessary to use the same modules' versions in your project, we highly recommend to update your solution accordingly:

```json
"dependencies": {
    // other dependencies
    "office-ui-fabric-react": "6.214.0",
    "react": "16.8.5",
    "react-dom": "16.8.5"
  },
  "devDependencies": {
    "@types/react": "16.8.8",
    "@types/react-dom": "16.8.3",
  },
```

The easiest way to upgrade the SharePoint Framework solution is to use [Office365 CLI](https://pnp.github.io/office365-cli/cmd/spfx/project/project-upgrade/#spfx-project-upgrade) `spfx project upgrade` command.

## APIs Changes

### PeoplePicker

- `isRequired` is renamed to `required`
  - The property has been renamed to use the common approach for mandatory field naming.
- `errorMessage` represents a static error message to be displayed in the control. 
  - In v1 `errorMessage` is used to provide the text that will be displayed if the field is set as `required` and no value is selected.
  - In v2 you can use this property to display an error message for whatever reason statically.

```typescript
/**
 * Static error message displayed below the text field. Use onGetErrorMessage to dynamically change the error message displayed (if any) based on the current value. errorMessage and onGetErrorMessage are mutually exclusive (errorMessage takes precedence).
 */
  errorMessage?: string;
```

- `onGetErrorMessage` to get error messages dynamically.
  - The method is used to get the validation error message and determine whether the input value is valid. Mutually exclusive with the static string errorMessage (it will take precedence over this).

```typescript
/**
 * The method is used to get the validation error message and determine whether the picker value is valid.
 * Mutually exclusive with the static string errorMessage (it will take precedence over this).
 *
 *   When it returns string:
 *   - If valid, it returns empty string.
 *   - If invalid, it returns the error message string and the picker will
 *     show an error message below the picker.
 *
 *   When it returns Promise<string>:
 *   - The resolved value is display as error message.
 *   - The rejected, the value is thrown away.
 *
 */
  onGetErrorMessage?: (items: IPersonaProps[]) => string | Promise<string>;
```

- `showRequiredError` has been deleted.
    - Use `errorMessage` or `onGetErrorMessage` to provide the error message.
- `selectedItems` is renamed to `onChange`
    - `onChange` better describes the purpose of the property.

### FolderPicker

`FolderPicker` default picker has been removed.
If you used `FolderPicker` as:

```typescript
import FolderPicker from '@pnp/spfx-controls-react/lib/controls/folderPicker/FolderPicker';
```

You should update to:

```typescript
import { FolderPicker } from '@pnp/spfx-controls-react/lib/FolderPicker';
```

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/guides/MigrateFromV1)
