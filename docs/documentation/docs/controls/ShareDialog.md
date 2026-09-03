# ShareDialog Control

The `ShareDialog` control is a convenient way to integrate Office Online's share dialog into your solution, allowing users to share content such as documents, lists, directly from your application.

## Example Usage

Here is how you can use the `ShareDialog` control in your application.

### Share Button

![ShareDialog](../assets/ShareDialog.png)

## How to Use This Control

### 1. Install the Dependency

Ensure you have installed the `@pnp/spfx-controls-react` dependency. Refer to the [getting started](../../#getting-started) page for more details on installing the dependency.

### 2. Import the Control

Import the `ShareDialog` control into your component:

```typescript
import { ShareDialog } from "@pnp/spfx-controls-react/lib/ShareDialog";

<ShareDialog
  context={this.props.context}
  siteUrl={'https://contoso.sharepoint.com/sites/sitecollection'}
  listId={'list-id'}
  itemId={123}
  name={'Document Name'}
  onClose={() => { console.log('Dialog closed'); }}
/>
```

## Implementation

The `ShareDialog` control can be configured with the following properties:

| Property  | Type           | Required | Description                                             |
|-----------|----------------|----------|---------------------------------------------------------|
| isOpen    | boolean        | yes      | open or close Dialog                                    |
| options   | IDialogOptions | yes      |  ShareDialog Options                                    |
| onClose   | function       | yes      | Callback function executed when the dialog is closed.   |

### Interface `IDialogOptions`

| Property | Type           | Required | Description                               |
|----------|----------------|----------|-------------------------------------------|
| siteUrl  | string         | yes      | URL of the site where the item is located.|
| listId   | string         | yes      | ID of the list containing the item.       |
| itemId   | string/number  | yes      | ID of the item to be shared.              |
| name     | string         | yes      | Name of the item to be shared.            |

### Example `IDialogOptions` Usage

```typescript
const dialogOptions: IDialogOptions = {
  siteUrl: 'https://contoso.sharepoint.com/sites/sitecollection',
  listId: 'list-id',
  itemId: 123,
  name: 'Document Name'
};

<ShareDialog
  isOpen: true,
  options: dialogOptions.
  onClose={() => { console.log('Dialog closed'); }}
/>

```

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/ShareDialog)
