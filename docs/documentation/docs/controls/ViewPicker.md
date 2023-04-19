# ViewPicker control

This control allows you to select available views from lists/libraries of the current site.

Here is an example of the control:

![ViewPicker initial](../assets/ViewPicker1.PNG)

`ViewPicker` selection mode:

![ViewPicker selection](../assets/ViewPicker2.png)


## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control into your component:


```TypeScript
import { ViewPicker } from "@pnp/spfx-controls-react/lib/ViewPicker";
```

- Use the `ViewPicker` control in your code as follows:

```TypeScript
    <ViewPicker context={this.props.context}
        label="Select view(s)"
        listId={"9f3908cd-1e88-4ab3-ac42-08efbbd64ec9"}
        placeholder={'Select list view(s)'}
        orderBy={2}
        onViewPickerPropertyChange={this.onViewPickerChange.bind(this)} />
```

- The `onViewPickerPropertyChange` change event returns the selected view(s) and can be implemented as follows:

```TypeScript
private onViewPickerChange = (newValue: string | string[]) => {
    console.log("newView:", newValue);
}
```


## Implementation

The `ViewPicker` control can be configured with the following properties

| Property               | What is it used for?
| --------------- | ---
| context (Mandatory)       | Context of the current web part
| className (Not mandatory)    | If provided, additional class name to provide on the dropdown element.
| deferredValidationTime   (Not mandatory)    | Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds. Default value is 200.
| disabled (Not mandatory) | Whether the property pane field is enabled or not. 
| filter (Not Mandatory)       | Filter views from Odata query
| label (mandatory)    | Property field label displayed on top
| listId (Not mandatory)    | The List Id of the list where you want to get the views.
| placeholder (Not mandatory) | Input placeholder text. Displayed until option is selected. 
| orderBy (Not mandatory) | Specify the property on which you want to order the retrieve set of views. orderBy viewId and by title 
| selectedView (Not Mandatory)       | Initial selected view of the control.
| showBlankOption (mandatory)    | Whether or not to show a blank option. Default false.
| viewsToExclude (Not mandatory)    | Defines view titles which should be excluded from the view picker control.
| webAbsoluteUrl (Not mandatory) | Absolute Web Url of target site (user requires permissions). 
| onViewPickerPropertyChange (Mandatory)    | Defines a change function to raise when the selected value changed.
| onViewsRetrieved (Not mandatory) | Callback that is called before the dropdown is populated. 


Enum `PropertyFieldViewPickerOrderBy`

| Value |
| ---- |
| Id |
| Title |
