# Modern Taxonomy Picker

This control allows you to select one or more Terms from a TermSet via its TermSet ID. You can also configure the control to select the child terms from a specific term in the TermSet by setting the anchorTermId. This is the modern version of the taxonomy picker that uses the REST API and makes use of some load on demand features which makes it well suited for large term sets.

!!! note "Disclaimer" 
    Since this control is meant to look as and work in the same way as the out-of-the-box control it lacks some of the features from the legacy ```TaxonomyPicker``` control. If you need some of those features please continue using the legacy version.

**Empty term picker**

![Empty term picker](../assets/modernTaxonomyPicker-empty.png)

**Selecting terms**

![Selecting terms](../assets/modernTaxonomyPicker-tree-selection.png)

**Selected terms in picker** 

![Selected terms in the input](../assets/modernTaxonomyPicker-selected-terms.png)

**Term picker: Auto Complete**

![Selected terms in the input](../assets/modernTaxonomyPicker-input-autocomplete.png)


## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { ModernTaxonomyPicker } from "@pnp/spfx-controls-react/lib/ModernTaxonomyPicker";
```

- Use the `ModernTaxonomyPicker` control in your code as follows:

```TypeScript
<ModernTaxonomyPicker allowMultipleSelections={true}
                termSetId="f233d4b7-68fb-41ef-8b58-2af0bafc0d38"
                panelTitle="Select Term"
                label="Taxonomy Picker"
                context={this.props.context}
                onChange={this.onTaxPickerChange} />
```

- With the `onChange` property you can capture the event of when the terms in the picker has changed:

```typescript
private onTaxPickerChange(terms : ITermInfo[]) {
  console.log("Terms", terms);
}
```

## Implementation

The ModernTaxonomyPicker control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| panelTitle | string | yes | TermSet Picker Panel title. |
| label | string | yes | Text displayed above the Taxonomy Picker. |
| disabled | boolean | no | Specify if the control should be disabled. Default value is false. |
| context | BaseComponentContext | yes | Context of the current web part or extension. |
| initialValues | ITermInfo[] | no | Defines the terms selected by default. ITermInfo comes from PnP/PnPjs and can be imported with <br/>```import { ITermInfo } from '@pnp/sp/taxonomy';``` |
| allowMultipleSelections | boolean | no | Defines if the user can select only one or multiple terms. Default value is false. |
| termSetId | string | yes | The Id of the TermSet that you would like the Taxonomy Picker to select terms from. |
| onChange | function | no |  Captures the event of when the terms in the picker has changed. |
| anchorTermId | string | no | Set the id of a child term in the TermSet to be able to select terms from that level and below. |
| placeHolder | string | no | Short text hint to display in picker. |
| required | boolean | no | Specifies if to display an asterisk near the label. Default value is false. |
| customPanelWidth | number | no | Custom panel width in pixels. |
| onRenderItem | function | no | Modify the display of the items in the picker. |
| onRenderSuggestionsItem | function | no | Modify the display of the items in the pickers suggestions list. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/TaxonomyPicker)
