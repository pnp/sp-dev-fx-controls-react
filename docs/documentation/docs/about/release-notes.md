# Releases

## 3.19.0

### Enhancements

- SharePoint Framework v1.19.0 support [#1857](https://github.com/pnp/sp-dev-fx-controls-react/pull/1857)
- `DynamicForm`: enable/disable save button [#1810](https://github.com/pnp/sp-dev-fx-controls-react/pull/1810)
- `PeoplePicker`: add new prop - `useSubstrateSearch` [#1819](https://github.com/pnp/sp-dev-fx-controls-react/pull/1819)
- `SitePicker`: add button to clear single / multiple selection [#1839](https://github.com/pnp/sp-dev-fx-controls-react/pull/1839)

### Fixes

- `DynamicForm`: more than 100 lookups and date format in lookup field [#1722](https://github.com/pnp/sp-dev-fx-controls-react/pull/1722)
- `Richtext`: can not undo ordered lists [#1135](https://github.com/pnp/sp-dev-fx-controls-react/issues/1135)
- `FilePicker`: fixing organization tab browsing issue [#1861](https://github.com/pnp/sp-dev-fx-controls-react/pull/1861)
- `PeoplePicker`: method to clear the array [#1838](https://github.com/pnp/sp-dev-fx-controls-react/pull/1838)
- `SitePicker`: documentation patch [#1842](https://github.com/pnp/sp-dev-fx-controls-react/pull/1842)

### Contributors

Special thanks to our contributors (in alphabetical order): [Alex Terentiev](https://github.com/AJIXuMuK), [Antanina Druzhkina](https://github.com/Ateina), [Guido Zambarda](https://github.com/GuidoZam), [Luccas Castro](https://github.com/DevPio), [Michaël Maillot](https://github.com/michaelmaillot), [Niels Söth](https://github.com/nsoeth), [srpmtt](https://github.com/srpmtt).

## 3.18.1

### Fixes

- `FilePicker`: Fix issue with adding link by typing in 'From a link' tab [#1814](https://github.com/pnp/sp-dev-fx-controls-react/pull/1814)
- Update nl-nl.ts [#1823](https://github.com/pnp/sp-dev-fx-controls-react/pull/1823)

### Contributors

Special thanks to our contributors (in alphabetical order): [Antanina Druzhkina](https://github.com/Ateina), [Elio Struyf](https://github.com/estruyf).

## 3.18.0

### Enhancements

- `DynamicField`: Added orderBy to DynamicField props for lookup fields [#1747](https://github.com/pnp/sp-dev-fx-controls-react/pull/1747)
- `DateTimePicker`: disable array of dates [#516](https://github.com/pnp/sp-dev-fx-controls-react/issues/516)
- `DynamicForm`: new `customIcons` property to allow custom icons for the form [#1745](https://github.com/pnp/sp-dev-fx-controls-react/pull/1745)
- `RichText`: Added style property to Rich text control [#1773](https://github.com/pnp/sp-dev-fx-controls-react/pull/1773)
- `fast-serve`: Fast-serve update to match the most recent changes. [#1782](https://github.com/pnp/sp-dev-fx-controls-react/pull/1782)
- `PeoplePicker`: Added context optimization [#1764](https://github.com/pnp/sp-dev-fx-controls-react/pull/1764)
- `Multiple controls`: Wrong fluentui imports cause webpack build errors [#1763](https://github.com/pnp/sp-dev-fx-controls-react/issues/1763)
- `FileTypeIcon`: Added standard events [#1789](https://github.com/pnp/sp-dev-fx-controls-react/pull/1789)

### Fixes

- `FolderPicker`: Update documentation on how to use the control with siteAbsoluteUrl property [#1743](https://github.com/pnp/sp-dev-fx-controls-react/pull/1743)
- Readme documents highlight extension does not work correctly [#1495](https://github.com/pnp/sp-dev-fx-controls-react/issues/1495)
- `DynamicForm`: Error on rendering DynamicForm when having a Date Field with internal name starting with underscore ('_')[#1738](https://github.com/pnp/sp-dev-fx-controls-react/issues/1738)
- `DynamicForm`: Dynamic form loading error in other site [#1758](https://github.com/pnp/sp-dev-fx-controls-react/issues/1758)

### Contributors

Special thanks to our contributors (in alphabetical order): [Guido Zambarda](https://github.com/GuidoZam), [Harminder Singh](https://github.com/HarminderSethi), [IRRDC](https://github.com/IRRDC), [Matthias Z'Brun](https://github.com/raclettierer), [Michaël Maillot](https://github.com/michaelmaillot), [Nishkalank Bezawada](https://github.com/NishkalankBezawada), [Sergei Sergeev](https://github.com/s-KaiNet), [srpmtt](https://github.com/srpmtt).

## 3.17.0

### Enhancements

- `DyanmicForm`: Added file handling [#1625](https://github.com/pnp/sp-dev-fx-controls-react/pull/1625)
- `DynamicForm`: Custom Formatting and Validation, ControlsTestWebPart updates [#1672](https://github.com/pnp/sp-dev-fx-controls-react/pull/1672)
- `PeoplePicker`: Added custom filter to PeoplePicker selection [#1657](https://github.com/pnp/sp-dev-fx-controls-react/issues/1657)
- `RichText`: Align RichText heading styles and font sizes with OOB SharePoint text web part [#1706](https://github.com/pnp/sp-dev-fx-controls-react/pull/1706)

### Fixes

- Build fails due to missing @iconify/react dependency after upgrade to 3.16.0 [#1719](https://github.com/pnp/sp-dev-fx-controls-react/issues/1719)
- `ModernTaxonomyPicker`: not displaying suggestions when typing in values - API not found error [#1688](https://github.com/pnp/sp-dev-fx-controls-react/issues/1688)
- `DynamicForm`: Disable issue on fieldOverrides field control when onBeforeSubmit return true [#1715](https://github.com/pnp/sp-dev-fx-controls-react/issues/1715)
- `PeoplePicker`: PeoplePicker returns no results with webAbsoluteUrl and ensureUser [#1669](https://github.com/pnp/sp-dev-fx-controls-react/issues/1669)
- `DynamicForm`: [DynamicForm] Fixing multi taxonomy field (loading + saving existing item) [#1739](https://github.com/pnp/sp-dev-fx-controls-react/pull/1739)

### Contributors

Special thanks to our contributors (in alphabetical order): [Guido Zambarda](https://github.com/GuidoZam), [Lars Fernhomberg](https://github.com/lafe), [Mark Bice](https://github.com/mbice), [Michaël Maillot](https://github.com/michaelmaillot), [Nishkalank Bezawada](https://github.com/NishkalankBezawada), [Tom G](https://github.com/t0mgerman), [wuxiaojun514](https://github.com/wuxiaojun514).

## 3.16.2

### Fixes

- `DynamicForm`: Fixing the previous version's issue [#1736](https://github.com/pnp/sp-dev-fx-controls-react/pull/1736) (introduced in [#1718](https://github.com/pnp/sp-dev-fx-controls-react/pull/1718))

### Contributors

Special thanks to our contributor: [IRRDC](https://github.com/IRRDC).

## 3.16.1

### Fixes

- `DynamicForm`: Additional check to see if DefaultValue is an object. No more null comparisons, which should have been undefined comparisons

### Contributors

Special thanks to our contributor: [IRRDC](https://github.com/IRRDC).

## 3.16.0

### New control(s)

- `ViewPicker`: new control ViewPicker [#1439](https://github.com/pnp/sp-dev-fx-controls-react/issues/1439)
- `HoverReactionsBar`: new control HoverReactionsBar [#1652](https://github.com/pnp/sp-dev-fx-controls-react/pull/1652)

### Enhancements

- `FieldCollectionData`: render on page instead of panel and added combobox and peoplepicker controls [#1588](https://github.com/pnp/sp-dev-fx-controls-react/pull/1588)
- `FieldCollectionData`: added date field control and updated number field [#1600](https://github.com/pnp/sp-dev-fx-controls-react/pull/1600)
- `ListItemComments`: Added ListItemComments component to Controls.tsx [#1621](https://github.com/pnp/sp-dev-fx-controls-react/pull/1621)
- `FolderPicker`: Improve documentation of FolderPicker [#1379](https://github.com/pnp/sp-dev-fx-controls-react/pull/1379)
- `RichText`: Add https:// as placeholder instead of textbox value when adding url [#1651](https://github.com/pnp/sp-dev-fx-controls-react/pull/1656)
- Fix package.json to remove phantom dependencies issues [#1660](https://github.com/pnp/sp-dev-fx-controls-react/issues/1660)
- `PeoplePicker`: new property to starting the search after n characters [#374](https://github.com/pnp/sp-dev-fx-controls-react/issues/374)
- SharePoint Framework v1.18.2 support

### Fixes

- `AccessibleAccordion`: fix typo in documentation [#1634](https://github.com/pnp/sp-dev-fx-controls-react/pull/1634)
- `DynamicForm`: fix issue with MultiChoice field [#1510](https://github.com/pnp/sp-dev-fx-controls-react/issues/1510)
- `Localization`: Update dutch translations [#1635](https://github.com/pnp/sp-dev-fx-controls-react/issues/1635)
- `TaxonomyPicker`: suggested item contains double termset name [#1597](https://github.com/pnp/sp-dev-fx-controls-react/issues/1597)
- `DynamicForm`: DynamicForm does not properly handle NULL default values for Taxonomy fields [#1267](https://github.com/pnp/sp-dev-fx-controls-react/issues/1267)
- `DynamicForm`: New items are always created with the default content type if the list has multiple content types [#1626](https://github.com/pnp/sp-dev-fx-controls-react/pull/1626)
- `PeoplePicker`:PeoplePicker won't accept Multiple Users with the same name [#1620] (https://github.com/pnp/sp-dev-fx-controls-react/pull/1620)
- `DynamicForm`: Dynamic Form accessed TaxonomyFieldTypeMulti without considering sub-array results [#1614](https://github.com/pnp/sp-dev-fx-controls-react/pull/1614)
- `DynamicForm`: Number validations are working, but the percentage values are not getting saved [#1601](https://github.com/pnp/sp-dev-fx-controls-react/pull/1601)
- `DynamicForm`: Number validation is preventing form save in certain circumstances, not enabled for currency fields [#1604](https://github.com/pnp/sp-dev-fx-controls-react/issues/1604)
- `ListItemAttachments`: Inconsistent file handling [#1644](https://github.com/pnp/sp-dev-fx-controls-react/issues/1644)
- `Localization`: Update Japanese translations [#1686](https://github.com/pnp/sp-dev-fx-controls-react/pull/1686)
- `ListItemPicker`: Fix docs for onSelectedItem [#1690](https://github.com/pnp/sp-dev-fx-controls-react/pull/1690)
- `ComboBoxListItemPicker`: Fix docs for onSelectedItem [#1690](https://github.com/pnp/sp-dev-fx-controls-react/pull/1690)
- `ListItemAttachments`: Fix click behavior in ListItemAttachments component [#1692](https://github.com/pnp/sp-dev-fx-controls-react/pull/1692)

### Contributors

Special thanks to our contributors (in alphabetical order): [Dan Toft](https://github.com/Tanddant), [Gerke van Garderen](https://github.com/gerkevgarderen), [Guido Zambarda](https://github.com/GuidoZam), [Joakim](https://github.com/daenur76), [Michaël Maillot](https://github.com/michaelmaillot), [Nils Andresen](https://github.com/nils-a), [Nishkalank Bezawada](https://github.com/NishkalankBezawada), [Rico van de Ven](https://github.com/RicoNL), [Steve Beaugé](https://github.com/stevebeauge), [wuxiaojun514](https://github.com/wuxiaojun514), [Tetsuya Kawahara](https://github.com/tecchan1107), [Tom G](https://github.com/t0mgerman), [Yannik Reiter](https://github.com/yannikreiter-maxworx).

## 3.15.0

### New control(s)

- `TermSetNavigation`: new control TermSetNavigation [#1527](https://github.com/pnp/sp-dev-fx-controls-react/pull/1527)

### Enhancements

- `FolderExplorer`: show files on folder explorer control [#1502](https://github.com/pnp/sp-dev-fx-controls-react/pull/1502)
- `DynamicForm`: Fixed typo in property name [#1529](https://github.com/pnp/sp-dev-fx-controls-react/pull/1529)
- `DynamicForm`: validation error dialog added [#1531](https://github.com/pnp/sp-dev-fx-controls-react/pull/1531/)
- `DateTimePicker`: Add new property initialPickerDate [#1581](https://github.com/pnp/sp-dev-fx-controls-react/pull/1581)
- `ModernTaxonomyPicker`: can't find term when UI is in language not supported by term store [#1573](https://github.com/pnp/sp-dev-fx-controls-react/issues/1573)
- `AdaptiveCardHost`: Add null check for adaptive card elements [#1574](https://github.com/pnp/sp-dev-fx-controls-react/pull/1574)
- `ControlsTestWebPart`: Updated the ControlsTestWebPart to show the controls filtered by control type [#1547](https://github.com/pnp/sp-dev-fx-controls-react/pull/1547)
- `fast-serve`: Fast-serve updated to the latest version and serve warnings fixed [#1589](https://github.com/pnp/sp-dev-fx-controls-react/pull/1589)
- `DynamicForm`: DynamicForm Number min max [#1585](https://github.com/pnp/sp-dev-fx-controls-react/pull/1585)

### Fixes

- `FieldPicker`: Changed react import to fix `cannot be used as a JSX component` error [#1500](https://github.com/pnp/sp-dev-fx-controls-react/pull/1500)
- `Localization`: Fixes to Italian localization [#1532](https://github.com/pnp/sp-dev-fx-controls-react/pull/1532)
- `Localization`: Fixes to Netherlands localization [#1537](https://github.com/pnp/sp-dev-fx-controls-react/pull/1537)
- `ListItemAttachments`:  Fix the OnClick handler when clicking on the document card [#1541](https://github.com/pnp/sp-dev-fx-controls-react/issues/1541)
- `fast-serve`: Fix issue with File and Directory Entries API [#1555](https://github.com/pnp/sp-dev-fx-controls-react/issues/1555)
- `FilePicker`: Tile view issue on first render [#1558](https://github.com/pnp/sp-dev-fx-controls-react/issues/1558)
- `DynamicForm` lookups - first time you select an option from a lookup, it doesnt select it [#1535](https://github.com/pnp/sp-dev-fx-controls-react/issues/1535)
- `DynamicForm`: Fields of type Note don't get disabled [#1264](https://github.com/pnp/sp-dev-fx-controls-react/issues/1264)
- `ListItemAttachments`:  Fix for files containing dots in the name [#1580](https://github.com/pnp/sp-dev-fx-controls-react/issues/1580)
- `PeoplePicker`: Shows wrong value in Dynamic Form when null is provided [#1421](https://github.com/pnp/sp-dev-fx-controls-react/issues/1421)
- `DynamicForm`: Error on save when clearing person from Person or Group field and leaving it blank [#1578](https://github.com/pnp/sp-dev-fx-controls-react/issues/1578)
- `DynamicForm`: Number validation is not working, if the field is set to minimum and maximum value [#1571](https://github.com/pnp/sp-dev-fx-controls-react/issues/1571)
- `DynamicForm`: controls are shown with error messages even if the values are assigned [#1133](https://github.com/pnp/sp-dev-fx-controls-react/issues/1586)

### Contributors

Special thanks to our contributors (in alphabetical order): [Andreas Omayrat](https://github.com/andreasomayrat), [Ayoub](https://github.com/ayoubqrt), [Desislav](https://github.com/DMichev), [Guido Zambarda](https://github.com/GuidoZam), [João Mendes](https://github.com/joaojmendes), [Nishkalank Bezawada](https://github.com/NishkalankBezawada), [Patrik Hellgren](https://github.com/patrikhellgren), [Rico van de Ven](https://github.com/RicoNL), [Sergei Sergeev](https://github.com/s-KaiNet), [Sharepointalist](https://github.com/sharepointalist), [Zhephyr](https://github.com/Zhephyr54).

## 3.14.0

### Enhancements

- `DateTimePicker`: Fixed DateTimePicker strings in Danish Locale [#1498](https://github.com/pnp/sp-dev-fx-controls-react/pull/1489)
- SharePoint Framework v1.17.1 support
- `FieldCollectionData`: Adds panelProps property to FieldCollectionData [#1525](https://github.com/pnp/sp-dev-fx-controls-react/pull/1525)

### Fixes

- `DynamicForm`: Fixes DynamicForm trying to load TaxonomyFields with wrong display name [#1422](https://github.com/pnp/sp-dev-fx-controls-react/issues/1422)
- `ListItemAttachments`: FIX: Cannot download items when it has a ilegal character [#1484](https://github.com/pnp/sp-dev-fx-controls-react/issues/1484)
- `FilePicker`: FIX:  recent tab empty until re-render [#1482](https://github.com/pnp/sp-dev-fx-controls-react/issues/1482)
- `Dynamic Form`: Adds onListItemLoaded handler to DynamicForm [#1472](https://github.com/pnp/sp-dev-fx-controls-react/issues/1472)
- `Dynamic Form`: Fix for the DynamicForm when a defaultValue is null and the code try to call the split method on it. [#1486](https://github.com/pnp/sp-dev-fx-controls-react/pull/1486)
- `DynamicForm`: DynamicForm - Fixing Required Multi Field Saving Problem [#1489](https://github.com/pnp/sp-dev-fx-controls-react/issues/1489)
- `FolderExplorer`: FolderExplorer doesn't explore folders with ' in the name [#1491](https://github.com/pnp/sp-dev-fx-controls-react/issues/1491)
- `DynamicForm`: cannot display lookup value when the source field is not Title [#1511](https://github.com/pnp/sp-dev-fx-controls-react/issues/1511)
- `FilePicker`:Features/1478 filepicker tiles view [#1521](https://github.com/pnp/sp-dev-fx-controls-react/issues/1521)

### Contributors

Special thanks to our contributors (in alphabetical order): [Chad Eiserloh](https://github.com/c-eiser13), [Dan Toft](https://github.com/Tanddant), [Guido Zambarda](https://github.com/GuidoZam), [Martin Lingstuyl](https://github.com/martinlingstuyl), [Nishkalank Bezawada](https://github.com/NishkalankBezawada), [Sergio Villalta](https://github.com/6gal6ler6), [Josef Benda](https://github.com/SmarterJB), [Victor Romanov](https://github.com/VRomanovTau), [wuxiaojun514](https://github.com/wuxiaojun514), [Zied FEHRI](https://github.com/ziedfehri).

## 3.13.0

### New control(s)

- `UploadFiles`: New Upload Files control [#1388](https://github.com/pnp/sp-dev-fx-controls-react/pull/1388)

### Enhancements

- `ListItemPicker`: use list name as well as GUID to point to list [#1355](https://github.com/pnp/sp-dev-fx-controls-react/issues/1355)
- `ListItemPicker`: Add Styles property to ListItemPicker and ComboBoxListItemPicker [#1407](https://github.com/pnp/sp-dev-fx-controls-react/pull/1407)
- `SitePicker`: Pass `styles` property to Dropdown [#1389](https://github.com/pnp/sp-dev-fx-controls-react/pull/1389)
- `FilePicker`: Site Tab - Many Document Libraries No Scrolling [#1413](https://github.com/pnp/sp-dev-fx-controls-react/pull/1413)
- `DynamicForm`: Add `respectETag` option to `DynamicForm` [#1395](https://github.com/pnp/sp-dev-fx-controls-react/issues/1395)
- `MonacoEditor`: Fixed minor typos and misleading instructions [#1415](https://github.com/pnp/sp-dev-fx-controls-react/pull/1415)
- SharePoint Framework v1.16.1 support [#1427](https://github.com/pnp/sp-dev-fx-controls-react/issues/1427)
- `RichText`: `label` property is missing [#1375](https://github.com/pnp/sp-dev-fx-controls-react/issues/1375)
- `PeoplePicker`: PeopleSearch service should also find people by userPrincipalName when group transitive membership check is used. [#1446](https://github.com/pnp/sp-dev-fx-controls-react/pull/1446)
- Update the SPFx source project to add an extension + form customizer [#1410](https://github.com/pnp/sp-dev-fx-controls-react/issues/1410)
- `AdaptiveCardDesignerHost`: Add Sample Data to Adaptive Card Editor [#1425](https://github.com/pnp/sp-dev-fx-controls-react/pull/1425)
- `AdaptiveCardHost`: Logic to prevent re-renders (flicker) [#1425](https://github.com/pnp/sp-dev-fx-controls-react/pull/1425)
- `ListItemComments`: Add new parameter for ListItemComments to highlight comment [#1430](https://github.com/pnp/sp-dev-fx-controls-react/pull/1430)
- `ComboBoxListItemPicker`: Update ComboBoxListItemPicker.md [#1470](https://github.com/pnp/sp-dev-fx-controls-react/pull/1470)

### Fixes

- `DateTimePicker`: broken link for `getErrorMessage` property fixed [#1277](https://github.com/pnp/sp-dev-fx-controls-react/pull/1381)
- `ProgressStepsIndicator`: Fix missing image reference in Progress Steps Indicator [#1409](https://github.com/pnp/sp-dev-fx-controls-react/issues/1409)
- `DynamicForm`: Dynamicform is hanging on the loading screen if the list has a single value list lookup field [#1393](https://github.com/pnp/sp-dev-fx-controls-react/issues/1393)
- `ListView`: Update ListView control docs to use a valid field for the icon [#1398](https://github.com/pnp/sp-dev-fx-controls-react/pull/1398)
- `Accordion`: Fixing Accordion control documentation image issue [#1408](https://github.com/pnp/sp-dev-fx-controls-react/issues/1408)
- `DynamicForm`: Cannot read properties of undefined (reading 'startsWith') when submitting the form with `contentType={undefined]` [#1431](https://github.com/pnp/sp-dev-fx-controls-react/issues/1431)
- `FilePicker`: Fix site breadcrumb navigation [#1368](https://github.com/pnp/sp-dev-fx-controls-react/issues/1368)
- `DynamicForm`: Initialize changedValue with defaultValue [#1454](https://github.com/pnp/sp-dev-fx-controls-react/pull/1454)
- `DynamicForm`: Fix image path [#1455](https://github.com/pnp/sp-dev-fx-controls-react/pull/1455)
- `DynamicForm`: Check empty array and trasform it in set as null [#1456](https://github.com/pnp/sp-dev-fx-controls-react/pull/1456)
- `FilePicker`: Fix site browser resize [#1457](https://github.com/pnp/sp-dev-fx-controls-react/pull/1457)
- `ModernTaxonomyPicker` Fix - Show ModernTaxonomyPicker label in correct form [#1459](https://github.com/pnp/sp-dev-fx-controls-react/pull/1459)
- `DynamicForm`: Update DynamicForm.tsx [#1462](https://github.com/pnp/sp-dev-fx-controls-react/pull/1462)
- `FilePicker`: Fix breadcrumb nav [#1458](https://github.com/pnp/sp-dev-fx-controls-react/pull/1458)
- `DateTimePicker`: Date picker locale [#1464](https://github.com/pnp/sp-dev-fx-controls-react/issues/1464)
- `DateTimePicker`: Date picker locale [#1095](https://github.com/pnp/sp-dev-fx-controls-react/issues/1095)
- `RichText`: Use theme colors - fix dark mode [#669](https://github.com/pnp/sp-dev-fx-controls-react/issues/669)
- `FilePicker`: Use theme colors - fix dark mode [#1132](https://github.com/pnp/sp-dev-fx-controls-react/issues/1132)

### Contributors

Special thanks to our contributors (in alphabetical order): [araver](https://github.com/araver), [Brian Krainer Jacobsen](https://github.com/krainer), [Edin Kapic](https://github.com/ekapic), [Eduard Paul](https://github.com/eduardpaul), [Fredrik Ekström](https://github.com/FredrikEkstroem), [Guido Zambarda](https://github.com/GuidoZam), [Harminder Singh](https://github.com/HarminderSethi), [Hugo Bernier](https://github.com/hugoabernier), [João Mendes](https://github.com/joaojmendes), [mgitta](https://github.com/mgitta), [Michaël Maillot](https://github.com/michaelmaillot), [mikezimm](https://github.com/mikezimm), [Nikolay Belykh](https://github.com/nbelyh), [Patrik Hellgren](https://github.com/patrikhellgren), [Rico van de Ven](https://github.com/RicoNL), [Samuele Furnari](https://github.com/SamueleFurnari), [sambilfinger](https://github.com/sambilfinger), [wuxiaojun514](https://github.com/wuxiaojun514).

## 3.12.0

### Enhancements

- `DynamicForm`: support cretion of document sets [#1335](https://github.com/pnp/sp-dev-fx-controls-react/pull/1335)
- `SitePicker`: add HubId to filter to only sites within a hub [#1346](https://github.com/pnp/sp-dev-fx-controls-react/issues/1346)
- SharePoint Framework v1.16.0 support

### Fixes

- `FilePicker`: panel causes SharePoint to Throttle due to infinite loop fetching files [#1325](https://github.com/pnp/sp-dev-fx-controls-react/issues/1325)
- `ContentTypePicker`: problem importing control [#1337](https://github.com/pnp/sp-dev-fx-controls-react/issues/1337)
- `FilePicker`: correctly request data from provided `webAbsoluteUrl` [#1340](https://github.com/pnp/sp-dev-fx-controls-react/pull/1340)
- `ModernTaxonomyPicker`: Fix infinite loop [#1342](https://github.com/pnp/sp-dev-fx-controls-react/pull/1342)
- `ModernTaxonomyPicker`: improve display of the term path to align with out of the box control UI [#1343](https://github.com/pnp/sp-dev-fx-controls-react/pull/1343)
- `FolderPicker`: get folders of other site url instead of the current context/site [#1305](https://github.com/pnp/sp-dev-fx-controls-react/issues/1305)
- `FilePicker`: browsing Site / Doclibs loops and floods SPO Service with requests and causes http 429 [#1350](https://github.com/pnp/sp-dev-fx-controls-react/issues/1350)
- Remove invalid comma in tsconfig.json [#1341](https://github.com/pnp/sp-dev-fx-controls-react/pull/1341)
- `TaxonomyPicker`: control allows select deprecated/untaggable terms when typing [#1093](https://github.com/pnp/sp-dev-fx-controls-react/issues/1093)
- `SitePicker`: prevent infinite loop when fetching sites [#1346](https://github.com/pnp/sp-dev-fx-controls-react/issues/1346)
- `DynamicForm`: `AnchorId` of `TaxonomyField` gets ignored and the whole tree is rendered [#1310](https://github.com/pnp/sp-dev-fx-controls-react/issues/1310)

### Contributors

Special thanks to our contributors (in alphabetical order): [Carlos Marins Jr](https://github.com/kadu-jr), [Edin Kapic](https://github.com/ekapic), [Josef Benda](https://github.com/SmarterJB), [Nello D'Andrea](https://github.com/ferrarirosso), [Nishkalank Bezawada](https://github.com/NishkalankBezawada), [Nizar Grindi](https://github.com/NizarGrindi), [Paolo Pialorsi](https://github.com/PaoloPia), [Patrik Hellgren](https://github.com/patrikhellgren), [Peter Paul Kirschner](https://github.com/petkir), [Victor Romanov](https://github.com/VRomanovTau).

## 3.11.0

### New control(s)

- `ProgressStepsIndicator`: New control that shows a progress of steps. [#1322](https://github.com/pnp/sp-dev-fx-controls-react/pull/1322)

### Enhancements

- `DynamicForm`: Add taxonomy tree to test harness [#1269](https://github.com/pnp/sp-dev-fx-controls-react/pull/1269)
- `ModernTaxonomyPicker`: ability to disallow selecting children [#1279](https://github.com/pnp/sp-dev-fx-controls-react/pull/1279)
- `PeoplePicker`: Use webAbsoluteUrl if provided through props to ensure user [#1273](https://github.com/pnp/sp-dev-fx-controls-react/issues/1273)
- `DynamicForm`: Support for hidden fields [#1307](https://github.com/pnp/sp-dev-fx-controls-react/pull/1307/)
- `Placeholder`: Documentation example to only display in edit mode [#1280](https://github.com/pnp/sp-dev-fx-controls-react/issues/1280)
- `DynamicForm`: Update documentation regarding onBeforeSubmit [#1319](https://github.com/pnp/sp-dev-fx-controls-react/issues/1319)
- `DynamicForm`: FirstDayOfWeek in DatePickers from webs regional settings [#1317](https://github.com/pnp/sp-dev-fx-controls-react/issues/1317)

### Fixes

- `PeoplePicker`: fixes where people picker returns no results [#1292](https://github.com/pnp/sp-dev-fx-controls-react/issues/1292)
- `FilePicker`: Tile view fix [#1272](https://github.com/pnp/sp-dev-fx-controls-react/issues/1272)
- Issues with v1.15.2 [#1288](https://github.com/pnp/sp-dev-fx-controls-react/issues/1288)
- `RichText`: Fix broken arrow icons [#1302](https://github.com/pnp/sp-dev-fx-controls-react/pull/1302)
- `TaxonomyPicker`: Does not show term set labels in Version 3.10.0 [#1299](https://github.com/pnp/sp-dev-fx-controls-react/issues/1299)
- `TaxonomyPicker`: Dynamic form select term not working [#1303](https://github.com/pnp/sp-dev-fx-controls-react/issues/1303)
- `DynamicForm`: Check if hiddenfields property is undefined [#1314](https://github.com/pnp/sp-dev-fx-controls-react/pull/1314)
- `DynamicForm`: PeoplePicker preselects wrong user if PrincipalType allows groups [#1315](https://github.com/pnp/sp-dev-fx-controls-react/issues/1315)

### Contributors

Special thanks to our contributors (in alphabetical order): [Chad Eiserloh](https://github.com/c-eiser13), [Hilton Giesenow](https://github.com/HiltonGiesenow), [Jake Stanger](https://github.com/JakeStanger), [Jasey Waegebaert](https://github.com/Jwaegebaert), [João Mendes](https://github.com/joaojmendes), [Josef Benda](https://github.com/SmarterJB), [Mark Bice](https://github.com/mbice), [Paolo Pialorsi](https://github.com/PaoloPia), [Victor Romanov](https://github.com/VRomanovTau).

## 3.10.0

### Enhancements

- `DynamicForm`: possibility to override field rendering for individual fields [#1257](https://github.com/pnp/sp-dev-fx-controls-react/issues/1257)
- `ModernTaxonomyPicker`: Display the full path of a term [#1172](https://github.com/pnp/sp-dev-fx-controls-react/issues/1172)
- SharePoint Framework v1.15.2 support [#1261](https://github.com/pnp/sp-dev-fx-controls-react/pull/1261)

### Fixes

- `DateTimePicker`: `onChange` not triggered when clearing date [#1277](https://github.com/pnp/sp-dev-fx-controls-react/issues/1277)

### Contributors

Special thanks to our contributors (in alphabetical order): [Bart-Jan Dekker](https://github.com/bjdekker), [Edin Kapic](https://github.com/ekapic), [Milan Holemans](https://github.com/milanholemans), [Steve Beaugé](https://github.com/stevebeauge).

## 3.9.0

### New control(s)

- `EnhancedThemeProvider`: Added 'EnhancedThemeProvider' control [#1202](https://github.com/pnp/sp-dev-fx-controls-react/issues/1202)
- `FieldPicker`: Added `FieldPicker` control [#1219](https://github.com/pnp/sp-dev-fx-controls-react/issues/1219)
- `ContentTypePicler`: Added `ContentTypePicker` control [#1220](https://github.com/pnp/sp-dev-fx-controls-react/issues/1220)
- `ModernAudio`: Added `ModernAudio` control [#1224](https://github.com/pnp/sp-dev-fx-controls-react/issues/1224)
- `AdaptiveCardDesignerHost`: Added `AdaptiveCardDesignerHost` control [#1237](https://github.com/pnp/sp-dev-fx-controls-react/issues/1237)

### Enhancements

- `DateTimePicker`: Added button to clear date [#1217](https://github.com/pnp/sp-dev-fx-controls-react/issues/1217)
- `Toolbar`: Allow filters on a Toolbar to be controlled externally [#1222](https://github.com/pnp/sp-dev-fx-controls-react/issues/1222)
- `PeoplePicker`: add new allowUnvalidated option to allow adding non-tenant users [#1232](https://github.com/pnp/sp-dev-fx-controls-react/pull/1232)
- `DynamicForm`: Add support for `webAbsoluteUrl` [#1244](https://github.com/pnp/sp-dev-fx-controls-react/pull/1244)

### Fixes

- `Localization`: Updates to English localizations [#1207](https://github.com/pnp/sp-dev-fx-controls-react/issues/1207)
- `Localization`: Updates to Dutch localizations [#1209](https://github.com/pnp/sp-dev-fx-controls-react/issues/1209)
- `Localization`: Updates to Danish localizations [#1233](https://github.com/pnp/sp-dev-fx-controls-react/pull/1233)
- `TaxonomyPicker`: Check if cultureInfo is valid [#1226](https://github.com/pnp/sp-dev-fx-controls-react/issues/1226)
- `FieldCollectionData`: Updated docs to fix duplicated property [#1236](https://github.com/pnp/sp-dev-fx-controls-react/pull/1236)
- `Changelog`: Fix changelog script by setting CHANGELOG.JSON filename extension to lower case [#1242](https://github.com/pnp/sp-dev-fx-controls-react/pull/1242)
- `PeoplePicker`: PeoplePicker validation on focus out [#1221](https://github.com/pnp/sp-dev-fx-controls-react/pull/1221)
- `DynamicForm`: Cannot display lookup value when the source field is not Title [#1215](https://github.com/pnp/sp-dev-fx-controls-react/issues/1215)
- `FilePicker`: the endPoint for webSearch do not work [#1256](https://github.com/pnp/sp-dev-fx-controls-react/issues/1256)

### Contributors

Special thanks to our contributors (in alphabetical order): [Annie-Johnson](https://github.com/Annie-Johnson), [Daniel Watford](https://github.com/danwatford), [Dennis Kuhn](https://github.com/DennisKuhn), [Fabio Franzini](https://github.com/fabiofranzini), [Jake Stanger](https://github.com/JakeStanger), [Joseph Halvey](https://github.com/HardluckHalvey), [Markus Möller](https://github.com/mmsharepoint), [Milan Holemans](https://github.com/milanholemans), [Morten Andersen](https://github.com/spcph), [Richard Gigan](https://github.com/PooLP), [Rico van de Ven](https://github.com/RicoNL), [ryanexner](https://github.com/ryanexner), [Sergio Villalta](https://github.com/6gal6ler6).

## 3.8.1

### Fixes

- `LivePersona`: Fix LivePersona not showing card on hover [#1241](https://github.com/pnp/sp-dev-fx-controls-react/issues/1241)

## 3.8.0

### Enhancements

- `PeoplePicker`: Allow the use of multiple groupId-s [#1163](https://github.com/pnp/sp-dev-fx-controls-react/issues/1163)
- `PeoplePicker`: search users in nested security groups [#1173](https://github.com/pnp/sp-dev-fx-controls-react/issues/1173)
- `ModenrTaxonomyPicker`: Add more complete example of TaxonomyTree usage [#1190](https://github.com/pnp/sp-dev-fx-controls-react/pull/1190)
- `AdaptiveCardHost`: Add SPFx Context property [#1145](https://github.com/pnp/sp-dev-fx-controls-react/issues/1145)
- `AdaptiveCardHost`: Remove the `isUniqueControlInPage` from the control by rebuilding the way to apply AC CSS class names [#1154](https://github.com/pnp/sp-dev-fx-controls-react/issues/1154)
- `ListView`: Different background color to even and odd rows in ListView [#1153](https://github.com/pnp/sp-dev-fx-controls-react/issues/1153)
- `AccessibleAccordion`: Support of section variations [#1195](https://github.com/pnp/sp-dev-fx-controls-react/issues/1195)
- `TreeView`: Support of section variations [#1196](https://github.com/pnp/sp-dev-fx-controls-react/issues/1196)

### Fixes

- `LocationPicker`: Resolve issue when in root site [#1162](https://github.com/pnp/sp-dev-fx-controls-react/pull/1162)
- `LocationPicker`: Trigger onChange on picker clear action [#1165](https://github.com/pnp/sp-dev-fx-controls-react/pull/1165)
- `TreeView`: TreeView Control is broken after updating to v3.7.0 [#1170](https://github.com/pnp/sp-dev-fx-controls-react/issues/1170)
- `TreeView`: collapses on selection of a child node [#1182](https://github.com/pnp/sp-dev-fx-controls-react/issues/1182)
- `TreeView`: expanded nodes state is getting lost after refresh [#1062](https://github.com/pnp/sp-dev-fx-controls-react/issues/1062)
- NPM Audit Critical Issues [#1187](https://github.com/pnp/sp-dev-fx-controls-react/issues/1187)
- Bump momentjs from 2.29.1 to 2.29.2 [#1185](https://github.com/pnp/sp-dev-fx-controls-react/pull/1185)
- `TaxonomyPicker`: Sorting the terms in locale language [#1160](https://github.com/pnp/sp-dev-fx-controls-react/pull/1160)
- `ComboboxListItemPicker`: options are not reloaded after the filter is changed [#1180](https://github.com/pnp/sp-dev-fx-controls-react/issues/1180)
- `FieldRendererHelper`: Add missing PnPjs import to SPHelper [#1140](https://github.com/pnp/sp-dev-fx-controls-react/issues/1140)
- `RichText`: Update font style and font size on property pane [#1151](https://github.com/pnp/sp-dev-fx-controls-react/issues/1151)
- `Placeholder`: Support section variations for themes [#1193](https://github.com/pnp/sp-dev-fx-controls-react/issues/1193)

## 3.7.2

## 3.7.0

### New control(s)

- `VariantThemeProvider`: new `VariantThemeProvider` control [#1120](https://github.com/pnp/sp-dev-fx-controls-react/issues/1120)
- `MonacoEditor`: new `MonacoEditor` control [#1134](https://github.com/pnp/sp-dev-fx-controls-react/pull/1134)

### Enhancements

- `Carousel`: Prev and Next Buttons are not labeled, and read as 'Unlabeled button' by screen readers [#1137](https://github.com/pnp/sp-dev-fx-controls-react/issues/1137)
- `TreeView`: Ability to set keys of items that should be expanded by default [#1084](https://github.com/pnp/sp-dev-fx-controls-react/pull/1084)
- SharePoint Framework v1.14.0 support

### Fixes

- `FilePicker`: `defaultFolderAbsolutePath` doesn't work with `webAbsoluteUrl` [#1129](https://github.com/pnp/sp-dev-fx-controls-react/issues/1129)
- `LocationPicker`: Location picker not resolving locations [#1149](https://github.com/pnp/sp-dev-fx-controls-react/issues/1149)
- `DynamicForm`: `RichText` Field losing focus on typing [#1024](https://github.com/pnp/sp-dev-fx-controls-react/issues/1024)
- `LivePersona`: Documentation fix for `template` type [#1147](https://github.com/pnp/sp-dev-fx-controls-react/pull/1147)

## 3.6.0

### New control(s)

- `AdaptiveCardHost`: React control that allows you to render an Adaptive Card as a component [#1096](https://github.com/pnp/sp-dev-fx-controls-react/issues/1096)

### Enhancements

- `ModernTaxonomyPicker`: ability to add action buttons to terms [#1058](https://github.com/pnp/sp-dev-fx-controls-react/pull/1058)
- `FilePicker`: allow to select files from other sites [#907](https://github.com/pnp/sp-dev-fx-controls-react/issues/907)
- `Localization`: Update Swedish translations [#1099](https://github.com/pnp/sp-dev-fx-controls-react/pull/1099)
- `FilePicker`: ability to allow external link and disable file existance chech [commit](https://github.com/pnp/sp-dev-fx-controls-react/commit/41ed4dd2277cf33050f9aeffe743dd684ed9d782)
- `FilePicker`: support for multi-select on additional sources [#1047](https://github.com/pnp/sp-dev-fx-controls-react/pull/1047)
- `DateTimePicker`: new property for allowTextInput [#1094](https://github.com/pnp/sp-dev-fx-controls-react/issues/1094)

### Fixes

- `LivePersona`: Cannot find module '@pnp/spfx-controls-react/lib/LivePersona'[#1069](https://github.com/pnp/sp-dev-fx-controls-react/issues/1069)
- `ListView`: documentation spelling mistake 'ColumndName' [#1063](https://github.com/pnp/sp-dev-fx-controls-react/issues/1063)
- Fixes for Norwegian localization [#1083](https://github.com/pnp/sp-dev-fx-controls-react/pull/1083)
- `DynamicForm`: doesn't load or save correctly when field name starts with a special character [#1077](https://github.com/pnp/sp-dev-fx-controls-react/issues/1077)
- `DynamicForm`: fields in DynamicForm do not honour regional settings [#1075](https://github.com/pnp/sp-dev-fx-controls-react/issues/1075)
- `DynamicForm`: Boolean fields do not honour the default value in list settings [#1073](https://github.com/pnp/sp-dev-fx-controls-react/issues/1073)
- `TaxonomyPicker`: table markdown fix in documentation [#1072](https://github.com/pnp/sp-dev-fx-controls-react/pull/1072)
- `WebPartTitle`: Fix for styling of WebPartTitle to better match the styling of the oob webpart titles. [#1088](https://github.com/pnp/sp-dev-fx-controls-react/pull/1088)
- `LivePersona`: fix for documentation typos [#1106](https://github.com/pnp/sp-dev-fx-controls-react/pull/1106)
- `LivePersona`: remove property for SPFx context [#1108](https://github.com/pnp/sp-dev-fx-controls-react/pull/1108)
- Documentation fix for swedish translations [#1100](https://github.com/pnp/sp-dev-fx-controls-react/pull/1100)

### Contributors

Special thanks to our contributors (in alphabetical order): [Alexander M](https://github.com/alexanmo), [Carlos Marins Jr](https://github.com/kadu-jr), [Fabio Franzini](https://github.com/fabiofranzini), [Henrik](https://github.com/Henke-visual), [Jasey Waegebaert](https://github.com/Jwaegebaert), [João Mendes](https://github.com/joaojmendes), [Milan Holemans](https://github.com/milanholemans), [MonalisaBaltatescu](https://github.com/MonalisaBaltatescu), [Patrik Hellgren](https://github.com/patrikhellgren), [Tom G](https://github.com/t0mgerman).

## 3.5.0

### Enhancements

- Update `mgt` package to the latest version [#1038](https://github.com/pnp/sp-dev-fx-controls-react/pull/1038)
- `ListView`: Add ability to provide CSS class names for list wrapper and list itself [#1007](https://github.com/pnp/sp-dev-fx-controls-react/issues/1007)
- `IconPicker`: `onCancel` property is added [#1043](https://github.com/pnp/sp-dev-fx-controls-react/issues/1043)
- SharePoint Framework v1.13.* support
- `DynamicForm`: `disabledFields` property added [#987](https://github.com/pnp/sp-dev-fx-controls-react/pull/987)
- `ListPicker`: Add multi numbers support for baseTemplate option [#1016](https://github.com/pnp/sp-dev-fx-controls-react/issues/1016)
- `ComboboxListItemPicker`: Add option to sort the items in the picker [#985](https://github.com/pnp/sp-dev-fx-controls-react/issues/985)
- `PeoplePicker`: Added filter for Microsoft 365 Group [#985](https://github.com/pnp/sp-dev-fx-controls-react/pull/1027)
- `Accordion`: Added custom icons [#1033](https://github.com/pnp/sp-dev-fx-controls-react/issues/1033)
- Localization: Correction for german localizations [#1059](https://github.com/pnp/sp-dev-fx-controls-react/issues/1059)
- Localization: Corrections for norwegian localizations [#1060](https://github.com/pnp/sp-dev-fx-controls-react/pull/1060)
- `PeoplePicker `: Added Styles property [#1061](https://github.com/pnp/sp-dev-fx-controls-react/pull/1061)
- Localization: Update pt-pt and pt-br loc files [#1066](https://github.com/pnp/sp-dev-fx-controls-react/pull/1066)

### Fixes

- `FilePicker`: `defaultFolderAbsolutePath` does not work Out of context [#1023](https://github.com/pnp/sp-dev-fx-controls-react/issues/1023)
- `ModernTaxonomyPicker`: correctly display with RTL mode [#1041](https://github.com/pnp/sp-dev-fx-controls-react/pull/1041)
- `FilePicker`: Fixed showing the selection circle on recent tabs [#1048](https://github.com/pnp/sp-dev-fx-controls-react/issues/1048)
- `FilePicker`: Your organisation tab breadcrumb not working [#1056](https://github.com/pnp/sp-dev-fx-controls-react/issues/1056)

### Contributors

Special thanks to our contributors (in alphabetical order): [Gautam Sheth](https://github.com/gautamdsheth), [Jouni Pohjolainen](https://github.com/jonepo), [jumpei-yamauchi](https://github.com/jumpei-yamauchi), [Louis Pineau](https://github.com/pineaulo), [Michalis Koutroupis](https://github.com/mkoutroupis), [MonalisaBaltatescu](https://github.com/MonalisaBaltatescu), [Patrik Hellgren](https://github.com/patrikhellgren), [Xiyitifu](https://github.com/Xiyitifu), [Russell gove](https://github.com/russgove), [Andreas Omayrat](https://github.com/andreasomayrat), [Abderahman Moujahid](https://github.com/Abderahman88), [Alexander M](https://github.com/alexanmo), [João Mendes](https://github.com/joaojmendes).

## 3.4.0

### New control(s)

- `ModernTaxonomyPicker`: New control ModernTaxonomyPicker [#1014](https://github.com/pnp/sp-dev-fx-controls-react/pull/1014)

### Enhancements

- Translations: Update translation keys [#994](https://github.com/pnp/sp-dev-fx-controls-react/pull/994)
- `LocationPicker`: Update docs [#1009](https://github.com/pnp/sp-dev-fx-controls-react/pull/1009)
- `FileTypeIcon`: Add support of 20px icons[#1013](https://github.com/pnp/sp-dev-fx-controls-react/issues/1013)
- `Pagination`: Update import from lodash [#1021](https://github.com/pnp/sp-dev-fx-controls-react/pull/1021)

### Fixes

- `ChartControl`: Charts not updating properly when properties are changed [#997](https://github.com/pnp/sp-dev-fx-controls-react/pull/997)
- `TaxonomyPicker`: suggestions language is always English [#879](https://github.com/pnp/sp-dev-fx-controls-react/issues/879)
- `TaxonomyPicker`: `errorMessage` label not being removed [#953](https://github.com/pnp/sp-dev-fx-controls-react/issues/953)
- `FilePicker`: Sorting Not Working as Expected in Site Tab [#1011](https://github.com/pnp/sp-dev-fx-controls-react/issues/1011)
- `FilePicker`: Site Tab - Lots of file types don't have appropriate icons [#1012](https://github.com/pnp/sp-dev-fx-controls-react/issues/1012)
- `LocationPicker`: Correct documentation [#1019](https://github.com/pnp/sp-dev-fx-controls-react/pull/1019)
- `FilePicker`: `fileNameWithoutExtension` not calculated right [#1022](https://github.com/pnp/sp-dev-fx-controls-react/issues/1022)
- `FieldUserRenderer`: Add missing PnPJS imports [#1025](https://github.com/pnp/sp-dev-fx-controls-react/issues/1025)

### Contributors

Special thanks to our contributors (in alphabetical order): [Dennis Kuhn](https://github.com/DennisKuhn), [Gautam Sheth](https://github.com/gautamdsheth), [Jean-Luc Richer](https://github.com/umaknow-jeanluc), [hesperanca](https://github.com/hesperanca), [Kiryl Shchasny](https://github.com/lirik30), [Patrik Hellgren](https://github.com/patrikhellgren), [Peter Paul Kirschner](https://github.com/petkir), [Ravichandran Krishnasamy](https://github.com/ravichandran-blog).

## 3.3.0

### New control(s)

- `LivePersona`: New Control LivePersona [#969](https://github.com/pnp/sp-dev-fx-controls-react/pull/969)
- `ListItemComments`: New Control ListItemComments [#979](https://github.com/pnp/sp-dev-fx-controls-react/pull/979)

### Enhancements

- `FilePicker`: spanish translation for Stock Images labels [#946](https://github.com/pnp/sp-dev-fx-controls-react/pull/946)
- `FilePicker`: Add support for a defaultFolderAbsolutePath prop [#947](https://github.com/pnp/sp-dev-fx-controls-react/pull/947)
- `DynamicForm`: Returning PnPJS `IItem` in `onSubmitted` event based on `returnListItemInstanceOnSubmit` property [#944](https://github.com/pnp/sp-dev-fx-controls-react/pull/944)
- `DateTimePicker`: Add property for minutes dropdown increment [#939](https://github.com/pnp/sp-dev-fx-controls-react/issues/939)
- `ListItemPicker`: add property to show all options by default [#955](https://github.com/pnp/sp-dev-fx-controls-react/issues/955)
- `ListItemPicker`: Missing translation keys, improved FI, NL translation [#957](https://github.com/pnp/sp-dev-fx-controls-react/pull/957)
- `TaxonomyPicker`: Added onNewTerm called when enter is pressed [#967](https://github.com/pnp/sp-dev-fx-controls-react/pull/967)
- `DynamicForm`: Principal Types support [#956](https://github.com/pnp/sp-dev-fx-controls-react/pull/956)
- `DateTimePicker`: Expose allowTextInput from the underlying date picker [#928](https://github.com/pnp/sp-dev-fx-controls-react/issues/928)
- `Dynamic Form`: Show field descriptions [#975](https://github.com/pnp/sp-dev-fx-controls-react/issues/975)

### Fixes

- `RichText`: Image button is checked when hyperlink is added to the text [#948](https://github.com/pnp/sp-dev-fx-controls-react/issues/948)
- `RichText`: impossible to display link with the text equal to the url [#949](https://github.com/pnp/sp-dev-fx-controls-react/issues/949)
- `ComboBoxListItemPicker`: defaultSelectedItems not working [#954](https://github.com/pnp/sp-dev-fx-controls-react/issues/954)
- `Dynamic Form`: query items in a folder (managed metadata field) [#973](https://github.com/pnp/sp-dev-fx-controls-react/issues/973)
- `PeoplePicker`: Default selected items for groups [#958](https://github.com/pnp/sp-dev-fx-controls-react/issues/958)
- Documentation: corrected Twitter handle for M365PnP [#984](https://github.com/pnp/sp-dev-fx-controls-react/pull/984)
- `Carousel`: Carousel is missing import of `ICarouselImageProps` [#986](https://github.com/pnp/sp-dev-fx-controls-react/issues/986)
- Documentation fix - `DynamicForm` example has incorrect syntax [#990](https://github.com/pnp/sp-dev-fx-controls-react/pull/990)

### Contributors

Special thanks to our contributors (in alphabetical order): [Alexey Morozov](https://github.com/a1exymoroz), [Daniel Stratton](https://github.com/gobigfoot), [Dennis Kuhn](https://github.com/DennisKuhn), [Gautam Sheth](https://github.com/gautamdsheth), [João Mendes](https://github.com/joaojmendes), [Ketill Antoníus Ágústsson](https://github.com/Katli95), [kmrshubham0](https://github.com/kmrshubham0), [Modern Dev Dude](https://github.com/modern-dev-dude), [Ravichandran Krishnasamy](https://github.com/ravichandran-blog), [Sergio Ortega Martín](https://github.com/sortegamartin), [Yannick Reekmans](https://github.com/YannickRe).

## 3.2.1

### Enhancements

- `ListItemAttachments`: Add new label and description properties [#943](https://github.com/pnp/sp-dev-fx-controls-react/pull/943)

### Fixes

- `ListPicker`: `ListPicker` stopped working in upgrade from 3.1.0 to 3.2.0 [#945](https://github.com/pnp/sp-dev-fx-controls-react/issues/945)
- `ListItemAttachments`: Fixed multiple bugs [#943](https://github.com/pnp/sp-dev-fx-controls-react/pull/943)

## 3.2.0

### New control(s)

- `DynamicForm`: New Control: Dynamic form [#878](https://github.com/pnp/sp-dev-fx-controls-react/issues/878)
- `LocationPicker`: New Control - Location Picker [#915](https://github.com/pnp/sp-dev-fx-controls-react/issues/915)

### Enhancements

- `fast-serve`: Add fast-serve support [#916](https://github.com/pnp/sp-dev-fx-controls-react/pull/916)
- `ComboBoxListItemPicker` and `ListItemPicker`: Add label to control [#914](https://github.com/pnp/sp-dev-fx-controls-react/pull/914)
- `PeoplePicker`: new property `groupId`. [#917](https://github.com/pnp/sp-dev-fx-controls-react/pull/917)
- `ListPicker`: add contenttype id to list picker [#894](https://github.com/pnp/sp-dev-fx-controls-react/issues/894)
- `ListPicker`: Few more tests with a little better description [#906](https://github.com/pnp/sp-dev-fx-controls-react/pull/906)
- Translations: Improved Finnish translations [#937](https://github.com/pnp/sp-dev-fx-controls-react/pull/937)

### Fixes

- Documentation for `RichText`: correct event handler name [#898](https://github.com/pnp/sp-dev-fx-controls-react/pull/898)
- `SitePicker`: `SitePicker` does not display initial sites until you click the dropdown to select [#895](https://github.com/pnp/sp-dev-fx-controls-react/issues/895)
- `DatePicker`: Fix Spanish loc strings [#923](https://github.com/pnp/sp-dev-fx-controls-react/issues/923)
- `FilePicker`: invalid CSS: relative in quotes. [#930](https://github.com/pnp/sp-dev-fx-controls-react/pull/930)
- `MyTeams`: Update MyTeams to use new library mgt-spfx [#918](https://github.com/pnp/sp-dev-fx-controls-react/issues/918)
- `FieldCollectionData`: FieldCollectionData is not setting sortIdx on resulting collection when using 'Add and Save' [#929](https://github.com/pnp/sp-dev-fx-controls-react/issues/929)

### Contributors

Special thanks to our contributors (in alphabetical order): [Nikolay Belykh](https://github.com/nbelyh), [Eduard Paul](https://github.com/eduardpaul), [Patrik Hellgren](https://github.com/patrikhellgren), [Peter Paul Kirschner](https://github.com/petkir), [Ravichandran Krishnasamy](https://github.com/ravichandran-blog), [Russell gove](https://github.com/russgove), [Sergei Sergeev](https://github.com/s-KaiNet), [João Mendes](https://github.com/joaojmendes), [Marcin Wojciechowski](https://github.com/mgwojciech), [Gautam Sheth](https://github.com/gautamdsheth).

## 3.1.0

### New control(s)

- `TeamPicker`: new Team Picker control [#846](https://github.com/pnp/sp-dev-fx-controls-react/pull/846)
- `TeamChannelPicker`: new Team Channel Picker control [#846](https://github.com/pnp/sp-dev-fx-controls-react/pull/846)
- `SitePicker`: new Site Picker control [#868](https://github.com/pnp/sp-dev-fx-controls-react/pull/868)
- `DocumentLibraryBrowser`, `SiteFilePickerTab`: jest unit tests [#866](https://github.com/pnp/sp-dev-fx-controls-react/pull/866) 
- `DragDropFiles`: new DragDropFiles control [#861](https://github.com/pnp/sp-dev-fx-controls-react/issues/861)
- `MyTeams`: new MyTeams control [#874](https://github.com/pnp/sp-dev-fx-controls-react/pull/874)
- `TeamChannelPicker`: new TeamChannelPicker control [#874](https://github.com/pnp/sp-dev-fx-controls-react/pull/874)
- `TeamPicker`: new TeamPicker control [#874](https://github.com/pnp/sp-dev-fx-controls-react/pull/874)

### Enhancements

- `ListView`: Use new DragDropFiles control [#861](https://github.com/pnp/sp-dev-fx-controls-react/issues/861)
- `FilePicker`: Use new DragDropFiles control [#861](https://github.com/pnp/sp-dev-fx-controls-react/issues/861)
- SharePoint Framework v1.12.1 support
- `ListView`: Ability to provide custom sorting function [#880](https://github.com/pnp/sp-dev-fx-controls-react/issues/880)
- `FilePicker`: Allow panel on FilePicker to be invoked after first load [#886](https://github.com/pnp/sp-dev-fx-controls-react/issues/886)
- `FilePicker`: Allow FilePicker button to be hidden [#887](https://github.com/pnp/sp-dev-fx-controls-react/issues/887)
- `FilePicker`: Change same function to return an array of objects

### Fixes

- Documentation for `ListView`: typos fixes [#855](https://github.com/pnp/sp-dev-fx-controls-react/pull/855)
- Documentation fix: type on index page [#852](https://github.com/pnp/sp-dev-fx-controls-react/pull/852)
- `PeoplePicker`: error message isn't cleared after `onGetErrorMessage` returns an empty string [#841](https://github.com/pnp/sp-dev-fx-controls-react/issues/841)
- `TreeView`: Not able to select/deselect checkbox in spfx-controls-react TreeView after assign the defaultSelectedKeys value [#870](https://github.com/pnp/sp-dev-fx-controls-react/issues/870)
- `FilePicker`: React crash on large folders [#826](https://github.com/pnp/sp-dev-fx-controls-react/issues/826)
- `ListItemAttachments`: updated filename replacement logic [#873](https://github.com/pnp/sp-dev-fx-controls-react/pull/873)
- `RichText`: Adding a link does not work [#875](https://github.com/pnp/sp-dev-fx-controls-react/issues/875)
- `FilePicker`: Stock images url is getting a 404 server error [#882](https://github.com/pnp/sp-dev-fx-controls-react/issues/882)

### Contributors

Special thanks to our contributors (in alphabetical order): [Ari Gunawan](https://github.com/AriGunawan), [aroraans1512](https://github.com/aroraans1512), [cwparsons](https://github.com/cwparsons), [joaojmendes](https://github.com/joaojmendes), [Kunj Balkrishna Sangani](https://github.com/kunj-sangani), [Marcin Wojciechowski](https://github.com/mgwojciech), [Yannick Reekmans](https://github.com/YannickRe), [André Lage](https://github.com/aaclage).

## 3.0.0

### Enhancements

- SharePoint Framework v1.12 support (breaking change)
- Fluent UI v7 support

## 2.9.0

### Enhancements

- `FilePicker`: spanish translation for Stock Images labels [#946](https://github.com/pnp/sp-dev-fx-controls-react/pull/946)
- `FilePicker`: Add support for a defaultFolderAbsolutePath prop [#947](https://github.com/pnp/sp-dev-fx-controls-react/pull/947)
- `DynamicForm`: Returning PnPJS `IItem` in `onSubmitted` event based on `returnListItemInstanceOnSubmit` property [#944](https://github.com/pnp/sp-dev-fx-controls-react/pull/944)
- `DateTimePicker`: Add property for minutes dropdown increment [#939](https://github.com/pnp/sp-dev-fx-controls-react/issues/939)
- `DynamicForm`: Principal Types support [#956](https://github.com/pnp/sp-dev-fx-controls-react/pull/956)
- `Dynamic Form`: Show field descriptions [#975](https://github.com/pnp/sp-dev-fx-controls-react/issues/975)

### Fixes

- `RichText`: Image button is checked when hyperlink is added to the text [#948](https://github.com/pnp/sp-dev-fx-controls-react/issues/948)
- `RichText`: impossible to display link with the text equal to the url [#949](https://github.com/pnp/sp-dev-fx-controls-react/issues/949)
- `ComboBoxListItemPicker`: defaultSelectedItems not working [#954](https://github.com/pnp/sp-dev-fx-controls-react/issues/954)
- `PeoplePicker`: Default selected items for groups [#958](https://github.com/pnp/sp-dev-fx-controls-react/issues/958)

### Contributors

Special thanks to our contributors (in alphabetical order): [Alexey Morozov](https://github.com/a1exymoroz), [Daniel Stratton](https://github.com/gobigfoot), [Ketill Antoníus Ágústsson](https://github.com/Katli95), [Ravichandran Krishnasamy](https://github.com/ravichandran-blog), [Sergio Ortega Martín](https://github.com/sortegamartin).

## 2.8.0

### New control(s)

- `DynamicForm`: New Control: Dynamic form [#878](https://github.com/pnp/sp-dev-fx-controls-react/issues/878)
- `LocationPicker`: New Control - Location Picker [#915](https://github.com/pnp/sp-dev-fx-controls-react/issues/915)

### Enhancements

- `ComboBoxListItemPicker` and `ListItemPicker`: Add label to control [#910](https://github.com/pnp/sp-dev-fx-controls-react/pull/910)
- `PeoplePicker`: new property `groupId`. [#917](https://github.com/pnp/sp-dev-fx-controls-react/pull/917)

### Fixes

- `SitePicker`: `SitePicker` does not display initial sites until you click the dropdown to select [#895](https://github.com/pnp/sp-dev-fx-controls-react/issues/895)
- `FilePicker`: invalid CSS: relative in quotes. [#930](https://github.com/pnp/sp-dev-fx-controls-react/pull/930)
- `FieldCollectionData`: FieldCollectionData is not setting sortIdx on resulting collection when using 'Add and Save' [#929](https://github.com/pnp/sp-dev-fx-controls-react/issues/929)

### Contributors

Special thanks to our contributors (in alphabetical order): [Nikolay Belykh](https://github.com/nbelyh), [Patrik Hellgren](https://github.com/patrikhellgren), [Peter Paul Kirschner](https://github.com/petkir), [Ravichandran Krishnasamy](https://github.com/ravichandran-blog).

## 2.7.0

### New control(s)

- `DragDropFiles`: new DragDropFiles control [#856](https://github.com/pnp/sp-dev-fx-controls-react/issues/856)
- `SitePicker` new Site Picker control [#867](https://github.com/pnp/sp-dev-fx-controls-react/pull/867)
- `Controls` Add locale strings for pt-br [#865](https://github.com/pnp/sp-dev-fx-controls-react/pull/865)

### Enhancements

- `ListView`: Use new DragDropFiles control [#856](https://github.com/pnp/sp-dev-fx-controls-react/issues/856)
- `FilePicker`: Use new DragDropFiles control [#856](https://github.com/pnp/sp-dev-fx-controls-react/issues/856)
- `ListView`: Ability to provide custom sorting function [#880](https://github.com/pnp/sp-dev-fx-controls-react/issues/880)
- `FilePicker`: Allow panel on FilePicker to be invoked after first load [#886](https://github.com/pnp/sp-dev-fx-controls-react/issues/886)
- `FilePicker`: Allow FilePicker button to be hidden [#887](https://github.com/pnp/sp-dev-fx-controls-react/issues/887)
- `FilePicker`: Changed save function to return an array of objects

### Fixes

- `PeoplePicker`: error message isn't cleared after `onGetErrorMessage` returns an empty string [#841](https://github.com/pnp/sp-dev-fx-controls-react/issues/841)
- `TreeView`: Not able to select/deselect checkbox in spfx-controls-react TreeView after assign the defaultSelectedKeys value [#870](https://github.com/pnp/sp-dev-fx-controls-react/issues/870)
- `FilePicker`: React crash on large folders [#826](https://github.com/pnp/sp-dev-fx-controls-react/issues/826)
- `ListItemAttachments`: updated filename replacement logic [#873](https://github.com/pnp/sp-dev-fx-controls-react/pull/873)
- `RichText`: Adding a link does not work [#875](https://github.com/pnp/sp-dev-fx-controls-react/issues/875)
- `FilePicker`: Stock images url is getting a 404 server error [#882](https://github.com/pnp/sp-dev-fx-controls-react/issues/882)

### Contributors

Special thanks to our contributors (in alphabetical order): [André Lage](https://github.com/aaclage), [cwparsons](https://github.com/cwparsons), [Kunj Balkrishna Sangani](https://github.com/kunj-sangani), [Yannick Reekmans](https://github.com/YannickRe).

## 2.6.0

### New control(s)

- `AnimatedDialog`: new Animated Dialog control [#815](https://github.com/pnp/sp-dev-fx-controls-react/issues/815)
- Jest unit tests [#834](https://github.com/pnp/sp-dev-fx-controls-react/pull/834)

### Enhancements

- `IconPicker`: search icons using `contains` comparison.
- `FilePicker`: default alphabet sorting [#824](https://github.com/pnp/sp-dev-fx-controls-react/pull/824)
- `ListItemPicker`: ability to provide `orderBy` [#829](https://github.com/pnp/sp-dev-fx-controls-react/issues/829)
- `Dashboard`: Dashboard widget wrapper for styling and error catching [#836](https://github.com/pnp/sp-dev-fx-controls-react/pull/836)
- `FolderExplorer`: Update folder explorer documentation [#835](https://github.com/pnp/sp-dev-fx-controls-react/pull/835)

### Fixes

- `IconPicker`: Fix case sensitive fluent icon search service [#814](https://github.com/pnp/sp-dev-fx-controls-react/pull/814)
- `Carousel`: documentation fix - broken table style [#817](https://github.com/pnp/sp-dev-fx-controls-react/pull/817)
- `AccessibleAccordion`: documentation link is broken [#818](https://github.com/pnp/sp-dev-fx-controls-react/issues/818)
- Documentation: Controls link in the menu is broken [#821](https://github.com/pnp/sp-dev-fx-controls-react/pull/821)
- `TreeView`: Fix two potential null reference issues [#832](https://github.com/pnp/sp-dev-fx-controls-react/pull/832)
- `RichText`: Problem with bullets and number list [#795](https://github.com/pnp/sp-dev-fx-controls-react/issues/795)
- `FolderPicker`: Correct FolderPicker link alignment

### Contributors

Special thanks to our contributors (in alphabetical order): [Anoop Tatti](https://github.com/anoopt), [Ari Gunawan](https://github.com/AriGunawan), [Gautam Sheth](https://github.com/gautamdsheth), [Kunj Balkrishna Sangani](https://github.com/kunj-sangani), [Marcin Wojciechowski](https://github.com/mgwojciech), [Mark Bice](https://github.com/mbice), [Nizar Grindi](https://github.com/NizarGrindi), [Yannick Reekmans](https://github.com/YannickRe).

## 2.5.0

### Enhancements

- `TreeView`: Adding support to clear TreeView selected items by passing an empty array. [#787](https://github.com/pnp/sp-dev-fx-controls-react/pull/787)
- `FilePicker`: new property `includePageLibraries` to optionally display Site Pages library on Site tab [#601](https://github.com/pnp/sp-dev-fx-controls-react/issues/601)
- `ListItemPicker`: Support of `Calculated` columns [#805](https://github.com/pnp/sp-dev-fx-controls-react/issues/805)
- `Progress`: Documentation update to have consistency in variables names [#811](https://github.com/pnp/sp-dev-fx-controls-react/pull/811)
- `FolderExplorer`: Add support for sorting folder explorer items [#812](https://github.com/pnp/sp-dev-fx-controls-react/pull/812)

### Fixes

- `ListView`: Selection is reset when putting a ListView inside a React Component that controls its items and selection props [#251](https://github.com/pnp/sp-dev-fx-controls-react/issues/251)
- Documentation fix for `PeoplePicker`: Removed unwanted new line in help content. [#783](https://github.com/pnp/sp-dev-fx-controls-react/pull/783)
- Documentation fix for `TreeView`: `TreeViewSelectionMode` added in the import [#780](https://github.com/pnp/sp-dev-fx-controls-react/pull/780)
- Documentation fix for `TreeView`: removed unwanted comma [#779](https://github.com/pnp/sp-dev-fx-controls-react/pull/779)
- `IFrameDialog`: height unable to resize relative to screen size, even if we provide in % it is taking default value. [#636](https://github.com/pnp/sp-dev-fx-controls-react/issues/636)
- `DateTimePicker`: Clear Date functionality [#799](https://github.com/pnp/sp-dev-fx-controls-react/issues/799)

### Contributors

Special thanks to our contributors (in alphabetical order): [Ari Gunawan](https://github.com/AriGunawan), [Joel Rodrigues](https://github.com/joelfmrodrigues), [Mike Myers](https://github.com/thespooler), [Ravichandran Krishnasamy](https://github.com/ravichandran-blog), [San](https://github.com/sankarkumar23).

## 2.4.0

### New control(s)

- `AccessibleAccordion` control [#770](https://github.com/pnp/sp-dev-fx-controls-react/pull/770)

### Enhancements

- `Placeholder`: support of custom rendering for `iconText` and `description`
- `PeoplePicker`: ability just to display inactive users name (ideally the value fetched from 'Author/Title') [#768](https://github.com/pnp/sp-dev-fx-controls-react/issues/768)
- `TaxonomyPicker`: New `onPanelSelectionChange` property added. Can be used to interact with the control while selecting items in the panel, before Click or Cancel is clicked. [#761](https://github.com/pnp/sp-dev-fx-controls-react/issues/761)
- `TaxonomyPicker`: `selectChildrenIfParentSelected` property added. Specifies if the children should be selected when parent item is selected (defaults to false). [#765](https://github.com/pnp/sp-dev-fx-controls-react/issues/765)
- `ListPicker`: ability to pick lists from specified site using `webAbsoluteUrl` property.
- `FilePicker`: `buttonIconProps` to define properties of the button's icon [#770](https://github.com/pnp/sp-dev-fx-controls-react/pull/770)

### Fixes

- `DateTimePicker`: documentation fix [#767](https://github.com/pnp/sp-dev-fx-controls-react/pull/767)
- `PeoplePicker`: documentation fix - Changed isRequired property to new required [#769](https://github.com/pnp/sp-dev-fx-controls-react/pull/769)
- Documentation fix - missing `IFramePanel` link on home page [#775](https://github.com/pnp/sp-dev-fx-controls-react/pull/775)
- Documentation fix for `FilePicker`: updated `onChaged` to `onChange` [#776](https://github.com/pnp/sp-dev-fx-controls-react/pull/776)

### Contributors

Special thanks to our contributors (in alphabetical order): [André Lage](https://github.com/aaclage), [Christian Metz](https://github.com/ChrisOMetz), [Gaurav Goyal](https://github.com/Gaurav8Bizportals), [Leif Frederiksen](https://github.com/Leif-Frederiksen), [Ravichandran Krishnasamy](https://github.com/ravichandran-blog), [San](https://github.com/sankarkumar23), [João Mendes](https://github.com/joaojmendes).

## 2.3.0

### New control(s)

- `Dashboard` control for Microsoft Teams [#758](https://github.com/pnp/sp-dev-fx-controls-react/pull/758)
- `Toobar` control for Microsoft Teams [#758](https://github.com/pnp/sp-dev-fx-controls-react/pull/758)

### Enhancements

- `TaxonomyPicker`: Added `useSessionStorage` property [#759](https://github.com/pnp/sp-dev-fx-controls-react/pull/759)

### Fixes

- `FilePicker`: documentation fix: '|' not escaped [#756](https://github.com/pnp/sp-dev-fx-controls-react/pull/756)
- `TaxonomyPicker`: Return `TermSetId` for suggestions [#762](https://github.com/pnp/sp-dev-fx-controls-react/pull/762)
- `WebPartTitle`: Fluent UI Updates to SharePoint - WebPartTitle control too thin now [#605](https://github.com/pnp/sp-dev-fx-controls-react/issues/605)
- `ListView`: Sticky Header scrolling issue [#734](https://github.com/pnp/sp-dev-fx-controls-react/issues/734)
- `DateTimePicker`: hours dropdown not re-rendered when state changed programmatically [#757](https://github.com/pnp/sp-dev-fx-controls-react/issues/757)
- `RichText`: controlled mode doesn't work [#666](https://github.com/pnp/sp-dev-fx-controls-react/issues/666)

### Contributors

Special thanks to our contributors (in alphabetical order): [Gautam Sheth](https://github.com/gautamdsheth), [Marcin Wojciechowski](https://github.com/mgwojciech), [Nikolay Belykh](https://github.com/nbelyh), [André Lage](https://github.com/aaclage).

## 2.2.0

### Enhancements

- `RichText`: Add image support [#705](https://github.com/pnp/sp-dev-fx-controls-react/pull/705)
- `FilePicker`: Add file size to the Upload tab and `IFilePickerResult` [#706](https://github.com/pnp/sp-dev-fx-controls-react/pull/706)
- `FieldCollectionData`: `SearchBox` instead of `TextBox` [#719](https://github.com/pnp/sp-dev-fx-controls-react/pull/719)
- `TaxonomyPicker`: control does not show an error message for an invalid/unresolved input [#728](https://github.com/pnp/sp-dev-fx-controls-react/issues/728)
- Canadian French localization [#671](https://github.com/pnp/sp-dev-fx-controls-react/issues/671)
- `FilePicker`: reduce bundle size [#732](https://github.com/pnp/sp-dev-fx-controls-react/issues/732)
- `FilePicker`: Custom render callbacks for the 'Upload' and 'Link' tabs [#746](https://github.com/pnp/sp-dev-fx-controls-react/issues/746)

### Fixes

- Localization: Fixing some wrong localizations for the DatePicker short day in Spanish.[#702](https://github.com/pnp/sp-dev-fx-controls-react/pull/702)
- `ListItemPicker`: When use defaultSelectedItems, ListItemPicker allows you to select dublicate entries [#722](https://github.com/pnp/sp-dev-fx-controls-react/issues/722)
- Deprecated stuff is removed [#733](https://github.com/pnp/sp-dev-fx-controls-react/pull/733)
- `DateTimePicker`: time portion not re-rendered when state changed programmatically - when time is displayed as dropdown only [#713](https://github.com/pnp/sp-dev-fx-controls-react/issues/713)
- `PeoplePicker`: `errorMessage` not being removed [#730](https://github.com/pnp/sp-dev-fx-controls-react/issues/730)
- `ListItemAttachment`: the control is not fully disabled [#736](https://github.com/pnp/sp-dev-fx-controls-react/issues/736)
- `TaxonomyPicker`: icons are not being rendered on Classic SharePoint pages [#735](https://github.com/pnp/sp-dev-fx-controls-react/issues/735)
- `FilePicker`: Site Tab does not load document if we access SharePoint site in different language than default language of the site [#724](https://github.com/pnp/sp-dev-fx-controls-react/issues/724)
- Documentation fix for 'attention' block on index page [#740](https://github.com/pnp/sp-dev-fx-controls-react/pull/740)
- `TaxonomyPicker`: `sessionStorage` exceeds max-size when browsing large termsets [#739](https://github.com/pnp/sp-dev-fx-controls-react/issues/739)
- `FolderExplorer` and `FolderPicker` do not seem to work for document libraries [#741](https://github.com/pnp/sp-dev-fx-controls-react/issues/741)
- `FilePicker`: `onChange` event does not exist despite being documented [#747](https://github.com/pnp/sp-dev-fx-controls-react/issues/747)
- `ListItemPicker`: Selected values are not getting cleared or reset [#659](https://github.com/pnp/sp-dev-fx-controls-react/issues/659)

### Contributors

Special thanks to our contributors (in alphabetical order): [Abderahman Moujahid](https://github.com/Abderahman88), [avadhootdindorkar](https://github.com/avadhootdindorkar), [Devang Bhavsar](https://github.com/devangbhavsar89), [Gautam Sheth](https://github.com/gautamdsheth), [Konrad K.](https://github.com/wilecoyotegenius), [Nikolay Belykh](https://github.com/nbelyh), [Vertamin](https://github.com/Vertamin).

## 2.1.0

### Enhancements

- `Carousel`: Ability to display indicators in a dedicated block [#681](https://github.com/pnp/sp-dev-fx-controls-react/pull/681)
- `FilePicker`: Org Assets are not displayed for non-admin users [#687](https://github.com/pnp/sp-dev-fx-controls-react/pull/687)
- `ListView`: Drag and Drop option [#679](https://github.com/pnp/sp-dev-fx-controls-react/issues/679)
- `FolderExplorerService`: support special characters if folder name [#691](https://github.com/pnp/sp-dev-fx-controls-react/pull/691)
- `ListView`: Sticky Header [#634](https://github.com/pnp/sp-dev-fx-controls-react/issues/634)
- `IconPicker`: get icons from `@uifabric/icons/lib/data/AllIconNames.json`
- `ListView`: Sticky header with `className` instead of additional components [#696](https://github.com/pnp/sp-dev-fx-controls-react/pull/696)
- `ListView`: `StickyHeader` code consistency [#697](https://github.com/pnp/sp-dev-fx-controls-react/pull/697)
- `TreeView`: Added (optional) property 'defaultExpandedChildren' that controls the behavior of the expansion of child elements.[#698](https://github.com/pnp/sp-dev-fx-controls-react/pull/698)

### Fixes

- `RichText`: Cannot add link in first line [#672](https://github.com/pnp/sp-dev-fx-controls-react/issues/672)
- `TaxonomyPicker`: Ability to reset the TaxonomyPicker (Remove all selected Terms) [#367](https://github.com/pnp/sp-dev-fx-controls-react/issues/367)
- Documentation fix for `TaxonomyPicker`: the `disabled` property is a `boolean` and not a `string` as currently specified [#695](https://github.com/pnp/sp-dev-fx-controls-react/pull/695)
- `ComboBoxListItemPicker`: update options when `listId` has been changed [#683](https://github.com/pnp/sp-dev-fx-controls-react/issues/683)
- `FilePicker`: styles are updated to match OOB control [#700](https://github.com/pnp/sp-dev-fx-controls-react/issues/700)

### Contributors

Special thanks to our contributors (in alphabetical order): [Abderahman88](https://github.com/Abderahman88), [André Lage](https://github.com/aaclage), [Gautam Sheth](https://github.com/gautamdsheth).

## 2.0.0

### Enhancements

- `FilePicker`: added additional properties - `isPanelOpen` and `onCancel` [#668](https://github.com/pnp/sp-dev-fx-controls-react/pull/668)

### Fixes

- `PeoplePicker`: Disabled doesn't work [#484](https://github.com/pnp/sp-dev-fx-controls-react/issues/484)
- `Pagination`: control not re-rendering when `currentPage` is updated in state [#663](https://github.com/pnp/sp-dev-fx-controls-react/issues/663)

### Contributors

Special thanks to our contributor: [Gautam Sheth](https://github.com/gautamdsheth).

## 1.20.0

### New control(s)

- `Accordion` control [#638](https://github.com/pnp/sp-dev-fx-controls-react/pull/638)
- `FieldCollectionData` control [#591](https://github.com/pnp/sp-dev-fx-controls-react/pull/591)

### Enhancements

- `FilePicker`: Stock images option added [#593](https://github.com/pnp/sp-dev-fx-controls-react/issues/593)
- `TaxonomyPicker`: Add the 'required' property [#216](https://github.com/pnp/sp-dev-fx-controls-react/issues/216)
- `TaxonomyPicker`: Add `errorMessage` and `onGetErrorMessage` props [#600](https://github.com/pnp/sp-dev-fx-controls-react/pull/600)
- `ListItemPicker`: ability to use substring search instead of startswith [#583](https://github.com/pnp/sp-dev-fx-controls-react/issues/583)
- `Map`: return display name and address details for the location [#585](https://github.com/pnp/sp-dev-fx-controls-react/issues/585)
- `Map`: support for draggable and static Bing maps [#586](https://github.com/pnp/sp-dev-fx-controls-react/issues/586)
- `TaxonomyPicker`: onLoad validation [#602](https://github.com/pnp/sp-dev-fx-controls-react/issues/602)
- `FieldCollectionData`: Add pagining and filtering [#617](https://github.com/pnp/sp-dev-fx-controls-react/pull/617)
- `TaxonomyPicker`: Finding terms with labels [#288](https://github.com/pnp/sp-dev-fx-controls-react/issues/288)
- `FileTypeIcon`: Added support for additional file type in `Image` mode [#640](https://github.com/pnp/sp-dev-fx-controls-react/pull/640)

### Fixes

- `ComboBoxListItemPicker`: fetching only 100 items [#569](https://github.com/pnp/sp-dev-fx-controls-react/issues/569)
- `TaxonomyPicker`: browse (tree view) doesn't work with SP 2016 On-Premises [#183](https://github.com/pnp/sp-dev-fx-controls-react/issues/183)
- `FilePicker`: default tab when opened shows hidden RecentTab [#477](https://github.com/pnp/sp-dev-fx-controls-react/issues/477)
- `PeoplePicker`: The required error message not showing [#590](https://github.com/pnp/sp-dev-fx-controls-react/issues/590)
- `ListItemAttachments`: fails in Microsoft Teams Tab SPFx applications [#582](fails in Microsoft Teams Tab SPFx applications)
- `Carousel`: Changing pages doesn't work [#609](https://github.com/pnp/sp-dev-fx-controls-react/issues/609)
- `TaxonomyPicker`: no suggestions are displayed if `anchorId` is not set
- `TaxonomyPicker`: Suggestion/match does not work as expected [#604](https://github.com/pnp/sp-dev-fx-controls-react/issues/604)
- `TaxonomyPicker`: Include check for separator while filtering path of terms when anchorId is configured [#625](https://github.com/pnp/sp-dev-fx-controls-react/issues/625)
- `FilePicker`: Bing API search issue [#633](https://github.com/pnp/sp-dev-fx-controls-react/pull/633)
- `ListView`: Sort fires selection [#621](https://github.com/pnp/sp-dev-fx-controls-react/issues/621)
- `Map`: A minor issue in componentWillUpdate method to get the next props rather than the current props.[#641](https://github.com/pnp/sp-dev-fx-controls-react/pull/641)
- `IFrameDialog`: dialog size is incorrect when opening the dialog second time [#615](https://github.com/pnp/sp-dev-fx-controls-react/issues/615)
- `FolderPicker`: imports don't work [#614](https://github.com/pnp/sp-dev-fx-controls-react/issues/614)
- `FilePicker`: Yor Organization tab is not shown [#596](https://github.com/pnp/sp-dev-fx-controls-react/issues/596)
- `FolderPicker`, `FolderExplorer`: Controls don't let you explore sub folders if parent folder has apostrophe (') in its name.[#644](https://github.com/pnp/sp-dev-fx-controls-react/issues/644)
- `PeoplePicker`: image for a user picked in PeoplePicker didn't get resolved [#646](https://github.com/pnp/sp-dev-fx-controls-react/pull/646)
- Documentation fix for `IconPicker`: `renderOption` `dialog` should be lowercased. [#649](https://github.com/pnp/sp-dev-fx-controls-react/pull/649)

### Contributors

Special thanks to our contributors (in alphabetical order): [Alexey Sadomov](https://github.com/sadomovalex), [Anoop Tatti](https://github.com/anoopt), [Devang Bhavsar](https://github.com/devangbhavsar89), [Gautam Sheth](https://github.com/gautamdsheth), [geltapatio](https://github.com/geltapatio), [Joel Jeffery](https://github.com/joeljeffery), [juhaalhojoki](https://github.com/juhaalhojoki), [Piotr Siatka](https://github.com/siata13), [Rabia Williams](https://github.com/rabwill), [Ravichandran Krishnasamy](https://github.com/ravichandran-blog), [Victor Pollet](https://github.com/TheThor59).

## 1.19.0

### Enhancements

- `ListView`: Add clear button to filter text box [#549](https://github.com/pnp/sp-dev-fx-controls-react/issues/549)
- `FolderExplorer`: Add clear button to filter text box [#553](https://github.com/pnp/sp-dev-fx-controls-react/pull/553)
- `TreeView`: there should be possibility to collapse the first level nodes by default [#561](https://github.com/pnp/sp-dev-fx-controls-react/issues/561)
- `TreeView`: Expand to selected [#559](https://github.com/pnp/sp-dev-fx-controls-react/issues/559)
- `DateTimePicker`: When using the datetimePicker I would like to have an opportunity to set maximum/minimum date like in Office UI Fabric [#497](https://github.com/pnp/sp-dev-fx-controls-react/issues/497)
- `TaxonomyPicker`: Added the `selectTerm`, `hideTerm`, and `disableTerm` actions [#578](https://github.com/pnp/sp-dev-fx-controls-react/issues/578)
- `TaxonomyPicker`: Added the functionality to enable/disable term actions on the fly [#578](https://github.com/pnp/sp-dev-fx-controls-react/issues/578)
- `Carousel`: indicators, slide animation, auto cycling, easier basic usage [#587](https://github.com/pnp/sp-dev-fx-controls-react/pull/587)

### Fixes

- `TaxonomyPicker`: Correct the AnchorID getting all TermSet search options [#150](https://github.com/pnp/sp-dev-fx-controls-react/issues/150)
- Documentation fix for `TreeView`: Some tables in TreeView documentation are displayed as plain text. [#562](https://github.com/pnp/sp-dev-fx-controls-react/pull/562)
- `ComboBoxListItemPicker`, `ListItemPicker`: Show error span if error is present [#557](https://github.com/pnp/sp-dev-fx-controls-react/pull/557)
- `TreeView`: `defaultExpanded: true` doesn't work [#560](https://github.com/pnp/sp-dev-fx-controls-react/issues/560)
- `IListPicker`: typo fix [#574](https://github.com/pnp/sp-dev-fx-controls-react/pull/574)
- `DateTimePicker`: DateTime Picker noon/midnight issue with 12 hour format [#576](https://github.com/pnp/sp-dev-fx-controls-react/issues/576)

### Contributors

Special thanks to our contributors (in alphabetical order): [Chad Eiserloh](https://github.com/c-eiser13), [Gautam Sheth](https://github.com/gautamdsheth), [Koen Zomers](https://github.com/KoenZomers), [Markus Langer](https://github.com/MarkusLanger), [Nanddeep Nachan](https://github.com/nanddeepn), [Prasad Kasireddy](https://github.com/PrasadKasireddy), [David Ramalho](https://github.com/DRamalho92), [Siddharth Vaghasia](https://github.com/siddharth-vaghasia).

## 1.18.0

### New control(s)

- Pagination Control [#535](https://github.com/pnp/sp-dev-fx-controls-react/pull/535)
- TreeView Control [#536](https://github.com/pnp/sp-dev-fx-controls-react/pull/536)
- FolderPicker Control [#525](https://github.com/pnp/sp-dev-fx-controls-react/pull/525)

### Enhancements

- `FolderExplorer` updates: allow selection of libraries if site url is used as the root, allow passing items to be passed as a property and added to the breadcrumb, add support for loading folders from a different site, fix breadcrumb names for document libraries [#534](https://github.com/pnp/sp-dev-fx-controls-react/pull/534)
- `IconPicker`: `renderOption` property to render icons list as a panel or dialog [#537](https://github.com/pnp/sp-dev-fx-controls-react/pull/537)

### Fixes

- `ComboBoxListItemPicker` documentation fix: Updated import statement in docs for ComboBoxListItemPicker [#510](https://github.com/pnp/sp-dev-fx-controls-react/pull/510)
- Documentation fix: add the new control `ComboBoxListItemPicker` component to landing page [#511](https://github.com/pnp/sp-dev-fx-controls-react/pull/511)
- `FilePicker`: While using the control, if `hideOrganisationalAssetTab` is set to true, even then an additional HTTP request is made.
- `IconPicker`: search fix and updated list of icons [#533](https://github.com/pnp/sp-dev-fx-controls-react/pull/533)
- `ListItemAttachment`: when I upload a file that contains an hyphen, the "-" char is replaced by an empty string [#526](https://github.com/pnp/sp-dev-fx-controls-react/issues/526)
- `IconPicker` shows selected icon only during the first opening [#513](https://github.com/pnp/sp-dev-fx-controls-react/issues/513)
- `ComboBoxListItemPicker`: `onSelectedItem` passing data to callback method but with attributes value as `undefined` [#519](https://github.com/pnp/sp-dev-fx-controls-react/issues/519)
- `FilePicker`: filename is not visible on Upload tab [#518](https://github.com/pnp/sp-dev-fx-controls-react/issues/518)
- `IconPicker`: Search doesn't work at all [#512](https://github.com/pnp/sp-dev-fx-controls-react/issues/512)
- `ComboBoxListItemPicker` documentation fix: correct `onSelectedItem` notation [#547](https://github.com/pnp/sp-dev-fx-controls-react/pull/547)
- Documentation: Fix mistranslation in Japanese [#545](https://github.com/pnp/sp-dev-fx-controls-react/pull/545)
- `FieldUserRenderer`: `displayName` in `FieldUserHoverCard` is not updated if `props` of the `FIeldUserRenderer` have been changed [#542](https://github.com/pnp/sp-dev-fx-controls-react/issues/542)

### Contributors

Special thanks to our contributors (in alphabetical order): [David Ramalho](https://github.com/DRamalho92), [Gautam Sheth](https://github.com/gautamdsheth), [Gregghis](https://github.com/Gregghis), [João Mendes](https://github.com/joaojmendes), [Joel Rodrigues](https://github.com/joelfmrodrigues), [Nanddeep Nachan](https://github.com/nanddeepn), [Prasad Kasireddy](https://github.com/PrasadKasireddy), [Siddharth Vaghasia](https://github.com/siddharth-vaghasia), [Takashi Shinohara](https://github.com/karamem0).

## 1.17.0

### New control(s)

- `ComboBoxListItemPicker` component [#292](https://github.com/pnp/sp-dev-fx-controls-react/pull/292)
- `Localization`: Project now supports localization of all SharePoint Online languages (auto translation via Cognitive Services) [#456](https://github.com/pnp/sp-dev-fx-controls-react/pull/456)
- `IconPicker`: component [#485](https://github.com/pnp/sp-dev-fx-controls-react/pull/485)
- `FolderExplorer` component [#499](https://github.com/pnp/sp-dev-fx-controls-react/pull/499)

### Enhancements

- `SecurityTrimmedControl`: Added the option to show a control when the user doesn't have permissions [307](https://github.com/pnp/sp-dev-fx-controls-react/issues/307)
- `PnP Telemetry` service opt-out support [#475](https://github.com/pnp/sp-dev-fx-controls-react/issues/475)
- `TaxonomyPicker`: Possibility to hide deprecated and "Available for Tagging"= false terms [#421](https://github.com/pnp/sp-dev-fx-controls-react/issues/421)
- `FilePicker` - French translation [#449](https://github.com/pnp/sp-dev-fx-controls-react/pull/449)
- Slovak localization [#457](https://github.com/pnp/sp-dev-fx-controls-react/pull/457)
- `TaxonomyPicker`: Placeholder for Taxonomy Picker [#464](https://github.com/pnp/sp-dev-fx-controls-react/issues/464)
- `ListItemPicker`, `PeoplePicker`: Placeholder for `ListItemPicker` and `PeoplePicker` [#486](https://github.com/pnp/sp-dev-fx-controls-react/issues/486)
- `FilePicker`: Do not store active tab in url's hash [#488](https://github.com/pnp/sp-dev-fx-controls-react/issues/488)
- `DateTimePicker`: Placeholder property option added [#503](https://github.com/pnp/sp-dev-fx-controls-react/pull/503)

### Fixes

- `RichText`: problem with edit mode [#445](https://github.com/pnp/sp-dev-fx-controls-react/issues/445)
- `ListView` documentation: Typo - the first occurrence of maxWidth should be minWidth [#400](https://github.com/pnp/sp-dev-fx-controls-react/issues/400)
- `RichText`: Text indent buttons were copy-paste of subscript and superscript buttons. Clicking on the text-indent buttons would call subscript or superscript instead. [#454](https://github.com/pnp/sp-dev-fx-controls-react/pull/454)
- `RichText`: Fix of removing text and inserting link instead [#455](https://github.com/pnp/sp-dev-fx-controls-react/pull/455)
- `FilePicker`: Read file content in IE11 [#444](https://github.com/pnp/sp-dev-fx-controls-react/issues/444)
- `ListPicker`: listPicker always return "test" when multiple allowed [#458](https://github.com/pnp/sp-dev-fx-controls-react/issues/458)
- `FilePicker`: Button text overflow fix + global classnames and properties
- `FieldUserRenderer`: implementation of `api/SP.UserProfiles.PeopleManager/GetPropertiesFor` is not working on on-prem [#468](https://github.com/pnp/sp-dev-fx-controls-react/issues/468)
- `Placeholder`: Placeholder component is not rendering after a string change in it's properties [#469](https://github.com/pnp/sp-dev-fx-controls-react/pull/469)
- `ListView` documentation update: `minWidth` instead of `maxWidth` [#480](https://github.com/pnp/sp-dev-fx-controls-react/pull/480)
- `DateTimePicker`: Minutes and Seconds validation [#495](https://github.com/pnp/sp-dev-fx-controls-react/issues/495)
- `FilePicker`: bingAPIKey not working [#489](https://github.com/pnp/sp-dev-fx-controls-react/issues/489)

### Contributors

Special thanks to our contributors (in alphabetical order): [Richard Gigan](https://github.com/PooLP), [Reginald Johnson](https://github.com/LastGunslinger), [JonasBjerke89](https://github.com/JonasBjerke89), [Prasad Kasireddy](https://github.com/PrasadKasireddy), [Alexander Kleshcheov](https://github.com/SharePickle), [Konradox](https://github.com/Konradox), [Léo Maradan](https://github.com/Leomaradan), [Matej](https://github.com/Matej4386), [mgwojciech](https://github.com/mgwojciech), [Joel Rodrigues](https://github.com/joelfmrodrigues), [Jason S](https://github.com/jason-appliedis), [Piotr Siatka](https://github.com/siata13), [Rabia Williams](https://github.com/rabwill).

## 1.16.0

### Enhancements

- `FilePicker`: Fixes for OneDrive CORS issues [#407](https://github.com/pnp/sp-dev-fx-controls-react/pull/407)
- `ListItemPicker`: added new control property `filter` [#392](https://github.com/pnp/sp-dev-fx-controls-react/pull/392)
- allowing to use context from any type of SPFx extensions: [#419](https://github.com/pnp/sp-dev-fx-controls-react/pull/419)
- `Placeholder`: remove unused and vendor specific CSS [#426](https://github.com/pnp/sp-dev-fx-controls-react/pull/426)

### Fixes

- Documentation fix for `FilePicker`: updated `accepts` value in props [#404](https://github.com/pnp/sp-dev-fx-controls-react/pull/404)
- The `FilePicker` control doesn't work in many languages due to missing localization keys [#412](https://github.com/pnp/sp-dev-fx-controls-react/issues/412)
- Documentation fix for broken links of Property Controls landing page [#388](https://github.com/pnp/sp-dev-fx-controls-react/pull/388)
- Documentation fix to include new components from v 1.15.0 [#394](https://github.com/pnp/sp-dev-fx-controls-react/pull/394)
- `DateTimePicker`: dropdown for time not handling AM/PM correctly [#405](https://github.com/pnp/sp-dev-fx-controls-react/pull/409)
- Documentation fix for `index` page: updated link to Chart controls [#417](https://github.com/pnp/sp-dev-fx-controls-react/issues/417)
- Documentation update for SPFx On Premises notice: [#418](https://github.com/pnp/sp-dev-fx-controls-react/pull/418)
- Documentation update for `ListItemPicker`: `valueColumnInternalName` should be `keyColumnInternalName`
- `RichText`: Fix "Align Left" button [#429](https://github.com/pnp/sp-dev-fx-controls-react/pull/429)
- Documentation update for `FilePicker`: misspelling [#432](https://github.com/pnp/sp-dev-fx-controls-react/pull/432)
- `IFramePanel`: Fix doubled scroll issue when iframe content is higher than frame height [#431](https://github.com/pnp/sp-dev-fx-controls-react/pull/431)
- `PeoplePicker`: `errorMessage` not showing [#420](https://github.com/pnp/sp-dev-fx-controls-react/issues/420)
- `IFrameDialog`: `commitPopUp` typo causes popups with classic forms to not close after hitting save [#433](https://github.com/pnp/sp-dev-fx-controls-react/issues/433)

### Contributors

Special thanks to our contributors (in alphabetical order): [Piotr Siatka](https://github.com/siata13), [Dani Domínguez](https://github.com/danidz96), [Siddharth Vaghasia](https://github.com/siddharth-vaghasia), [João Mendes](https://github.com/joaojmendes), [PrasadKasireddy](https://github.com/PrasadKasireddy), [Chad Eiserloh](https://github.com/c-eiser13), [Koen Zomers](https://github.com/KoenZomers), [Dmitry Rogozhny](https://github.com/dmitryrogozhny), [Alexander Kleshcheov](https://github.com/SharePickle), [Hugo Bernier](https://github.com/hugoabernier), [Beniamin](https://github.com/bbronisz), [Giovani Martini](https://github.com/giovanibm).

## 1.15.0

### New control(s)

- `FilePicker`: New control added to the library [#366](https://github.com/pnp/sp-dev-fx-controls-react/pull/366)
- `GridLayout`: New control added to the library [#350](https://github.com/pnp/sp-dev-fx-controls-react/issues/350)
- `Carousel`: New control added to the library [#227](https://github.com/pnp/sp-dev-fx-controls-react/issues/227)

### Enhancements

- `TaxonomyPicker`: Localization keys added to the buttons [#361](https://github.com/pnp/sp-dev-fx-controls-react/pull/361)
- Swedish localization support added [#359](https://github.com/pnp/sp-dev-fx-controls-react/pull/359)
- Improved German translations [#338](https://github.com/pnp/sp-dev-fx-controls-react/pull/338)
- `DateTimePicker`: added options to render time part as mask or dropdown [#330](https://github.com/pnp/sp-dev-fx-controls-react/issues/330)
- `ListItemPicker`: option to select a key column [#350](https://github.com/pnp/sp-dev-fx-controls-react/pull/355), [#381](https://github.com/pnp/sp-dev-fx-controls-react/pull/381)
- Improved Russian translations [#384](https://github.com/pnp/sp-dev-fx-controls-react/pull/384)
- `RichText`: Added the ability to add a third Color Swatch Group called custom. This will allow you to add custom colors to the font color selector. [#385](https://github.com/pnp/sp-dev-fx-controls-react/pull/385)

### Fixes

- `TaxonomyPicker`: Tags icon styling issue on IE11 [#356](https://github.com/pnp/sp-dev-fx-controls-react/issues/356)
- `DateTimePicker`: Does not respect dateLabel and timeLabel [#346](https://github.com/pnp/sp-dev-fx-controls-react/issues/346)
- `PeoplePicker`: Get loginName with ensureUser [#342](https://github.com/pnp/sp-dev-fx-controls-react/issues/342)
- `PeoplePicker`: Fix missing required field label [#371](https://github.com/pnp/sp-dev-fx-controls-react/issues/371)

### Contributors

Special thanks to our contributors (in alphabetical order): [amortsell](https://github.com/amortsell), [Hugo Bernier](https://github.com/hugoabernier), [Robert Lindström](https://github.com/robert-lindstrom), [pfc2k8](https://github.com/pfc2k8), [Piotr Siatka](https://github.com/siata13), [Alex Terentiev](https://github.com/AJIXuMuK), [Luis Robertto Mello](https://github.com/mellolr1), [eweintraub](https://github.com/eweintraub).

## 1.14.0

### Enhancements

- German translations added for attachment and RichText controls [#333](https://github.com/pnp/sp-dev-fx-controls-react/pull/333)
- `SecurityTrimmedControl`: Added a wrapper `className` property for the parent element [#325](https://github.com/pnp/sp-dev-fx-controls-react/issues/325)
- `ListPicker`: Add ability to filter the control via OData [#319](https://github.com/pnp/sp-dev-fx-controls-react/issues/319)
- `IFrameDialog`: closing dialog on commit [#313](https://github.com/pnp/sp-dev-fx-controls-react/pull/313)
- `WebPartTitle` add support for section background color [#258](https://github.com/pnp/sp-dev-fx-controls-react/issues/258)

### Fixes

- Fix in return type of onClick and onDoubleClick events [#321](https://github.com/pnp/sp-dev-fx-controls-react/pull/321)
- `ListPicker`: Fix for available dropdown selection after selection was done [#315](https://github.com/pnp/sp-dev-fx-controls-react/issues/315)
- Fixes to French translations [#312](https://github.com/pnp/sp-dev-fx-controls-react/pull/312)
- `RichText`: Issue on rendering the control in view mode [#287](https://github.com/pnp/sp-dev-fx-controls-react/issues/287)

### Contributors

Special thanks to our contributors (in alphabetical order): [Amr Fouad](https://github.com/ministainer), [Joel Jeffery](https://github.com/joeljeffery), [Mark Powney](https://github.com/mpowney), [Dominik Schmieder](https://github.com/DominikSchmieder), [Alex Terentiev](https://github.com/AJIXuMuK), [Zhephyr](https://github.com/Zhephyr54).

## 1.13.2

### Enhancements

- Improvements to the `Lithuanian` localization [#285](https://github.com/pnp/sp-dev-fx-controls-react/pull/285)

### Fixes

- `IFrameDialog`: dimensions issue [#303](https://github.com/pnp/sp-dev-fx-controls-react/pull/303)
- `DateTimePicker`: IE11 layout issue [#301](https://github.com/pnp/sp-dev-fx-controls-react/pull/301)
- `FileTypeIcon`: Only displays PDF's in SPFx `1.8.2` [#300](https://github.com/pnp/sp-dev-fx-controls-react/pull/300)
- `FieldNameRenderer`: Fails to encode URI when `hasPreview` [#296](https://github.com/pnp/sp-dev-fx-controls-react/issues/296)
- `TaxonomyPicker`: Cannot find name `TermLabelAction [#293](https://github.com/pnp/sp-dev-fx-controls-react/issues/293)
- `ListItemAttachments`: Move deleted attachments to the recycle bin [#291](https://github.com/pnp/sp-dev-fx-controls-react/issues/291)
- `DateTimePicker`: Does not respect `isMonthPickerVisible` prop [#283](https://github.com/pnp/sp-dev-fx-controls-react/issues/283)
- `ListItemAttachments`: Render issue fixed + improvements to the attachment API calls [#282](https://github.com/pnp/sp-dev-fx-controls-react/pull/282)
- `RichText`: Fixes an issue when hitting enter in the control [#277](https://github.com/pnp/sp-dev-fx-controls-react/pull/277)

### Contributors

Special thanks to our contributors (in alphabetical order): [Tautvydas Duda](https://github.com/ltdu), [Thomas Granheim](https://github.com/ThomasGranheim), [Robert Lindström](https://github.com/robert-lindstrom), [Alex Terentiev](https://github.com/AJIXuMuK).

## 1.13.1

### Fixes

- `WebPartTitle`: Fix for className property which is not defined [#281](https://github.com/pnp/sp-dev-fx-controls-react/pull/281)
- `RichText`: Fix issue where control turns drop-downs black [#279](https://github.com/pnp/sp-dev-fx-controls-react/pull/279)

### Contributors

Special thanks to our contributor: [Hugo Bernier](https://github.com/hugoabernier).

## 1.13.0

### New control(s)

- `Progress`: New control added [#230](https://github.com/pnp/sp-dev-fx-controls-react/pull/230)
- `DateTimePicker`: New control added [#21](https://github.com/pnp/sp-dev-fx-controls-react/issues/21)
- `RichText`: New control added [#20](https://github.com/pnp/sp-dev-fx-controls-react/issues/20)

### Enhancements

- `SecurityTrimmedControl`: Support for item and folder permission checks added [#271](https://github.com/pnp/sp-dev-fx-controls-react/pull/271)
- Retrieve the user its profile picture from SharePoint instead of Office 365 / Outlook [#248](https://github.com/pnp/sp-dev-fx-controls-react/pull/248)
- Added `Lithuanian` localization [#247](https://github.com/pnp/sp-dev-fx-controls-react/pull/247)
- `FileTypeIcon`: Added support for PDF icon file types [#260](https://github.com/pnp/sp-dev-fx-controls-react/issues/260)
- `WebPartTitle`: Added the ability to render a `see all` link or custom component [#228](https://github.com/pnp/sp-dev-fx-controls-react/issues/228)

### Fixes

- `PeoplePicker`: Fix for single quotes around the ms-peoplepicker class [#275](https://github.com/pnp/sp-dev-fx-controls-react/pull/275)
- `RichText`: Fix for toolbar that appears at top of the page [#265](https://github.com/pnp/sp-dev-fx-controls-react/pull/265)
- `ListItemAttachments`: Updated import statement reference in the documentation [#254](https://github.com/pnp/sp-dev-fx-controls-react/pull/254)
- `ListView`: Updated documentation for the `iconFieldName` property [#245](https://github.com/pnp/sp-dev-fx-controls-react/pull/245)

### Contributors

Special thanks to our contributors (in alphabetical order): [Francis](https://github.com/PzKfWg), [Fredrik Andreasson](https://github.com/Varuuna), [Hugo Bernier](https://github.com/hugoabernier), [Tautvydas Duda](https://github.com/ltdu), [Özgür Ersoy](https://github.com/moersoy), [Robert Lindström](https://github.com/robert-lindstrom), [Alex Terentiev](https://github.com/AJIXuMuK).

## 1.12.0

### New control(s)

- `ListItemAttachments`: New control added [#177](https://github.com/pnp/sp-dev-fx-controls-react/pull/177)
- `IFramePanel`: New control added [#226](https://github.com/pnp/sp-dev-fx-controls-react/pull/226)

### Enhancements

- Added `Russian` localization [#214](https://github.com/pnp/sp-dev-fx-controls-react/pull/214)
- `TaxonomyPicker`: Ability to specify term actions [#237](https://github.com/pnp/sp-dev-fx-controls-react/pull/237)

### Fixes

- `TaxonomyPicker`: Terms are sorted incorrectly under the wrong parent [#199](https://github.com/pnp/sp-dev-fx-controls-react/issues/199) [#229](https://github.com/pnp/sp-dev-fx-controls-react/issues/229)
- `TaxonomyPicker`: Issue with custom sort order of items underneath root terms [#231](https://github.com/pnp/sp-dev-fx-controls-react/issues/231)
- `PeoplePicker`: Fix for issue where values couldn't be cleared [#234](https://github.com/pnp/sp-dev-fx-controls-react/issues/234)

### Contributors

Special thanks to our contributors (in alphabetical order): [Patrik Hellgren](https://github.com/patrikhellgren), [João Mendes](https://github.com/joaojmendes), [David Opdendries](https://github.com/spdavid), [Piotr Siatka](https://github.com/siata13), [Alex Terentiev](https://github.com/AJIXuMuK), [Tse Kit Yam](https://github.com/tsekityam).

## 1.11.0

### New control(s)

- `Map`: Newly introduced map control is available [#14](https://github.com/pnp/sp-dev-fx-controls-react/issues/14)
- `ChartControl`: Newly introduced control to render charts [#15](https://github.com/pnp/sp-dev-fx-controls-react/issues/15)

### Enhancements

- `PeoplePicker`: Allow the people picker to search on site level and on tenant level [#97](https://github.com/pnp/sp-dev-fx-controls-react/issues/97)
- `ListView`: Added support for filtering [#99](https://github.com/pnp/sp-dev-fx-controls-react/issues/99)
- `PeoplePicker`: Make the titleText property not required [#184](https://github.com/pnp/sp-dev-fx-controls-react/issues/184)
- `Placeholder`: Added the ability to specify if the button can be hidden [#206](https://github.com/pnp/sp-dev-fx-controls-react/issues/206)
- Updated the `office-ui-fabric-react` to the same version as in SPFx 1.7.0

### Fixes

- `IFrameDialog`: fix for spinner which keeps appearing on the iframe [#154](https://github.com/pnp/sp-dev-fx-controls-react/issues/154)
- `PeoplePicker`: fix SharePoint groups which could not be retrieved [#161](https://github.com/pnp/sp-dev-fx-controls-react/issues/161)
- `TaxonomyPicker`: fix sort order with lowercased terms [#205](https://github.com/pnp/sp-dev-fx-controls-react/issues/205)

### Contributors

Special thanks to our contributors (in alphabetical order): [Hugo Bernier](https://github.com/hugoabernier), [joaojmendes](https://github.com/joaojmendes), [Asish Padhy](https://github.com/AsishP), [Piotr Siatka](https://github.com/siata13), [Anoop Tatti](https://github.com/anoopt), [Alex Terentiev](https://github.com/AJIXuMuK), [Tse Kit Yam](https://github.com/tsekityam).

## 1.10.0

### New control(s)

- `ListItemPicker`: New field control [#165](https://github.com/pnp/sp-dev-fx-controls-react/pull/165)

### Enhancements

- Dutch localization added [#100](https://github.com/pnp/sp-dev-fx-controls-react/issues/100)
- German localization added [#101](https://github.com/pnp/sp-dev-fx-controls-react/issues/101)
- French localization added [#102](https://github.com/pnp/sp-dev-fx-controls-react/issues/102)
- `PeoplePicker`: Move defaultSelectedUsers from ComponentWillMount to ComponentDidUpdate Lifecycle [#135](https://github.com/pnp/sp-dev-fx-controls-react/issues/135)
- `PeoplePicker`: Initialize with users from a list item [#138](https://github.com/pnp/sp-dev-fx-controls-react/issues/138)
- `PeoplePicker`: Remove Messagebar error handling to match Office UI Fabric field error styling [#140](https://github.com/pnp/sp-dev-fx-controls-react/issues/140)
- `PeoplePicker`: REST API filter and nometadata header added to reduce payload [#139](https://github.com/pnp/sp-dev-fx-controls-react/issues/139)
- `PeoplePicker`: Allow to set the maximum number of suggestions `suggestionsLimit` [#143](https://github.com/pnp/sp-dev-fx-controls-react/issues/143) [#148](https://github.com/pnp/sp-dev-fx-controls-react/issues/148)
- `TaxonomyPicker`: retreiving the terms in the correct custom sort order [#146](https://github.com/pnp/sp-dev-fx-controls-react/issues/146)
- `PeoplePicker`: Documentation format updated to make it easier to check the default values [#159](https://github.com/pnp/sp-dev-fx-controls-react/pull/159)

### Contributors

Special thanks to our contributors (in alphabetical order): [Marc D Anderson](https://github.com/sympmarc), [Ole Bergtun](https://github.com/trillian74), [João Mendes](https://github.com/joaojmendes), [Markus Möller](https://github.com/mmsharepoint), [Asish Padhy](https://github.com/AsishP), [PooLP](https://github.com/PooLP), [Gautam Sheth](https://github.com/gautamdsheth), [Tse Kit Yam](https://github.com/tsekityam).

## 1.9.0

### Enhancements

- Optimize bundle size for latest SPFx version due to Office UI Fabric specific versioning [#136](https://github.com/pnp/sp-dev-fx-controls-react/issues/136)

### Fixes

- `FieldLookupRenderer`: Lookup dialog is empty [#131](https://github.com/pnp/sp-dev-fx-controls-react/issues/131)
- `IFrameDialog`: Unnecessary horizontal scroll in IFrame dialog [#132](https://github.com/pnp/sp-dev-fx-controls-react/issues/132)
- `PeoplePicker`: Suggested People not loading after first selection [#134](https://github.com/pnp/sp-dev-fx-controls-react/issues/134)

### Contributors

Special thanks to our contributors (in alphabetical order): [Gautam Sheth](https://github.com/gautamdsheth), [Alex Terentiev](https://github.com/AJIXuMuK).

## 1.8.0

### Enhancements

- `PeoplePicker`: Specify to hide or show the users/groups which are hidden in the UI [#122](https://github.com/pnp/sp-dev-fx-controls-react/issues/122)
- `WebPartTitle`: changing font-sizes on different resolutions [#114](https://github.com/pnp/sp-dev-fx-controls-react/issues/114)
- `WebPartTitle`: Added accessibility tags for web part title [#121](https://github.com/pnp/sp-dev-fx-controls-react/pull/121)
- `ListView`: Resizable columns - introduced a `isResizable` property [#119](https://github.com/pnp/sp-dev-fx-controls-react/issues/119)
- `FieldNameRenderer` double click support added [#116](https://github.com/pnp/sp-dev-fx-controls-react/issues/116)
- `TaxonomyPicker`: table markup changed to DIV [#113](https://github.com/pnp/sp-dev-fx-controls-react/issues/113)
- `PeoplePicker`: ability to specify the source site to load users from [#110](https://github.com/pnp/sp-dev-fx-controls-react/issues/110)
- `TaxonomyPicker`: Disable the terms which are set as deprecated or unavailable for tagging [#109](https://github.com/pnp/sp-dev-fx-controls-react/issues/109)
- `PeoplePicker`: Specify principle type to retrieve (users, groups, ...) [#94](https://github.com/pnp/sp-dev-fx-controls-react/issues/94)

### Fixes

- `FieldLookupRenderer`: Fixed URL querystring params [#126](https://github.com/pnp/sp-dev-fx-controls-react/pull/126)
- `IFrameDialog`: dialog width is not correct in IE11 [#118](https://github.com/pnp/sp-dev-fx-controls-react/issues/118)
- `PeoplePicker`: fix freezes when typing in search values [#117](https://github.com/pnp/sp-dev-fx-controls-react/issues/117)

### Contributors

Special thanks to our contributors (in alphabetical order): [Thomas Lamb](https://github.com/ThomasLamb), [Joel Rodrigues](https://github.com/joelfmrodrigues), [Mikael Svenson](https://github.com/wobba), [Alex Terentiev](https://github.com/AJIXuMuK).

## 1.7.0

### Enhancements

- `PeoplePicker`: added functionality to initialize the control with person(s) or group(s) [#98](https://github.com/pnp/sp-dev-fx-controls-react/issues/98)
- `PeoplePicker`: support for searching on contains [#93](https://github.com/pnp/sp-dev-fx-controls-react/issues/93)
- `PeoplePicker`: find user based on email address [#95](https://github.com/pnp/sp-dev-fx-controls-react/issues/95)
- Bundle size: statically reference Office UI Fabric components in the FieldRenderer controls [#107](https://github.com/pnp/sp-dev-fx-controls-react/issues/107)

### Fixes

- `FieldNameRenderer` onClick does not suppress default link behavior [#103](https://github.com/pnp/sp-dev-fx-controls-react/issues/103)

### Contributors

Special thanks to our contributors (in alphabetical order): Octavie van Haaften, Asish Padhy, Mikael Svenson, Alex Terentiev.

## 1.6.0

### Enhancements

- Disabled property for PeoplePicker [#88](https://github.com/pnp/sp-dev-fx-controls-react/issues/88)

### Fixes

- New telemetry approach which allows you to use Application Insights [#81](https://github.com/pnp/sp-dev-fx-controls-react/issues/81)
- PeoplePicker property selectedItems not implemented? [#90](https://github.com/pnp/sp-dev-fx-controls-react/issues/90)

### Contributors

Special thanks to our contributor: Octavie van Haaften.

## 1.5.0

### New control(s)

- New `PeoplePicker` control added [#19](https://github.com/pnp/sp-dev-fx-controls-react/issues/19)

### Enhancements

- Added properties to the `TaxonomyPicker` to specify which terms are disabled/not-selectable [#82](https://github.com/pnp/sp-dev-fx-controls-react/issues/82)

### Fixes

- Bug in `TaxonomyPicker` where values are not updated by an async change [#83](https://github.com/pnp/sp-dev-fx-controls-react/issues/83)
- `FieldUserRenderer` uses email prop for `GetPropertiesFor` [#84](https://github.com/pnp/sp-dev-fx-controls-react/issues/84)
- Fixed issue in single selection mode when all group items were selected in the `ListView` when user clicked on the group header [#86](https://github.com/pnp/sp-dev-fx-controls-react/issues/86)

### Contributors

Special thanks to our contributors (in alphabetical order): Asish Padhy, Alex Terentiev.

## 1.4.0

### New control(s)

- `SecurityTrimmedControl` control got added [#74](https://github.com/pnp/sp-dev-fx-controls-react/issues/74)

### Enhancements

- Allow the `TaxonomyPicker` to also be used in Application Customizer [#77](https://github.com/pnp/sp-dev-fx-controls-react/issues/77)
- Add `npm postinstall` script to automatically add the locale config [#78](https://github.com/pnp/sp-dev-fx-controls-react/issues/78)

### Fixes

- Icon not showing up in the `Placeholder` control [#76](https://github.com/pnp/sp-dev-fx-controls-react/issues/76)

## 1.3.0

### Enhancements

- `TaxonomyPicker` control got added [#22](https://github.com/pnp/sp-dev-fx-controls-react/issues/22) [#63](https://github.com/pnp/sp-dev-fx-controls-react/issues/63) [#64](https://github.com/pnp/sp-dev-fx-controls-react/issues/64)
- `ListPicker` control got added [#34](https://github.com/pnp/sp-dev-fx-controls-react/issues/34)

### Fixes

- Issue fixed when the optional `selection` property was not provided to the `ListView` [#65](https://github.com/pnp/sp-dev-fx-controls-react/issues/65)

## 1.2.5

### Fixes

- Undo `ListView` item selection after items array updates [#55](https://github.com/pnp/sp-dev-fx-controls-react/issues/55)

## 1.2.4

### Enhancements

- Hiding placeholder title on small zones

### Fixes

- iFrame dialog reference fix [#52](https://github.com/pnp/sp-dev-fx-controls-react/issues/52)

## 1.2.3

### Enhancements

- Optimized telemetry so that it only pushes control data
- `WebPartTitle` hide control completely when empty

## 1.2.2

### Fixes

- Fixes an issue sorting in the `ListView` control while items were selected. Indexes were not updated.

## 1.2.1

### Fixes

- `FieldTaxonomyRenderer` got fixed to support single and multiple values

## 1.2.0

### New control(s)

- Field controls are added to the project
- `IFrameDialog` was added to the project

### Fixes

- Fixed theming in the `WebPartTitle` control

## 1.1.3

### Fixes

- `FileTypeIcon` icon fixed where it did not render an icon. This control should now works in SPFx extensions.

## 1.1.2

### Enhancements

- Improved telemetry with some object checks

### Fixes

- Fix for `WebPartTitle` control to inherit color

## 1.1.1

### Enhancements

- Removed operation name from telemetry

## 1.1.0

### Enhancements

- Telemetry added

## 1.0.0

### New control(s)

- `WebPartTitle` control got added

### Enhancements

- ListView control got extended with the ability to specify a set of preselected items.

## Beta 1.0.0-beta.8

### Fixes

- Fix for the `ListView` control when selection is used in combination with `setState`.

## Beta 1.0.0-beta.7

### New control(s)

- Grouping functionality added to the `ListView` control

## Beta 1.0.0-beta.6

### New control(s)

- Initial release
