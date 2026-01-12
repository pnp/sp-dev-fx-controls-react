var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel, } from '../../../controls/accessibleAccordion';
import { AdaptiveCardHostThemeType, } from '../../../AdaptiveCardHost';
import { ApplicationType, IconType, ImageSize, } from '../../../FileTypeIcon';
import { CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape, CarouselIndicatorsDisplay, } from '../../../controls/carousel';
import { ControlsTestEnhancedThemeProvider, ControlsTestEnhancedThemeProviderFunctionComponent, } from './ControlsTestEnhancedThemeProvider';
import { DateConvention, TimeConvention, } from '../../../DateTimePicker';
import { DefaultButton, PrimaryButton, } from '@fluentui/react/lib/Button';
import { DialogFooter, DialogType, } from '@fluentui/react/lib/Dialog';
import { DisplayMode, Environment, EnvironmentType, Guid } from '@microsoft/sp-core-library';
import { DocumentCard, DocumentCardActivity, DocumentCardLocation, DocumentCardPreview, DocumentCardTitle, DocumentCardType, } from '@fluentui/react/lib/DocumentCard';
import { Dropdown, } from '@fluentui/react/lib/Dropdown';
import { ExclamationCircleIcon, Flex, Text as NorthstarText, ScreenshareIcon, ShareGenericIcon, } from '@fluentui/react-northstar';
import { GroupOrder, SelectionMode, } from '../../../ListView';
import { PrincipalType, } from '../../../controls/peoplepicker';
//#region Import FluentUI Controls
import { Persona } from '@fluentui/react';
import { UpdateType, } from '../../../TaxonomyPicker';
import { TreeItemActionsDisplayMode, TreeViewSelectionMode, } from '../../../controls/treeView';
import { Accordion } from '../../../controls/accordion';
import { ChartType, } from '../../../ChartControl';
import { CustomCollectionFieldType, } from '../../../FieldCollectionData';
import { DayOfWeek } from '@fluentui/react/lib/DateTimeUtilities';
import { EAppHostName } from '../../../controls/userPicker/constants/EAppHostname';
import { FilterBar } from '../../../FilterBar';
//#endregion
import { GeneralHelper } from '../../../Utilities';
import { ImageFit } from '@fluentui/react/lib/Image';
import { Label } from '@fluentui/react/lib/Label';
import { Link } from '@fluentui/react/lib/Link';
import { MapType, } from '../../../Map';
import { ModernAudioLabelPosition, } from '../../../ModernAudio';
import { PanelType } from '@fluentui/react/lib/Panel';
import { PermissionLevel, } from '../../../SecurityTrimmedControl';
import { SPHttpClient } from '@microsoft/sp-http';
import { SPPermission } from '@microsoft/sp-page-context';
import { SPTaxonomyService } from '../../../ModernTaxonomyPicker';
import { Stack } from '@fluentui/react/lib/Stack';
import { TermActionsDisplayMode, } from '../../../controls/taxonomyPicker/termActions';
import { TermActionsDisplayStyle } from '../../../controls/taxonomyPicker';
import TestCalendarControl from './TestCalendarControl';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';
import { TimeDisplayControlType, } from '../../../controls/dateTimePicker/TimeDisplayControlType';
import { VariantType, } from '../../../controls/variantThemeProvider';
import { WidgetSize, } from '../../../controls/dashboard';
import WorldMap from './WorldMap';
import { debounce } from 'lodash';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { sp } from '@pnp/sp';
import styles from './ControlsTest.module.scss';
//#endregion
//#region Import PnP Controls
var AdaptiveCardDesignerHost = React.lazy(function () { return import('../../../AdaptiveCardDesignerHost').then(function (module) { return ({ default: module.AdaptiveCardDesignerHost }); }); });
var AdaptiveCardHost = React.lazy(function () { return import('../../../AdaptiveCardHost').then(function (module) { return ({ default: module.AdaptiveCardHost }); }); });
var AnimatedDialog = React.lazy(function () { return import('../../../AnimatedDialog').then(function (module) { return ({ default: module.AnimatedDialog }); }); });
var ChartControl = React.lazy(function () { return import('../../../ChartControl').then(function (module) { return ({ default: module.ChartControl }); }); });
var AccessibleAccordion = React.lazy(function () { return import('../../../controls/accessibleAccordion').then(function (module) { return ({ default: module.Accordion }); }); });
var Carousel = React.lazy(function () { return import('../../../controls/carousel').then(function (module) { return ({ default: module.Carousel }); }); });
var ContentTypePicker = React.lazy(function () { return import('../../../controls/contentTypePicker').then(function (module) { return ({ default: module.ContentTypePicker }); }); });
var Dashboard = React.lazy(function () { return import('../../../controls/dashboard').then(function (module) { return ({ default: module.Dashboard }); }); });
var DynamicForm = React.lazy(function () { return import('../../../controls/dynamicForm').then(function (module) { return ({ default: module.DynamicForm }); }); });
var IconPicker = React.lazy(function () { return import('../../../controls/iconPicker').then(function (module) { return ({ default: module.IconPicker }); }); });
var ComboBoxListItemPicker = React.lazy(function () {
    return import('../../../controls/listItemPicker/ComboBoxListItemPicker').then(function (module) { return ({ default: module.ComboBoxListItemPicker }); });
});
var LivePersona = React.lazy(function () { return import('../../../controls/LivePersona').then(function (module) { return ({ default: module.LivePersona }); }); });
var LocationPicker = React.lazy(function () { return import('../../../controls/locationPicker/LocationPicker').then(function (module) { return ({ default: module.LocationPicker }); }); });
var ModernTaxonomyPicker = React.lazy(function () { return import('../../../controls/modernTaxonomyPicker/ModernTaxonomyPicker').then(function (module) { return ({ default: module.ModernTaxonomyPicker }); }); });
var MonacoEditor = React.lazy(function () { return import('../../../controls/monacoEditor').then(function (module) { return ({ default: module.MonacoEditor }); }); });
var MyTeams = React.lazy(function () { return import('../../../controls/MyTeams').then(function (module) { return ({ default: module.MyTeams }); }); });
var Pagination = React.lazy(function () { return import('../../../controls/pagination').then(function (module) { return ({ default: module.Pagination }); }); });
var PeoplePicker = React.lazy(function () { return import('../../../controls/peoplepicker').then(function (module) { return ({ default: module.PeoplePicker }); }); });
var ProgressStepsIndicator = React.lazy(function () { return import('../../../controls/ProgressStepsIndicator').then(function (module) { return ({ default: module.ProgressStepsIndicator }); }); });
var SitePicker = React.lazy(function () { return import('../../../controls/sitePicker/SitePicker').then(function (module) { return ({ default: module.SitePicker }); }); });
var Toolbar = React.lazy(function () { return import('../../../controls/toolbar').then(function (module) { return ({ default: module.Toolbar }); }); });
var TreeView = React.lazy(function () { return import('../../../controls/treeView').then(function (module) { return ({ default: module.TreeView }); }); });
var UploadFiles = React.lazy(function () { return import('../../../controls/uploadFiles').then(function (module) { return ({ default: module.UploadFiles }); }); });
var VariantThemeProvider = React.lazy(function () { return import('../../../controls/variantThemeProvider').then(function (module) { return ({ default: module.VariantThemeProvider }); }); });
var ViewPicker = React.lazy(function () { return import('../../../ViewPicker').then(function (module) { return ({ default: module.ViewPicker }); }); });
var DateTimePicker = React.lazy(function () { return import('../../../DateTimePicker').then(function (module) { return ({ default: module.DateTimePicker }); }); });
var DragDropFiles = React.lazy(function () { return import('../../../DragDropFiles').then(function (module) { return ({ default: module.DragDropFiles }); }); });
var EnhancedThemeProvider = React.lazy(function () { return import('../../../EnhancedThemeProvider').then(function (module) { return ({ default: module.EnhancedThemeProvider }); }); });
var FieldCollectionData = React.lazy(function () { return import('../../../FieldCollectionData').then(function (module) { return ({ default: module.FieldCollectionData }); }); });
var FieldPicker = React.lazy(function () { return import('../../../FieldPicker').then(function (module) { return ({ default: module.FieldPicker }); }); });
var FilePicker = React.lazy(function () { return import('../../../FilePicker').then(function (module) { return ({ default: module.FilePicker }); }); });
var FileTypeIcon = React.lazy(function () { return import('../../../FileTypeIcon').then(function (module) { return ({ default: module.FileTypeIcon }); }); });
var FolderExplorer = React.lazy(function () { return import('../../../FolderExplorer').then(function (module) { return ({ default: module.FolderExplorer }); }); });
var FolderPicker = React.lazy(function () { return import('../../../FolderPicker').then(function (module) { return ({ default: module.FolderPicker }); }); });
var GridLayout = React.lazy(function () { return import('../../../GridLayout').then(function (module) { return ({ default: module.GridLayout }); }); });
var HoverReactionsBar = React.lazy(function () { return import('../../../HoverReactionsBar').then(function (module) { return ({ default: module.HoverReactionsBar }); }); });
var IFrameDialog = React.lazy(function () { return import('../../../IFrameDialog').then(function (module) { return ({ default: module.IFrameDialog }); }); });
var IFramePanel = React.lazy(function () { return import('../../../IFramePanel').then(function (module) { return ({ default: module.IFramePanel }); }); });
var ImagePicker = React.lazy(function () { return import('../../../ImagePicker').then(function (module) { return ({ default: module.ImagePicker }); }); });
var ListItemAttachments = React.lazy(function () { return import('../../../ListItemAttachments').then(function (module) { return ({ default: module.ListItemAttachments }); }); });
var ListItemComments = React.lazy(function () { return import('../../../ListItemComments').then(function (module) { return ({ default: module.ListItemComments }); }); });
var ListItemPicker = React.lazy(function () { return import('../../../ListItemPicker').then(function (module) { return ({ default: module.ListItemPicker }); }); });
var ListPicker = React.lazy(function () { return import('../../../ListPicker').then(function (module) { return ({ default: module.ListPicker }); }); });
var ListView = React.lazy(function () { return import('../../../ListView').then(function (module) { return ({ default: module.ListView }); }); });
var Map = React.lazy(function () { return import('../../../Map').then(function (module) { return ({ default: module.Map }); }); });
var ModernAudio = React.lazy(function () { return import('../../../ModernAudio').then(function (module) { return ({ default: module.ModernAudio }); }); });
var TaxonomyTree = React.lazy(function () { return import('../../../ModernTaxonomyPicker').then(function (module) { return ({ default: module.TaxonomyTree }); }); });
var Placeholder = React.lazy(function () { return import('../../../Placeholder').then(function (module) { return ({ default: module.Placeholder }); }); });
var Progress = React.lazy(function () { return import('../../../Progress').then(function (module) { return ({ default: module.Progress }); }); });
var RichText = React.lazy(function () { return import('../../../RichText').then(function (module) { return ({ default: module.RichText }); }); });
var ShareDialog = React.lazy(function () { return import('../../../ShareDialog').then(function (module) { return ({ default: module.ShareDialog }); }); });
var SecurityTrimmedControl = React.lazy(function () { return import('../../../SecurityTrimmedControl').then(function (module) { return ({ default: module.SecurityTrimmedControl }); }); });
var SiteBreadcrumb = React.lazy(function () { return import('../../../SiteBreadcrumb').then(function (module) { return ({ default: module.SiteBreadcrumb }); }); });
var TaxonomyPicker = React.lazy(function () { return import('../../../TaxonomyPicker').then(function (module) { return ({ default: module.TaxonomyPicker }); }); });
var TeamChannelPicker = React.lazy(function () { return import('../../../TeamChannelPicker').then(function (module) { return ({ default: module.TeamChannelPicker }); }); });
var TeamPicker = React.lazy(function () { return import('../../../TeamPicker').then(function (module) { return ({ default: module.TeamPicker }); }); });
var TermSetNavigation = React.lazy(function () { return import('../../../TermSetNavigation').then(function (module) { return ({ default: module.TermSetNavigation }); }); });
var WebPartTitle = React.lazy(function () { return import('../../../WebPartTitle').then(function (module) { return ({ default: module.WebPartTitle }); }); });
var TestControl = React.lazy(function () { return import('./TestControl').then(function (module) { return ({ default: module.TestControl }); }); });
var UserPicker = React.lazy(function () { return import('../../../UserPicker').then(function (module) { return ({ default: module.UserPicker }); }); });
// Used to render document card
/**
 * The sample data below was randomly generated (except for the title). It is used by the grid layout
 */
