# Getting started

## Installation

To get started you have to install the following dependency to your project: `@pnp/spfx-controls-react`.

Enter the following command to install the dependency to your project:

```
npm install @pnp/spfx-controls-react --save --save-exact
```

## Configuration

Once the package is installed, you will have to configure the resource file of the property controls to be used in your project. You can do this by opening the `config/config.json` and adding the following line to the `localizedResources` property:

```json
"ControlStrings": "./node_modules/@pnp/spfx-controls-react/lib/loc/{locale}.js"
```

## Next Steps

Once you installed the dependency you can start using the components in your solution. Go to the homepage of the documentation to get an overview of all the available components: [home](./).

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/GettingStarted)
