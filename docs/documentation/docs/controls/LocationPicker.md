# Location Picker

  

This control allows you to search and select the Location, also allows enter custom location.
  

## How to use this control in your solutions

  

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.

- Import the following modules to your component:

  

```TypeScript

import { LocationPicker,ILocationPickerItem } from  "fx-controls-react/lib/LocationPicker";

```

  

- Use the LocationPicker control in your code as follows:

  

```jsx

<LocationPicker
          context={this.props.context}
          label="Location"
          onSelectionChanged={(locValue: ILocationPickerItem) => {
            console.log(locValue.DisplayName + ", " + locValue.Address.Street)
          }
          }/>


```

![Location Picker search](../assets/location1.png)

![Location Picker Edit](../assets/location2.png)

![Location Picker Read](../assets/location3.png)

  

## Implementation

  

The `LocationPicker` can be configured with the following properties:

  

| Property | Type | Required | Description |

| ---- | ---- | ---- | ---- |

| context | WebPartContext or ExtensionContext | yes | The context object of the SPFx loaded webpart or customizer. |

| disabled | boolean | no | Option allow to be enable or disable. Default value is `false`|

| defaultValue | ILocationPickerItem | no | Option allow set default value|

| errorMessage | string  | no | Static error message displayed below the picker.|

| className | string  | no | applies custom styling |

| label | string  | no | Label to use for the control. |

| placeholder | string  | no | Placeholder label to show in the dropdown. |

| onSelectionChanged | (locItem: ILocationPickerItem) => void | no | Method that returns location data JSON object. |