var sampleGridData = [{
        thumbnail: "https://pixabay.com/get/57e9dd474952a414f1dc8460825668204022dfe05555754d742e7bd6/hot-air-balloons-1984308_640.jpg",
        title: "Adventures in SPFx",
        name: "Perry Losselyong",
        profileImageSrc: "https://robohash.org/blanditiisadlabore.png?size=50x50&set=set1",
        location: "SharePoint",
        activity: "3/13/2019"
    }, {
        thumbnail: "https://pixabay.com/get/55e8d5474a52ad14f1dc8460825668204022dfe05555754d742d79d0/autumn-3804001_640.jpg",
        title: "The Wild, Untold Story of SharePoint!",
        name: "Ebonee Gallyhaock",
        profileImageSrc: "https://robohash.org/delectusetcorporis.bmp?size=50x50&set=set1",
        location: "SharePoint",
        activity: "6/29/2019"
    }, {
        thumbnail: "https://pixabay.com/get/57e8dd454c50ac14f1dc8460825668204022dfe05555754d742c72d7/log-cabin-1886620_640.jpg",
        title: "Low Code Solutions: PowerApps",
        name: "Seward Keith",
        profileImageSrc: "https://robohash.org/asperioresautquasi.jpg?size=50x50&set=set1",
        location: "PowerApps",
        activity: "12/31/2018"
    }, {
        thumbnail: "https://pixabay.com/get/55e3d445495aa514f1dc8460825668204022dfe05555754d742b7dd5/portrait-3316389_640.jpg",
        title: "Not Your Grandpa's SharePoint",
        name: "Sharona Selkirk",
        profileImageSrc: "https://robohash.org/velnammolestiae.png?size=50x50&set=set1",
        location: "SharePoint",
        activity: "11/20/2018"
    }, {
        thumbnail: "https://pixabay.com/get/57e6dd474352ae14f1dc8460825668204022dfe05555754d742a7ed1/faucet-1684902_640.jpg",
        title: "Get with the Flow",
        name: "Boyce Batstone",
        profileImageSrc: "https://robohash.org/nulladistinctiomollitia.jpg?size=50x50&set=set1",
        location: "Flow",
        activity: "5/26/2019"
    }];
