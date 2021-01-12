# Releases

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
