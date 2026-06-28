# Upgrade project sp-dev-fx-controls-react-client-side-solution to v1.23.0

Date: 6/28/2026

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.23.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.23.0
```

File: [./package.json:48:5](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.23.0
```

File: [./package.json:54:5](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.23.0
```

File: [./package.json:55:5](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.23.0
```

File: [./package.json:58:5](./package.json)

### FN001011 @microsoft/sp-dialog | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-dialog

Execute the following command:

```sh
npm i -SE @microsoft/sp-dialog@1.23.0
```

File: [./package.json:49:5](./package.json)

### FN001012 @microsoft/sp-application-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-application-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-application-base@1.23.0
```

File: [./package.json:46:5](./package.json)

### FN001014 @microsoft/sp-listview-extensibility | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-listview-extensibility

Execute the following command:

```sh
npm i -SE @microsoft/sp-listview-extensibility@1.23.0
```

File: [./package.json:52:5](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.23.0
```

File: [./package.json:57:5](./package.json)

### FN001023 @microsoft/sp-component-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-component-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-component-base@1.23.0
```

File: [./package.json:47:5](./package.json)

### FN001026 @microsoft/sp-extension-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-extension-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-extension-base@1.23.0
```

File: [./package.json:50:5](./package.json)

### FN001027 @microsoft/sp-http | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-http

Execute the following command:

```sh
npm i -SE @microsoft/sp-http@1.23.0
```

File: [./package.json:51:5](./package.json)

### FN001029 @microsoft/sp-loader | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-loader

Execute the following command:

```sh
npm i -SE @microsoft/sp-loader@1.23.0
```

File: [./package.json:53:5](./package.json)

### FN001032 @microsoft/sp-page-context | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-page-context

Execute the following command:

```sh
npm i -SE @microsoft/sp-page-context@1.23.0
```

File: [./package.json:56:5](./package.json)

### FN001013 @microsoft/decorators | Required

Upgrade SharePoint Framework dependency package @microsoft/decorators

Execute the following command:

```sh
npm i -SE @microsoft/decorators@1.23.0
```

File: [./package.json:42:5](./package.json)

### FN001034 @microsoft/sp-adaptive-card-extension-base | Optional

Upgrade SharePoint Framework dependency package @microsoft/sp-adaptive-card-extension-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-adaptive-card-extension-base@1.23.0
```

File: [./package.json:45:5](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.23.0
```

File: [./package.json:99:5](./package.json)

### FN002022 @microsoft/eslint-plugin-spfx | Required

Upgrade SharePoint Framework dev dependency package @microsoft/eslint-plugin-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-plugin-spfx@1.23.0
```

File: [./package.json:97:5](./package.json)

### FN002023 @microsoft/eslint-config-spfx | Required

Upgrade SharePoint Framework dev dependency package @microsoft/eslint-config-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-config-spfx@1.23.0
```

File: [./package.json:96:5](./package.json)

### FN002030 @microsoft/spfx-web-build-rig | Required

Upgrade SharePoint Framework dev dependency package @microsoft/spfx-web-build-rig

Execute the following command:

```sh
npm i -DE @microsoft/spfx-web-build-rig@1.23.0
```

File: [./package.json:101:5](./package.json)

### FN002034 @microsoft/spfx-heft-plugins | Required

Upgrade SharePoint Framework dev dependency package @microsoft/spfx-heft-plugins

Execute the following command:

```sh
npm i -DE @microsoft/spfx-heft-plugins@1.23.0
```

File: [./package.json:100:5](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.23.0"
  }
}
```

File: [./.yo-rc.json:3:5](./.yo-rc.json)

### FN002031 @rushstack/heft | Required

Upgrade SharePoint Framework dev dependency package @rushstack/heft

Execute the following command:

```sh
npm i -DE @rushstack/heft@1.2.17
```

File: [./package.json:103:5](./package.json)

### FN027001_REMOVE @rushstack/heft | Required

Remove existing SharePoint Framework override dependency package @rushstack/heft

Execute the following command:

```sh
npm pkg delete overrides.@rushstack/heft
```

File: [./package.json:153:5](./package.json)

### FN027001 @rushstack/heft | Required

Upgrade SharePoint Framework override dependency package @rushstack/heft

Execute the following command:

```sh
npm pkg set overrides.@rushstack/heft=1.2.17
```

File: [./package.json:153:5](./package.json)

### FN002025 eslint-plugin-react-hooks | Required

Upgrade SharePoint Framework dev dependency package eslint-plugin-react-hooks

Execute the following command:

```sh
npm i -DE eslint-plugin-react-hooks@5.2.0
```

File: [./package.json:131:5](./package.json)

### FN002024 eslint | Required

Upgrade SharePoint Framework dev dependency package eslint

Execute the following command:

```sh
npm i -DE eslint@9.37.0
```

File: [./package.json:130:5](./package.json)

### FN015016 eslint.config.js | Required

Add file eslint.config.js

Execute the following command:

```sh
@'
const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  ...spfxProfile,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  }
];
'@ | Out-File -FilePath "eslint.config.js"
```

File: [eslint.config.js](eslint.config.js)

### FN015008 .eslintrc.js | Required

Remove file .eslintrc.js

Execute the following command:

```sh
Remove-Item ".eslintrc.js"
```

File: [.eslintrc.js](.eslintrc.js)

### FN002021 @rushstack/eslint-config | Required

Remove SharePoint Framework dev dependency package @rushstack/eslint-config

Execute the following command:

```sh
npm un -D @rushstack/eslint-config
```

File: [./package.json:102:5](./package.json)

### FN002032 @typescript-eslint/parser | Required

Remove SharePoint Framework dev dependency package @typescript-eslint/parser

Execute the following command:

```sh
npm un -D @typescript-eslint/parser
```

File: [./package.json:123:5](./package.json)

### FN002035 @types/heft-jest | Required

Remove SharePoint Framework dev dependency package @types/heft-jest

Execute the following command:

```sh
npm un -D @types/heft-jest
```

File: [./package.json:110:5](./package.json)

### FN002036 @types/jest | Required

Upgrade SharePoint Framework dev dependency package @types/jest

Execute the following command:

```sh
npm i -DE @types/jest@30.0.0
```

File: [./package.json:111:5](./package.json)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/accordion/Accordion.module.scss](src/controls/accordion/Accordion.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/animatedDialog/AnimatedDialog.module.scss](src/controls/animatedDialog/AnimatedDialog.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/carousel/Carousel.module.scss](src/controls/carousel/Carousel.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/chartControl/ChartControl.module.scss](src/controls/chartControl/ChartControl.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fieldCollectionData/FieldCollectionData.module.scss](src/controls/fieldCollectionData/FieldCollectionData.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldCommon/FieldRenderer.module.scss](src/controls/fields/fieldCommon/FieldRenderer.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/FilePicker.module.scss](src/controls/filePicker/FilePicker.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/controls/DocumentLibraryBrowser/DocumentLibraryBrowser.module.scss](src/controls/filePicker/controls/DocumentLibraryBrowser/DocumentLibraryBrowser.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fileTypeIcon/FileTypeIcon.module.scss](src/controls/fileTypeIcon/FileTypeIcon.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filterBar/FilterBar.module.scss](src/controls/filterBar/FilterBar.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/folderExplorer/FolderExplorer/FolderExplorer.module.scss](src/controls/folderExplorer/FolderExplorer/FolderExplorer.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/folderExplorer/NewFolder/NewFolder.module.scss](src/controls/folderExplorer/NewFolder/NewFolder.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/folderPicker/FolderPicker.module.scss](src/controls/folderPicker/FolderPicker.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/gridLayout/GridLayout.module.scss](src/controls/gridLayout/GridLayout.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/iconPicker/IconPicker.module.scss](src/controls/iconPicker/IconPicker.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/locationPicker/LocationPicker.module.scss](src/controls/locationPicker/LocationPicker.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/modernTaxonomyPicker/taxonomyPanelContents/TaxonomyPanelContents.module.scss](src/controls/modernTaxonomyPicker/taxonomyPanelContents/TaxonomyPanelContents.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/modernTaxonomyPicker/taxonomyTree/TaxonomyTree.module.scss](src/controls/modernTaxonomyPicker/taxonomyTree/TaxonomyTree.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/modernTaxonomyPicker/termItem/TermItemSuggestions.module.scss](src/controls/modernTaxonomyPicker/termItem/TermItemSuggestions.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/richText/RichText.module.scss](src/controls/richText/RichText.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/richText/RichTextPropertyPane.module.scss](src/controls/richText/RichTextPropertyPane.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/richText/RteColorPicker.module.scss](src/controls/richText/RteColorPicker.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/treeView/TreeView.module.scss](src/controls/treeView/TreeView.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/webparts/controlsTest/components/ControlsTest.module.scss](src/webparts/controlsTest/components/ControlsTest.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/accordion/Accordion.module.scss](src/controls/accordion/Accordion.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/animatedDialog/AnimatedDialog.module.scss](src/controls/animatedDialog/AnimatedDialog.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/carousel/Carousel.module.scss](src/controls/carousel/Carousel.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/chartControl/ChartControl.module.scss](src/controls/chartControl/ChartControl.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/dashboard/Dashboard.module.scss](src/controls/dashboard/Dashboard.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/dateTimePicker/DateTimePicker.module.scss](src/controls/dateTimePicker/DateTimePicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/dragDropFiles/DragDropFiles.module.scss](src/controls/dragDropFiles/DragDropFiles.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/errorMessage/ErrorMessage.module.scss](src/controls/errorMessage/ErrorMessage.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fieldCollectionData/FieldCollectionData.module.scss](src/controls/fieldCollectionData/FieldCollectionData.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldAttachmentsRenderer/FieldAttachmentsRenderer.module.scss](src/controls/fields/fieldAttachmentsRenderer/FieldAttachmentsRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldBaseTextRenderer/FieldBaseTextRenderer.module.scss](src/controls/fields/fieldBaseTextRenderer/FieldBaseTextRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldCommon/FieldRenderer.module.scss](src/controls/fields/fieldCommon/FieldRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldFileTypeRenderer/FieldFileTypeRenderer.module.scss](src/controls/fields/fieldFileTypeRenderer/FieldFileTypeRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldLookupRenderer/FieldLookupRenderer.module.scss](src/controls/fields/fieldLookupRenderer/FieldLookupRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldNameRenderer/FieldNameRenderer.module.scss](src/controls/fields/fieldNameRenderer/FieldNameRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldTaxonomyRenderer/FieldTaxonomyRenderer.module.scss](src/controls/fields/fieldTaxonomyRenderer/FieldTaxonomyRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldTextRenderer/FieldTextRenderer.module.scss](src/controls/fields/fieldTextRenderer/FieldTextRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldUrlRenderer/FieldUrlRenderer.module.scss](src/controls/fields/fieldUrlRenderer/FieldUrlRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fields/fieldUserRenderer/FieldUserRenderer.module.scss](src/controls/fields/fieldUserRenderer/FieldUserRenderer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/FilePicker.module.scss](src/controls/filePicker/FilePicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/LinkFilePickerTab/LinkFilePickerTab.module.scss](src/controls/filePicker/LinkFilePickerTab/LinkFilePickerTab.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/MultipleUploadFilePickerTab/MultipleUploadFilePickerTab.module.scss](src/controls/filePicker/MultipleUploadFilePickerTab/MultipleUploadFilePickerTab.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/OneDriveFilesTab/OneDriveFilesTab.module.scss](src/controls/filePicker/OneDriveFilesTab/OneDriveFilesTab.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/RecentFilesTab/RecentFilesTab.module.scss](src/controls/filePicker/RecentFilesTab/RecentFilesTab.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/SiteFilePickerTab/SiteFilePickerTab.module.scss](src/controls/filePicker/SiteFilePickerTab/SiteFilePickerTab.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/StockImagesTab/StockImages.module.scss](src/controls/filePicker/StockImagesTab/StockImages.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/UploadFilePickerTab/UploadFilePickerTab.module.scss](src/controls/filePicker/UploadFilePickerTab/UploadFilePickerTab.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/WebSearchTab/WebSearchTab.module.scss](src/controls/filePicker/WebSearchTab/WebSearchTab.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/controls/DocumentLibraryBrowser/DocumentLibraryBrowser.module.scss](src/controls/filePicker/controls/DocumentLibraryBrowser/DocumentLibraryBrowser.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/controls/DocumentTile/DocumentTile.module.scss](src/controls/filePicker/controls/DocumentTile/DocumentTile.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/controls/FileBrowser/FileBrowser.module.scss](src/controls/filePicker/controls/FileBrowser/FileBrowser.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/controls/FolderTile/FolderTile.module.scss](src/controls/filePicker/controls/FolderTile/FolderTile.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filePicker/controls/TilesList/TilesList.module.scss](src/controls/filePicker/controls/TilesList/TilesList.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/fileTypeIcon/FileTypeIcon.module.scss](src/controls/fileTypeIcon/FileTypeIcon.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/filterBar/FilterBar.module.scss](src/controls/filterBar/FilterBar.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/folderExplorer/FolderExplorer/FolderExplorer.module.scss](src/controls/folderExplorer/FolderExplorer/FolderExplorer.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/folderExplorer/NewFolder/NewFolder.module.scss](src/controls/folderExplorer/NewFolder/NewFolder.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/folderPicker/FolderPicker.module.scss](src/controls/folderPicker/FolderPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/gridLayout/GridLayout.module.scss](src/controls/gridLayout/GridLayout.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/iFrameDialog/IFrameDialogContent.module.scss](src/controls/iFrameDialog/IFrameDialogContent.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/iFramePanel/IFramePanelContent.module.scss](src/controls/iFramePanel/IFramePanelContent.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/iconPicker/IconPicker.module.scss](src/controls/iconPicker/IconPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/listItemAttachments/ListItemAttachments.module.scss](src/controls/listItemAttachments/ListItemAttachments.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/listItemPicker/ComboBoxListItemPicker.module.scss](src/controls/listItemPicker/ComboBoxListItemPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/listPicker/ListPicker.module.scss](src/controls/listPicker/ListPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/locationPicker/LocationPicker.module.scss](src/controls/locationPicker/LocationPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/map/Maps.module.scss](src/controls/map/Maps.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/modernAudio/ModernAudio.module.scss](src/controls/modernAudio/ModernAudio.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/modernTaxonomyPicker/ModernTaxonomyPicker.module.scss](src/controls/modernTaxonomyPicker/ModernTaxonomyPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/modernTaxonomyPicker/taxonomyPanelContents/TaxonomyPanelContents.module.scss](src/controls/modernTaxonomyPicker/taxonomyPanelContents/TaxonomyPanelContents.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/modernTaxonomyPicker/taxonomyTree/TaxonomyTree.module.scss](src/controls/modernTaxonomyPicker/taxonomyTree/TaxonomyTree.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/modernTaxonomyPicker/termItem/TermItemSuggestions.module.scss](src/controls/modernTaxonomyPicker/termItem/TermItemSuggestions.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/pagination/Pagination.module.scss](src/controls/pagination/Pagination.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/peoplepicker/PeoplePickerComponent.module.scss](src/controls/peoplepicker/PeoplePickerComponent.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/progress/Progress.module.scss](src/controls/progress/Progress.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/richText/RichText.module.scss](src/controls/richText/RichText.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/richText/RichTextPropertyPane.module.scss](src/controls/richText/RichTextPropertyPane.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/richText/RteColorPicker.module.scss](src/controls/richText/RteColorPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/siteBreadcrumb/SiteBreadcrumb.module.scss](src/controls/siteBreadcrumb/SiteBreadcrumb.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/taxonomyPicker/TaxonomyPicker.module.scss](src/controls/taxonomyPicker/TaxonomyPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/toolbar/Toolbar.module.scss](src/controls/toolbar/Toolbar.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/treeView/TreeView.module.scss](src/controls/treeView/TreeView.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/viewPicker/ViewPicker.module.scss](src/controls/viewPicker/ViewPicker.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/controls/webPartTitle/WebPartTitle.module.scss](src/controls/webPartTitle/WebPartTitle.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/extensions/ootbFields/components/Customizer/OotbFields.module.scss](src/extensions/ootbFields/components/Customizer/OotbFields.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/extensions/testApp/TestApp.module.scss](src/extensions/testApp/TestApp.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/extensions/testForm/components/TestForm.module.scss](src/extensions/testForm/components/TestForm.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src/webparts/controlsTest/components/ControlsTest.module.scss](src/webparts/controlsTest/components/ControlsTest.module.scss)

### FN017001 Run npm dedupe | Optional

If, after upgrading npm packages, when building the project you have errors similar to: "error TS2345: Argument of type 'SPHttpClientConfiguration' is not assignable to parameter of type 'SPHttpClientConfiguration'", try running 'npm dedupe' to cleanup npm packages.

Execute the following command:

```sh
npm dedupe
```

File: [./package.json](./package.json)

## Summary

### Execute script

```sh
npm pkg delete overrides.@rushstack/heft
npm un -D @rushstack/eslint-config @typescript-eslint/parser @types/heft-jest
npm i -SE @microsoft/sp-core-library@1.23.0 @microsoft/sp-lodash-subset@1.23.0 @microsoft/sp-office-ui-fabric-core@1.23.0 @microsoft/sp-webpart-base@1.23.0 @microsoft/sp-dialog@1.23.0 @microsoft/sp-application-base@1.23.0 @microsoft/sp-listview-extensibility@1.23.0 @microsoft/sp-property-pane@1.23.0 @microsoft/sp-component-base@1.23.0 @microsoft/sp-extension-base@1.23.0 @microsoft/sp-http@1.23.0 @microsoft/sp-loader@1.23.0 @microsoft/sp-page-context@1.23.0 @microsoft/decorators@1.23.0 @microsoft/sp-adaptive-card-extension-base@1.23.0
npm i -DE @microsoft/sp-module-interfaces@1.23.0 @microsoft/eslint-plugin-spfx@1.23.0 @microsoft/eslint-config-spfx@1.23.0 @microsoft/spfx-web-build-rig@1.23.0 @microsoft/spfx-heft-plugins@1.23.0 @rushstack/heft@1.2.17 eslint-plugin-react-hooks@5.2.0 eslint@9.37.0 @types/jest@30.0.0
npm pkg set overrides.@rushstack/heft=1.2.17
npm i
npm dedupe
@'
const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  ...spfxProfile,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  }
];
'@ | Out-File -FilePath "eslint.config.js"
Remove-Item ".eslintrc.js"
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.23.0"
  }
}
```

#### [src/controls/accordion/Accordion.module.scss](src/controls/accordion/Accordion.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/animatedDialog/AnimatedDialog.module.scss](src/controls/animatedDialog/AnimatedDialog.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/carousel/Carousel.module.scss](src/controls/carousel/Carousel.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/chartControl/ChartControl.module.scss](src/controls/chartControl/ChartControl.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fieldCollectionData/FieldCollectionData.module.scss](src/controls/fieldCollectionData/FieldCollectionData.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldCommon/FieldRenderer.module.scss](src/controls/fields/fieldCommon/FieldRenderer.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/FilePicker.module.scss](src/controls/filePicker/FilePicker.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/controls/DocumentLibraryBrowser/DocumentLibraryBrowser.module.scss](src/controls/filePicker/controls/DocumentLibraryBrowser/DocumentLibraryBrowser.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fileTypeIcon/FileTypeIcon.module.scss](src/controls/fileTypeIcon/FileTypeIcon.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filterBar/FilterBar.module.scss](src/controls/filterBar/FilterBar.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/folderExplorer/FolderExplorer/FolderExplorer.module.scss](src/controls/folderExplorer/FolderExplorer/FolderExplorer.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/folderExplorer/NewFolder/NewFolder.module.scss](src/controls/folderExplorer/NewFolder/NewFolder.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/folderPicker/FolderPicker.module.scss](src/controls/folderPicker/FolderPicker.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/gridLayout/GridLayout.module.scss](src/controls/gridLayout/GridLayout.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/iconPicker/IconPicker.module.scss](src/controls/iconPicker/IconPicker.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/locationPicker/LocationPicker.module.scss](src/controls/locationPicker/LocationPicker.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/modernTaxonomyPicker/taxonomyPanelContents/TaxonomyPanelContents.module.scss](src/controls/modernTaxonomyPicker/taxonomyPanelContents/TaxonomyPanelContents.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/modernTaxonomyPicker/taxonomyTree/TaxonomyTree.module.scss](src/controls/modernTaxonomyPicker/taxonomyTree/TaxonomyTree.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/modernTaxonomyPicker/termItem/TermItemSuggestions.module.scss](src/controls/modernTaxonomyPicker/termItem/TermItemSuggestions.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/richText/RichText.module.scss](src/controls/richText/RichText.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/richText/RichTextPropertyPane.module.scss](src/controls/richText/RichTextPropertyPane.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/richText/RteColorPicker.module.scss](src/controls/richText/RteColorPicker.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/treeView/TreeView.module.scss](src/controls/treeView/TreeView.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/webparts/controlsTest/components/ControlsTest.module.scss](src/webparts/controlsTest/components/ControlsTest.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/dashboard/Dashboard.module.scss](src/controls/dashboard/Dashboard.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/dateTimePicker/DateTimePicker.module.scss](src/controls/dateTimePicker/DateTimePicker.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/dragDropFiles/DragDropFiles.module.scss](src/controls/dragDropFiles/DragDropFiles.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/errorMessage/ErrorMessage.module.scss](src/controls/errorMessage/ErrorMessage.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldAttachmentsRenderer/FieldAttachmentsRenderer.module.scss](src/controls/fields/fieldAttachmentsRenderer/FieldAttachmentsRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldBaseTextRenderer/FieldBaseTextRenderer.module.scss](src/controls/fields/fieldBaseTextRenderer/FieldBaseTextRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldFileTypeRenderer/FieldFileTypeRenderer.module.scss](src/controls/fields/fieldFileTypeRenderer/FieldFileTypeRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldLookupRenderer/FieldLookupRenderer.module.scss](src/controls/fields/fieldLookupRenderer/FieldLookupRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldNameRenderer/FieldNameRenderer.module.scss](src/controls/fields/fieldNameRenderer/FieldNameRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldTaxonomyRenderer/FieldTaxonomyRenderer.module.scss](src/controls/fields/fieldTaxonomyRenderer/FieldTaxonomyRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldTextRenderer/FieldTextRenderer.module.scss](src/controls/fields/fieldTextRenderer/FieldTextRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldUrlRenderer/FieldUrlRenderer.module.scss](src/controls/fields/fieldUrlRenderer/FieldUrlRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/fields/fieldUserRenderer/FieldUserRenderer.module.scss](src/controls/fields/fieldUserRenderer/FieldUserRenderer.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/LinkFilePickerTab/LinkFilePickerTab.module.scss](src/controls/filePicker/LinkFilePickerTab/LinkFilePickerTab.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/MultipleUploadFilePickerTab/MultipleUploadFilePickerTab.module.scss](src/controls/filePicker/MultipleUploadFilePickerTab/MultipleUploadFilePickerTab.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/OneDriveFilesTab/OneDriveFilesTab.module.scss](src/controls/filePicker/OneDriveFilesTab/OneDriveFilesTab.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/RecentFilesTab/RecentFilesTab.module.scss](src/controls/filePicker/RecentFilesTab/RecentFilesTab.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/SiteFilePickerTab/SiteFilePickerTab.module.scss](src/controls/filePicker/SiteFilePickerTab/SiteFilePickerTab.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/StockImagesTab/StockImages.module.scss](src/controls/filePicker/StockImagesTab/StockImages.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/UploadFilePickerTab/UploadFilePickerTab.module.scss](src/controls/filePicker/UploadFilePickerTab/UploadFilePickerTab.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/WebSearchTab/WebSearchTab.module.scss](src/controls/filePicker/WebSearchTab/WebSearchTab.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/controls/DocumentTile/DocumentTile.module.scss](src/controls/filePicker/controls/DocumentTile/DocumentTile.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/controls/FileBrowser/FileBrowser.module.scss](src/controls/filePicker/controls/FileBrowser/FileBrowser.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/controls/FolderTile/FolderTile.module.scss](src/controls/filePicker/controls/FolderTile/FolderTile.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/filePicker/controls/TilesList/TilesList.module.scss](src/controls/filePicker/controls/TilesList/TilesList.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/iFrameDialog/IFrameDialogContent.module.scss](src/controls/iFrameDialog/IFrameDialogContent.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/iFramePanel/IFramePanelContent.module.scss](src/controls/iFramePanel/IFramePanelContent.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/listItemAttachments/ListItemAttachments.module.scss](src/controls/listItemAttachments/ListItemAttachments.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/listItemPicker/ComboBoxListItemPicker.module.scss](src/controls/listItemPicker/ComboBoxListItemPicker.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/listPicker/ListPicker.module.scss](src/controls/listPicker/ListPicker.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/map/Maps.module.scss](src/controls/map/Maps.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/modernAudio/ModernAudio.module.scss](src/controls/modernAudio/ModernAudio.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/modernTaxonomyPicker/ModernTaxonomyPicker.module.scss](src/controls/modernTaxonomyPicker/ModernTaxonomyPicker.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/pagination/Pagination.module.scss](src/controls/pagination/Pagination.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/peoplepicker/PeoplePickerComponent.module.scss](src/controls/peoplepicker/PeoplePickerComponent.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/progress/Progress.module.scss](src/controls/progress/Progress.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/siteBreadcrumb/SiteBreadcrumb.module.scss](src/controls/siteBreadcrumb/SiteBreadcrumb.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/taxonomyPicker/TaxonomyPicker.module.scss](src/controls/taxonomyPicker/TaxonomyPicker.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/toolbar/Toolbar.module.scss](src/controls/toolbar/Toolbar.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/viewPicker/ViewPicker.module.scss](src/controls/viewPicker/ViewPicker.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/controls/webPartTitle/WebPartTitle.module.scss](src/controls/webPartTitle/WebPartTitle.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/extensions/ootbFields/components/Customizer/OotbFields.module.scss](src/extensions/ootbFields/components/Customizer/OotbFields.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/extensions/testApp/TestApp.module.scss](src/extensions/testApp/TestApp.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src/extensions/testForm/components/TestForm.module.scss](src/extensions/testForm/components/TestForm.module.scss)

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```
