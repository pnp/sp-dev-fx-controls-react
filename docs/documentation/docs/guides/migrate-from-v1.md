# Migrating from v1 to v2
Most of the controls have no breaking changes when moving from v1 to v2. However, some APIs were changed to make the libary more stable and controls behavior more even.
Also, we've bumped up React and Fluent UI versions used in the library. It means you will need to update `package.json` file in your SPFx projects.
The below guide is an overview of what it takes to migrate from v1 to v2.  If we missed something, please let us know in the issues list so we can update the guide. Thanks!

## v2 Supports SharePoint Online Only
v2 of Reusable Controls is based on SharePoint Framework 1.11 and, as a result, does not support SharePoint On-Premise. **Please, use v1 if you plan to deploy your soluition on-prem.**

## React and Fluent UI versions
v2 of Reusable Controls uses React.js v16.8.5 and Fluent UI (Office UI Fabric React) v6.189.2.
Please, update the `package.json` accordingly:
```json
"dependencies": {
    // other dependencies
    "@types/react": "16.8.8",
    "@types/react-dom": "16.8.3",
    "office-ui-fabric-react": "6.189.2",
    "react": "16.8.5",
    "react-dom": "16.8.5"
  },
  "resolutions": {
    "@types/react": "16.8.8"
  },
```

## APIs Changes
### PeoplePicker
`isRequred` is renamed to `required`.<br/>
The property has been renamed to use the common approach for mandatory field naming.

`errorMessage` represents static error message to be displayed in the control. <br />
In v1 `errorMessage` is used to provide the text that will be displayed if the field is set as `required` and no value is selected.
In v2 you can use this property to statically display error message for whatever reason.
```typescript
/**
 * Static error message displayed below the text field. Use onGetErrorMessage to dynamically change the error message displayed (if any) based on the current value. errorMessage and onGetErrorMessage are mutually exclusive (errorMessage takes precedence).
 */
  errorMessage?: string;
```

`onGetErrorMessage` to get error message dynamically.<br />
The method is used to get the validation error message and determine whether the input value is valid or not. Mutually exclusive with the static string errorMessage (it will take precedence over this).
```typescript
/**
 * The method is used to get the validation error message and determine whether the picker value is valid or not.
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

`showRequiredError` has been deleted.<br />
Use `errorMessage` or `onGetErrorMessage` to provide the error message.

`selectedItems` is renamed to `onChange`<br />
`onChange` better describes the purpose of the property.

