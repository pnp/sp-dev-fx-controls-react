# FieldPicker control

This control allows you to select one or multiple available site fields or list fields.

Here is an example of the control:

![FieldPicker initial](../assets/FieldPicker-initial.png)

`FieldPicker` single selection mode:

![FieldPicker single selection](../assets/FieldPicker-single.png)

`FieldPicker` multi selection mode:

![FieldPicker multi selection](../assets/FieldPicker-multi.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
import { FieldPicker } from "@pnp/spfx-controls-react/lib/FieldPicker";
```

- Use the `FieldPicker` control in your code as follows:

```TypeScript
<FieldPicker
  context={this.props.context}
  group="Content Feedback"
  includeHidden={false}
  includeReadOnly={false}
  label="Select your field(s)"
  multiSelect={false}
  orderBy={FieldsOrderBy.Title}
  listId="00000000-0000-0000-0000-000000000000"
  onSelectionChanged={this.onFieldPickerChanged}
  showBlankOption={true}
/>
```

- The `onSelectionChanged` change event returns the field(s) and can be implemented as follows:

```TypeScript
private onFieldPickerChanged (fields: ISPField | ISPField[]) {
  console.log("Fields:", fields);
}
```

## Implementation

The `FieldPicker` control can be configured with the following properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| context | BaseComponentContext | yes | The context object of the SPFx loaded webpart or customizer. |
| listId | string | no | The ID of the list or library you wish to select a column(s) from. When not specified, picker will be populated with site columns.|
| className | string | no | If provided, additional class name to provide on the dropdown element. |
| disabled | boolean | no | Whether or not the control is disabled. |
| includeHidden | boolean | no | Whether or not to include hidden fields. Default is true. |
| includeReadOnly | boolean | no | Whether or not to include read-only fields. Default is true. |
| group | string | no | Only show fields of a certain group. |
| filter | string | no | Filter fields from OData query (takes the upper hand of `hidden`, `readOnly` and `group` Filters). |
| orderBy | FieldsOrderBy | no | How to order the fields. |
| selectedFields | string \| string[] | no | Internal names of the selected item(s). If you provide this, you must maintain selection state by observing `onSelectionChanged` events and passing a new value in when changed. |
| multiSelect | boolean | no | Indicates if multi-choice selections is allowed. Default is false. |
| label | string | no | The label to display. |
| placeholder | string | no | Input placeholder text. Displayed until option is selected. |
| onSelectionChanged | (newValue: ISPField \| ISPField[]): void | no | Callback issued when the selected option changes. |
| filterItems | (fields: ISPField[]): ISPField[] | no | This function is invoked after the filtering has been done. This allows you to add additional custom filtering.
| webAbsoluteUrl | string | no | Absolute Web Url of target site (user requires permissions). |
| showBlankOption | boolean | no | Whether or not to show a blank option. Default is false. Works only when `multiSelect` is false. |

Enum `FieldsOrderBy`

| Value |
| ---- |
| Title |
| InternalName |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/FieldPicker)
