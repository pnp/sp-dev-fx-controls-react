# Taxonomy Picker

This control allows you to select one or more Terms from a TermSet via its name or TermSet ID. You can also configure the control to select the child terms from a specific term in the TermSet by setting the AnchorId.

!!! note "Disclaimer" 
    This control makes use of the `ProcessQuery` API end-points to retrieve the managed metadata information. This will get changed once the APIs for managing managed metadata will become available.

**Empty term picker**

![Empty term picker](../assets/termpicker-empty.png)

**Selecting terms**

![Selecting terms](../assets/termPicker-tree-selection.png)

**Selected terms in picker** 

![Selected terms in the input](../assets/termpicker-selected-terms.png)

**Term picker: Auto Complete**

![Selected terms in the input](../assets/termpicker-input-autocomplete.png)


## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
```

- Use the `TaxonomyPicker` control in your code as follows:

```TypeScript
<TaxonomyPicker
  allowMultipleSelections={true}
  termsetNameOrID="Countries"
  panelTitle="Select Term"
  label="Taxonomy Picker"
  context={this.props.context}
  onChange={this.onTaxPickerChange}
  isTermSetSelectable={false}
/>
```

- With the `onChange` property you can capture the event of when the terms in the picker has changed:

```typescript
private onTaxPickerChange(terms : IPickerTerms) {
    console.log("Terms", terms);
}
```

## Implementation

The TaxonomyPicker control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| panelTitle | string | yes | TermSet Picker Panel title. |
| label | string | yes | Text displayed above the Taxonomy Picker. |
| disabled | string | no | Specify if the control needs to be disabled. |
| context | WebPartContext | yes | Context of the current web part. |
| initialValues | IPickerTerms | no | Defines the selected by default term sets. |
| allowMultipleSelections | boolean | no | Defines if the user can select only one or many term sets. Default value is false. |
| termsetNameOrID | string | yes | The name or Id of your TermSet that you would like the Taxonomy Picker to chose terms from. |
| onChange | function | no |  captures the event of when the terms in the picker has changed. |
| isTermSetSelectable | boolean | no | Specify if the TermSet itself is selectable in the tree view. |
| disabledTermIds | string[] | no | Specify which terms should be disabled in the term set so that they cannot be selected. |
| disableChildrenOfDisabledParents | boolean | no | Specify if you want to disable the child terms when their parent is disabled. |
| anchorId | string | no | Set the anchorid to a child term in the TermSet to be able to select terms from that level and below. |

Interface `IPickerTerm`

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| key | string | yes | The ID of the term |
| name | string | yes | The name of the term |
| path | string | yes | The path of the term |
| termSet | string | yes | The Id of the parent TermSet of the term |
| termSetName | string | no | The Name of the parent TermSet of the term |

Interface `IPickerTerms`

An Array of IPickerTerm

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/Placeholder)
