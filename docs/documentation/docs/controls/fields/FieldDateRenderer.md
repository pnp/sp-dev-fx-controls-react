# FieldDateRenderer control

This control renders date string as a simple text.

![FieldDateRenderer control output](../../assets/FieldDateRenderer.png)

## Covered Fields

- Date and Time

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { FieldDateRenderer } from "@pnp/spfx-controls-react/lib/FieldDateRenderer";
```

- Use the `FieldDateRenderer` control in your code as follows:

```TypeScript
<FieldDateRenderer text={event.fieldValue} className={'some-class'} cssProps={{ background: '#f00' }} />
```

**Note:** FieldDateRenderer doesn't provide functionality to render date in friendly format. It just renders the provided text as is. To learn more about friendly formatting please refer to `FieldRendererHelper` implementation.

## Implementation

The FieldDateRenderer component can be configured with the following properties:

| Property  | Type                | Required | Description                           |
| --------- | ------------------- | -------- | ------------------------------------- |
| cssProps  | React.CSSProperties | no       | CSS styles to apply to the renderer.  |
| className | ICssInput           | no       | CSS classes to apply to the renderer. |
| text      | string              | no       | Text to be rendered                   |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/fields/FieldDateRenderer)
