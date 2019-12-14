# Reusable React controls for your SharePoint Framework solutions ![](https://img.shields.io/npm/v/@pnp/spfx-controls-react.svg)

This repository provides developers with a set of reusable React controls that can be used in SharePoint Framework (SPFx) solutions. The project provides controls for building web parts and extensions.

![Placeholder example](./assets/placeholder-intro.png)

!!! attention
    The controls project has a minimal dependency on SharePoint Framework version `1.3.0`. Be aware that the controls might not work in solutions your building for SharePoint 2016 with Feature Pack 2 on-premises. As for SharePoint 2016 with Feature Pack 2 version `1.1.0` of the SharePoint framework is the only version that can be used. SharePoint 2019 on-premises uses SharePoint framework `v1.4.0` and therefore should be fine to use with these controls.

## Getting started

### Installation

To get started you have to install the following dependency to your project: `@pnp/spfx-controls-react`.

Enter the following command to install the dependency to your project:

```bash
npm install @pnp/spfx-controls-react --save --save-exact
```

### Configuration

!!! note
    Since `v1.4.0` the localized resource path will automatically be configured during the dependency installing.

Once the package is installed, you will have to configure the resource file of the property controls to be used in your project. You can do this by opening the `config/config.json` and adding the following line to the `localizedResources` property:

```json
"ControlStrings": "node_modules/@pnp/spfx-controls-react/lib/loc/{locale}.js"
```

## Available controls

The following controls are currently available:

- [Carousel](./controls/Carousel) (Control displays children elements with 'previous/next element' options)
- [Charts](./controls/ChartControl) (makes it easy to integrate [Chart.js](https://www.chartjs.org/) charts into web part)
- [DateTimePicker](./controls/DateTimePicker) (DateTime Picker)
- [FilePicker](./controls/FilePicker) (control that allows to browse and select a file from various places)
- [FileTypeIcon](./controls/FileTypeIcon) (Control that shows the icon of a specified file path or application)
- [GridLayout](./controls/GridLayout) (control that renders a responsive grid layout for your web parts)
- [IFrameDialog](./controls/IFrameDialog) (renders a Dialog with an iframe as a content)
- [ListItemPicker](./controls/ListItemPicker) (allows to select one or more items from a list)
- [ListPicker](./controls/ListPicker) (allows to select one or multiple available lists/libraries of the current site)
- [ListView](./controls/ListView) (List view control)
- [Map](./controls/Map) (renders a map in a web part)
- [PeoplePicker](./controls/PeoplePicker) (People Picker)
- [Placeholder](./controls/Placeholder) (shows an initial placeholder if the web part has to be configured)
- [Progress](./controls/Progress) (shows progress of multiple SEQUENTIALLY executed actions)
- [SiteBreadcrumb](./controls/SiteBreadcrumb) (Breadcrumb control)
- [SecurityTrimmedControl](./controls/SecurityTrimmedControl) (intended to be used when you want to show or hide components based on the user permissions)
- [TaxonomyPicker](./controls/TaxonomyPicker) (Taxonomy Picker)
- [WebPartTitle](./controls/WebPartTitle) (Customizable web part title control)


Field customizer controls:

!!! note
    If you want to use these controls in your solution, first check out the start guide for these controls: [using the field controls](./controls/fields/main).

- [FieldAttachmentsRenderer](./controls/fields/FieldAttachmentsRenderer) (renders Clip icon based on the provided `count` property is defined and greater than 0)
- [FieldDateRenderer](./controls/fields/FieldDateRenderer) (renders date string as a simple text)
- [FieldFileTypeRenderer](./controls/fields/FieldFileTypeRenderer) (renders document or folder icon based on file path)
- [FieldLookupRenderer](./controls/fields/FieldLookupRenderer) (renders lookup values)
- [FieldNameRenderer](./controls/fields/FieldNameRenderer) (renders document's name as a link)
- [FieldTaxonomyRenderer](./controls/fields/FieldTaxonomyRenderer) (renders terms from Managed Metadata field)
- [FieldTextRenderer](./controls/fields/FieldTextRenderer) (renders simple text)
- [FieldTitleRenderer](./controls/fields/FieldTitleRenderer) (renders title either as a simple text or as a link to the Display Form)
- [FieldUrlRenderer](./controls/fields/FieldUrlRenderer) (renders Hyperlink or Picture field value as a link or image)
- [FieldUserRenderer](./controls/fields/FieldUserRenderer) (renders each referenced user/group as a link on a separate line)

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki)
