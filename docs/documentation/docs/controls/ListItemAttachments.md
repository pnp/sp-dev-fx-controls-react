# ListItemAttachments control

This control allows you to manage list item attachments, you can add or delete associated attachments. The attachments are listed in tile view.

Here is an example of the control:

![ListItemAttachments Upload](../assets/ListItemAttachmentsUpload.png)

![ListItemAttachments Tiles](../assets/ListItemAttachmentsTitles.png)

![ListItemAttachments Confirm Delete](../assets/ListItemAttachmentDeleteConfirm.png)

![ListItemAttachments Attachment Deleted ](../assets/ListItemAttachementDeletedMsg.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
import { ListItemAttachments } from '@pnp/spfx-controls-react/lib/ListItemAttachments';
```

- Use the `ListItemAttachments` control in your code as follows:

```TypeScript
<ListItemAttachments listId='dfa283f4-5faf-4d54-b6b8-5bcaf2725af5'
                     itemId={1}
                     context={this.props.context}
                     disabled={false} />
```

- If you want to use `ListItemAttachments` controls with new form you have to use React.createRef.

Following example will add selected attachments to list item with id = 1

```TypeScript
let listItemAttachmentsComponentReference = React.createRef<ListItemAttachments>();
...
      <ListItemAttachments 
        ref={listItemAttachmentsComponentReference} 
        context={this.props.context} 
        listId="dfcfdb95-2488-4757-b55b-14d94166ad87" 
        itemId={0} />
...
<PrimaryButton text="Save to Item with id 1" onClick={()=>{
        //@ts-ignore
        listItemAttachmentsComponentReference.current.uploadAttachments(1);
      }} />
```

## Implementation

The `ListItemAttachments` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| context | BaseComponentContext | yes | SPFx web part or extension context |
| itemId | number | no | List Item Id  |
| listId | string | yes | Guid of the list. |
| webUrl | string | no | URL of the site. By default it uses the current site URL. |
| label | string | no | Main text to display on the placeholder, next to the icon. |
| description | string | no | Description text to display on the placeholder, below the main text and icon. |
| disabled | boolean | no | Specifies if the control is disabled or not. |
| openAttachmentsInNewWindow | boolean | no | Specifies if the attachment should be opened in a separate browser tab. Use this property set to `true` if you plan to use the component in Microsoft Teams. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/ListItemAttachments)
