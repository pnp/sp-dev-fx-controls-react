# People Picker

This control renders a People picker field which can be used to select one or more users from a SharePoint group or site. The control can be configured as mandatory. It will show a custom error message if field is empty.

**Empty People Picker control with error message and tooltip**

![People Picker](../assets/Peoplepicker-witherrorandtooltip.png)

**Selecting People**

![Selecting People](../assets/Peoplepicker-selectingchoices.png)

**Selected people** 

![Selected people](../assets/Peoplepicker-multiplechoices.png)


## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```typescript
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
```

- Use the `PeoplePicker` control in your code as follows:

```typescript
<PeoplePicker
    context={this.props.context}
    titleText="People Picker"
    personSelectionLimit={3}
    groupName={"Team Site Owners"} // Leave this blank in case you want to filter from all users
    showtooltip={true}
    isRequired={true}
    disabled={true}
    selectedItems={this._getPeoplePickerItems}
    showHiddenInUI={false}
    principleTypes={[PrincipalType.User]} />
```

- With the `selectedItems` property you can get the selected People in the Peoplepicker :

```typescript
private _getPeoplePickerItems(items: any[]) {
  console.log('Items:', items);
}
```

## Implementation

The People picker control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| context | WebPartContext | yes | Context of the current web part. |
| titleText | string | yes | Text to be displayed on the control |
| groupName | string | no | group from which users are fetched. Leave it blank if need to filter all users |
| personSelectionLimit | number | no | Defines the limit of people that can be selected in the control|
| isRequired | boolean | no | Set if the control is required or not |
| disabled | boolean | no | Set if the control is disabled or not |
| errorMessage | string | no | Specify the error message to display |
| errorMessageclassName | string | no | applies custom styling to the error message section|
| showtooltip | boolean | no | Defines if need a tooltip or not |
| tooltip | string | no | Specify the tooltip message to display |
| tooltipDirectional | DirectionalHint | no | Direction where the tooltip would be shown |
| selectedItems | function | no | get the selected users in the control |
| peoplePickerWPclassName | string | no | applies custom styling to the people picker element |
| peoplePickerCntrlclassName | string | no | applies custom styling to the people picker control only |
| defaultSelectedUsers | string[] | no | Default selected user emails |
| webAbsoluteUrl | string | no | Specify the site URL on which you want to perform the user query call. Default is the current site URL. |
| showHiddenInUI | boolean | no | Show users which are hidden from the UI. By default these users/groups hidden for the UI will not be shown. |
| principleTypes | PrincipleType[] | no | Define which type of data you want to retrieve: User, SharePoint groups, Security groups. Multiple are possible. |
| suggestionsLimit | number | no | Maximum number of suggestions to show in the full suggestion list. Default is 5. |

Enum `PrincipalType`

The `PrincipalType` enum can be used to specify the types of information you want to query: User, Security groups, and/or SharePoint groups.

| Name |
| ---- |
| User |
| DistributionList |
| SecurityGroup |
| SharePointGroup |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/PeoplePicker)
