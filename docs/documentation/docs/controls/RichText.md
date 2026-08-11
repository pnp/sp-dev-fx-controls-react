# RichText control

This control provides rich text editing and display capability.

![RichText control output](../assets/RichTextOutput.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
```

- The simplest way to use the `RichText` control in your code is as follows:

```TypeScript
<RichText value={this.props.value}
          onChange={(text)=>this.onTextChange(text)}
/>
```

- The `value` property should contain the HTML that you wish to display
- The `onChange` handler will be called every time a user changes the text. For example, to have your web part store the rich text as it is updated, you would use the following code:

```TypeScript
private onTextChange = (newText: string) => {
  this.properties.myRichText = newText;
  return newText;
}
```

It is possible to use the `onChange` handler as users type -- for example, the following code replaces all instance of the word `bold` with bold text.

```TypeScript
private onTextChange = (newText: string) => {
  newText = newText.replace(" bold ", " <strong>bold</strong> ");
  this.properties.description = newText;
  return newText;
}
```

- By adding `label` property, the control is better identified, especially when used in a form

```TypeScript
<RichText label="My multiline text field" value={this.props.value} />
```

It is also possible to customize the control label's rendering:

```TypeScript
const richText = (
  <RichText id="spfxRichText" label="My multiline text field"
            onRenderLabel={onRenderCustomLabel}
            value={this.props.value} />
);

const onRenderCustomLabel = (rtProps: IRichTextProps): JSX.Element => {
  return <Label htmlFor={rtProps.id}>{rtProps.label}</Label>;
}
```

It is also possible to provide custom formatting styles for built-in rich text elements. These styles are scoped to the current RichText instance and applied both in edit mode and read-only mode.

```TypeScript
<RichText
  value={this.props.value}
  customStyles={{
    normal: {
      color: '#323130',
      lineHeight: 1.6
    },
    header2: {
      fontSize: '30px',
      color: '#005a9e'
    },
    blockQuote: {
      backgroundColor: '#f3f2f1',
      borderLeft: '4px solid #005a9e',
      paddingLeft: '12px'
    }
  }}
  onChange={(text) => this.onTextChange(text)}
/>
```

## Implementation

The RichText control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| id | string | no | The ID to apply to the RichText control. |
| label | string | no | The label displayed above the RichText control. |
| className | string | no | The custom CSS class to apply to the RichText control. |
| style | React.CSSProperties | no | The custom styles to apply to the RichText control. |
| isEditMode | boolean | no | `true` indicates that users will be able to edit the content of the RichText control. `false` will display the rich text as read-only. |
| placeholder | string | no | Placeholder text to show when the editor is empty. |
| styleOptions | StyleOptions | no | Define the styles you want to show or hide for the rich text editor |
| value | string | no | Sets the rich text to display in the RichText control. |
| customColors | ISwatchColor[] | no | Additional colors to include in the side-panel font color swatch. |
| customStyles | IRichTextCustomFormattingStyles | no | Object-based formatting styles applied by the control to built-in rich text elements such as normal text, headings, block quotes, and lists. |
| onChange | (text: string) => string | no | onChange handler for the RichText control. The function must return a `string` containing the rich text to display in the RichText control. |
| onRenderLabel | (props: IRichTextProps) => JSX.Element | no | Custom renderer for the RichText control's label. The function must return a `JSX.Element`. |

`IRichTextCustomFormattingStyles` interface

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| normal | React.CSSProperties | no | Styles applied to the root rich text content. |
| header2 | React.CSSProperties | no | Styles applied to `h2` content. |
| header3 | React.CSSProperties | no | Styles applied to `h3` content. |
| header4 | React.CSSProperties | no | Styles applied to `h4` content. |
| blockQuote | React.CSSProperties | no | Styles applied to `blockquote` content. |
| div | React.CSSProperties | no | Styles applied to `div` content. |
| p | React.CSSProperties | no | Styles applied to `p` content. |
| ul | React.CSSProperties | no | Styles applied to `ul` content. |
| ol | React.CSSProperties | no | Styles applied to `ol` content. |
| li | React.CSSProperties | no | Styles applied to `li` content. |

`StyleOptions` interface

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| showAlign | boolean | no | Indicates whether to show the **Align** toolbar button or not. Default value is `true` |
| showBold | boolean | no | Indicates whether to show the **Bold** toolbar button or not. Default value is `true` |
| showItalic | boolean | no | Indicates whether to show the **Italic** toolbar button or not.  Default value is `true` |
| showLink | boolean | no | Indicates whether to show the **Hyperlink** toolbar button or not.  Default value is `true` |
| showList | boolean | no | Indicates whether to show the **List** toolbar button or not.  Default value is `true` |
| showImage | boolean | no | Indicates whether to show the **Image** toolbar button or not. Default value is `true` |
| showMore | boolean | no | Indicates whether to show the **More** toolbar button or not. Note that this option is independent from the other `show___` options. I.e.: Setting `showBold` to `false` will disable the **Bold** toolbar, but will not disable it from the formatting pane. Default value is `true` |
| showStyles | boolean | no | Indicates whether to show the **Headings** toolbar button or not. Note that this option is independent from the other `show___` options. I.e.: Setting `showBold` to `false` will disable the **Bold** toolbar, but will not disable it from the formatting pane. Default value is `true` |
| showUnderline | boolean | no | Indicates whether to show the **Underline** toolbar button or not. Note that this option is independent from the other `show___` options. I.e.: Setting `showBold` to `false` will disable the **Bold** toolbar, but will not disable it from the formatting pane. Default value is `true` |

> Note that setting `showAlign`, `showBold`, `showItalic`, `showLink`, `showList`, `showStyles`, or
`showUnderline` to `false` does *not* remove the user's ability to apply the button's associated formatting -- it only hides the toolbar option. Also, if `showMore` is `true`, all options remain available in the formatting pane -- regardless whether they were turned off using `show___`. To prevent users from applying specific formats, use the `onChange` handler to parse the rich text and remove the formatting as desired.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/RichText)
