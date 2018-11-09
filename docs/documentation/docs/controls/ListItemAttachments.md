# List-Item-Attachments control

This control allows you to manage list item attachments, you can add or delete associated attachments, the attachments are listed in tile view.
 

Here is an example of the control:

![ListItemAttachments Tiles](./assets/ListItemAttachmentsTitles.png)

![ListItemAttachments Confirm Delete](./assets/ListItemAttachmentDeleteConfirm.png)

![ListItemAttachments Attachment Deleted ](./assets/ListItemAttachementDeletedMsg.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
 
import { ListItemAttachments } from '@pnp/spfx-controls-react/listItemAttachments';
```
- Use the `ListItemAttachments` control in your code as follows:

```TypeScript
<ListItemAttachments listId='dfa283f4-5faf-4d54-b6b8-5bcaf2725af5'
                     itemId={1}
                     context={this.props.context}
                     disabled={false} />
```

## Implementation

The `ListItemAttachments` control can be configured with the following properties:


| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| context | WebPartContext \| ApplicationCustomizerContext | yes | SPFx web part or extention context |
| listId | string | yes | Guid of the list. |
| itemId | number | yes | List Item Id  |
| webUrl | string | no | URL of the site. By default it uses the current site URL. |
| disabled | boolean | no | Specifies if the control is disabled or not. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/ListItemAttachments)

