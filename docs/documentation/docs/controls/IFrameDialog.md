# IFrameDialog control

This control renders a Dialog with an iframe as a content.

Here is an example of the control in action:

![IFrameDialog control](../assets/FieldLookupRendererDialog.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
```

- Use the `IFrameDialog` control in your code as follows:

```TypeScript
<IFrameDialog 
    url={this.state.lookupDispFormUrl}
    iframeOnLoad={this._onIframeLoaded.bind(this)}
    hidden={this.state.hideDialog}
    onDismiss={this._onDialogDismiss.bind(this)}
    modalProps={{
        isBlocking: true,
        containerClassName: styles.dialogContainer
    }}
    dialogContentProps={{
        type: DialogType.close,
        showCloseButton: true
    }}
    width={'570px'}
    height={'315px'}/>
```

## Implementation

The IFrameDialog component can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| dialogContentProps | IDialogContentProps | no | Props to be passed through to Dialog Content. |
| hidden | boolean | no | Whether the dialog is hidden. |
| modalProps | IModalProps | no | Props to be passed through to Modal. |
| onDismiss | (ev?: React.MouseEvent<HTMLButtonElement>) => any | no | A callback function for when the Dialog is dismissed from the close button or light dismiss. Can also be specified separately in content and modal. |
| url | string | yes | iframe Url |
| iframeOnload | iframeOnLoad?: (iframe: any) => {} | no | iframe's onload event handler |
| width | string | yes | iframe's width |
| heigth | string | yes | iframe's height |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/FileTypeIcon)
