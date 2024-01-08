# Reusable React controls for your SharePoint Framework solutions ![](https://img.shields.io/npm/v/@pnp/spfx-controls-react.svg)

This repository provides developers with a set of reusable React controls that can be used in SharePoint Framework (SPFx) solutions. The project provides controls for building web parts and extensions.

![Placeholder example](./assets/placeholder-intro.png)

!!! attention
    In order to migrate to `v3` it is adviced to follow this guide: [Migrating from V1](./guides/migrate-from-v1).

## Library Versions
Currently there are 3 active versions of the controls. Please, reference the table below to see what version to use in your project.

| Version | SPFx minimal dependency | Fluent UI (Office UI Fabric React) version | SharePoint Version | Comments |
| ------- | ----------------------- | ------------------------------------------ | ------------------ | -------- |
| `v3` | `1.13.*` | `7.174.1` | Online | The most current, actively maintained version of the library. |
| `v2` | `1.11.0` | `6.214.0` | Online | **The last major version is 2.9.0**.<br>We strongly recommend to update to SPFx `1.13.*` and `v3` of Controls. |
| `v1` | `1.3.0` | `5.131.0` | On-Prem | The version is maintained for SharePoint On-Prem 2016 and 2019 implementations. Be aware that the controls might not work in solutions you're building for on-premises as SharePoint On-Prem is based on SPFx `1.1.0`. |

!!! attention
    If you are using `v3` of the Controls with SPFx `1.12.1` you will need to cast web part context to `any` to pass it to the controls.

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

## Telemetry

All controls gather telemetry to verify the usage. Only the name of the control and related data gets captured. 

> More information about the service that we are using for this can be found here: [PnP Telemetry Proxy](https://github.com/pnp/telemetry-proxy-node).

Since version `1.17.0` it is possible to opt-out of the telemetry by adding the following code to your web part:

```typescript
import PnPTelemetry from "@pnp/telemetry-js";
...
const telemetry = PnPTelemetry.getInstance();
telemetry.optOut();
```

## Available controls

The following controls are currently available:

- [AccessibleAccordion](./controls/AccessibleAccordion) (Control to render an accordion. React `AccessibleAccordion`-based implementation)
- [Accordion](./controls/Accordion) (Control to render an accordion)
- [AdaptiveCardHost](./controls/AdaptiveCardHost.md) (Control to render Adaptive Cards)
- [AdaptiveCardDesignerHost](./controls/AdaptiveCardDesignerHost.md) (Control to render Adaptive Cards Designer)
- [AnimatedDialog](./controls/AnimatedDialog) (Animated dialog control)
- [Carousel](./controls/Carousel) (Control displays children elements with 'previous/next element' options)
- [Charts](./controls/ChartControl) (makes it easy to integrate [Chart.js](https://www.chartjs.org/) charts into web part)
- [ComboBoxListItemPicker](./controls/ComboBoxListItemPicker) (allows to select one or more items from a list)
- [ContentTypePicker](./controls/ContentTypePicker) (Control to pick a content type)
- [Dashboard](./controls/Dashboard) (Control to render dashboard in Microsoft Teams)
- [DateTimePicker](./controls/DateTimePicker) (DateTime Picker)
- [DragDropFiles](./controls/DragDropFiles) (Allow drag and drop of files in selected areas)
- [DynamicForm](./controls/DynamicForm) (Dynamic Form component)
- [EnhancedThemeProvider](./controls/EnhancedThemeProvider) (Enhanced version of Fluent UI Theme Provider control used to improve support for themes and fonts when creating Tab or Personal App in SPFx for Teams or creating Isolated Web Parts)
- [FieldCollectionData](./controls/FieldCollectionData) (control gives you the ability to insert a list / collection data which can be used in your web part / application customizer)
- [FieldPicker](./controls/FieldPicker) (control to pick one or multiple fields from a list or a site)
- [FilePicker](./controls/FilePicker) (control that allows to browse and select a file from various places)
- [FileTypeIcon](./controls/FileTypeIcon) (Control that shows the icon of a specified file path or application)
- [FolderExplorer](./controls/FolderExplorer) (Control that allows to browse the folders and sub-folders from a root folder)
- [FolderPicker](./controls/FolderPicker) (Control that allows to browse and select a folder)
- [GridLayout](./controls/GridLayout) (control that renders a responsive grid layout for your web parts)
- [HoverReactionsBar](./controls/HoverReactionsBar) (control that allows you to select an emoji from emoji bar or select from picker)
- [IconPicker](./controls/IconPicker) (control that allows to search and select an icon from office-ui-fabric icons)
- [IFrameDialog](./controls/IFrameDialog) (renders a Dialog with an iframe as a content)
- [IFramePanel](./controls/IFramePanel) (renders a Panel with an iframe as a content)
- [ListItemComments](./controls/ListItemComments) (controls that allows to manage list item comments similarly to out-of-the box experience)
- [ListItemPicker](./controls/ListItemPicker) (allows to select one or more items from a list)
- [ListPicker](./controls/ListPicker) (allows to select one or multiple available lists/libraries of the current site)
- [ListView](./controls/ListView) (List view control)
- [LivePersona](./controls/LivePersona) (Live Persona control)
- [LocationPicker](./controls/LocationPicker) (Location Picker control)
- [Map](./controls/Map) (renders a map in a web part)
- [ModernAudio](./controls/ModernAudio) (Modern Audio control)
- [ModernTaxonomyPicker](./controls/ModernTaxonomyPicker) (Modern Taxonomy Picker)
- [MonacoEditor](./controls/MonacoEditor) (Monaco Editor)
- [MyTeams](./controls/MyTeams) (My Teams)
- [PeoplePicker](./controls/PeoplePicker) (People Picker)
- [Placeholder](./controls/Placeholder) (shows an initial placeholder if the web part has to be configured)
- [Progress](./controls/Progress) (shows progress of multiple SEQUENTIALLY executed actions)
- [ProgressStepsIndicator.md](./controls/ProgressStepsIndicator) (shows a progress of steps)
- [SecurityTrimmedControl](./controls/SecurityTrimmedControl) (intended to be used when you want to show or hide components based on the user permissions)
- [SiteBreadcrumb](./controls/SiteBreadcrumb) (Breadcrumb control)
- [SitePicker](./controls/SitePicker) (Site Picker control)
- [TaxonomyPicker](./controls/TaxonomyPicker) (Taxonomy Picker)
- [TeamChannelPicker](./controls/TeamChannelPicker) (Team Channel Picker)
- [TeamPicker](./controls/TeamPicker) (Team Picker)
- [TermSetNavigation](./controls/TermSetNavigation) (Team Picker)
- [Toolbar](./controls/Toolbar) (Control to render Toolbar in Microsoft Teams)
- [TreeView](./controls/TreeView) (Tree View)
- [UploadFiles](./controls/UploadFiles) (Upload Files)
- [VariantThemeProvider](./controls/VariantThemeProvider) (Variant Theme Provider)
- [ViewPicker](./controls/ViewPicker.md) (View Picker Control)
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
