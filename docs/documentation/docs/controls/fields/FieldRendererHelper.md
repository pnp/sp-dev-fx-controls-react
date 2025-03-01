# FieldRendererHelper class

FieldRendererHelper class is used to automatically apply needed Field Control based on current Field parameters.

## How to use this class in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.

- Import the following modules to your component:

```TypeScript
import { FieldRendererHelper } from "@pnp/spfx-controls-react/lib/Utilities";
```

- Use the `FieldRendererHelper.getFieldRenderer` method to asynchronously request proper React control (As the method returns `Promise` it should be called in one of React component lifecycle methods, for example, `componentWillMount` that will occur before `render`):

```TypeScript
public componentWillMount() {
    FieldRendererHelper.getFieldRenderer(fieldValue, {
      className: this.props.className,
      cssProps: this.props.cssProps
    }, this.props.listItem, this.props.context).then(fieldRenderer => {
        // update state to re-render the Field Customizer
      this.setState({
        fieldRenderer: fieldRenderer
      });
    });
  }
```

- Render the requested `fieldRenderer`:

```TypeScript
public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>
        {this.state.fieldRenderer}
      </div>
    );
  }
```

## Implementation

The FieldRendererHelper class contains single method `getFieldRenderer` with next signature:

```TypeScript
public static getFieldRenderer(fieldValue: any, props: IFieldRendererProps, listItem: ListItemAccessor, context: IContext): Promise<JSX.Element>
```

Parameters:

| Parameter  | Type                | Description                                                                                   |
| ---------- | ------------------- | --------------------------------------------------------------------------------------------- |
| fieldValue | any                 | Value of the field.                                                                           |
| props      | IFieldRendererProps | Basic properties interface for Field Controls. Contains `className` and `cssProps` properties |
| listItem   | ListItemAccessor    | Current List Item                                                                             |
| context    | IContext            | SPFx Context                                                                                  |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/fields/FieldRendererHelper)
