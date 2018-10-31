# ListItemPicker control

This control allows you to select one or more  item from list, based in a column value, the control sugest values based on charaters typed 

Here is an example of the control:

![ListItemPicker select list items](../assets/listitemPicker-selectlist.png)

 

![ListItemPicker selected Items](../assets/listitemPicker-selectedItems.png)

 

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
 
import { ListItemPicker } from '@pnp/spfx-controls-react/listItemPicker';
```

- Use the `ListItemPicker` control in your code as follows:

```TypeScript
 <ListItemPicker
            listId='da8daf15-d84f-4ab1-9800-7568f82fed3f'
            columnInternalName='Title'
            itemLimit={2}
            onSelectedItem={this.onSelectedItem}
            context={this.props.context}
          />
```

- The `onSelectedItem` change event returns the list items selected and can be implemented as follows:

```TypeScript
private onSelectedItem(data: { key: string; name: string }[]) {
    for (const item of data) {
      console.log(`Item value: ${item.name}`);
    }
  }
```

## Implementation

The `ListItemPicker` control can be configured with the following properties:

		

Enum `LibsOrderBy`

| Value |
| ---- |
| Id |
| Title |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/ListItemPicker)
