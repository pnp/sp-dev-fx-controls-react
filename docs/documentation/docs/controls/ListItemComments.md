# ListItemComments control

This control allows you to fetch all the comments for a list item or site page and add comments to respective items and also allows to like and unlike comments.

Here is an example of the control:

![ListItemComments](../assets/ListItemComments.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
import { ListItemComments } from '@pnp/spfx-controls-react/lib/ListItemComments';
```
- Use the `ListItemComments` control in your code as follows:

```TypeScript
<ListItemComments itemID={5} 
    listId={'a81249a5-8b83-4b3b-8178-e43e05d6dda1'} 
    context={this.props.context}>
    </ListItemComments>
```

## Implementation

The `ListItemComments` control can be configured with the following properties:


| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| itemID | number | yes | Item id of list item. |
| context | WebPartContext \| ExtensionContext | yes | SPFx web part or extention context |
| listId | string | yes | Guid of the list. |
| className | string | no | ClassName for the ListItemComments. |
| webUrl | string | no | URL of the site. By default it uses the current site URL. |
| replyButtonText | string | no | Post button text.By default text is Post |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/ListItemComments)
