# Variant Theme Provider

This control is a super set of the Theme Provider control, which not only allows you to pass the FluentUI Theme to the child controls, but also allows you to apply "variants" or generate a theme starting from the three basic colors, primary color, text color and color background.

The idea comes from the possibility of "highlighting" a Web Part in the page or section where it is contained.

By default, the SharePoint Modern Pages allow to change the set of colors which are then applied to all controls, but this can only be done at the site level (changing the site theme) or at the page section level (applying variations from the site theme).

With this control we have the possibility to apply the variants to the single Web Part or to a portion of it.

Here is an example of the control in action inside a Web Part:

![Variant Theme Provider control](../assets/VariantThemeProvider.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- In your component file, import the `VariantThemeProvider` control as follows:

```TypeScript
import { VariantThemeProvider, VariantType, IThemeColors } from "@pnp/spfx-controls-react/lib/VariantThemeProvider";
```

- Example on use the `VariantThemeProvider` control with the 'Neutral' variant on custom theme generated from the 'themeColors' property:

```jsx
const customThemeColors: IThemeColors = {
    primaryColor: "#0078d4",
    textColor: "#323130",
    backgroundColor: "#ffffff"
  }
<VariantThemeProvider 
    themeColors={customThemeColors} 
    variantType={VariantType.Neutral}>
    {/* Child controls */}
</VariantThemeProvider>
```

- Example on use the `VariantThemeProvider` control with the 'Strong' variant on theme passed with the  from the 'theme' property:

```jsx
<VariantThemeProvider 
    theme={theme}
    variantType={VariantType.Strong}>
    {/* Child controls */}
</VariantThemeProvider>
```

## Implementation

The `VariantThemeProvider` control can be configured with the following properties (inherits all the properties present in the FluentUI ThemeProvider control):

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| as | React.ElementType | no | A component that should be used as the root element of the ThemeProvider component. |
| ref | React.Ref&lt;HTMLElement&gt; | no | Optional ref to the root element. |
| theme | PartialTheme \| Theme | no | Defines the theme provided by the user. |
| renderer | StyleRenderer | no | Optional interface for registering dynamic styles. Defaults to using `merge-styles`. Use this to opt into a particular rendering implementation, such as `emotion`, `styled-components`, or `jss`. Note: performance will differ between all renders. Please measure your scenarios before using an alternative implementation. |
| applyTo | element \| body \| none | no | Defines where body-related theme is applied to. Setting to 'element' will apply body styles to the root element of this control. Setting to 'body' will apply body styles to document body. Setting to 'none' will not apply body styles to either element or body. |
| variantType | VariantType | no | Variant type to apply to the theme. |
| themeColors | IThemeColors | no | Object used to generate a new theme from colors. |

Interface `IThemeColors`

| Property        | Type   | Required | Description                    |
| --------------- | ------ | -------- | ------------------------------ |
| primaryColor    | string | yes      | Primary Color of the theme.    |
| textColor       | string | yes      | Text Color of the theme.       |
| backgroundColor | string | yes      | Background Color of the theme. |

Enum `VariantType`

| Type    | Description                                 |
| ------- | ------------------------------------------- |
| None    | Apply the theme without variations.         |
| Neutral | Apply the 'Neutral' variation to the theme. |
| Soft    | Apply the 'Soft' variation to the theme.    |
| Strong  | Apply the 'Strong' variation to the theme.  |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/VariantThemeProvider)
