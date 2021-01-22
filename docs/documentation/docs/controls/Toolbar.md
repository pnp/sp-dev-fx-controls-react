# Dashboard control

Toolbar component for Microsoft Teams.

!!! Note
    As this component is based on `@fluentui/react-northstar` the main usage scenario is Microsoft Teams projects. You can still use it in non-Teams related projects as well.

Here is an example of the control in action:

![Carousel control](../assets/toolbar.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { Toolbar } from '@pnp/spfx-controls-react/lib/Toolbar';
```

- Use the `Toolbar` control in your code as follows:

```TypeSCript
<Toolbar actionGroups={{
    'group1': {
      'action1': {
        title: 'Edit',
        iconName: 'Edit',
        onClick: () => { console.log('Edit action click'); }
      },
      'action2': {
        title: 'New',
        iconName: 'Add',
        onClick: () => { console.log('New action click'); }
      }
    }
  }}
  filters={[{
    id: "f1",
    title:
      "Fruits (any sweet, edible part of a plant that resembles fruit, even if it does not develop from a floral ovary)",
    items: [
      { id: "f1f1", title: "Pomes" },
      { id: "f1f2", title: "Drupes" },
      { id: "f1f3", title: "Citruses" },
      { id: "f1f4", title: "Berries" },
      { id: "f1f5", title: "Melons" },
    ],
  },
  {
    id: "f3",
    title: "Cacti",
  },]}
  find={true} />
```

## Implementation

The Toolbar component can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| actionGroups | TActionGroups | yes | Toolbar actions groups. |
| filters | TFilters | no | Toolbar filters. |
| find | boolean | no | Specifies if searchbox should be displayed. |
| filtersSingleSelect | boolean | no | Specifies if a user can select only one filter at a time. |
| onSelectedFiltersChange | (selectedFilters: string[]) => string[] | no | Filter changed handler. |
| onFindQueryChange | (findQuery: string) => string | no | Search query changed handler. |


Type `TActionGroups`

Provides Toolbar action groups settings

```typescript
type TActionGroups = {
    [slug: string]: TActions;
};
```

Type `TActions`

Provides Toolbar actions settings

```typescript
type TActions = {
    [actionKey: string]: TAction;
};
```

Type `TAction`

Provides Toolbar action settings

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| title | string | yes | Action title. |
| iconName | string | no | Action icon name. |
| multi | boolean | no | For future. |
| onClick | ComponentEventHandler&lt;ToolbarItemProps&gt; | no | Action `onClick` handler. |

Type `TFilters`

Provides Toolbar filters settings

```typescript
type TFilters = ObjectShorthandCollection<TreeItemProps, never>;
```

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/Toolbar)
