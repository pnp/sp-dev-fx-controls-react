# SiteBreadcrumb component

This component returns a breadcrumb based on the current location.

![SiteBreadcrumb component output](../assets/SiteBreadcrumb.png)
![Hover over an item](../assets/SiteBreadcrumb-selected.png)

## How to use this component in your solutions

1. Check that you installed the `@pnp/dev-controls` dependency. Check out the [getting started](../getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { SiteBreadcrumb } from "@pnp/spfx-controls-react/lib/SiteBreadcrumb";
```

3. Use the `SiteBreadcrumb` component in your code as follows:

```TypeScript
<SiteBreadcrumb context={this.props.context} />
```

## Implementation

The SiteBreadcrumb component can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| context | WebPartContext OR ApplicationCustomizerContext | yes | Pass the context of your web part or application customizer extension. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/SiteBreadcrumb)