var sampleItems = [
    {
        Langue: { Nom: 'Français' },
        Question: 'Charger des fichiers et dossiers',
        Reponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        Langue: { Nom: 'Français' },
        Question: 'Enregistrer un fichier',
        Reponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        Langue: { Nom: 'Français' },
        Question: 'Troisième exemple',
        Reponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        Langue: { Nom: 'Français' },
        Question: 'Quatrième exemple',
        Reponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        Langue: { Nom: 'Français' },
        Question: 'Cinquième exemple',
        Reponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        Langue: { Nom: 'Français' },
        Question: 'Sixième exemple',
        Reponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
];
var toolbarFilters = [{
        id: "filter1",
        title: "filter1"
    },
    {
        id: "filter2",
        title: "filter2"
    }];
var filterBarFilters = [{
        label: "Title",
        value: "title 1"
    },
    {
        label: "Field1",
        value: "value 1"
    },
    {
        label: "Title",
        value: "title 2"
    },
    {
        label: "Field2",
        value: "Field 2"
    },
    {
        label: "Field3",
        value: "Field 3"
    },
    {
        label: "Field4",
        value: "Field 4-1"
    },
    {
        label: "Field4",
        value: "Field 4-2"
    }];
/**
 * Component that can be used to test out the React controls from this project
 */
var ControlsTest = /** @class */ (function (_super) {
    __extends(ControlsTest, _super);
    function ControlsTest(props) {
        var _this = _super.call(this, props) || this;
        _this.spTaxonomyService = new SPTaxonomyService(_this.props.context);
        _this.theme = window["__themeState__"].theme;
        _this.pickerStylesSingle = {
            root: {
                width: "100%",
                borderRadius: 0,
                marginTop: 0,
            },
            input: {
                width: "100%",
                backgroundColor: _this.theme.white,
            },
            text: {
                borderStyle: "solid",
                width: "100%",
                borderWidth: 1,
                backgroundColor: _this.theme.white,
                borderRadius: 0,
                borderColor: _this.theme.neutralQuaternaryAlt,
                ":focus": {
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: _this.theme.themePrimary,
                },
                ":hover": {
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: _this.theme.themePrimary,
                },
                ":after": {
                    borderWidth: 0,
                    borderRadius: 0,
                },
            },
        };
        _this.onSelectedChannel = function (teamsId, channelId) {
            alert("TeamId: ".concat(teamsId, "\n ChannelId: ").concat(channelId, "\n"));
            console.log("TeamsId", teamsId);
            console.log("ChannelId", channelId);
        };
        /**
         * Static array for carousel control example.
         */
        _this.carouselElements = [
            React.createElement("div", { id: "1", key: "1" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a mattis libero, nec consectetur neque. Suspendisse potenti. Fusce ultrices faucibus consequat. Suspendisse ex diam, ullamcorper sit amet justo ac, accumsan congue neque. Vestibulum aliquam mauris non justo convallis, id molestie purus sodales. Maecenas scelerisque aliquet turpis, ac efficitur ex iaculis et. Vivamus finibus mi eget urna tempor, sed porta justo tempus. Vestibulum et lectus magna. Integer ante felis, ullamcorper venenatis lectus ac, vulputate pharetra magna. Morbi eget nisl tempus, viverra diam ac, mollis tortor. Nam odio ex, viverra bibendum mauris vehicula, consequat suscipit ligula. Nunc sed ultrices augue, eu tincidunt diam."),
            React.createElement("div", { id: "2", key: "2" }, "Quisque metus lectus, facilisis id consectetur ac, hendrerit eget quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut faucibus posuere felis vel efficitur. Maecenas et massa in sem tincidunt finibus. Duis sit amet bibendum nisi. Vestibulum pretium pretium libero, vel tincidunt sem vestibulum sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin quam lorem, venenatis id bibendum id, tempus eu nibh. Sed tristique semper ligula, vitae gravida diam gravida vitae. Donec eget posuere mauris, pharetra semper lectus."),
            React.createElement("div", { id: "3", key: "3" }, "Pellentesque tempor et leo at tincidunt. Vivamus et leo sed eros vehicula mollis vitae in dui. Duis posuere sodales enim ut ultricies. Cras in venenatis nulla. Ut sed neque dignissim, sollicitudin tellus convallis, placerat leo. Aliquam vestibulum, leo pharetra sollicitudin pretium, ipsum nisl tincidunt orci, in molestie ipsum dui et mi. Praesent aliquam accumsan risus sed bibendum. Cras consectetur elementum turpis, a mollis velit gravida sit amet. Praesent non augue cursus, varius justo at, molestie lorem. Nulla cursus tellus quis odio congue elementum. Vivamus sit amet quam nec lectus hendrerit blandit. Duis ac condimentum sem. Morbi hendrerit elementum purus, non facilisis arcu bibendum vitae. Vivamus commodo tristique euismod."),
            React.createElement("div", { id: "4", key: "4" }, "Proin semper egestas porta. Nullam risus nisl, auctor ac hendrerit in, dapibus quis ex. Quisque vitae nisi quam. Etiam vel sapien ut libero ornare rhoncus nec vestibulum dolor. Curabitur lacinia aliquam arcu. Proin ultrices risus velit, in vehicula tellus vehicula at. Sed ultrices et felis fringilla ultricies."),
            React.createElement("div", { id: "5", key: "5" }, "Donec orci lorem, imperdiet eu nisi sit amet, condimentum scelerisque tortor. Etiam nec lacinia dui. Duis non turpis neque. Sed pellentesque a erat et accumsan. Pellentesque elit odio, elementum nec placerat nec, ornare in tortor. Suspendisse gravida magna maximus mollis facilisis. Duis odio libero, finibus ac suscipit sed, aliquam et diam. Aenean posuere lacus ex. Donec dapibus, sem ac luctus ultrices, justo libero tempor eros, vitae lacinia ex ante non dolor. Curabitur condimentum, ligula id pharetra dictum, libero libero ullamcorper nunc, eu blandit sem arcu ut felis. Nullam lacinia dapibus auctor.")
        ];
        _this.skypeCheckIcon = { iconName: 'SkypeCheck' };
        _this.treeitems = [
            {
                key: "R1",
                label: "Root",
                subLabel: "This is a sub label for node",
                iconProps: _this.skypeCheckIcon,
                actions: [{
                        title: "Get item",
                        iconProps: {
                            iconName: 'Warning',
                            style: {
                                color: 'salmon',
                            },
                        },
                        id: "GetItem",
                        actionCallback: function (treeItem) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log(treeItem);
                                return [2 /*return*/];
                            });
                        }); }
                    }],
                children: [
                    {
                        key: "1",
                        label: "Parent 1",
                        selectable: false,
                        children: [
                            {
                                key: "3",
                                label: "Child 1",
                                subLabel: "This is a sub label for node",
                                actions: [{
                                        title: "Share",
                                        iconProps: {
                                            iconName: 'Share'
                                        },
                                        id: "GetItem",
                                        actionCallback: function (treeItem) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                console.log(treeItem);
                                                return [2 /*return*/];
                                            });
                                        }); }
                                    }],
                                children: [
                                    {
                                        key: "gc1",
                                        label: "Grand Child 1",
                                        actions: [{
                                                title: "Get Grand Child item",
                                                iconProps: {
                                                    iconName: 'Mail'
                                                },
                                                id: "GetItem",
                                                actionCallback: function (treeItem) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        console.log(treeItem);
                                                        return [2 /*return*/];
                                                    });
                                                }); }
                                            }]
                                    }
                                ]
                            },
                            {
                                key: "4",
                                label: "Child 2",
                                iconProps: _this.skypeCheckIcon
                            }
                        ]
                    },
                    {
                        key: "2",
                        label: "Parent 2"
                    },
                    {
                        key: "5",
                        label: "Parent 3",
                        disabled: true
                    },
                    {
                        key: "6",
                        label: "Parent 4",
                        selectable: true
                    }
                ]
            },
            {
                key: "R2",
                label: "Root 2",
                children: [
                    {
                        key: "8",
                        label: "Parent 5"
                    },
                    {
                        key: "9",
                        label: "Parent 6"
                    },
                    {
                        key: "10",
                        label: "Parent 7"
                    },
                    {
                        key: "11",
                        label: "Parent 8"
                    }
                ]
            },
            {
                key: "R3",
                label: "Root 3",
                children: [
                    {
                        key: "12",
                        label: "Parent 9"
                    },
                    {
                        key: "13",
                        label: "Parent 10",
                        children: [
                            {
                                key: "gc3",
                                label: "Child of Parent 10",
                                children: [
                                    {
                                        key: "ggc1",
                                        label: "Grandchild of Parent 10"
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        key: "14",
                        label: "Parent 11"
                    },
                    {
                        key: "15",
                        label: "Parent 12"
                    }
                ]
            }
        ];
        _this.progressSteps = [
            { id: 0, title: "Step 1", description: "Step 1 Description" },
            { id: 1, title: "Step 2", description: "Step 2 Description" },
            { id: 3, title: "Step 3", description: "Step 3 Description" },
            { id: 4, title: "Step 4", description: "Step 4 Description" },
            { id: 5, title: "Step 5", description: "Step 5 Description" },
            { id: 6, title: "Step 6", description: "Step 6 Description" },
        ];
        _this.divRefAddReaction = React.createRef();
        _this.termSetId = "8ed8c9ea-7052-4c1d-a4d7-b9c10bffea6f";
        /**
        * Method that retrieves files from drag and drop
        * @param files
        */
        _this._getDropFiles = function (files) {
            for (var i = 0; i < files.length; i++) {
                console.log("File name: " + files[i].name);
                console.log("Folder Path: " + files[i].fullPath);
            }
        };
        /**
         *
         *Method that retrieves the selected terms from the taxonomy picker and sets state
         * @private
         * @param {IPickerTerms} terms
         * @memberof ControlsTest
         */
        _this.onServicePickerChange = function (terms) {
            _this.setState({
                initialValues: terms
            });
            // console.log("serviceTerms", terms);
        };
        /**
         * Method that retrieves the selected terms from the taxonomy picker
         * @param terms
         */
        _this._onTaxPickerChange = function (terms) {
            _this.setState({
                initialValues: terms,
                errorMessage: terms.length > 0 ? '' : 'This field is required'
            });
            console.log("Terms:", terms);
        };
        /**
         * Method that retrieves the selected date/time from the DateTime picker
         * @param dateTimeValue
         */
        _this._onDateTimePickerChange = function (dateTimeValue) {
            _this.setState({ dateTimeValue: dateTimeValue });
            console.log("Selected Date/Time:", dateTimeValue.toLocaleString());
        };
        /**
         * Selected lists change event
         * @param lists
         */
        _this.onListPickerChange = function (lists) {
            console.log("Lists:", lists);
            _this.setState({
                selectedList: typeof lists === "string" ? lists : lists.pop()
            });
        };
        /**
         * Selected View change event
         * @param views
         */
        _this.onViewPickerChange = function (views) {
            console.log("Views:", views);
        };
        /**
         * Deletes second item from the list
         */
        _this.deleteItem = function () {
            var items = _this.state.items;
            if (items.length >= 2) {
                items.splice(1, 1);
                _this.setState({
                    items: items
                });
            }
        };
        /**
         * Triggers element change for the carousel example.
         */
        _this.triggerNextElement = function (index) {
            var canMovePrev = index > 0;
            var canMoveNext = index < _this.carouselElements.length - 1;
            var nextElement = _this.carouselElements[index];
            setTimeout(function () {
                _this.setState({
                    canMovePrev: canMovePrev,
                    canMoveNext: canMoveNext,
                    currentCarouselElement: nextElement
                });
            }, 500);
        };
        _this._onFilePickerSave = function (filePickerResult) { return __awaiter(_this, void 0, void 0, function () {
            var i, item, fileResultContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(filePickerResult && filePickerResult.length > 0)) return [3 /*break*/, 5];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < filePickerResult.length)) return [3 /*break*/, 4];
                        item = filePickerResult[i];
                        return [4 /*yield*/, item.downloadFileContent()];
                    case 2:
                        fileResultContent = _a.sent();
                        console.log(fileResultContent);
                        filePickerResult[i].fileSize = fileResultContent.size;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.setState({ filePickerResult: filePickerResult });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.onToolbarSelectedFiltersChange = function (filterIds) {
            _this.setState({
                selectedFilters: filterIds
            });
        };
        _this.toggleToolbarFilter = function (filterId) {
            _this.setState(function (_a) {
                var selectedFilters = _a.selectedFilters;
                if (selectedFilters.includes(filterId)) {
                    return { selectedFilters: selectedFilters.filter(function (f) { return f !== filterId; }) };
                }
                else {
                    return { selectedFilters: __spreadArray(__spreadArray([], selectedFilters, true), [filterId], false) };
                }
            });
        };
        _this.rootFolder = {
            Name: "Site",
            ServerRelativeUrl: _this.props.context.pageContext.web.serverRelativeUrl
        };
        _this._onFolderSelect = function (folder) {
            console.log('selected folder', folder);
        };
        _this.addFilter = function () {
            var number = Math.floor(Math.random() * 10);
            var i = { label: "Field".concat(number), value: "Field ".concat(number) };
            _this.setState({
                filters: __spreadArray(__spreadArray([], _this.state.filters, true), [i], false)
            });
        };
        _this.onClearFilters = function () {
            console.log("Cleared all filters");
            _this.setState({ filters: [] });
        };
        _this.onRemoveFilter = function (label, value) {
            console.log("Cleared ".concat(label, " ").concat(value));
            var itm = _this.state.filters.find(function (i) { return i.label === label && i.value === value; });
            if (itm) {
                var index = _this.state.filters.indexOf(itm);
                _this.state.filters.splice(index, 1);
                _this.setState({
                    filters: __spreadArray([], _this.state.filters, true)
                });
            }
        };
        _this._onFileClick = function (file) {
            console.log('file click', file);
        };
        _this._onRenderGridItem = function (item, _finalSize, isCompact) {
            var previewProps = {
                previewImages: [
                    {
                        previewImageSrc: item.thumbnail,
                        imageFit: ImageFit.cover,
                        height: 130
                    }
                ]
            };
            return React.createElement("div", { "data-is-focusable": true, role: "listitem", "aria-label": item.title },
                React.createElement(DocumentCard, { type: isCompact ? DocumentCardType.compact : DocumentCardType.normal, onClick: function (ev) { return alert("You clicked on a grid item"); }, style: { maxWidth: _finalSize.width } },
                    React.createElement(DocumentCardPreview, __assign({}, previewProps)),
                    !isCompact && React.createElement(DocumentCardLocation, { location: item.location }),
                    React.createElement("div", null,
                        React.createElement(DocumentCardTitle, { title: item.title, shouldTruncate: true }),
                        React.createElement(DocumentCardActivity, { activity: item.activity, people: [{ name: item.name, profileImageSrc: item.profileImageSrc }] }))));
        };
        _this.getRandomCollectionFieldData = function () {
            var result = [];
            for (var i = 1; i < 16; i++) {
                var sampleDate = new Date();
                sampleDate.setDate(sampleDate.getDate() + i);
                result.push({
                    "Field1": "String".concat(i),
                    "Field2": i,
                    "Field3": "https://pnp.github.io/",
                    "Field4": true,
                    "Field5": null,
                    "Field6": { key: "choice 1", text: "choice 1" },
                    "Field7": [{ key: "choice 1", text: "choice 1" }, { key: "choice 2", text: "choice 2" }],
                    "Field8": sampleDate
                });
            }
            return result;
        };
        _this.state = {
            imgSize: ImageSize.small,
            items: [],
            iFrameDialogOpened: false,
            iFramePanelOpened: false,
            initialValues: [],
            authorEmails: [],
            selectedList: null,
            progressActions: _this._initProgressActions(),
            dateTimeValue: new Date(),
            richTextValue: null,
            canMovePrev: false,
            canMoveNext: true,
            currentCarouselElement: _this.carouselElements[0],
            comboBoxListItemPickerListId: '0ffa51d7-4ad1-4f04-8cfe-98209905d6da',
            comboBoxListItemPickerIds: [{ Id: 1, Title: '111' }],
            treeViewSelectedKeys: ['gc1', 'gc3'],
            showAnimatedDialog: false,
            showCustomisedAnimatedDialog: false,
            showSuccessDialog: false,
            showErrorDialog: false,
            selectedTeam: [],
            selectedTeamChannels: [],
            errorMessage: "This field is required",
            selectedFilters: ["filter1"],
            termStoreInfo: null,
            termSetInfo: null,
            testTerms: [],
            filters: __spreadArray([], filterBarFilters, true),
            selectedUrlImagePicker: "",
            isOpenHoverReactionBar: false,
            isOpenShareDialog: false,
        };
        _this.peoplePickerContext = {
            absoluteUrl: _this.props.context.pageContext.web.absoluteUrl,
            msGraphClientFactory: _this.props.context.msGraphClientFactory,
            spHttpClient: _this.props.context.spHttpClient
        };
        _this._onIconSizeChange = _this._onIconSizeChange.bind(_this);
        _this._onConfigure = _this._onConfigure.bind(_this);
        _this._startProgress = _this._startProgress.bind(_this);
        _this.onServicePickerChange = _this.onServicePickerChange.bind(_this);
        return _this;
    }
    /**
     * React componentDidMount lifecycle hook
     */
    ControlsTest.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var restApi, response, items, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        restApi = "".concat(this.props.context.pageContext.web.absoluteUrl, "/_api/web/GetFolderByServerRelativeUrl('Shared%20Documents')/files?$expand=ListItemAllFields");
                        return [4 /*yield*/, this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)];
                    case 1:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        items = _c.sent();
                        sp.setup({
                            spfxContext: this.props.context
                        });
                        _a = this.setState;
                        _b = {
                            items: items.value ? items.value : []
                        };
                        return [4 /*yield*/, this.spTaxonomyService.getTermStoreInfo()];
                    case 3:
                        _a.apply(this, [(_b.termStoreInfo = _c.sent(),
                                _b)]);
                        return [2 /*return*/];
                }
            });
        });
    };
    ControlsTest.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        return __awaiter(this, void 0, void 0, function () {
            var termsSet, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(prevProps.controlVisibility !== this.props.controlVisibility)) return [3 /*break*/, 5];
                        if (!this.props.controlVisibility.TaxonomyTree) return [3 /*break*/, 5];
                        termsSet = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.spTaxonomyService.getTermSetInfo(Guid.parse(this.termSetId))];
                    case 2:
                        termsSet = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.setState({
                            termSetInfo: termsSet
                        });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Event handler when changing the icon size in the dropdown
     * @param element
     */
    ControlsTest.prototype._onIconSizeChange = function (element) {
        this.setState({
            imgSize: parseInt(element.key.toString())
        });
    };
    /**
     * Open the property pane
     */
    ControlsTest.prototype._onConfigure = function () {
        this.props.context.propertyPane.open();
    };
    /**
     * Method that retrieves the selected items in the list view
     * @param items
     */
    ControlsTest.prototype._getSelection = function (items) {
        console.log('Items:', items);
    };
    /**
     * Method that retrieves the selected items from People  Picker
     * @param items
     */
    ControlsTest.prototype._getPeoplePickerItems = function (items) {
        console.log('Items:', items);
    };
    /**
     * Selected item from the list data picker
     */
    ControlsTest.prototype.listItemPickerDataSelected = function (item) {
        console.log(item);
    };
    ControlsTest.prototype._startProgress = function () {
        var _this = this;
        var currentIndex = 0;
        var intervalId = setInterval(function () {
            var actions = _this.state.progressActions;
            if (currentIndex >= actions.length) {
                clearInterval(intervalId);
            }
            else {
                var action = actions[currentIndex];
                if (currentIndex === 1) { // just a test for error
                    action.hasError = true;
                    action.errorMessage = 'some error message';
                }
            }
            _this.setState({
                currentProgressActionIndex: currentIndex,
                progressActions: actions
            });
            currentIndex++;
        }, 5000);
    };
    ControlsTest.prototype._initProgressActions = function () {
        return [{
                title: 'First Step',
                subActionsTitles: [
                    'Sub action 1',
                    'Sub action 2'
                ]
            }, {
                title: 'Second step'
            }, {
                title: 'Third Step',
                subActionsTitles: [
                    'Sub action 1',
                    'Sub action 2',
                    'Sub action 3'
                ]
            }, {
                title: 'Fourth Step'
            }];
    };
    /**
     * Renders the component
     */
    ControlsTest.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var controlVisibility = this.props.controlVisibility;
        var dynamicFormListItemId;
        if (!isNaN(Number(this.props.dynamicFormListItemId))) {
            dynamicFormListItemId = Number(this.props.dynamicFormListItemId);
        }
        var dynamicFormCustomTitleIcon = {};
        dynamicFormCustomTitleIcon["Title"] = "FavoriteStar";
        // Size options for the icon size dropdown
        var sizeOptions = [
            {
                key: ImageSize.small,
                text: ImageSize[ImageSize.small],
                selected: ImageSize.small === this.state.imgSize
            },
            {
                key: ImageSize.medium,
                text: ImageSize[ImageSize.medium],
                selected: ImageSize.medium === this.state.imgSize
            },
            {
                key: ImageSize.large,
                text: ImageSize[ImageSize.large],
                selected: ImageSize.large === this.state.imgSize
            }
        ];
        // Specify the fields that need to be viewed in the listview
        var viewFields = [
            {
                name: 'ListItemAllFields.Id',
                displayName: 'ID',
                maxWidth: 40,
                sorting: true,
                isResizable: true
            },
            {
                name: 'ListItemAllFields.Underscore_Field',
                displayName: "Underscore_Field",
                sorting: true,
                isResizable: true
            },
            {
                name: 'Name',
                linkPropertyName: 'ServerRelativeUrl',
                sorting: true,
                isResizable: true
            },
            {
                name: 'ServerRelativeUrl',
                displayName: 'Path',
                render: function (item) {
                    return React.createElement("a", { href: item['ServerRelativeUrl'] }, "Link");
                },
                isResizable: true
            },
            {
                name: 'Title',
                isResizable: true
            }
        ];
        // Specify the fields on which you want to group your items
        // Grouping is takes the field order into account from the array
        // const groupByFields: IGrouping[] = [{ name: "ListItemAllFields.City", order: GroupOrder.ascending }, { name: "ListItemAllFields.Country.Label", order: GroupOrder.descending }];
        var groupByFields = [{ name: "ListItemAllFields.Department.Label", order: GroupOrder.ascending }];
        var iframeUrl = '/temp/workbench.html';
        if (Environment.type === EnvironmentType.SharePoint) {
            iframeUrl = '/_layouts/15/sharepoint.aspx';
        }
        else if (Environment.type === EnvironmentType.ClassicSharePoint) {
            iframeUrl = this.context.pageContext.web.serverRelativeUrl;
        }
        var linkExample = { href: "#" };
        var customizedLinkExample = {
            href: "#",
            title: "This is a customized link!",
            color: "red",
            target: "_top"
        };
        var calloutItemsExample = [
            {
                id: "action_1",
                title: "Info",
                icon: React.createElement(ExclamationCircleIcon, null),
            },
            { id: "action_2", title: "Popup", icon: React.createElement(ScreenshareIcon, null) },
            {
                id: "action_3",
                title: "Share",
                icon: React.createElement(ShareGenericIcon, null),
            },
        ];
        /**
       * Animated dialog related
       */
        var animatedDialogContentProps = {
            type: DialogType.normal,
            title: 'Animated Dialog',
            subText: 'Do you like the animated dialog?',
        };
        var animatedModalProps = {
            isDarkOverlay: true
        };
        var customizedAnimatedModalProps = {
            isDarkOverlay: true,
            containerClassName: "".concat(styles.dialogContainer)
        };
        var customizedAnimatedDialogContentProps = {
            type: DialogType.normal,
            title: 'Animated Dialog'
        };
        var successDialogContentProps = {
            type: DialogType.normal,
            title: 'Good answer!'
        };
        var errorDialogContentProps = {
            type: DialogType.normal,
            title: 'Uh oh!'
        };
        var timeout = function (ms) {
            return new Promise(function (resolve, reject) { return setTimeout(resolve, ms); });
        };
        return (React.createElement(React.Suspense, { fallback: React.createElement("div", null, "Loading...") },
            React.createElement("div", { className: styles.controlsTest },
                React.createElement("div", { className: styles.container },
                    React.createElement("h3", { className: styles.instruction }, "Choose which controls to display"),
                    React.createElement("div", { className: "".concat(styles.row, " ").concat(styles.controlFiltersContainer) },
                        React.createElement(PrimaryButton, { text: "Open Web Part Settings", iconProps: { iconName: 'Settings' }, onClick: this.props.onOpenPropertyPane }))),
                controlVisibility.WebPartTitle &&
                    React.createElement("div", { id: "WebPartTitleDiv", className: styles.container },
                        React.createElement(WebPartTitle, { displayMode: this.props.displayMode, title: this.props.title, updateProperty: this.props.updateProperty, moreLink: React.createElement(Link, { href: "https://pnp.github.io/sp-dev-fx-controls-react/" }, "See all") })),
                controlVisibility.DynamicForm &&
                    React.createElement("div", { id: "DynamicFormDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-l" },
                            React.createElement(DynamicForm, { key: this.props.dynamicFormListId, context: this.props.context, listId: this.props.dynamicFormListId, listItemId: dynamicFormListItemId, validationErrorDialogProps: this.props.dynamicFormErrorDialogEnabled ? { showDialogOnValidationError: true } : undefined, returnListItemInstanceOnSubmit: true, onCancelled: function () { console.log('Cancelled'); }, onSubmitted: function (data, item) { return __awaiter(_this, void 0, void 0, function () { var itemdata; return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, item.get()];
                                        case 1:
                                            itemdata = _a.sent();
                                            console.log('Saved item', itemdata);
                                            return [2 /*return*/];
                                    }
                                }); }); }, useClientSideValidation: this.props.dynamicFormClientSideValidationEnabled, useFieldValidation: this.props.dynamicFormFieldValidationEnabled, useCustomFormatting: this.props.dynamicFormCustomFormattingEnabled, enableFileSelection: this.props.dynamicFormFileSelectionEnabled, customIcons: dynamicFormCustomTitleIcon, useModernTaxonomyPicker: this.props.dynamicFormToggleTaxonomyPicker }))),
                controlVisibility.Teams &&
                    React.createElement("div", { id: "TeamsDiv", className: styles.container },
                        React.createElement(Stack, { styles: { root: { marginBottom: 200 } } },
                            React.createElement(MyTeams, { title: "My Teams", webPartContext: this.props.context, themeVariant: this.props.themeVariant, enablePersonCardInteraction: true, onSelectedChannel: this.onSelectedChannel })),
                        React.createElement(Stack, { styles: { root: { margin: "10px 10px 100px 10px" } }, tokens: { childrenGap: 10 } },
                            React.createElement(TeamPicker, { label: "Select Team", themeVariant: this.props.themeVariant, selectedTeams: this.state.selectedTeam, appcontext: this.props.context, itemLimit: 1, onSelectedTeams: function (tagList) {
                                    _this.setState({ selectedTeamChannels: [] });
                                    _this.setState({ selectedTeam: tagList });
                                    console.log(tagList);
                                } }),
                            ((_a = this.state) === null || _a === void 0 ? void 0 : _a.selectedTeam) && ((_b = this.state) === null || _b === void 0 ? void 0 : _b.selectedTeam.length) > 0 && (React.createElement(React.Fragment, null,
                                React.createElement(TeamChannelPicker, { label: "Select Team Channel", themeVariant: this.props.themeVariant, selectedChannels: this.state.selectedTeamChannels, teamId: this.state.selectedTeam[0].key, appcontext: this.props.context, onSelectedChannels: function (tagList) {
                                        _this.setState({ selectedTeamChannels: tagList });
                                        console.log(tagList);
                                    } }))))),
                controlVisibility.TermSetNavigation &&
                    React.createElement("div", { id: "TermSetNavigationDiv", className: styles.container },
                        React.createElement(TermSetNavigation, { context: this.props.context, themeVariant: this.props.themeVariant, termSetId: this.termSetId, showContextMenu: true, contextMenuItems: [
                                {
                                    key: "add",
                                    text: "Add",
                                    iconProps: { iconName: "add" },
                                },
                                {
                                    key: "adit",
                                    text: "Edit",
                                    iconProps: { iconName: "Edit" },
                                },
                                {
                                    key: "remove",
                                    text: "Remove",
                                    iconProps: { iconName: "delete" },
                                },
                            ] })),
                controlVisibility.AccessibleAccordion &&
                    React.createElement("div", { id: "accessibleAccordionDiv", className: styles.container },
                        React.createElement(AccessibleAccordion, { allowZeroExpanded: true, theme: this.props.themeVariant },
                            React.createElement(AccordionItem, { key: "Headding 1" },
                                React.createElement(AccordionItemHeading, null,
                                    React.createElement(AccordionItemButton, null, "Accordion Item Heading 1")),
                                React.createElement(AccordionItemPanel, null,
                                    React.createElement("div", { style: { margin: 20 } },
                                        React.createElement("h2", null, "Content Heading 1"),
                                        React.createElement(Text, { variant: "mediumPlus" }, "Text sample  ")))),
                            React.createElement(AccordionItem, { key: "Headding 2" },
                                React.createElement(AccordionItemHeading, null,
                                    React.createElement(AccordionItemButton, null, "Accordion Item Heading 2")),
                                React.createElement(AccordionItemPanel, null,
                                    React.createElement("div", { style: { margin: 20 } },
                                        React.createElement("h2", null, "Content Heading 2"),
                                        React.createElement(Text, { variant: "mediumPlus" }, "Text "),
                                        React.createElement(TextField, null))))),
                        sampleItems.map(function (item, index) { return (React.createElement(Accordion, { title: item.Question, defaultCollapsed: false, className: "itemCell", key: index },
                            React.createElement("div", { className: "itemContent" },
                                React.createElement("div", { className: "itemResponse" }, item.Reponse),
                                React.createElement("div", { className: "itemIndex" }, "Langue :  ".concat(item.Langue.Nom))))); })),
                controlVisibility.TaxonomyPicker &&
                    React.createElement("div", { id: "TaxonomyPickerDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "Services tester:",
                            React.createElement(TaxonomyPicker, { allowMultipleSelections: true, selectChildrenIfParentSelected: true, 
                                //termsetNameOrID="61837936-29c5-46de-982c-d1adb6664b32" // id to termset that has a custom sort
                                termsetNameOrID: "8ea5ac06-fd7c-4269-8d0d-02f541df8eb9", initialValues: [{
                                        key: "c05250ff-80e7-41e6-bfb3-db2db62d63d3",
                                        name: "Business",
                                        path: "Business",
                                        termSet: "8ea5ac06-fd7c-4269-8d0d-02f541df8eb9",
                                        termSetName: "Trip Types"
                                    }, {
                                        key: "a05250ff-80e7-41e6-bfb3-db2db62d63d3",
                                        name: "BBusiness",
                                        path: "BBusiness",
                                        termSet: "8ea5ac06-fd7c-4269-8d0d-02f541df8eb9",
                                        termSetName: "Trip Types"
                                    }], validateOnLoad: true, panelTitle: "Select Sorted Term", label: "Service Picker with custom actions", context: this.props.context, onChange: this.onServicePickerChange, isTermSetSelectable: true, termActions: {
                                    actions: [{
                                            title: "Get term labels",
                                            iconName: "LocaleLanguage",
                                            id: "test",
                                            invokeActionOnRender: true,
                                            hidden: true,
                                            actionCallback: function (taxService, term) { return __awaiter(_this, void 0, void 0, function () {
                                                var updateAction;
                                                return __generator(this, function (_a) {
                                                    updateAction = {
                                                        updateActionType: UpdateType.updateTermLabel,
                                                        value: "".concat(term.Name, " (updated)")
                                                    };
                                                    return [2 /*return*/, updateAction];
                                                });
                                            }); },
                                            applyToTerm: function (term) { return (term && term.Name && term.Name.toLowerCase() === "about us"); }
                                        },
                                        // new TermLabelAction("Get Labels")
                                    ],
                                    termActionsDisplayMode: TermActionsDisplayMode.buttons,
                                    termActionsDisplayStyle: TermActionsDisplayStyle.textAndIcon,
                                }, onPanelSelectionChange: function (prev, next) {
                                    console.log(prev);
                                    console.log(next);
                                } }),
                            React.createElement(TaxonomyPicker, { allowMultipleSelections: true, termsetNameOrID: "8ea5ac06-fd7c-4269-8d0d-02f541df8eb9" // id to termset that has a default sort
                                , panelTitle: "Select Default Sorted Term", label: "Service Picker", context: this.props.context, onChange: this.onServicePickerChange, isTermSetSelectable: false, placeholder: "Select service", 
                                // validateInput={true}   /* Uncomment this to enable validation of input text */
                                required: true, errorMessage: 'this field is required', onGetErrorMessage: function (value) { return 'comment errorMessage to see this one'; } }),
                            React.createElement(TaxonomyPicker, { initialValues: this.state.initialValues, allowMultipleSelections: true, termsetNameOrID: "41dec50a-3e09-4b3f-842a-7224cffc74c0", anchorId: "436a6154-9691-4925-baa5-4c9bb9212cbf", 
                                // disabledTermIds={["943fd9f0-3d7c-415c-9192-93c0e54573fb", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                                // disabledTermIds={["943fd9f0-3d7c-415c-9192-93c0e54573fb", "73d18756-20af-41de-808c-2a1e21851e44", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                                // disabledTermIds={["cd6f6d3c-672d-4244-9320-c1e64cc0626f", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                                // disableChildrenOfDisabledParents={true}
                                panelTitle: "Select Term", label: "Taxonomy Picker", context: this.props.context, onChange: this._onTaxPickerChange, isTermSetSelectable: false, hideDeprecatedTags: true, hideTagsNotAvailableForTagging: true, errorMessage: this.state.errorMessage, termActions: {
                                    actions: [{
                                            title: "Get term labels",
                                            iconName: "LocaleLanguage",
                                            id: "test",
                                            invokeActionOnRender: true,
                                            hidden: true,
                                            actionCallback: function (taxService, term) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    console.log(term.Name, term.TermsCount);
                                                    return [2 /*return*/, {
                                                            updateActionType: UpdateType.updateTermLabel,
                                                            value: "".concat(term.Name, " (updated)")
                                                        }];
                                                });
                                            }); },
                                            applyToTerm: function (term) { return (term && term.Name && term.Name === "internal"); }
                                        },
                                        {
                                            title: "Hide term",
                                            id: "hideTerm",
                                            invokeActionOnRender: true,
                                            hidden: true,
                                            actionCallback: function (taxService, term) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    return [2 /*return*/, {
                                                            updateActionType: UpdateType.hideTerm,
                                                            value: true
                                                        }];
                                                });
                                            }); },
                                            applyToTerm: function (term) { return (term && term.Name && (term.Name.toLowerCase() === "help desk" || term.Name.toLowerCase() === "multi-column valo site page")); }
                                        },
                                        {
                                            title: "Disable term",
                                            id: "disableTerm",
                                            invokeActionOnRender: true,
                                            hidden: true,
                                            actionCallback: function (taxService, term) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    return [2 /*return*/, {
                                                            updateActionType: UpdateType.disableTerm,
                                                            value: true
                                                        }];
                                                });
                                            }); },
                                            applyToTerm: function (term) { return (term && term.Name && term.Name.toLowerCase() === "secured"); }
                                        },
                                        {
                                            title: "Disable or hide term",
                                            id: "disableOrHideTerm",
                                            invokeActionOnRender: true,
                                            hidden: true,
                                            actionCallback: function (taxService, term) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    if (term.TermsCount > 0) {
                                                        return [2 /*return*/, {
                                                                updateActionType: UpdateType.disableTerm,
                                                                value: true
                                                            }];
                                                    }
                                                    return [2 /*return*/, {
                                                            updateActionType: UpdateType.hideTerm,
                                                            value: true
                                                        }];
                                                });
                                            }); },
                                            applyToTerm: function (term) { return true; }
                                        }],
                                    termActionsDisplayMode: TermActionsDisplayMode.buttons,
                                    termActionsDisplayStyle: TermActionsDisplayStyle.textAndIcon
                                } }),
                            React.createElement(DefaultButton, { text: "Add", onClick: function () {
                                    _this.setState({
                                        initialValues: [{
                                                key: "ab703558-2546-4b23-b8b8-2bcb2c0086f5",
                                                name: "HR",
                                                path: "HR",
                                                termSet: "b3e9b754-2593-4ae6-abc2-35345402e186"
                                            }],
                                        errorMessage: ""
                                    });
                                } }))),
                controlVisibility.DateTimePicker &&
                    React.createElement("div", { id: "DateTimePickerDiv", className: styles.container },
                        React.createElement(DateTimePicker, { label: "DateTime Picker (unspecified = date and time)", isMonthPickerVisible: false, showSeconds: false, onChange: function (value) { return console.log("DateTimePicker value:", value); }, placeholder: "Pick a date" }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker 12-hour clock", showSeconds: true, onChange: function (value) { return console.log("DateTimePicker value:", value); }, timeDisplayControlType: TimeDisplayControlType.Dropdown, minutesIncrementStep: 15 }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker 24-hour clock", showSeconds: true, timeConvention: TimeConvention.Hours24, onChange: function (value) { return console.log("DateTimePicker value:", value); } }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker no seconds", value: new Date(), onChange: function (value) { return console.log("DateTimePicker value:", value); } }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (unspecified = date and time)", timeConvention: TimeConvention.Hours24, value: new Date(), onChange: function (value) { return console.log("DateTimePicker value:", value); } }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker dropdown", showSeconds: true, timeDisplayControlType: TimeDisplayControlType.Dropdown, value: new Date(), onChange: function (value) { return console.log("DateTimePicker value:", value); } }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker date only", showLabels: false, dateConvention: DateConvention.Date, value: new Date(), onChange: function (value) { return console.log("DateTimePicker value:", value); }, minDate: new Date("05/01/2019"), maxDate: new Date("05/01/2020") }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (unspecified = date and time)" }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (unspecified = date and time, no seconds)" }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (date and time - default time = 12h)", dateConvention: DateConvention.DateTime, showSeconds: true }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (date and time - 12h)", dateConvention: DateConvention.DateTime, timeConvention: TimeConvention.Hours12, showSeconds: false }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (date and time - 24h)", dateConvention: DateConvention.DateTime, timeConvention: TimeConvention.Hours24, firstDayOfWeek: DayOfWeek.Monday, showSeconds: true }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (Controlled)", formatDate: function (d) { return "".concat(d.getFullYear(), " - ").concat(d.getMonth() + 1, " - ").concat(d.getDate()); }, dateConvention: DateConvention.DateTime, timeConvention: TimeConvention.Hours24, firstDayOfWeek: DayOfWeek.Monday, value: this.state.dateTimeValue, onChange: this._onDateTimePickerChange, isMonthPickerVisible: false, showMonthPickerAsOverlay: true, showWeekNumbers: true, showSeconds: true, timeDisplayControlType: TimeDisplayControlType.Dropdown }),
                        React.createElement(PrimaryButton, { text: 'Clear Date', onClick: function () {
                                _this.setState({
                                    dateTimeValue: undefined
                                });
                            } }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (date only)", dateConvention: DateConvention.Date }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (disabled)", disabled: true }),
                        React.createElement(DateTimePicker, { label: "DateTime Picker (restricted dates)", isMonthPickerVisible: false, showSeconds: false, onChange: function (value) { return console.log("DateTimePicker value:", value); }, placeholder: "Pick a date", restrictedDates: [new Date(2024, 1, 15), new Date(2024, 1, 16), new Date(2024, 1, 17)] })),
                controlVisibility.RichText &&
                    React.createElement("div", { id: "RichTextDiv", className: styles.container },
                        React.createElement(RichText, { label: "My rich text field", value: this.state.richTextValue, isEditMode: this.props.displayMode === DisplayMode.Edit, onChange: function (value) { _this.setState({ richTextValue: value }); return value; } }),
                        React.createElement(PrimaryButton, { text: 'Reset text', onClick: function () { _this.setState({ richTextValue: 'test' }); } })),
                controlVisibility.Placeholder &&
                    React.createElement("div", { id: "PlaceholderDiv", className: styles.container },
                        React.createElement(Placeholder, { iconName: 'Edit', iconText: 'Configure your web part', description: function (defaultClassNames) { return React.createElement("span", { className: defaultClassNames }, "Please configure the web part."); }, buttonLabel: 'Configure', hideButton: this.props.displayMode === DisplayMode.Read, onConfigure: this._onConfigure, theme: this.props.themeVariant })),
                controlVisibility.PeoplePicker &&
                    React.createElement("div", { id: "PeoplePickerDiv", className: styles.container },
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker custom styles", styles: this.pickerStylesSingle, personSelectionLimit: 1, ensureUser: true, principalTypes: [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList], onChange: this._getPeoplePickerItems, useSubstrateSearch: false }),
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker with filter for '.com'", personSelectionLimit: 5, ensureUser: true, principalTypes: [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList], resultFilter: function (result) {
                                return result.filter(function (p) { return p["loginName"].indexOf(".com") !== -1; });
                            }, onChange: this._getPeoplePickerItems }),
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker (Group not found)", webAbsoluteUrl: this.props.context.pageContext.site.absoluteUrl, groupName: "Team Site Visitors 123", ensureUser: true, principalTypes: [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList], defaultSelectedUsers: ["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"], onChange: this._getPeoplePickerItems }),
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker (search for group)", groupName: "Team Site Visitors", principalTypes: [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList], defaultSelectedUsers: ["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"], onChange: this._getPeoplePickerItems }),
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker (pre-set global users)", principalTypes: [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList], defaultSelectedUsers: ["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"], onChange: this._getPeoplePickerItems, personSelectionLimit: 2, ensureUser: true }),
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker (pre-set local users)", webAbsoluteUrl: this.props.context.pageContext.site.absoluteUrl, principalTypes: [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList], defaultSelectedUsers: ["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"], onChange: this._getPeoplePickerItems }),
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker (tenant scoped)", personSelectionLimit: 10, searchTextLimit: 5, 
                            // groupName={"Team Site Owners"}
                            showtooltip: true, required: true, 
                            //defaultSelectedUsers={["tenantUser@domain.onmicrosoft.com", "test@user.com"]}
                            //defaultSelectedUsers={this.state.authorEmails}
                            onChange: this._getPeoplePickerItems, showHiddenInUI: false, principalTypes: [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList], suggestionsLimit: 5, resolveDelay: 200, placeholder: 'Select a SharePoint principal (User or Group)', onGetErrorMessage: function (items) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (!items || items.length < 2) {
                                        return [2 /*return*/, 'error'];
                                    }
                                    return [2 /*return*/, ''];
                                });
                            }); } }),
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker (local scoped)", webAbsoluteUrl: this.props.context.pageContext.site.absoluteUrl, personSelectionLimit: 5, 
                            // groupName={"Team Site Owners"}
                            showtooltip: true, required: true, 
                            //defaultSelectedUsers={["tenantUser@domain.onmicrosoft.com", "test@user.com"]}
                            //defaultSelectedUsers={this.state.authorEmails}
                            onChange: this._getPeoplePickerItems, showHiddenInUI: false, principalTypes: [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList], suggestionsLimit: 2, resolveDelay: 200 }),
                        React.createElement(PeoplePicker, { context: this.peoplePickerContext, titleText: "People Picker (disabled)", disabled: true, showtooltip: true, defaultSelectedUsers: ['aleksei.dovzhyk@sharepointalist.com'] })),
                controlVisibility.DragDropFiles &&
                    React.createElement("div", { id: "DragDropFilesDiv", className: styles.container },
                        React.createElement("b", null, "Drag and Drop Files"),
                        React.createElement(DragDropFiles, { dropEffect: "copy", enable: true, onDrop: this._getDropFiles, iconName: "Upload", labelMessage: "My custom upload File" },
                            React.createElement(Placeholder, { iconName: 'BulkUpload', iconText: 'Drag files or folder with files here...', description: function (defaultClassNames) { return React.createElement("span", { className: defaultClassNames }, "Drag files or folder with files here..."); }, buttonLabel: 'Configure', hideButton: this.props.displayMode === DisplayMode.Read, onConfigure: this._onConfigure }))),
                controlVisibility.ListView &&
                    React.createElement("div", { id: "ListViewDiv", className: styles.container },
                        React.createElement(ListView, { items: this.state.items, viewFields: viewFields, iconFieldName: 'ServerRelativeUrl', groupByFields: groupByFields, compact: true, selectionMode: SelectionMode.single, selection: this._getSelection, showFilter: true, dragDropFiles: true, onDrop: this._getDropFiles, stickyHeader: true, className: styles.listViewWrapper })),
                controlVisibility.ChartControl &&
                    React.createElement("div", { id: "ChartControlDiv", className: styles.container },
                        React.createElement(ChartControl, { type: ChartType.Bar, data: {
                                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                                datasets: [{
                                        label: '# of Votes',
                                        data: [12, 19, 3, 5, 2, 3],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255,99,132,1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                            }, options: {
                                scales: {
                                    yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }]
                                }
                            } })),
                controlVisibility.Map &&
                    React.createElement("div", { id: "MapDiv", className: styles.container },
                        React.createElement(Map, { titleText: "New map control", coordinates: { latitude: 51.507351, longitude: -0.127758 }, enableSearch: true, mapType: MapType.normal, onUpdateCoordinates: function (coordinates) { return console.log("Updated location:", coordinates); } })),
                controlVisibility.ModernAudio &&
                    React.createElement("div", { id: "ModernAudioDiv", className: styles.container },
                        React.createElement(ModernAudio, { audioUrl: 'https://www.winhistory.de/more/winstart/mp3/vista.mp3', label: "Audio Control", labelPosition: ModernAudioLabelPosition.BottomCenter })),
                controlVisibility.FileTypeIcon &&
                    React.createElement("div", { id: "FileTypeIconDiv", className: styles.container },
                        React.createElement("p", { className: "ms-font-l" }, "File type icon control"),
                        React.createElement("div", { className: "ms-font-m" },
                            "Font icons:",
                            React.createElement(FileTypeIcon, { type: IconType.font, path: "https://contoso.sharepoint.com/documents/filename.docx" }),
                            React.createElement(FileTypeIcon, { type: IconType.font, path: "https://contoso.sharepoint.com/documents/filename.unknown" }),
                            React.createElement(FileTypeIcon, { type: IconType.font, path: "https://contoso.sharepoint.com/documents/filename.doc" }),
                            React.createElement(FileTypeIcon, { type: IconType.font, application: ApplicationType.HTML }),
                            React.createElement(FileTypeIcon, { type: IconType.font, application: ApplicationType.Mail }),
                            React.createElement(FileTypeIcon, { type: IconType.font, application: ApplicationType.SASS })),
                        React.createElement("div", { className: "ms-font-m" },
                            "Image icons:",
                            React.createElement(FileTypeIcon, { type: IconType.image, path: "https://contoso.sharepoint.com/documents/filename.docx" }),
                            React.createElement(FileTypeIcon, { type: IconType.image, path: "https://contoso.sharepoint.com/documents/filename.unknown" }),
                            React.createElement(FileTypeIcon, { type: IconType.image, path: "https://contoso.sharepoint.com/documents/filename.pptx?querystring='prop1'&prop2='test'" }),
                            React.createElement(FileTypeIcon, { type: IconType.image, application: ApplicationType.Word }),
                            React.createElement(FileTypeIcon, { type: IconType.image, application: ApplicationType.PDF }),
                            React.createElement(FileTypeIcon, { type: IconType.image, path: "https://contoso.sharepoint.com/documents/filename.pdf" })),
                        React.createElement("div", { className: "ms-font-m" },
                            "Image icons with support to events:",
                            React.createElement(FileTypeIcon, { type: IconType.image, application: ApplicationType.PowerApps, size: ImageSize.medium, onClick: function (e) { return console.log("onClick on FileTypeIcon!"); }, onDoubleClick: function (e) { return console.log("onDoubleClick on FileTypeIcon!"); }, onMouseEnter: function (e) { return console.log("onMouseEnter on FileTypeIcon!"); }, onMouseLeave: function (e) { return console.log("onMouseLeave on FileTypeIcon!"); }, onMouseOver: function (e) { return console.log("onMouseOver on FileTypeIcon!"); }, onMouseUp: function (e) { return console.log("onMouseUp on FileTypeIcon!"); } })),
                        React.createElement("div", { className: "ms-font-m" },
                            "Icon size tester:",
                            React.createElement(Dropdown, { options: sizeOptions, onChanged: this._onIconSizeChange }),
                            React.createElement(FileTypeIcon, { type: IconType.image, size: this.state.imgSize, application: ApplicationType.Excel }),
                            React.createElement(FileTypeIcon, { type: IconType.image, size: this.state.imgSize, application: ApplicationType.PDF }),
                            React.createElement(FileTypeIcon, { type: IconType.image, size: this.state.imgSize }))),
                controlVisibility.SecurityTrimmedControl &&
                    React.createElement("div", { id: "SecurityTrimmedControlDiv", className: styles.container },
                        React.createElement(SecurityTrimmedControl, { context: this.props.context, level: PermissionLevel.currentWeb, permissions: [SPPermission.viewListItems], className: "TestingClass", noPermissionsControl: React.createElement("p", null, "You do not have permissions.") },
                            React.createElement("p", null, "You have permissions to view list items."))),
                controlVisibility.SitePicker &&
                    React.createElement("div", { id: "SitePickerDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "Site picker tester:",
                            React.createElement(SitePicker, { context: this.props.context, label: 'select sites', mode: 'site', allowSearch: true, multiSelect: false, onChange: function (sites) { console.log(sites); }, placeholder: 'Select sites', searchPlaceholder: 'Filter sites' }))),
                controlVisibility.ListPicker &&
                    React.createElement("div", { id: "ListPickerDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "List picker tester:",
                            React.createElement(ListPicker, { context: this.props.context, label: "Select your list(s)", placeholder: "Select your list(s)", baseTemplate: 100, includeHidden: false, multiSelect: true, contentTypeId: "0x01", 
                                // filter="Title eq 'Test List'"
                                onSelectionChanged: this.onListPickerChange }))),
                controlVisibility.ListItemAttachments &&
                    React.createElement("div", { id: "ListItemAttachmentsDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "List Item Attachments tester:",
                            React.createElement(ListItemAttachments, { listId: this.props.dynamicFormListId, 
                                // itemId={1}
                                context: this.props.context, label: "ListItem Attachments" }))),
                controlVisibility.ListItemPicker &&
                    React.createElement("div", { id: "ListItemPickerDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "List Item picker list data tester:",
                            React.createElement(ListItemPicker, { listId: 'b1416fca-dc77-4198-a082-62a7657dcfa9', columnInternalName: "DateAndTime", keyColumnInternalName: "Id", 
                                // filter={"Title eq 'SPFx'"}
                                orderBy: 'Title desc', itemLimit: 5, context: this.props.context, placeholder: 'Select list items', onSelectedItem: this.listItemPickerDataSelected }))),
                controlVisibility.ListItemComments &&
                    React.createElement("div", { id: "ListItemCommentsDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "List Item Comments Tester",
                            React.createElement(ListItemComments, { webUrl: 'https://contoso.sharepoint.com/sites/ThePerspective', listId: '6f151a33-a7af-4fae-b8c4-f2f04cbc690f', itemId: "1", serviceScope: this.props.context.serviceScope, numberCommentsPerPage: 10, label: "ListItem Comments" }))),
                controlVisibility.ViewPicker &&
                    React.createElement("div", { id: "ViewPickerDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "View picker tester:",
                            React.createElement(ViewPicker, { context: this.props.context, label: "Select view(s)", listId: "9f3908cd-1e88-4ab3-ac42-08efbbd64ec9", placeholder: 'Select list view(s)', orderBy: 1, multiSelect: true, onSelectionChanged: this.onViewPickerChange }))),
                controlVisibility.FieldPicker &&
                    React.createElement("div", { id: "FieldPickerDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "Field picker tester:",
                            React.createElement(FieldPicker, { context: this.props.context, label: 'Select a field', listId: this.state.selectedList, onSelectionChanged: function (fields) {
                                    console.log(fields);
                                } }))),
                controlVisibility.IconPicker &&
                    React.createElement("div", { id: "IconPickerDiv", className: styles.container },
                        React.createElement("div", null, "Icon Picker"),
                        React.createElement("div", null,
                            React.createElement(IconPicker, { renderOption: "panel", onSave: function (value) { console.log(value); }, currentIcon: 'Warning', buttonLabel: "Icon Picker" })),
                        React.createElement(IconPicker, { buttonLabel: 'Icon', onChange: function (iconName) { console.log(iconName); }, onCancel: function () { console.log("Panel closed"); }, onSave: function (iconName) { console.log(iconName); } })),
                controlVisibility.ComboBoxListItemPicker &&
                    React.createElement("div", { id: "ComboBoxListItemPickerDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "ComboBoxListItemPicker:",
                            React.createElement(ComboBoxListItemPicker, { listId: this.state.comboBoxListItemPickerListId, columnInternalName: 'Title', keyColumnInternalName: 'Id', orderBy: 'Title desc', multiSelect: true, onSelectedItem: function (data) {
                                    console.log("Item(s):", data);
                                }, defaultSelectedItems: this.state.comboBoxListItemPickerIds, webUrl: this.props.context.pageContext.web.absoluteUrl, spHttpClient: this.props.context.spHttpClient }),
                            React.createElement(PrimaryButton, { text: "Change List", onClick: function () {
                                    _this.setState({
                                        comboBoxListItemPickerListId: '71210430-8436-4962-a14d-5525475abd6b'
                                    });
                                } }),
                            React.createElement(PrimaryButton, { text: "Change default items", onClick: function () {
                                    _this.setState({
                                        comboBoxListItemPickerIds: [{ Id: 2, Title: '222' }]
                                    });
                                } }))),
                controlVisibility.IFrameDialog &&
                    React.createElement("div", { id: "IFrameDialogDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "iframe dialog tester:",
                            React.createElement(PrimaryButton, { text: "Open iframe Dialog", onClick: function () { _this.setState({ iFrameDialogOpened: true }); } }),
                            React.createElement(IFrameDialog, { url: iframeUrl, iframeOnLoad: function (iframe) { console.log('iframe loaded'); }, hidden: !this.state.iFrameDialogOpened, onDismiss: function () { _this.setState({ iFrameDialogOpened: false }); }, modalProps: {
                                    isBlocking: true,
                                    styles: {
                                        root: {
                                            backgroundColor: '#00ff00'
                                        },
                                        main: {
                                            backgroundColor: '#ff0000'
                                        }
                                    }
                                }, dialogContentProps: {
                                    type: DialogType.close,
                                    showCloseButton: true
                                }, width: '570px', height: '315px' }))),
                controlVisibility.IFramePanel &&
                    React.createElement("div", { id: "IFramePanelDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-m" },
                            "iframe Panel tester:",
                            React.createElement(PrimaryButton, { text: "Open iframe Panel", onClick: function () { _this.setState({ iFramePanelOpened: true }); } }),
                            React.createElement(IFramePanel, { url: iframeUrl, type: PanelType.medium, 
                                //  height="300px"
                                headerText: "iframe panel title", closeButtonAriaLabel: "Close", isOpen: this.state.iFramePanelOpened, onDismiss: function () { _this.setState({ iFramePanelOpened: false }); }, iframeOnLoad: function (iframe) { console.log('iframe loaded'); } }))),
                controlVisibility.ImagePicker &&
                    React.createElement("div", { id: "ImagePickerDiv", className: styles.container },
                        React.createElement(ImagePicker, { context: this.props.context, onFileSelected: function (file) { console.log(file); _this.setState({ selectedUrlImagePicker: file.fileAbsoluteUrl }); }, onDeleteFile: function () { console.log('file deleted'); }, selectedFileUrl: this.state.selectedUrlImagePicker })),
                controlVisibility.FolderPicker &&
                    React.createElement("div", { id: "FolderPickerDiv", className: styles.container },
                        React.createElement(FolderPicker, { context: this.props.context, rootFolder: {
                                Name: 'Documents',
                                ServerRelativeUrl: "".concat(this.props.context.pageContext.web.serverRelativeUrl === '/' ? '' : this.props.context.pageContext.web.serverRelativeUrl, "/Shared Documents")
                            }, onSelect: this._onFolderSelect, label: 'Folder Picker', required: true, canCreateFolders: true })),
                React.createElement("div", { id: "FilterBarDiv", className: styles.container, hidden: !controlVisibility.FilterBar },
                    React.createElement(FilterBar, { items: this.state.filters, inlineItemCount: 3, onClearFilters: this.onClearFilters, onRemoveFilter: this.onRemoveFilter }),
                    React.createElement("button", { onClick: this.addFilter }, "Add new filter")),
                controlVisibility.Carousel &&
                    React.createElement("div", { id: "CarouselDiv", className: styles.container },
                        React.createElement("div", null,
                            React.createElement("h3", null, "Carousel with fixed elements:"),
                            React.createElement(Carousel, { buttonsLocation: CarouselButtonsLocation.top, buttonsDisplay: CarouselButtonsDisplay.block, contentContainerStyles: styles.carouselContent, containerButtonsStyles: styles.carouselButtonsContainer, isInfinite: true, element: this.carouselElements, onMovePrevClicked: function (index) { console.log("Prev button clicked: ".concat(index)); } })),
                        React.createElement("div", null,
                            React.createElement("h3", null, "Carousel with CarouselImage elements:"),
                            React.createElement(Carousel, { buttonsLocation: CarouselButtonsLocation.center, buttonsDisplay: CarouselButtonsDisplay.buttonsOnly, contentContainerStyles: styles.carouselImageContent, 
                                //containerButtonsStyles={styles.carouselButtonsContainer}
                                isInfinite: true, indicatorShape: CarouselIndicatorShape.circle, indicatorsDisplay: CarouselIndicatorsDisplay.block, pauseOnHover: true, element: [
                                    {
                                        imageSrc: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80',
                                        title: 'Colosseum',
                                        description: 'This is Colosseum',
                                        url: 'https://en.wikipedia.org/wiki/Colosseum',
                                        showDetailsOnHover: true,
                                        imageFit: ImageFit.cover
                                    },
                                    {
                                        imageSrc: 'https://www.telegraph.co.uk/content/dam/science/2018/06/20/stonehenge-2326750_1920_trans%2B%2BZgEkZX3M936N5BQK4Va8RWtT0gK_6EfZT336f62EI5U.jpg',
                                        title: 'Stonehenge',
                                        description: 'This is Stonehendle',
                                        url: 'https://en.wikipedia.org/wiki/Stonehenge',
                                        showDetailsOnHover: true,
                                        imageFit: ImageFit.cover
                                    },
                                    {
                                        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/2560px-All_Gizah_Pyramids.jpg',
                                        title: 'Pyramids of Giza',
                                        description: 'This are Pyramids of Giza (Egypt)',
                                        url: 'https://en.wikipedia.org/wiki/Egyptian_pyramids',
                                        showDetailsOnHover: true,
                                        imageFit: ImageFit.cover
                                    }
                                ], onMoveNextClicked: function (index) { console.log("Next button clicked: ".concat(index)); }, onMovePrevClicked: function (index) { console.log("Prev button clicked: ".concat(index)); }, rootStyles: mergeStyles({
                                    backgroundColor: '#C3C3C3'
                                }) })),
                        React.createElement("div", null,
                            React.createElement("h3", null, "Carousel with triggerPageElement:"),
                            React.createElement(Carousel, { buttonsLocation: CarouselButtonsLocation.bottom, buttonsDisplay: CarouselButtonsDisplay.buttonsOnly, contentContainerStyles: styles.carouselContent, canMoveNext: this.state.canMoveNext, canMovePrev: this.state.canMovePrev, triggerPageEvent: this.triggerNextElement, element: this.state.currentCarouselElement })),
                        React.createElement("div", null,
                            React.createElement("h3", null, "Carousel with minimal configuration:"),
                            React.createElement(Carousel, { element: this.carouselElements, contentHeight: 200 }))),
                controlVisibility.SiteBreadcrumb &&
                    React.createElement("div", { id: "SiteBreadcrumbDiv", className: styles.container },
                        React.createElement("div", { className: styles.siteBreadcrumb },
                            React.createElement(SiteBreadcrumb, { context: this.props.context }))),
                controlVisibility.FilePicker &&
                    React.createElement("div", { id: "FilePickerDiv", className: styles.container },
                        React.createElement("div", null,
                            React.createElement("h3", null, "File Picker"),
                            React.createElement(TextField, { label: "Default SiteFileTab Folder", onChange: debounce(function (ev, newVal) { _this.setState({ filePickerDefaultFolderAbsolutePath: newVal }); }, 500), styles: { root: { marginBottom: 10 } } }),
                            React.createElement(FilePicker, { bingAPIKey: "<BING API KEY>", 
                                //webAbsoluteUrl="https://023xn.sharepoint.com/sites/test1"
                                //defaultFolderAbsolutePath={"https://aterentiev.sharepoint.com/sites/SPFxinTeamsDemo/Shared%20Documents/General"}
                                //accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
                                buttonLabel: "Add File", buttonIconProps: { iconName: 'Add', styles: { root: { fontSize: 42 } } }, onSave: this._onFilePickerSave, onChange: function (filePickerResult) { console.log(filePickerResult); }, context: this.props.context, hideRecentTab: false, includePageLibraries: true, checkIfFileExists: false }),
                            this.state.filePickerResult &&
                                React.createElement("div", null,
                                    React.createElement("div", null,
                                        "FileName: ",
                                        this.state.filePickerResult[0].fileName),
                                    React.createElement("div", null,
                                        "File size: ",
                                        GeneralHelper.formatBytes(this.state.filePickerResult[0].fileSize, 2)))),
                        React.createElement("div", null,
                            React.createElement("h3", null, "File Picker with target folder browser"),
                            React.createElement(FilePicker, { bingAPIKey: "<BING API KEY>", 
                                //accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
                                buttonLabel: "Upload image", buttonIcon: "FileImage", onSave: this._onFilePickerSave, onChange: function (filePickerResult) { console.log(filePickerResult); }, context: this.props.context, hideRecentTab: false, renderCustomUploadTabContent: function () { return (React.createElement(FolderExplorer, { context: _this.props.context, rootFolder: _this.rootFolder, defaultFolder: _this.rootFolder, onSelect: _this._onFolderSelect, canCreateFolders: true })); } })),
                        React.createElement("p", null,
                            React.createElement("a", { href: "javascript:;", onClick: this.deleteItem }, "Deletes second item"))),
                controlVisibility.Progress &&
                    React.createElement("div", { id: "ProgressDiv", className: styles.container },
                        React.createElement(Progress, { title: 'Progress Test', showOverallProgress: true, showIndeterminateOverallProgress: false, hideNotStartedActions: false, actions: this.state.progressActions, currentActionIndex: this.state.currentProgressActionIndex, longRunningText: 'This operation takes longer than expected', longRunningTextDisplayDelay: 7000, height: '350px', inProgressIconName: 'ChromeBackMirrored' }),
                        React.createElement(PrimaryButton, { text: 'Start Progress', onClick: this._startProgress })),
                controlVisibility.ProgressStepsIndicator &&
                    React.createElement("div", { id: "ProgressStepsIndicatorDiv", className: styles.container },
                        React.createElement(ProgressStepsIndicator, { steps: this.progressSteps, currentStep: 0, themeVariant: this.props.themeVariant })),
                controlVisibility.GridLayout &&
                    React.createElement("div", { id: "GridLayoutDiv", className: styles.container },
                        React.createElement("div", { className: "ms-font-l" }, "Grid Layout"),
                        React.createElement(GridLayout, { ariaLabel: "List of content, use right and left arrow keys to navigate, arrow down to access details.", items: sampleGridData, onRenderGridItem: function (item, finalSize, isCompact) { return _this._onRenderGridItem(item, finalSize, isCompact); }, itemMinWidth: 250, itemMaxWidth: 600, itemPadding: 60 })),
                controlVisibility.HoverReactionsBar &&
                    React.createElement("div", { ref: this.divRefAddReaction, id: "HoverReactionsBarDiv", className: styles.container },
                        React.createElement(PrimaryButton, { text: "Open HoverReactionsBar", onClick: function () { _this.setState({ isOpenHoverReactionBar: true }); } }),
                        React.createElement(HoverReactionsBar, { isOpen: this.state.isOpenHoverReactionBar, onSelect: function (emoji, emojiInfo) { console.log(emoji); }, onDismiss: function () {
                                _this.setState({ isOpenHoverReactionBar: false });
                            }, target: this.divRefAddReaction.current })),
                controlVisibility.FolderExplorer &&
                    React.createElement("div", { id: "FolderExplorerDiv", className: styles.container },
                        React.createElement(FolderExplorer, { context: this.props.context, rootFolder: {
                                Name: 'Documents',
                                ServerRelativeUrl: "".concat(this.props.context.pageContext.web.serverRelativeUrl === '/' ? '' : this.props.context.pageContext.web.serverRelativeUrl, "/Shared Documents")
                            }, defaultFolder: {
                                Name: 'Documents',
                                ServerRelativeUrl: "".concat(this.props.context.pageContext.web.serverRelativeUrl === '/' ? '' : this.props.context.pageContext.web.serverRelativeUrl, "/Shared Documents")
                            }, onSelect: this._onFolderSelect, canCreateFolders: true, orderby: 'Name' //'ListItemAllFields/Created'
                            , orderAscending: true, showFiles: true, onFileClick: this._onFileClick })),
                controlVisibility.TreeView &&
                    React.createElement("div", { id: "TreeViewDiv", className: styles.container },
                        React.createElement("h3", null, "Tree View"),
                        React.createElement(TreeView, { items: this.treeitems, defaultExpanded: false, selectionMode: TreeViewSelectionMode.Multiple, showCheckboxes: true, treeItemActionsDisplayMode: TreeItemActionsDisplayMode.ContextualMenu, defaultSelectedKeys: this.state.treeViewSelectedKeys, onExpandCollapse: this.onExpandCollapseTree, onSelect: this.onItemSelected, defaultExpandedChildren: true, theme: this.props.themeVariant }),
                        React.createElement(PrimaryButton, { onClick: function () { _this.setState({ treeViewSelectedKeys: [] }); } }, "Clear selection")),
                controlVisibility.Pagination &&
                    React.createElement("div", { id: "PaginationDiv", className: styles.container },
                        React.createElement(Pagination, { currentPage: 3, onChange: function (page) { return (_this._getPage(page)); }, totalPages: this.props.paginationTotalPages || 13 })),
                controlVisibility.FieldCollectionData &&
                    React.createElement("div", { id: "FieldCollectionDataDiv", className: styles.container },
                        React.createElement(FieldCollectionData, { key: "FieldCollectionData", label: "Fields Collection", itemsPerPage: 3, manageBtnLabel: "Manage", onChanged: function (value) { console.log(value); }, panelHeader: "Manage values", enableSorting: true, panelProps: { type: PanelType.custom, customWidth: "98vw" }, fields: [
                                { id: "Field1", title: "String field", type: CustomCollectionFieldType.string, required: true },
                                { id: "Field2", title: "Number field", type: CustomCollectionFieldType.number },
                                { id: "Field3", title: "URL field", type: CustomCollectionFieldType.url },
                                { id: "Field4", title: "Boolean field", type: CustomCollectionFieldType.boolean },
                                {
                                    id: "Field5", title: "People picker", type: CustomCollectionFieldType.peoplepicker, required: true,
                                    minimumUsers: 2, minimumUsersMessage: "2 Users is the minimum", maximumUsers: 3,
                                },
                                {
                                    id: "Field6", title: "Combo Single", type: CustomCollectionFieldType.combobox, required: true,
                                    multiSelect: false, options: [{ key: "choice 1", text: "choice 1" }, { key: "choice 2", text: "choice 2" }, { key: "choice 3", text: "choice 3" }]
                                },
                                {
                                    id: "Field7", title: "Combo Multi", type: CustomCollectionFieldType.combobox,
                                    allowFreeform: true, multiSelect: true, options: [{ key: "choice 1", text: "choice 1" }, { key: "choice 2", text: "choice 2" }, { key: "choice 3", text: "choice 3" }]
                                },
                                { id: "Field8", title: "Date field", type: CustomCollectionFieldType.date, placeholder: "Select a date" }
                            ], value: this.getRandomCollectionFieldData(), 
                            // value = {null}
                            context: this.props.context, usePanel: true, noDataMessage: "No data is selected" //overrides the default message
                         })),
                controlVisibility.ContentTypePicker &&
                    React.createElement(ContentTypePicker, { context: this.props.context }),
                controlVisibility.Dashboard &&
                    React.createElement("div", { id: "DashboardDiv", className: styles.container },
                        React.createElement(Dashboard, { widgets: [{
                                    title: "Card 1",
                                    desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
                                    widgetActionGroup: calloutItemsExample,
                                    size: WidgetSize.Quadruple,
                                    body: [
                                        {
                                            id: "t1",
                                            title: "Tab 1",
                                            content: (React.createElement(Flex, { vAlign: "center", hAlign: "center", styles: { height: "100%", border: "1px dashed rgb(179, 176, 173)" } },
                                                React.createElement(NorthstarText, { size: "large", weight: "semibold" }, "Content #1"))),
                                        },
                                        {
                                            id: "t2",
                                            title: "Tab 2",
                                            content: (React.createElement(Flex, { vAlign: "center", hAlign: "center", styles: { height: "100%", border: "1px dashed rgb(179, 176, 173)" } },
                                                React.createElement(NorthstarText, { size: "large", weight: "semibold" }, "Content #2"))),
                                        },
                                        {
                                            id: "t3",
                                            title: "Tab 3",
                                            content: (React.createElement(Flex, { vAlign: "center", hAlign: "center", styles: { height: "100%", border: "1px dashed rgb(179, 176, 173)" } },
                                                React.createElement(NorthstarText, { size: "large", weight: "semibold" }, "Content #3"))),
                                        },
                                    ],
                                    link: linkExample,
                                },
                                {
                                    title: "Card 2",
                                    size: WidgetSize.Single,
                                    link: customizedLinkExample,
                                    rowSpan: 2
                                },
                                {
                                    title: "Card 3",
                                    size: WidgetSize.Double,
                                    link: linkExample,
                                },
                                {
                                    title: "Card 4",
                                    size: WidgetSize.Single,
                                    link: customizedLinkExample,
                                },
                                {
                                    title: "Card 5",
                                    size: WidgetSize.Single,
                                    link: linkExample,
                                },
                                {
                                    title: "Card 6",
                                    size: WidgetSize.Single,
                                    link: linkExample,
                                }] })),
                controlVisibility.Toolbar &&
                    React.createElement("div", { id: "ToolbarDiv", className: styles.container },
                        React.createElement("div", null,
                            React.createElement("h3", null, "Uncontrolled toolbar"),
                            React.createElement(Toolbar, { actionGroups: {
                                    'group1': {
                                        'action1': {
                                            title: 'Edit',
                                            iconName: 'Edit',
                                            onClick: function () { console.log('Edit action click'); }
                                        },
                                        'action2': {
                                            title: 'New',
                                            iconName: 'Add',
                                            onClick: function () { console.log('New action click'); }
                                        }
                                    }
                                }, filters: toolbarFilters, onSelectedFiltersChange: this.onToolbarSelectedFiltersChange })),
                        React.createElement("div", null,
                            React.createElement("h3", null, "Controlled toolbar"),
                            React.createElement(Toolbar, { actionGroups: {
                                    'group1': {
                                        'action1': {
                                            title: 'Edit',
                                            iconName: 'Edit',
                                            onClick: function () { console.log('Edit action click'); }
                                        },
                                        'action2': {
                                            title: 'New',
                                            iconName: 'Add',
                                            onClick: function () { console.log('New action click'); }
                                        }
                                    }
                                }, filters: toolbarFilters, selectedFilterIds: this.state.selectedFilters, onSelectedFiltersChange: this.onToolbarSelectedFiltersChange })),
                        React.createElement("div", null,
                            "Selected filter IDs: ",
                            this.state.selectedFilters.join(", ")),
                        React.createElement(PrimaryButton, { text: 'Toggle filter1', onClick: function () { return _this.toggleToolbarFilter("filter1"); } }),
                        React.createElement(PrimaryButton, { text: 'Toggle filter2', onClick: function () { return _this.toggleToolbarFilter("filter2"); } })),
                controlVisibility.AnimatedDialog &&
                    React.createElement("div", { id: "AnimatedDialogDiv", className: styles.container },
                        React.createElement("h3", null, "Animated Dialogs"),
                        React.createElement(PrimaryButton, { text: 'Show animated dialog', onClick: function () { _this.setState({ showAnimatedDialog: true }); } }),
                        React.createElement(AnimatedDialog, { hidden: !this.state.showAnimatedDialog, onDismiss: function () { _this.setState({ showAnimatedDialog: false }); }, dialogContentProps: animatedDialogContentProps, modalProps: animatedModalProps },
                            React.createElement(DialogFooter, null,
                                React.createElement(PrimaryButton, { onClick: function () { _this.setState({ showAnimatedDialog: false }); }, text: "Yes" }),
                                React.createElement(DefaultButton, { onClick: function () { _this.setState({ showAnimatedDialog: false }); }, text: "No" }))),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement(PrimaryButton, { text: 'Show animated dialog with icon', onClick: function () { _this.setState({ showCustomisedAnimatedDialog: true }); } }),
                        React.createElement(AnimatedDialog, { hidden: !this.state.showCustomisedAnimatedDialog, onDismiss: function () { _this.setState({ showCustomisedAnimatedDialog: false }); }, dialogContentProps: customizedAnimatedDialogContentProps, modalProps: customizedAnimatedModalProps, dialogAnimationInType: 'fadeInDown', dialogAnimationOutType: 'fadeOutDown', iconName: 'UnknownSolid', iconAnimationType: 'zoomInDown', showAnimatedDialogFooter: true, okButtonText: "Yes", cancelButtonText: "No", onOkClick: function () { return timeout(1500); }, onSuccess: function () {
                                _this.setState({ showCustomisedAnimatedDialog: false });
                                _this.setState({ showSuccessDialog: true });
                            }, onError: function () {
                                _this.setState({ showCustomisedAnimatedDialog: false });
                                _this.setState({ showErrorDialog: true });
                            } },
                            React.createElement("div", { className: styles.dialogContent },
                                React.createElement("span", null, "Do you like the animated dialog?"))),
                        React.createElement(AnimatedDialog, { hidden: !this.state.showSuccessDialog, onDismiss: function () { _this.setState({ showSuccessDialog: false }); }, dialogContentProps: successDialogContentProps, modalProps: customizedAnimatedModalProps, iconName: 'CompletedSolid' },
                            React.createElement("div", { className: styles.dialogContent },
                                React.createElement("span", null, "Thank you.")),
                            React.createElement("div", { className: styles.dialogFooter },
                                React.createElement(PrimaryButton, { onClick: function () { _this.setState({ showSuccessDialog: false }); }, text: "OK" }))),
                        React.createElement(AnimatedDialog, { hidden: !this.state.showErrorDialog, onDismiss: function () { _this.setState({ showErrorDialog: false }); }, dialogContentProps: errorDialogContentProps, modalProps: customizedAnimatedModalProps, iconName: 'StatusErrorFull' },
                            React.createElement("div", { className: styles.dialogContent },
                                React.createElement("span", null, "Ther was an error.")),
                            React.createElement("div", { className: styles.dialogFooter },
                                React.createElement(PrimaryButton, { onClick: function () { _this.setState({ showErrorDialog: false }); }, text: "OK" })))),
                controlVisibility.LivePersona &&
                    React.createElement("div", { id: "LivePersonaDiv", className: styles.container },
                        React.createElement(LivePersona, { upn: "meganb@contoso.onmicrosoft.com", template: React.createElement(React.Fragment, null,
                                React.createElement(Persona, { text: "Megan Bowen", secondaryText: "meganb@contoso.onmicrosoft.com", coinSize: 48 })), serviceScope: this.props.context.serviceScope })),
                controlVisibility.LocationPicker &&
                    React.createElement("div", { id: "LocationPickerDiv", className: styles.container },
                        React.createElement(LocationPicker, { context: this.props.context, label: "Location", onChange: function (locValue) { console.log(locValue.DisplayName + ", " + locValue.Address.Street); } })),
                controlVisibility.ModernTaxonomyPicker &&
                    React.createElement("div", { id: "ModernTaxonomyPickerDiv", className: styles.container },
                        React.createElement(ModernTaxonomyPicker, { allowMultipleSelections: true, termSetId: this.termSetId, panelTitle: "Panel title", label: "Modern Taxonomy Picker", context: this.props.context, required: false, disabled: false, customPanelWidth: 400 })),
                controlVisibility.MonacoEditor &&
                    React.createElement("div", { id: "MonacoEditorDiv", className: styles.container },
                        React.createElement(MonacoEditor, { value: "", showMiniMap: true, onValueChange: function (value, validationErrors) { console.log(value); console.log(validationErrors); }, language: "javascript" })),
                controlVisibility.AdaptiveCardHost &&
                    React.createElement("div", { id: "AdaptiveCardHostDiv", className: styles.container },
                        React.createElement("h3", null, "Adaptive Card Host"),
                        React.createElement(AdaptiveCardHost, { card: {
                                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                                "type": "AdaptiveCard",
                                "version": "1.0",
                                "body": [
                                    {
                                        "type": "TextBlock",
                                        "size": "medium",
                                        "weight": "bolder",
                                        "text": " ${ParticipantInfoForm.title}",
                                        "horizontalAlignment": "center",
                                        "wrap": true,
                                        "style": "heading"
                                    },
                                    {
                                        "type": "Input.Text",
                                        "label": "Name",
                                        "style": "text",
                                        "id": "SimpleVal",
                                        "isRequired": true,
                                        "errorMessage": "Name is required"
                                    },
                                    {
                                        "type": "Input.Text",
                                        "label": "Homepage",
                                        "style": "url",
                                        "id": "UrlVal"
                                    },
                                    {
                                        "type": "Input.Text",
                                        "label": "Email",
                                        "style": "email",
                                        "id": "EmailVal"
                                    },
                                    {
                                        "type": "Input.Text",
                                        "label": "Phone",
                                        "style": "tel",
                                        "id": "TelVal"
                                    },
                                    {
                                        "type": "Input.Text",
                                        "label": "Comments",
                                        "style": "text",
                                        "isMultiline": true,
                                        "id": "MultiLineVal"
                                    },
                                    {
                                        "type": "Input.Number",
                                        "label": "Quantity",
                                        "min": -5,
                                        "max": 5,
                                        "value": 1,
                                        "id": "NumVal",
                                        "errorMessage": "The quantity must be between -5 and 5"
                                    },
                                    {
                                        "type": "Input.Date",
                                        "label": "Due Date",
                                        "id": "DateVal",
                                        "value": "2017-09-20"
                                    },
                                    {
                                        "type": "Input.Time",
                                        "label": "Start time",
                                        "id": "TimeVal",
                                        "value": "16:59"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "size": "medium",
                                        "weight": "bolder",
                                        "text": "${Survey.title} ",
                                        "horizontalAlignment": "center",
                                        "wrap": true,
                                        "style": "heading"
                                    },
                                    {
                                        "type": "Input.ChoiceSet",
                                        "id": "CompactSelectVal",
                                        "label": "${Survey.questions[0].question}",
                                        "style": "compact",
                                        "value": "1",
                                        "choices": [
                                            {
                                                "$data": "${Survey.questions[0].items}",
                                                "title": "${choice}",
                                                "value": "${value}"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Input.ChoiceSet",
                                        "id": "SingleSelectVal",
                                        "label": "${Survey.questions[1].question}",
                                        "style": "expanded",
                                        "value": "1",
                                        "choices": [
                                            {
                                                "$data": "${Survey.questions[1].items}",
                                                "title": "${choice}",
                                                "value": "${value}"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Input.ChoiceSet",
                                        "id": "MultiSelectVal",
                                        "label": "${Survey.questions[2].question}",
                                        "isMultiSelect": true,
                                        "value": "1,3",
                                        "choices": [
                                            {
                                                "$data": "${Survey.questions[2].items}",
                                                "title": "${choice}",
                                                "value": "${value}"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "TextBlock",
                                        "size": "medium",
                                        "weight": "bolder",
                                        "text": "Input.Toggle",
                                        "horizontalAlignment": "center",
                                        "wrap": true,
                                        "style": "heading"
                                    },
                                    {
                                        "type": "Input.Toggle",
                                        "label": "Please accept the terms and conditions:",
                                        "title": "${Survey.questions[3].question}",
                                        "valueOn": "true",
                                        "valueOff": "false",
                                        "id": "AcceptsTerms",
                                        "isRequired": true,
                                        "errorMessage": "Accepting the terms and conditions is required"
                                    },
                                    {
                                        "type": "Input.Toggle",
                                        "label": "How do you feel about red cars?",
                                        "title": "${Survey.questions[4].question}",
                                        "valueOn": "RedCars",
                                        "valueOff": "NotRedCars",
                                        "id": "ColorPreference"
                                    }
                                ],
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Submit",
                                        "data": {
                                            "id": "1234567890"
                                        }
                                    },
                                    {
                                        "type": "Action.ShowCard",
                                        "title": "Show Card",
                                        "card": {
                                            "type": "AdaptiveCard",
                                            "body": [
                                                {
                                                    "type": "Input.Text",
                                                    "label": "enter comment",
                                                    "style": "text",
                                                    "id": "CommentVal"
                                                }
                                            ],
                                            "actions": [
                                                {
                                                    "type": "Action.Submit",
                                                    "title": "OK"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }, data: {
                                "$root": {
                                    "ParticipantInfoForm": {
                                        "title": "Input.Text elements"
                                    },
                                    "Survey": {
                                        "title": "Input ChoiceSet",
                                        "questions": [
                                            {
                                                "question": "What color do you want? (compact)",
                                                "items": [
                                                    {
                                                        "choice": "Red",
                                                        "value": "1"
                                                    },
                                                    {
                                                        "choice": "Green",
                                                        "value": "2"
                                                    },
                                                    {
                                                        "choice": "Blue",
                                                        "value": "3"
                                                    }
                                                ]
                                            },
                                            {
                                                "question": "What color do you want? (expanded)",
                                                "items": [
                                                    {
                                                        "choice": "Red",
                                                        "value": "1"
                                                    },
                                                    {
                                                        "choice": "Green",
                                                        "value": "2"
                                                    },
                                                    {
                                                        "choice": "Blue",
                                                        "value": "3"
                                                    }
                                                ]
                                            },
                                            {
                                                "question": "What color do you want? (multiselect)",
                                                "items": [
                                                    {
                                                        "choice": "Red",
                                                        "value": "1"
                                                    },
                                                    {
                                                        "choice": "Green",
                                                        "value": "2"
                                                    },
                                                    {
                                                        "choice": "Blue",
                                                        "value": "3"
                                                    }
                                                ]
                                            },
                                            {
                                                "question": "I accept the terms and conditions (True/False)"
                                            },
                                            {
                                                "question": "Red cars are better than other cars"
                                            }
                                        ]
                                    }
                                }
                            }, theme: this.props.themeVariant, themeType: AdaptiveCardHostThemeType.SharePoint, onInvokeAction: function (action) { return alert(JSON.stringify(action)); }, onError: function (error) { return console.log(error.message); }, onSetCustomElements: function (registry) { }, onSetCustomActions: function (registry) { }, onUpdateHostCapabilities: function (hostCapabilities) {
                                hostCapabilities.setCustomProperty("CustomPropertyName", Date.now);
                            }, context: this.props.context })),
                controlVisibility.VariantThemeProvider &&
                    React.createElement("div", { id: "VariantThemeProviderDiv", className: styles.container },
                        React.createElement("h3", null, "Variant Theme Provider"),
                        React.createElement(VariantThemeProvider, { variantType: VariantType.Strong },
                            React.createElement(Stack, { tokens: { childrenGap: 5, padding: 5 } },
                                React.createElement(Label, null, "This Web Part implements an example on how to use the 'Fluent UI' theme library and how to apply/generate theme variation for the Web Part itself."),
                                React.createElement(PrimaryButton, null, "Primary Button"),
                                React.createElement(DefaultButton, null, "Default Button"),
                                React.createElement(Link, null, "Link")))),
                controlVisibility.EnhancedThemeProvider &&
                    React.createElement("div", { id: "EnhancedThemeProviderDiv", className: styles.container },
                        React.createElement("h3", null, "Enhanced Theme Provider"),
                        React.createElement(EnhancedThemeProvider, { applyTo: "element", context: this.props.context, theme: this.props.themeVariant },
                            React.createElement(ControlsTestEnhancedThemeProviderFunctionComponent, null),
                            React.createElement(ControlsTestEnhancedThemeProvider, null))),
                controlVisibility.AdaptiveCardDesignerHost &&
                    React.createElement("div", { id: "AdaptiveCardDesignerHostDiv", className: styles.container },
                        React.createElement("h3", null, "Adaptive Card Designer Host"),
                        React.createElement(AdaptiveCardDesignerHost, { headerText: "Adaptive Card Designer", buttonText: "Open Designer", card: { "$schema": "http://adaptivecards.io/schemas/adaptive-card.json", "type": "AdaptiveCard", "version": "1.5", "body": [{ "type": "ColumnSet", "columns": [{ "width": "auto", "items": [{ "type": "Image", "size": "Small", "style": "Person", "url": "/_layouts/15/userphoto.aspx?size=M&username=${$root['@context']['userInfo']['email']}" }], "type": "Column" }, { "width": "stretch", "items": [{ "type": "TextBlock", "text": "${$root['@context']['userInfo']['displayName']}", "weight": "Bolder" }, { "type": "TextBlock", "spacing": "None", "text": "${$root['@context']['userInfo']['email']}" }], "type": "Column" }] }] }, data: undefined, context: this.props.context, theme: this.props.themeVariant, onSave: function (payload) { return alert(JSON.stringify(payload)); }, snippets: [{
                                    name: "Persona",
                                    category: "Snippets",
                                    payload: {
                                        type: "ColumnSet",
                                        columns: [
                                            {
                                                width: "auto",
                                                items: [
                                                    {
                                                        type: "Image",
                                                        size: "Small",
                                                        style: "Person",
                                                        url: "/_layouts/15/userphoto.aspx?size=M&username=${$root['@context']['userInfo']['email']}"
                                                    }
                                                ]
                                            },
                                            {
                                                width: "stretch",
                                                items: [
                                                    {
                                                        type: "TextBlock",
                                                        text: "${$root['@context']['userInfo']['displayName']}",
                                                        weight: "Bolder"
                                                    },
                                                    {
                                                        type: "TextBlock",
                                                        spacing: "None",
                                                        text: "${$root['@context']['userInfo']['email']}"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }] })),
                controlVisibility.ShareDialog &&
                    React.createElement("div", { id: "ShareDialogDiv", className: styles.container },
                        React.createElement(PrimaryButton, { text: "Open Share dialog", onClick: function () { _this.setState({ isOpenShareDialog: true }); } }),
                        React.createElement(ShareDialog, { isOpen: this.state.isOpenShareDialog, onClose: function () { return _this.setState({ isOpenShareDialog: false }); }, options: {
                                siteUrl: this.props.context.pageContext.web.absoluteUrl,
                                listId: 'b1416fca-dc77-4198-a082-62a7657dcfa9',
                                itemId: 1,
                                name: 'Document Name'
                            } })),
                controlVisibility.TaxonomyTree &&
                    React.createElement("div", { id: "TaxonomyTreeDiv", className: styles.container, hidden: !controlVisibility.TaxonomyTree },
                        React.createElement("h3", null, "Modern Taxonomy Tree"),
                        this.state.termStoreInfo && (React.createElement(TaxonomyTree, { languageTag: this.state.termStoreInfo.defaultLanguageTag, onLoadMoreData: this.spTaxonomyService.getTerms, pageSize: 50, setTerms: function (value) { return _this.setState({ testTerms: value }); }, termStoreInfo: this.state.termStoreInfo, termSetInfo: this.state.termSetInfo, terms: this.state.testTerms, onRenderActionButton: function () { return React.createElement("button", null, "test button"); }, hideDeprecatedTerms: false, showIcons: true }))),
                controlVisibility.TestControl &&
                    React.createElement("div", { id: "TestControlDiv", className: styles.container },
                        React.createElement(TestControl, { context: this.props.context, themeVariant: this.props.themeVariant })),
                controlVisibility.UploadFiles &&
                    React.createElement("div", { id: "UploadFilesDiv", className: styles.container },
                        React.createElement("h3", null, "Upload Files"),
                        React.createElement(EnhancedThemeProvider, { theme: this.props.themeVariant, context: this.props.context },
                            React.createElement(Stack, null,
                                React.createElement(UploadFiles, { context: this.props.context, title: "Upload Files", onUploadFiles: function (files) {
                                        console.log("files", files);
                                    }, themeVariant: this.props.themeVariant })))),
                controlVisibility.UserPicker &&
                    React.createElement("div", { id: "UserPickerDiv", className: styles.container },
                        React.createElement(UserPicker, { context: this.props.context, secondaryTextPropertyName: "mail", theme: this.props.themeVariant, placeholder: "Search User" })),
                controlVisibility.Calendar &&
                    React.createElement("div", { id: "CalendarDiv", className: styles.container },
                        React.createElement(TestCalendarControl, { context: this.props.context, theme: this.props.themeVariant, hasTeamsContext: false, themeString: 'default', title: 'Calendar', appHostName: EAppHostName.SharePoint })),
                controlVisibility.WorldMap &&
                    React.createElement("div", { id: "WorldMapDiv", className: styles.container },
                        React.createElement(WorldMap, { description: 'World Map Sample', isDarkTheme: false, hasTeamsContext: false, title: 'Microsoft Locations Worldwide' })))));
    };
    ControlsTest.prototype.onExpandCollapseTree = function (item, isExpanded) {
        console.log((isExpanded ? "item expanded: " : "item collapsed: ") + item);
    };
    ControlsTest.prototype.onItemSelected = function (items) {
        console.log("items selected: " + items.length);
    };
    ControlsTest.prototype.renderCustomTreeItem = function (item) {
        return (React.createElement("span", null,
            item.iconProps &&
                React.createElement("i", { className: "ms-Icon ms-Icon--" + item.iconProps.iconName, style: { paddingRight: '4px' } }),
            item.label));
    };
    ControlsTest.prototype._getPage = function (page) {
        console.log('Page:', page);
    };
    return ControlsTest;
}(React.Component));
export default ControlsTest;
//# sourceMappingURL=ControlsTest.js.map