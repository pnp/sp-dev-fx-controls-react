# Field Customizer Out-of-the-box Fields Controls

These controls represent React controls that can be used in SPFx Field Customizers to provide rendering of the fields similar to out of the box experience. Additional benefit is ability to set custom css classes and styles to the component.

## Usage

The main scenario to use this package is to import `FieldRendererHelper` class and to call `getFieldRenderer` method. This method returns a Promise with a proper field renderer (`Promise<JSX.Element>`) based on field's type. It means that it will automatically select proper component that should be rendered in this or that field. This method also contains logic to correctly process field's value and get correct text to display (for example, Friendly Text for DateTime fields).
As the method returns `Promise` it should be called in one of React component lifecycle methods, for example, `componentWillMount` that will occur before `render`. The resulting field renderer could be saved in the element's state and used later in `render` method.
Here is an example on how it can be used inside custom Field Customizer component (.tsx file):

```TypeScript
export interface IOotbFieldsState {
  fieldRenderer?: JSX.Element;
}

//...

@override
  public componentWillMount() {
    FieldRendererHelper.getFieldRenderer(this.props.value, {
      className: this.props.className,
      cssProps: this.props.cssProps
    }, this.props.listItem, this.props.context).then(fieldRenderer => {
      this.setState({
        fieldRenderer: fieldRenderer
      });
    });
  }

public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>
        {this.state.fieldRenderer}
      </div>
    );
  }
```

Additionally, any of included components can be used by itself.

## FieldRendererHelper

[FieldRendererHelper](./FieldRendererHelper.md) class is a **recommended** way to use Field Controls as it provides additional functionality to automatically render the content for any type of fields.

## Available Controls

The following Field Controls are currently available:

- [FieldAttachmentsRenderer](./FieldAttachmentsRenderer.md) (renders Clip icon based on the provided `count` property is defined and greater than 0)
- [FieldDateRenderer](./FieldDateRenderer.md) (renders date string as a simple text)
- [FieldFileTypeRenderer](./FieldFileTypeRenderer.md) (renders document or folder icon based on file path)
- [FieldLookupRenderer](./FieldLookupRenderer.md) (renders lookup values)
- [FieldNameRenderer](./FieldNameRenderer.md) (renders document's name as a link)
- [FieldTaxonomyRenderer](./FieldTaxonomyRenderer.md) (renders terms from Managed Metadata field)
- [FieldTextRenderer](./FieldTextRenderer.md) (renders simple text)
- [FieldTitleRenderer](./FieldTitleRenderer.md) (renders title either as a simple text or as a link to the Display Form)
- [FieldUrlRenderer](./FieldUrlRenderer.md) (renders Hyperlink or Picture field value as a link or image)
- [FieldUserRenderer](./FieldUserRenderer.md) (renders each referenced user/group as a link on a separate line)

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/fields)
