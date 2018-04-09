# Releases

## 1.2.5

**Fixes**

- Undo `ListView` item selection after items array updates [#55](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/55)

## 1.2.4

**Enhancements**

- Hiding placeholder title on small zones

**Fixes**

- iFrame dialog reference fix [#52](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/52)

## 1.2.3

**Enhancements**

- Optimized telemetry so that it only pushes control data
- `WebPartTitle` hide control completely when empty

## 1.2.2

**Fixes**

- Fixes an issue sorting in the `ListView` control while items were selected. Indexes were not updated.

## 1.2.1

**Fixes**

- `FieldTaxonomyRenderer` got fixed to support single and multiple values

## 1.2.0

**New controls**

- Field controls are added to the project
- `IFrameDialog` was added to the project

**Fixes**

- Fixed theming in the `WebPartTitle` control

## 1.1.3

- `FileTypeIcon` icon fixed. This control should now also work in SPFx extensions.

## 1.1.2

- Fix for WebPartTitle control to inherit color
- Improved telemetry with some object checks

## 1.1.1

- Removed operation name from telemetry

## 1.1.0

- Telemetry added

## 1.0.0
- **New control**: WebPartTitle control got added.
- **Enhancement**: ListView control got extended with the ability to specify a set of preselected items.

## Beta 1.0.0-beta.8
- **Bug fix**: bug fix for the `ListView` control when selection is used in combination with `setState`.

## Beta 1.0.0-beta.7
**Added**
- Grouping functionality added to the `ListView` control

## Beta 1.0.0-beta.6
- Initial release
