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
| onBeforeSubmit | (listItemData: any) => Promise&lt;boolean&gt; | no | Before submit handler. Allows to modify the object to be submitted or cancel the submission. To cancel, return `true`.|
| onSubmitted | (listItemData: any, listItem?: IItem) => void | no | Method that returns listItem data JSON object and PnPJS list item instance (`IItem`). |
| onSubmitError | (listItemData: any, error: Error) => void | no | Handler of submission error. |
| onCancelled | () => void | no | Handler when form has been cancelled. |
| returnListItemInstanceOnSubmit | boolean | no | Specifies if `onSubmitted` event should pass PnPJS list item (`IItem`) as a second parameter. Default - `true` |
| webAbsoluteUrl | string | no | Absolute Web Url of target site (user requires permissions). |
| fieldOverrides | {[columnInternalName: string] : {(fieldProperties: IDynamicFieldProps): React.ReactElement\<IDynamicFieldProps\>}} | no | Key value pair for fields you want to override.  Key is the internal field name, value is the function to be called for the custom element to render. |
| respectEtag | boolean | no | Specifies if the form should respect the ETag of the item. Default - `true` |
