# FieldTextRenderer control

This control renders simple text.

![FieldTextRenderer control output](../../assets/FieldTextRenderer.png)

## Covered Fields

- Single line of text
- Multiple lines of text
- Choice
- Number
- Currency
- Yes/No
- Default renderer for uncovered types of fields

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { FieldTextRenderer } from "@pnp/spfx-controls-react/lib/FieldTextRenderer";
```

- Use the `FieldTextRenderer` control in your code as follows:

```TypeScript
<FieldTextRenderer text={event.fieldValue} className={'some-class'} cssProps={{ background: '#f00' }} />
```

## Implementation

The FieldTextRenderer component can be configured with the following properties:

| Property  | Type                | Required | Description                           |
| --------- | ------------------- | -------- | ------------------------------------- |
| cssProps  | React.CSSProperties | no       | CSS styles to apply to the renderer.  |
| className | ICssInput           | no       | CSS classes to apply to the renderer. |
| text      | string              | no       | Text to be rendered                   |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/fields/FieldTextRenderer)
