# ListItemComments control

This control allows you to manage list item comments, you can add or delete comments to an item. The comments are listed in tile view.
user can scroll to load more comments if they exist (infinite scroll);


Here is an example of the control:

![ListItemComments](../assets/ListItemComments.gif)

![ListItemComments](../assets/ListItemComments01.png)

![ListItemComments](../assets/ListItemComments02.png)

![ListItemComments](../assets/ListItemComments03.png)

![ListItemComments](../assets/ListItemComments04.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
import { ListItemComments } from '@pnp/spfx-controls-react/lib/ListItemComments';
```
- Use the `ListItemComments` control in your code as follows:

```TypeScript
<ListItemComments webUrl='{"https://contoso.sharepoint.com/sites/ThePerspective"}'
                  listId='dfa283f4-5faf-4d54-b6b8-5bcaf2725af5'
                  itemId={1}
                  serviceScope={serviceScope}
                  numberCommentsPerPage={10}
                  label="ListItem Comments"
                  />
```


## Implementation

The `ListItemComments` control can be configured with the following properties:


| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| serviceScope | ServiceScope | yes | SPFx Service Scope  |
| itemId | number | yes | List Item Id  |
| listId | string | yes | Guid of the list. |
| webUrl | string | no | URL of the site. By default it uses the current site URL. |
| label | string | no | Label for control |
| numberCommentsPerPage | number  | no | number of comments per page possible values 5 | 10 | 15 | 20  default 10 |

## MSGraph Permissions required

This control required the flowing scopes:
at least : People.Read   
 
![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/ListItemComments)
