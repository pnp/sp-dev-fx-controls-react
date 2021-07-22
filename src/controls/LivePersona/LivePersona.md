# LivePersona control

This control allows you to use LivePersona Card available on SharePoint Online.

Here is an example of the control:

![LivePersona](../assets/LivePersona.png)

 
## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
import { LivePersona } from "@pnp/spfx-controls-react/lib/LivePersona";
```

- Use the `LivePersona` control in your code as follows:


```TypeScript
<LivePersona   upn="joao.j.mendes@spteck.com"
               template={
               <>
                <Persona text="João Mendes" secondaryText="joao.j.mendes@sapteck.com" coinSize={48} />
               </>
               }
               context={this.props.context}
          />
```


## Implementation


The `LivePersona` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| context | BaseComponentContext | yes | The context object of the SPFx loaded webpart or customizer. |
| upn |string | yes | User UPN |
| disableHover | bollean | no | If info should not appear on hover |
| template | string | JSX.ELement | yes | The content to wrap with persona info |


## Considerations

The LivePersona Card use Internal SharePoint Component and it can be changed in future, use it on your own risc and be consciente that it's beahvour can be chasnged
