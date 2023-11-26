# Dynamic Form

This control can dynamically generate SharePoint list or SharePoint document library form and everything controlled through list setting.

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";
```

- Use the DynamicForm control in your code as follows:

```jsx
<DynamicForm 
          context={this.props.context} 
          listId={"3071c058-549f-461d-9d73-8b9a52049a80"}  
          listItemId={1}
          onCancelled={() => { console.log('Cancelled') }}
          onBeforeSubmit={async (listItem) => { return false; }}
          onSubmitError={(listItem, error) => { alert(error.message); }}
          onSubmitted={async (listItemData) => { console.log(listItemData); }}>
</DynamicForm>
```
![DynamicForm](../assets/DynamicForm.png)

## File selection

To upload a file when creating a new document in a document library you need to specify:
- enableFileSelection: Set this parameter to true to enable file selection.
- contentTypeId: This parameter specifies the target content type ID of the document you are creating.
- supportedFileExtensions: This parameter is optional and is used to specify the supported file extensions if they are different from the default ones.

Enabling the file selection will display a new button on top of the form that allow the user to select a file from the recent files, browsing OneDrive or select and upload a file from the computer.

![DynamicFormWithFileSelection](../assets/DynamicFormWithFileSelection.png)

## Implementation

The `DynamicForm` can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| context | BaseComponentContext | yes | The context object of the SPFx loaded webpart or customizer. |
| listId | string | yes | Guid of the list.|
| listItemId | number | no | list item ID. |
| contentTypeId | string | no | content type ID |
| disabled | boolean | no | Allows form to be disabled. Default value is `false`|
| disabledFields | string[] | no | InternalName of fields that should be disabled. Default value is `false`|
| enableFileSelection | boolean | no | Specify if the form should support the creation of a new list item in a document library attaching a file to it. This option is only available for document libraries and works only when the contentTypeId is specified and has a base type of type Document. Default value is `false`|
| hiddenFields | string[] | no | InternalName of fields that should be hidden. Default value is `false`|
| onListItemLoaded | (listItemData: any) => Promise&lt;void&gt; | no | List item loaded handler. Allows to access list item information after it's loaded.|
| onBeforeSubmit | (listItemData: any) => Promise&lt;boolean&gt; | no | Before submit handler. Allows to modify the object to be submitted or cancel the submission. To cancel, return `true`.|
| onSubmitted | (listItemData: any, listItem?: IItem) => void | no | Method that returns listItem data JSON object and PnPJS list item instance (`IItem`). |
| onSubmitError | (listItemData: any, error: Error) => void | no | Handler of submission error. |
| onCancelled | () => void | no | Handler when form has been cancelled. |
| returnListItemInstanceOnSubmit | boolean | no | Specifies if `onSubmitted` event should pass PnPJS list item (`IItem`) as a second parameter. Default - `true` |
| supportedFileExtensions | string[] | no | Specify the supported file extensions for the file picker. Only used when enableFileSelection is `true`. Default value is `["docx", "doc", "pptx", "ppt", "xlsx", "xls", "pdf"]`. |
| webAbsoluteUrl | string | no | Absolute Web Url of target site (user requires permissions). |
| fieldOverrides | {[columnInternalName: string] : {(fieldProperties: IDynamicFieldProps): React.ReactElement\<IDynamicFieldProps\>}} | no | Key value pair for fields you want to override.  Key is the internal field name, value is the function to be called for the custom element to render. |
| respectEtag | boolean | no | Specifies if the form should respect the ETag of the item. Default - `true` |
| validationErrorDialogProps | IValidationErrorDialogProps | no | Specifies validation error dialog properties |

## Validation Error Dialog Properties `IValidationErrorDialogProps`
| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| showDialogOnValidationError | boolean | no | Specifies if the dialog should be shown on validation error. Default - `false` |
| customTitle | string | no | Specifies a custom title to be shown in the validation dialog. Default - empty |
| customMessage | string | no | Specifies a custom message to be shown in the validation dialog. Default - empty |
