# Dynamic Form

This control can dynamically generate SharePoint list or SharePoint document library form and everything controlled through list setting.

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { DynamicForm } from "fx-controls-react/lib/DynamicForm";
```

- Use the DynamicForm control in your code as follows:

```jsx
<DynamicForm 
          context={this.props.context} 
          listId={"3071c058-549f-461d-9d73-8b9a52049a80"}  
          listItemId={1}>
          onCancelled={() => { console.log('Cancelled') }}
          onBeforeSubmit={(async listItem) => { return true; }}
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
| disabled | boolean | no | Option allow to be enable or disable. Default value is `false`|
| onBeforeSubmit | (listItemData: any) => Promise&lt;boolean&gt; | no | Before submit handler. Allows to modify the object to be submitted or cancel the submission. |
| onSubmitted | (listItem: any) => void | no | Method that returns listItem data JSON object. |
| onSubmitError | (listItemData: any, error: Error) => void | no | Handler of submission error. |
| onCancelled | () => void | no | Handler when form has been cancelled. |
