import * as React from 'react';

import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '../../../controls/accessibleAccordion';
import {
  Action,
  AdaptiveCardHostThemeType,
  CardElement,
  CardObjectRegistry,
  HostCapabilities,
} from '../../../AdaptiveCardHost';
import {
  ApplicationType,
  IconType,
  ImageSize,
} from '../../../FileTypeIcon';
import {
  CarouselButtonsDisplay,
  CarouselButtonsLocation,
  CarouselIndicatorShape,
  CarouselIndicatorsDisplay,
} from '../../../controls/carousel';
import {
  ControlsTestEnhancedThemeProvider,
  ControlsTestEnhancedThemeProviderFunctionComponent,
} from './ControlsTestEnhancedThemeProvider';
import {
  DateConvention,
  TimeConvention,
} from '../../../DateTimePicker';
import {
  DefaultButton,
  PrimaryButton,
} from '@fluentui/react/lib/Button';
import {
  DialogFooter,
  DialogType,
  IDialogContentProps,
} from '@fluentui/react/lib/Dialog';
import {
  DisplayMode,
  Environment,
  EnvironmentType,
  Guid
} from '@microsoft/sp-core-library';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  IDocumentCardPreviewProps,
} from '@fluentui/react/lib/DocumentCard';
import {
  Dropdown,
  IDropdownOption,
} from '@fluentui/react/lib/Dropdown';
import {
  ExclamationCircleIcon,
  Flex,
  Text as NorthstarText,
  ScreenshareIcon,
  ShareGenericIcon,
} from '@fluentui/react-northstar';
import {
  GroupOrder,
  IGrouping,
  IViewField,
  SelectionMode,
} from '../../../ListView';
import {
  IBasePickerStyles,
  ITag,
} from '@fluentui/react/lib/Pickers';
import {
  IPeoplePickerContext,
  PrincipalType,
} from '../../../controls/peoplepicker';
//#region Import FluentUI Controls
import { IPersonaProps, Persona } from '@fluentui/react';
import {
  IPickerTerms,
  UpdateType,
} from '../../../TaxonomyPicker';
import {
  ITreeItem,
  TreeItemActionsDisplayMode,
  TreeViewSelectionMode,
} from '../../../controls/treeView';

import { Accordion } from '../../../controls/accordion';
import {
  ChartType,
} from '../../../ChartControl';
import {
  CustomCollectionFieldType,
} from '../../../FieldCollectionData';
import { DayOfWeek } from '@fluentui/react/lib/DateTimeUtilities';
import { EAppHostName } from '../../../controls/userPicker/constants/EAppHostname';
import { FilterBar } from '../../../FilterBar';
//#endregion
import { GeneralHelper } from '../../../Utilities';
import { IControlsTestProps } from './IControlsTestProps';
import { IControlsTestState } from './IControlsTestState';
import { IFileInfo } from '@pnp/sp/files';
import {
  IFilePickerResult,
} from '../../../FilePicker';
import {
  IFolder,
} from '../../../FolderExplorer';
import { IFrameDialogProps } from '../../../IFrameDialog';
import { IIconProps } from '@fluentui/react/lib/Icon';
import {
  ILocationPickerItem,
} from '../../../controls/locationPicker/ILocationPicker';
import { IModalProps } from '@fluentui/react/lib/Modal';
import {
  IProgressAction,
} from '../../../Progress';
import { ISize } from '@fluentui/react/lib/Utilities';
import { IStep } from '../../../controls/ProgressStepsIndicator';
import { ITerm } from '../../../services/ISPTermStorePickerService';
import { ImageFit } from '@fluentui/react/lib/Image';
import { Label } from '@fluentui/react/lib/Label';
import { Link } from '@fluentui/react/lib/Link';
import {
  MapType,
} from '../../../Map';
import {
  ModernAudioLabelPosition,
} from '../../../ModernAudio';
import { PanelType } from '@fluentui/react/lib/Panel';
import {
  PermissionLevel,
} from '../../../SecurityTrimmedControl';
import { SPHttpClient } from '@microsoft/sp-http';
import { SPPermission } from '@microsoft/sp-page-context';
import {
  SPTaxonomyService
} from '../../../ModernTaxonomyPicker';
import SPTermStorePickerService
  from '../../../services/SPTermStorePickerService';
import { Stack } from '@fluentui/react/lib/Stack';
import {
  TermActionsDisplayMode,
} from '../../../controls/taxonomyPicker/termActions';
import { TermActionsDisplayStyle } from '../../../controls/taxonomyPicker';
import TestCalendarControl from './TestCalendarControl';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';
import {
  TimeDisplayControlType,
} from '../../../controls/dateTimePicker/TimeDisplayControlType';
import {
  VariantType,
} from '../../../controls/variantThemeProvider';
import {
  WidgetSize,
} from '../../../controls/dashboard';
import WorldMap from './WorldMap';
import { debounce } from 'lodash';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { sp } from '@pnp/sp';
import styles from './ControlsTest.module.scss';

//#endregion


//#region Import PnP Controls
const AdaptiveCardDesignerHost = React.lazy(() => import('../../../AdaptiveCardDesignerHost').then(module => ({ default: module.AdaptiveCardDesignerHost })));
const AdaptiveCardHost = React.lazy(() => import('../../../AdaptiveCardHost').then(module => ({ default: module.AdaptiveCardHost })));

const AnimatedDialog = React.lazy(() => import('../../../AnimatedDialog').then(module => ({ default: module.AnimatedDialog })));

const ChartControl = React.lazy(() => import('../../../ChartControl').then(module => ({ default: module.ChartControl })));

const AccessibleAccordion = React.lazy(() => import('../../../controls/accessibleAccordion').then(module => ({ default: module.Accordion })));

const Carousel = React.lazy(() => import('../../../controls/carousel').then(module => ({ default: module.Carousel })));

const ContentTypePicker = React.lazy(() => import('../../../controls/contentTypePicker').then(module => ({ default: module.ContentTypePicker })));

const Dashboard = React.lazy(() => import('../../../controls/dashboard').then(module => ({ default: module.Dashboard })));

const DynamicForm = React.lazy(() => import('../../../controls/dynamicForm').then(module => ({ default: module.DynamicForm })));
const IconPicker = React.lazy(() => import('../../../controls/iconPicker').then(module => ({ default: module.IconPicker })));
const ComboBoxListItemPicker = React.lazy(() =>
  import('../../../controls/listItemPicker/ComboBoxListItemPicker').then(module => ({ default: module.ComboBoxListItemPicker })));

const LivePersona = React.lazy(() => import('../../../controls/LivePersona').then(module => ({ default: module.LivePersona })));

const LocationPicker = React.lazy(() => import('../../../controls/locationPicker/LocationPicker').then(module => ({ default: module.LocationPicker })));

const ModernTaxonomyPicker = React.lazy(() => import('../../../controls/modernTaxonomyPicker/ModernTaxonomyPicker').then(module => ({ default: module.ModernTaxonomyPicker })));
const MonacoEditor = React.lazy(() => import('../../../controls/monacoEditor').then(module => ({ default: module.MonacoEditor })));
const MyTeams = React.lazy(() => import('../../../controls/MyTeams').then(module => ({ default: module.MyTeams })));
const Pagination = React.lazy(() => import('../../../controls/pagination').then(module => ({ default: module.Pagination })));

const PeoplePicker = React.lazy(() => import('../../../controls/peoplepicker').then(module => ({ default: module.PeoplePicker })));

const ProgressStepsIndicator = React.lazy(() => import('../../../controls/ProgressStepsIndicator').then(module => ({ default: module.ProgressStepsIndicator })));

const SitePicker = React.lazy(() => import('../../../controls/sitePicker/SitePicker').then(module => ({ default: module.SitePicker })));
const Toolbar = React.lazy(() => import('../../../controls/toolbar').then(module => ({ default: module.Toolbar })));
const TreeView = React.lazy(() => import('../../../controls/treeView').then(module => ({ default: module.TreeView })));
const UploadFiles = React.lazy(() => import('../../../controls/uploadFiles').then(module => ({ default: module.UploadFiles })));
const VariantThemeProvider = React.lazy(() => import('../../../controls/variantThemeProvider').then(module => ({ default: module.VariantThemeProvider })));
const ViewPicker = React.lazy(() => import('../../../ViewPicker').then(module => ({ default: module.ViewPicker })));

const DateTimePicker = React.lazy(() => import('../../../DateTimePicker').then(module => ({ default: module.DateTimePicker })));

const DragDropFiles = React.lazy(() => import('../../../DragDropFiles').then(module => ({ default: module.DragDropFiles })));

const EnhancedThemeProvider = React.lazy(() => import('../../../EnhancedThemeProvider').then(module => ({ default: module.EnhancedThemeProvider })));

const FieldCollectionData = React.lazy(() => import('../../../FieldCollectionData').then(module => ({ default: module.FieldCollectionData })));

const FieldPicker = React.lazy(() => import('../../../FieldPicker').then(module => ({ default: module.FieldPicker })));

const FilePicker = React.lazy(() => import('../../../FilePicker').then(module => ({ default: module.FilePicker })));

const FileTypeIcon = React.lazy(() => import('../../../FileTypeIcon').then(module => ({ default: module.FileTypeIcon })));

const FolderExplorer = React.lazy(() => import('../../../FolderExplorer').then(module => ({ default: module.FolderExplorer })));

const FolderPicker = React.lazy(() => import('../../../FolderPicker').then(module => ({ default: module.FolderPicker })));
const GridLayout = React.lazy(() => import('../../../GridLayout').then(module => ({ default: module.GridLayout })));
const HoverReactionsBar = React.lazy(() => import('../../../HoverReactionsBar').then(module => ({ default: module.HoverReactionsBar })));

const IFrameDialog = React.lazy<React.ComponentType<IFrameDialogProps>>(() => import('../../../IFrameDialog').then(module => ({ default: module.IFrameDialog })));

const IFramePanel = React.lazy(() => import('../../../IFramePanel').then(module => ({ default: module.IFramePanel })));
const ImagePicker = React.lazy(() => import('../../../ImagePicker').then(module => ({ default: module.ImagePicker })));
const ListItemAttachments = React.lazy(() => import('../../../ListItemAttachments').then(module => ({ default: module.ListItemAttachments })));
const ListItemComments = React.lazy(() => import('../../../ListItemComments').then(module => ({ default: module.ListItemComments })));
const ListItemPicker = React.lazy(() => import('../../../ListItemPicker').then(module => ({ default: module.ListItemPicker })));
const ListPicker = React.lazy(() => import('../../../ListPicker').then(module => ({ default: module.ListPicker })));

const ListView = React.lazy(() => import('../../../ListView').then(module => ({ default: module.ListView })));

const Map = React.lazy(() => import('../../../Map').then(module => ({ default: module.Map })));

const ModernAudio = React.lazy(() => import('../../../ModernAudio').then(module => ({ default: module.ModernAudio })));

const TaxonomyTree = React.lazy(() => import('../../../ModernTaxonomyPicker').then(module => ({ default: module.TaxonomyTree })));

const Placeholder = React.lazy(() => import('../../../Placeholder').then(module => ({ default: module.Placeholder })));

const Progress = React.lazy(() => import('../../../Progress').then(module => ({ default: module.Progress })));

const RichText = React.lazy(() => import('../../../RichText').then(module => ({ default: module.RichText })));
const ShareDialog = React.lazy(() => import('../../../ShareDialog').then(module => ({ default: module.ShareDialog })));

const SecurityTrimmedControl = React.lazy(() => import('../../../SecurityTrimmedControl').then(module => ({ default: module.SecurityTrimmedControl })));

const SiteBreadcrumb = React.lazy(() => import('../../../SiteBreadcrumb').then(module => ({ default: module.SiteBreadcrumb })));

const TaxonomyPicker = React.lazy(() => import('../../../TaxonomyPicker').then(module => ({ default: module.TaxonomyPicker })));

const TeamChannelPicker = React.lazy(() => import('../../../TeamChannelPicker').then(module => ({ default: module.TeamChannelPicker })));
const TeamPicker = React.lazy(() => import('../../../TeamPicker').then(module => ({ default: module.TeamPicker })));
const TermSetNavigation = React.lazy(() => import('../../../TermSetNavigation').then(module => ({ default: module.TermSetNavigation })));
const WebPartTitle = React.lazy(() => import('../../../WebPartTitle').then(module => ({ default: module.WebPartTitle })));

const TestControl = React.lazy(() => import('./TestControl').then(module => ({ default: module.TestControl })));

const UserPicker = React.lazy(() => import('../../../UserPicker').then(module => ({ default: module.UserPicker })));

// Used to render document card
/**
 * The sample data below was randomly generated (except for the title). It is used by the grid layout
 */
const sampleGridData: any[] = [{
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

const sampleItems = [
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

const toolbarFilters = [{
  id: "filter1",
  title: "filter1"
},
{
  id: "filter2",
  title: "filter2"
}];

const filterBarFilters = [{
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
export default class ControlsTest extends React.Component<IControlsTestProps, IControlsTestState> {
  private spTaxonomyService = new SPTaxonomyService(this.props.context);
  private theme = window["__themeState__"].theme;
  private pickerStylesSingle: Partial<IBasePickerStyles> = {
    root: {
      width: "100%",
      borderRadius: 0,
      marginTop: 0,
    },
    input: {
      width: "100%",
      backgroundColor: this.theme.white,
    },
    text: {
      borderStyle: "solid",
      width: "100%",
      borderWidth: 1,
      backgroundColor: this.theme.white,
      borderRadius: 0,
      borderColor: this.theme.neutralQuaternaryAlt,
      ":focus": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: this.theme.themePrimary,
      },
      ":hover": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: this.theme.themePrimary,
      },
      ":after": {
        borderWidth: 0,
        borderRadius: 0,
      },
    },
  };
  private onSelectedChannel = (teamsId: string, channelId: string) => {
    alert(`TeamId: ${teamsId}\n ChannelId: ${channelId}\n`);
    console.log("TeamsId", teamsId);
    console.log("ChannelId", channelId);
  }

  /**
   * Static array for carousel control example.
   */
  private carouselElements = [
    <div id="1" key="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a mattis libero, nec consectetur neque. Suspendisse potenti. Fusce ultrices faucibus consequat. Suspendisse ex diam, ullamcorper sit amet justo ac, accumsan congue neque. Vestibulum aliquam mauris non justo convallis, id molestie purus sodales. Maecenas scelerisque aliquet turpis, ac efficitur ex iaculis et. Vivamus finibus mi eget urna tempor, sed porta justo tempus. Vestibulum et lectus magna. Integer ante felis, ullamcorper venenatis lectus ac, vulputate pharetra magna. Morbi eget nisl tempus, viverra diam ac, mollis tortor. Nam odio ex, viverra bibendum mauris vehicula, consequat suscipit ligula. Nunc sed ultrices augue, eu tincidunt diam.</div>,
    <div id="2" key="2">Quisque metus lectus, facilisis id consectetur ac, hendrerit eget quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut faucibus posuere felis vel efficitur. Maecenas et massa in sem tincidunt finibus. Duis sit amet bibendum nisi. Vestibulum pretium pretium libero, vel tincidunt sem vestibulum sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin quam lorem, venenatis id bibendum id, tempus eu nibh. Sed tristique semper ligula, vitae gravida diam gravida vitae. Donec eget posuere mauris, pharetra semper lectus.</div>,
    <div id="3" key="3">Pellentesque tempor et leo at tincidunt. Vivamus et leo sed eros vehicula mollis vitae in dui. Duis posuere sodales enim ut ultricies. Cras in venenatis nulla. Ut sed neque dignissim, sollicitudin tellus convallis, placerat leo. Aliquam vestibulum, leo pharetra sollicitudin pretium, ipsum nisl tincidunt orci, in molestie ipsum dui et mi. Praesent aliquam accumsan risus sed bibendum. Cras consectetur elementum turpis, a mollis velit gravida sit amet. Praesent non augue cursus, varius justo at, molestie lorem. Nulla cursus tellus quis odio congue elementum. Vivamus sit amet quam nec lectus hendrerit blandit. Duis ac condimentum sem. Morbi hendrerit elementum purus, non facilisis arcu bibendum vitae. Vivamus commodo tristique euismod.</div>,
    <div id="4" key="4">Proin semper egestas porta. Nullam risus nisl, auctor ac hendrerit in, dapibus quis ex. Quisque vitae nisi quam. Etiam vel sapien ut libero ornare rhoncus nec vestibulum dolor. Curabitur lacinia aliquam arcu. Proin ultrices risus velit, in vehicula tellus vehicula at. Sed ultrices et felis fringilla ultricies.</div>,
    <div id="5" key="5">Donec orci lorem, imperdiet eu nisi sit amet, condimentum scelerisque tortor. Etiam nec lacinia dui. Duis non turpis neque. Sed pellentesque a erat et accumsan. Pellentesque elit odio, elementum nec placerat nec, ornare in tortor. Suspendisse gravida magna maximus mollis facilisis. Duis odio libero, finibus ac suscipit sed, aliquam et diam. Aenean posuere lacus ex. Donec dapibus, sem ac luctus ultrices, justo libero tempor eros, vitae lacinia ex ante non dolor. Curabitur condimentum, ligula id pharetra dictum, libero libero ullamcorper nunc, eu blandit sem arcu ut felis. Nullam lacinia dapibus auctor.</div>
  ];

  private skypeCheckIcon: IIconProps = { iconName: 'SkypeCheck' };
  private treeitems = [
    {
      key: "R1",
      label: "Root",
      subLabel: "This is a sub label for node",
      iconProps: this.skypeCheckIcon,
      actions: [{
        title: "Get item",
        iconProps: {
          iconName: 'Warning',
          style: {
            color: 'salmon',
          },
        },
        id: "GetItem",
        actionCallback: async (treeItem: ITreeItem) => {
          console.log(treeItem);
        }
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
                actionCallback: async (treeItem: ITreeItem) => {
                  console.log(treeItem);
                }
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
                    actionCallback: async (treeItem: ITreeItem) => {
                      console.log(treeItem);
                    }
                  }]
                }
              ]
            },
            {
              key: "4",
              label: "Child 2",
              iconProps: this.skypeCheckIcon
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

  private progressSteps: IStep[] = [
    { id: 0, title: "Step 1", description: "Step 1 Description" },
    { id: 1, title: "Step 2", description: "Step 2 Description" },
    { id: 3, title: "Step 3", description: "Step 3 Description" },
    { id: 4, title: "Step 4", description: "Step 4 Description" },
    { id: 5, title: "Step 5", description: "Step 5 Description" },
    { id: 6, title: "Step 6", description: "Step 6 Description" },
  ];
  private divRefAddReaction: React.RefObject<HTMLDivElement> = React.createRef();
  private peoplePickerContext: IPeoplePickerContext;
  private termSetId: string = "8ed8c9ea-7052-4c1d-a4d7-b9c10bffea6f";

  constructor(props: IControlsTestProps) {
    super(props);

    this.state = {
      imgSize: ImageSize.small,
      items: [],
      iFrameDialogOpened: false,
      iFramePanelOpened: false,
      initialValues: [],
      authorEmails: [],
      selectedList: null,
      progressActions: this._initProgressActions(),
      dateTimeValue: new Date(),
      richTextValue: null,
      canMovePrev: false,
      canMoveNext: true,
      currentCarouselElement: this.carouselElements[0],
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
      filters: [...filterBarFilters],
      selectedUrlImagePicker: "",
      isOpenHoverReactionBar: false,
      isOpenShareDialog: false,
    };

    this.peoplePickerContext = {
      absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
      msGraphClientFactory: this.props.context.msGraphClientFactory,
      spHttpClient: this.props.context.spHttpClient
    };

    this._onIconSizeChange = this._onIconSizeChange.bind(this);
    this._onConfigure = this._onConfigure.bind(this);
    this._startProgress = this._startProgress.bind(this);
    this.onServicePickerChange = this.onServicePickerChange.bind(this);
  }

  /**
   * React componentDidMount lifecycle hook
   */
  public async componentDidMount() {
    const restApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('Shared%20Documents')/files?$expand=ListItemAllFields`;
    const response = await this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1);
    const items = await response.json();

    sp.setup({
      spfxContext: this.props.context as any
    });

    this.setState({
      items: items.value ? items.value : [],
      termStoreInfo: await this.spTaxonomyService.getTermStoreInfo()
    });

    // // Get Authors in the SharePoint Document library -- For People Picker Testing
    // const restAuthorApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Documents')/Items?$select=Id, Author/EMail&$expand=Author/EMail`;
    // this.props.context.spHttpClient.get(restAuthorApi, SPHttpClient.configurations.v1)
    // .then(resp => { return resp.json(); })
    // .then(items => {
    //   let emails : string[] = items.value ? items.value.map((item, key)=> { return item.Author.EMail}) : [];
    //   console.log(emails);
    //   this.setState({
    //     authorEmails: emails
    //   });
    // });
  }

  async componentDidUpdate(prevProps: Readonly<IControlsTestProps>, prevState: Readonly<IControlsTestState>, snapshot?: any): Promise<void> {
    if (prevProps.controlVisibility !== this.props.controlVisibility) {
      if (this.props.controlVisibility.TaxonomyTree) {
        let termsSet = null;

        try {
          termsSet = await this.spTaxonomyService.getTermSetInfo(Guid.parse(this.termSetId));
        } catch (error) {
          /** no-op */
        }

        this.setState({
          termSetInfo: termsSet
        });
      }
    }
  }

  /**
   * Event handler when changing the icon size in the dropdown
   * @param element
   */
  private _onIconSizeChange(element?: IDropdownOption): void {
    this.setState({
      imgSize: parseInt(element.key.toString())
    });
  }

  /**
   * Open the property pane
   */
  private _onConfigure() {
    this.props.context.propertyPane.open();
  }

  /**
   * Method that retrieves the selected items in the list view
   * @param items
   */
  private _getSelection(items: any[]) {
    console.log('Items:', items);
  }

  /**
  * Method that retrieves files from drag and drop
  * @param files
  */
  private _getDropFiles = (files) => {
    for (var i = 0; i < files.length; i++) {
      console.log("File name: " + files[i].name);
      console.log("Folder Path: " + files[i].fullPath);
    }
  }

  /**
   *
   *Method that retrieves the selected terms from the taxonomy picker and sets state
   * @private
   * @param {IPickerTerms} terms
   * @memberof ControlsTest
   */
  private onServicePickerChange = (terms: IPickerTerms): void => {
    this.setState({
      initialValues: terms
    });
    // console.log("serviceTerms", terms);
  }

  /**
   * Method that retrieves the selected terms from the taxonomy picker
   * @param terms
   */
  private _onTaxPickerChange = (terms: IPickerTerms) => {
    this.setState({
      initialValues: terms,
      errorMessage: terms.length > 0 ? '' : 'This field is required'
    });
    console.log("Terms:", terms);
  }

  /**
   * Method that retrieves the selected date/time from the DateTime picker
   * @param dateTimeValue
   */
  private _onDateTimePickerChange = (dateTimeValue: Date) => {
    this.setState({ dateTimeValue });
    console.log("Selected Date/Time:", dateTimeValue.toLocaleString());
  }

  /**
   * Selected lists change event
   * @param lists
   */
  private onListPickerChange = (lists: string | string[]) => {
    console.log("Lists:", lists);
    this.setState({
      selectedList: typeof lists === "string" ? lists : lists.pop()
    });
  }

  /**
   * Selected View change event
   * @param views
   */
  private onViewPickerChange = (views: string | string[]) => {
    console.log("Views:", views);
  }

  /**
   * Deletes second item from the list
   */
  private deleteItem = () => {
    const { items } = this.state;
    if (items.length >= 2) {
      items.splice(1, 1);
      this.setState({
        items: items
      });
    }
  }

  /**
   * Method that retrieves the selected items from People  Picker
   * @param items
   */
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }

  /**
   * Selected item from the list data picker
   */
  private listItemPickerDataSelected(item: any) {
    console.log(item);
  }

  private _startProgress() {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      const actions = this.state.progressActions;

      if (currentIndex >= actions.length) {
        clearInterval(intervalId);
      } else {
        const action = actions[currentIndex];
        if (currentIndex === 1) { // just a test for error
          action.hasError = true;
          action.errorMessage = 'some error message';
        }
      }

      this.setState({
        currentProgressActionIndex: currentIndex,
        progressActions: actions
      });
      currentIndex++;
    }, 5000);
  }

  private _initProgressActions(): IProgressAction[] {
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
  }

  /**
   * Triggers element change for the carousel example.
   */
  private triggerNextElement = (index: number): void => {
    const canMovePrev = index > 0;
    const canMoveNext = index < this.carouselElements.length - 1;
    const nextElement = this.carouselElements[index];

    setTimeout(() => {
      this.setState({
        canMovePrev,
        canMoveNext,
        currentCarouselElement: nextElement
      });
    }, 500);
  }

  private _onFilePickerSave = async (filePickerResult: IFilePickerResult[]) => {
    if (filePickerResult && filePickerResult.length > 0) {
      for (var i = 0; i < filePickerResult.length; i++) {
        const item = filePickerResult[i];
        const fileResultContent = await item.downloadFileContent();
        console.log(fileResultContent);
        filePickerResult[i].fileSize = fileResultContent.size;
      }

      this.setState({ filePickerResult: filePickerResult });
    }
  }

  private onToolbarSelectedFiltersChange = (filterIds: string[]) => {
    this.setState({
      selectedFilters: filterIds
    });
  }

  private toggleToolbarFilter = (filterId: string) => {
    this.setState(({ selectedFilters }) => {
      if (selectedFilters.includes(filterId)) {
        return { selectedFilters: selectedFilters.filter(f => f !== filterId) };
      } else {
        return { selectedFilters: [...selectedFilters, filterId] };
      }
    });
  }

  private rootFolder: IFolder = {
    Name: "Site",
    ServerRelativeUrl: this.props.context.pageContext.web.serverRelativeUrl
  };

  private _onFolderSelect = (folder: IFolder): void => {
    console.log('selected folder', folder);

  }

  private addFilter = () => {
    const number = Math.floor(Math.random()*10)
    const i = { label: `Field${number}`, value: `Field ${number}`};
    this.setState({
      filters: [...this.state.filters, i]
    });
  }

  private onClearFilters = () => {
    console.log("Cleared all filters");
    this.setState({ filters: []});
  }

  private onRemoveFilter = (label: string, value: string) => {
    console.log(`Cleared ${label} ${value}`);
    const itm = this.state.filters.find(i => i.label === label && i.value === value);
    if (itm) {
        const index = this.state.filters.indexOf(itm);
        this.state.filters.splice(index, 1)

        this.setState({
          filters: [...this.state.filters]
        });
    }
  }

  private _onFileClick = (file: IFileInfo): void => {
    console.log('file click', file);
  }

  private _onRenderGridItem = (item: any, _finalSize: ISize, isCompact: boolean): JSX.Element => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.thumbnail,
          imageFit: ImageFit.cover,
          height: 130
        }
      ]
    };


    return <div
      //className={styles.documentTile}
      data-is-focusable={true}
      role="listitem"
      aria-label={item.title}
    >
      <DocumentCard
        type={isCompact ? DocumentCardType.compact : DocumentCardType.normal}
        onClick={(ev: React.SyntheticEvent<HTMLElement>) => alert("You clicked on a grid item")}

      >
        <DocumentCardPreview {...previewProps} />
        {!isCompact && <DocumentCardLocation location={item.location} />}
        <div>
          <DocumentCardTitle
            title={item.title}
            shouldTruncate={true}
          />
          <DocumentCardActivity
            activity={item.activity}
            people={[{ name: item.name, profileImageSrc: item.profileImageSrc }]}
          />
        </div>
      </DocumentCard>
    </div>;
  }

  /**
   * Renders the component
   */
  public render(): React.ReactElement<IControlsTestProps> {
    const { controlVisibility } = this.props;

    let dynamicFormListItemId: number;
    if (!isNaN(Number(this.props.dynamicFormListItemId))) {
      dynamicFormListItemId = Number(this.props.dynamicFormListItemId);
    }

    const dynamicFormCustomTitleIcon: { [key: string]: string } = {};
    dynamicFormCustomTitleIcon["Title"] = "FavoriteStar";

    // Size options for the icon size dropdown
    const sizeOptions: IDropdownOption[] = [
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
    const viewFields: IViewField[] = [
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
        render: (item: any) => {
          return <a href={item['ServerRelativeUrl']}>Link</a>;
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
    const groupByFields: IGrouping[] = [{ name: "ListItemAllFields.Department.Label", order: GroupOrder.ascending }];

    let iframeUrl: string = '/temp/workbench.html';
    if (Environment.type === EnvironmentType.SharePoint) {
      iframeUrl = '/_layouts/15/sharepoint.aspx';
    }
    else if (Environment.type === EnvironmentType.ClassicSharePoint) {
      iframeUrl = this.context.pageContext.web.serverRelativeUrl;
    }

    const linkExample = { href: "#" };
    const customizedLinkExample = {
      href: "#",
      title: "This is a customized link!",
      color: "red",
      target: "_top"
    };
    const calloutItemsExample = [
      {
        id: "action_1",
        title: "Info",
        icon: <ExclamationCircleIcon />,
      },
      { id: "action_2", title: "Popup", icon: <ScreenshareIcon /> },
      {
        id: "action_3",
        title: "Share",
        icon: <ShareGenericIcon />,
      },
    ];

    /**
   * Animated dialog related
   */

    const animatedDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Animated Dialog',
      subText: 'Do you like the animated dialog?',
    };

    const animatedModalProps: IModalProps = {
      isDarkOverlay: true
    };

    const customizedAnimatedModalProps: IModalProps = {
      isDarkOverlay: true,
      containerClassName: `${styles.dialogContainer}`
    };

    const customizedAnimatedDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Animated Dialog'
    };

    const successDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Good answer!'
    };

    const errorDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Uh oh!'
    };

    const timeout = (ms: number): Promise<void> => {
      return new Promise((resolve, reject) => setTimeout(resolve, ms));
    };

    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className={styles.controlsTest}>
          <div className={styles.container}>
            <h3 className={styles.instruction}>Choose which controls to display</h3>
            <div className={`${styles.row} ${styles.controlFiltersContainer}`}>
              <PrimaryButton text="Open Web Part Settings" iconProps={{ iconName: 'Settings' }} onClick={this.props.onOpenPropertyPane} />
            </div>
          </div>
          {controlVisibility.WebPartTitle &&
            <div id="WebPartTitleDiv" className={styles.container}>
              <WebPartTitle displayMode={this.props.displayMode}
                title={this.props.title}
                updateProperty={this.props.updateProperty}
                moreLink={
                  <Link href="https://pnp.github.io/sp-dev-fx-controls-react/">See all</Link>
                } />
            </div>
          }
          {controlVisibility.DynamicForm &&
            <div id="DynamicFormDiv" className={styles.container}>
              <div className="ms-font-l">
                <DynamicForm
                  key={this.props.dynamicFormListId}
                  context={this.props.context}
                  listId={this.props.dynamicFormListId}
                  listItemId={dynamicFormListItemId}
                  validationErrorDialogProps={this.props.dynamicFormErrorDialogEnabled ? { showDialogOnValidationError: true } : undefined}
                  returnListItemInstanceOnSubmit={true}
                  onCancelled={() => { console.log('Cancelled'); }}
                  onSubmitted={async (data, item) => { let itemdata = await item.get(); console.log('Saved item', itemdata) }}
                  useClientSideValidation={this.props.dynamicFormClientSideValidationEnabled}
                  useFieldValidation={this.props.dynamicFormFieldValidationEnabled}
                  useCustomFormatting={this.props.dynamicFormCustomFormattingEnabled}
                  enableFileSelection={this.props.dynamicFormFileSelectionEnabled}
                  customIcons={dynamicFormCustomTitleIcon}
                  useModernTaxonomyPicker={this.props.dynamicFormToggleTaxonomyPicker}
                />
              </div>
            </div>
          }
          {controlVisibility.Teams &&
            <div id="TeamsDiv" className={styles.container}>
              <Stack styles={{ root: { marginBottom: 200 } }}>
                <MyTeams
                  title="My Teams"
                  webPartContext={this.props.context}
                  themeVariant={this.props.themeVariant}
                  enablePersonCardInteraction={true}
                  onSelectedChannel={this.onSelectedChannel}
                />
              </Stack>
              <Stack
                styles={{ root: { margin: "10px 10px 100px 10px" } }}
                tokens={{ childrenGap: 10 }}
              >
                <TeamPicker
                  label="Select Team"
                  themeVariant={this.props.themeVariant}
                  selectedTeams={this.state.selectedTeam}
                  appcontext={this.props.context}
                  itemLimit={1}
                  onSelectedTeams={(tagList: ITag[]) => {
                    this.setState({ selectedTeamChannels: [] });
                    this.setState({ selectedTeam: tagList });
                    console.log(tagList);
                  }}
                />
                {this.state?.selectedTeam && this.state?.selectedTeam.length > 0 && (
                  <>
                    <TeamChannelPicker
                      label="Select Team Channel"
                      themeVariant={this.props.themeVariant}
                      selectedChannels={this.state.selectedTeamChannels}
                      teamId={this.state.selectedTeam[0].key}
                      appcontext={this.props.context}
                      onSelectedChannels={(tagList: ITag[]) => {
                        this.setState({ selectedTeamChannels: tagList });
                        console.log(tagList);
                      }}
                    />
                  </>
                )}
              </Stack>
            </div>
          }
          {controlVisibility.TermSetNavigation &&
            <div id="TermSetNavigationDiv" className={styles.container}>
              <TermSetNavigation
                context={this.props.context}
                themeVariant={this.props.themeVariant}
                termSetId={this.termSetId}
                showContextMenu={true}
                contextMenuItems={[
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
                ]}
              // onSelected={onSelect}
              // onSelectedTermAction={onSelectedTermAction}
              />
            </div>
          }
          {controlVisibility.AccessibleAccordion &&
            <div id="accessibleAccordionDiv" className={styles.container}>
              <AccessibleAccordion allowZeroExpanded theme={this.props.themeVariant}>
                <AccordionItem key={"Headding 1"}>
                  <AccordionItemHeading>
                    <AccordionItemButton>{"Accordion Item Heading 1"}</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div style={{ margin: 20 }}>
                      <h2>Content Heading 1</h2>
                      <Text variant={"mediumPlus"}>Text sample  </Text>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem key={"Headding 2"}>
                  <AccordionItemHeading>
                    <AccordionItemButton>Accordion Item Heading 2</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div style={{ margin: 20 }}>
                      <h2>Content Heading 2</h2>
                      <Text variant={"mediumPlus"}>Text </Text>
                      <TextField></TextField>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </AccessibleAccordion>

              {
                sampleItems.map((item, index) => (
                  <Accordion title={item.Question} defaultCollapsed={false} className={"itemCell"} key={index}>
                    <div className={"itemContent"}>
                      <div className={"itemResponse"}>{item.Reponse}</div>
                      <div className={"itemIndex"}>{`Langue :  ${item.Langue.Nom}`}</div>
                    </div>
                  </Accordion>
                ))
              }
            </div>
          }
          {controlVisibility.TaxonomyPicker &&
            <div id="TaxonomyPickerDiv" className={styles.container}>
              <div className="ms-font-m">Services tester:
                <TaxonomyPicker
                  allowMultipleSelections={true}
                  selectChildrenIfParentSelected={true}
                  //termsetNameOrID="61837936-29c5-46de-982c-d1adb6664b32" // id to termset that has a custom sort
                  termsetNameOrID="8ea5ac06-fd7c-4269-8d0d-02f541df8eb9"
                  initialValues={[{
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
                  }]}
                  validateOnLoad={true}
                  panelTitle="Select Sorted Term"
                  label="Service Picker with custom actions"
                  context={this.props.context}
                  onChange={this.onServicePickerChange}
                  isTermSetSelectable={true}
                  termActions={{
                    actions: [{
                      title: "Get term labels",
                      iconName: "LocaleLanguage",
                      id: "test",
                      invokeActionOnRender: true,
                      hidden: true,
                      actionCallback: async (taxService: SPTermStorePickerService, term: ITerm) => {
                        // const labels = await taxService.getTermLabels(term.Id);
                        // if (labels) {
                        //   let termLabel: string = labels.join(" ; ");
                        //   const updateAction = {
                        //     updateActionType: UpdateType.updateTermLabel,
                        //     value: `${termLabel} (updated)`
                        //   };
                        //   return updateAction;
                        // }
                        const updateAction = {
                          updateActionType: UpdateType.updateTermLabel,
                          value: `${term.Name} (updated)`
                        };
                        return updateAction;
                      },
                      applyToTerm: (term: ITerm) => (term && term.Name && term.Name.toLowerCase() === "about us")
                    },
                      // new TermLabelAction("Get Labels")
                    ],
                    termActionsDisplayMode: TermActionsDisplayMode.buttons,
                    termActionsDisplayStyle: TermActionsDisplayStyle.textAndIcon,
                  }}
                  onPanelSelectionChange={(prev, next) => {
                    console.log(prev);
                    console.log(next);
                  }}
                />

                <TaxonomyPicker
                  allowMultipleSelections={true}
                  termsetNameOrID="8ea5ac06-fd7c-4269-8d0d-02f541df8eb9" // id to termset that has a default sort
                  panelTitle="Select Default Sorted Term"
                  label="Service Picker"
                  context={this.props.context}
                  onChange={this.onServicePickerChange}
                  isTermSetSelectable={false}
                  placeholder="Select service"
                  // validateInput={true}   /* Uncomment this to enable validation of input text */
                  required={true}
                  errorMessage='this field is required'
                  onGetErrorMessage={(value) => { return 'comment errorMessage to see this one'; }}
                />

                <TaxonomyPicker
                  initialValues={this.state.initialValues}
                  allowMultipleSelections={true}
                  termsetNameOrID="41dec50a-3e09-4b3f-842a-7224cffc74c0"
                  anchorId="436a6154-9691-4925-baa5-4c9bb9212cbf"
                  // disabledTermIds={["943fd9f0-3d7c-415c-9192-93c0e54573fb", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                  // disabledTermIds={["943fd9f0-3d7c-415c-9192-93c0e54573fb", "73d18756-20af-41de-808c-2a1e21851e44", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                  // disabledTermIds={["cd6f6d3c-672d-4244-9320-c1e64cc0626f", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                  // disableChildrenOfDisabledParents={true}
                  panelTitle="Select Term"
                  label="Taxonomy Picker"
                  context={this.props.context}
                  onChange={this._onTaxPickerChange}
                  isTermSetSelectable={false}
                  hideDeprecatedTags={true}
                  hideTagsNotAvailableForTagging={true}
                  errorMessage={this.state.errorMessage}
                  termActions={{
                    actions: [{
                      title: "Get term labels",
                      iconName: "LocaleLanguage",
                      id: "test",
                      invokeActionOnRender: true,
                      hidden: true,
                      actionCallback: async (taxService: SPTermStorePickerService, term: ITerm) => {
                        console.log(term.Name, term.TermsCount);
                        return {
                          updateActionType: UpdateType.updateTermLabel,
                          value: `${term.Name} (updated)`
                        };
                      },
                      applyToTerm: (term: ITerm) => (term && term.Name && term.Name === "internal")
                    },
                    {
                      title: "Hide term",
                      id: "hideTerm",
                      invokeActionOnRender: true,
                      hidden: true,
                      actionCallback: async (taxService: SPTermStorePickerService, term: ITerm) => {
                        return {
                          updateActionType: UpdateType.hideTerm,
                          value: true
                        };
                      },
                      applyToTerm: (term: ITerm) => (term && term.Name && (term.Name.toLowerCase() === "help desk" || term.Name.toLowerCase() === "multi-column valo site page"))
                    },
                    {
                      title: "Disable term",
                      id: "disableTerm",
                      invokeActionOnRender: true,
                      hidden: true,
                      actionCallback: async (taxService: SPTermStorePickerService, term: ITerm) => {
                        return {
                          updateActionType: UpdateType.disableTerm,
                          value: true
                        };
                      },
                      applyToTerm: (term: ITerm) => (term && term.Name && term.Name.toLowerCase() === "secured")
                    },
                    {
                      title: "Disable or hide term",
                      id: "disableOrHideTerm",
                      invokeActionOnRender: true,
                      hidden: true,
                      actionCallback: async (taxService: SPTermStorePickerService, term: ITerm) => {
                        if (term.TermsCount > 0) {
                          return {
                            updateActionType: UpdateType.disableTerm,
                            value: true
                          };
                        }
                        return {
                          updateActionType: UpdateType.hideTerm,
                          value: true
                        };
                      },
                      applyToTerm: (term: ITerm) => true
                    }],
                    termActionsDisplayMode: TermActionsDisplayMode.buttons,
                    termActionsDisplayStyle: TermActionsDisplayStyle.textAndIcon
                  }} />

                <DefaultButton text="Add" onClick={() => {
                  this.setState({
                    initialValues: [{
                      key: "ab703558-2546-4b23-b8b8-2bcb2c0086f5",
                      name: "HR",
                      path: "HR",
                      termSet: "b3e9b754-2593-4ae6-abc2-35345402e186"
                    }],
                    errorMessage: ""
                  });
                }} />
              </div>
            </div>
          }
          {controlVisibility.DateTimePicker &&
            <div id="DateTimePickerDiv" className={styles.container}>
              <DateTimePicker label="DateTime Picker (unspecified = date and time)" isMonthPickerVisible={false} showSeconds={false} onChange={(value) => console.log("DateTimePicker value:", value)} placeholder="Pick a date" />
              <DateTimePicker label="DateTime Picker 12-hour clock" showSeconds={true} onChange={(value) => console.log("DateTimePicker value:", value)} timeDisplayControlType={TimeDisplayControlType.Dropdown} minutesIncrementStep={15} />
              <DateTimePicker label="DateTime Picker 24-hour clock" showSeconds={true} timeConvention={TimeConvention.Hours24} onChange={(value) => console.log("DateTimePicker value:", value)} />
              <DateTimePicker label="DateTime Picker no seconds" value={new Date()} onChange={(value) => console.log("DateTimePicker value:", value)} />
              <DateTimePicker label="DateTime Picker (unspecified = date and time)" timeConvention={TimeConvention.Hours24} value={new Date()} onChange={(value) => console.log("DateTimePicker value:", value)} />
              <DateTimePicker label="DateTime Picker dropdown" showSeconds={true} timeDisplayControlType={TimeDisplayControlType.Dropdown} value={new Date()} onChange={(value) => console.log("DateTimePicker value:", value)} />
              <DateTimePicker
                label="DateTime Picker date only"
                showLabels={false}
                dateConvention={DateConvention.Date}
                value={new Date()}
                onChange={(value) => console.log("DateTimePicker value:", value)}
                minDate={new Date("05/01/2019")}
                maxDate={new Date("05/01/2020")} />
              <DateTimePicker label="DateTime Picker (unspecified = date and time)" />

              <DateTimePicker label="DateTime Picker (unspecified = date and time, no seconds)" />

              <DateTimePicker
                label="DateTime Picker (date and time - default time = 12h)"
                dateConvention={DateConvention.DateTime}
                showSeconds={true}
              />

              <DateTimePicker
                label="DateTime Picker (date and time - 12h)"
                dateConvention={DateConvention.DateTime}
                timeConvention={TimeConvention.Hours12}
                showSeconds={false}
              />

              <DateTimePicker
                label="DateTime Picker (date and time - 24h)"
                dateConvention={DateConvention.DateTime}
                timeConvention={TimeConvention.Hours24}
                firstDayOfWeek={DayOfWeek.Monday}
                showSeconds={true}
              />

              <DateTimePicker
                label="DateTime Picker (Controlled)"
                formatDate={d => `${d.getFullYear()} - ${d.getMonth() + 1} - ${d.getDate()}`}
                dateConvention={DateConvention.DateTime}
                timeConvention={TimeConvention.Hours24}
                firstDayOfWeek={DayOfWeek.Monday}
                value={this.state.dateTimeValue}
                onChange={this._onDateTimePickerChange}
                isMonthPickerVisible={false}
                showMonthPickerAsOverlay={true}
                showWeekNumbers={true}
                showSeconds={true}
                timeDisplayControlType={TimeDisplayControlType.Dropdown}
              />
              <PrimaryButton text={'Clear Date'} onClick={() => {

                this.setState({
                  dateTimeValue: undefined
                });
              }} />

              <DateTimePicker
                label="DateTime Picker (date only)"
                dateConvention={DateConvention.Date}
              />

              <DateTimePicker label="DateTime Picker (disabled)" disabled={true} />

              <DateTimePicker label="DateTime Picker (restricted dates)" isMonthPickerVisible={false} showSeconds={false} onChange={(value) => console.log("DateTimePicker value:", value)} placeholder="Pick a date" restrictedDates={[new Date(2024, 1, 15), new Date(2024, 1, 16), new Date(2024, 1, 17)]} />
            </div>
          }
          {controlVisibility.RichText &&
            <div id="RichTextDiv" className={styles.container}>
              {/* <RichText isEditMode={this.props.displayMode === DisplayMode.Edit} onChange={value => { this.richTextValue = value; return value; }} /> */}
              <RichText label="My rich text field" value={this.state.richTextValue} isEditMode={this.props.displayMode === DisplayMode.Edit} onChange={value => { this.setState({ richTextValue: value }); return value; }} />
              <PrimaryButton text='Reset text' onClick={() => { this.setState({ richTextValue: 'test' }); }} />
            </div>
          }
          {controlVisibility.Placeholder &&
            <div id="PlaceholderDiv" className={styles.container}>
              <Placeholder iconName='Edit'
                iconText='Configure your web part'
                description={defaultClassNames => <span className={defaultClassNames}>Please configure the web part.</span>}
                buttonLabel='Configure'
                hideButton={this.props.displayMode === DisplayMode.Read}
                onConfigure={this._onConfigure}
                theme={this.props.themeVariant} />
            </div>
          }
          {controlVisibility.PeoplePicker &&
            <div id="PeoplePickerDiv" className={styles.container}>
              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker custom styles"
                styles={this.pickerStylesSingle}
                personSelectionLimit={1}
                ensureUser={true}
                principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
                onChange={this._getPeoplePickerItems}
                useSubstrateSearch={false} />

              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker with filter for '.com'"
                personSelectionLimit={5}
                ensureUser={true}
                principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
                resultFilter={(result: IPersonaProps[]) => {
                  return result.filter(p => p["loginName"].indexOf(".com") !== -1);
                }}
                onChange={this._getPeoplePickerItems} />

              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker (Group not found)"
                webAbsoluteUrl={this.props.context.pageContext.site.absoluteUrl}
                groupName="Team Site Visitors 123"
                ensureUser={true}
                principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
                defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
                onChange={this._getPeoplePickerItems} />

              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker (search for group)"
                groupName="Team Site Visitors"
                principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
                defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
                onChange={this._getPeoplePickerItems} />

              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker (pre-set global users)"
                principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
                defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
                onChange={this._getPeoplePickerItems}
                personSelectionLimit={2}
                ensureUser={true} />

              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker (pre-set local users)"
                webAbsoluteUrl={this.props.context.pageContext.site.absoluteUrl}
                principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
                defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
                onChange={this._getPeoplePickerItems} />

              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker (tenant scoped)"
                personSelectionLimit={10}
                searchTextLimit={5} //New property : Specifies the minimum character count needed to begin retrieving search results. (default : 2)
                // groupName={"Team Site Owners"}
                showtooltip={true}
                required={true}
                //defaultSelectedUsers={["tenantUser@domain.onmicrosoft.com", "test@user.com"]}
                //defaultSelectedUsers={this.state.authorEmails}
                onChange={this._getPeoplePickerItems}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
                suggestionsLimit={5}
                resolveDelay={200}
                placeholder={'Select a SharePoint principal (User or Group)'}
                onGetErrorMessage={async (items: any[]) => {
                  if (!items || items.length < 2) {
                    return 'error';
                  }
                  return '';
                }} />

              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker (local scoped)"
                webAbsoluteUrl={this.props.context.pageContext.site.absoluteUrl}
                personSelectionLimit={5}
                // groupName={"Team Site Owners"}
                showtooltip={true}
                required={true}
                //defaultSelectedUsers={["tenantUser@domain.onmicrosoft.com", "test@user.com"]}
                //defaultSelectedUsers={this.state.authorEmails}
                onChange={this._getPeoplePickerItems}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
                suggestionsLimit={2}
                resolveDelay={200} />

              <PeoplePicker context={this.peoplePickerContext}
                titleText="People Picker (disabled)"
                disabled={true}
                showtooltip={true}
                defaultSelectedUsers={['aleksei.dovzhyk@sharepointalist.com']} />
            </div>
          }
          {controlVisibility.DragDropFiles &&
            <div id="DragDropFilesDiv" className={styles.container}>
              <b>Drag and Drop Files</b>
              <DragDropFiles
                dropEffect="copy"
                enable={true}
                onDrop={this._getDropFiles}
                iconName="Upload"
                labelMessage="My custom upload File"
              >
                <Placeholder iconName='BulkUpload'
                  iconText='Drag files or folder with files here...'
                  description={defaultClassNames => <span className={defaultClassNames}>Drag files or folder with files here...</span>}
                  buttonLabel='Configure'
                  hideButton={this.props.displayMode === DisplayMode.Read}
                  onConfigure={this._onConfigure} />
              </DragDropFiles>
            </div>
          }
          {controlVisibility.ListView &&
            <div id="ListViewDiv" className={styles.container}>
              <ListView items={this.state.items}
                viewFields={viewFields}
                iconFieldName='ServerRelativeUrl'
                groupByFields={groupByFields}
                compact={true}
                selectionMode={SelectionMode.single}
                selection={this._getSelection}
                showFilter={true}
                dragDropFiles={true}
                onDrop={this._getDropFiles}
                stickyHeader={true}
                className={styles.listViewWrapper}
              // defaultFilter="Team"
              />
            </div>
          }
          {controlVisibility.ChartControl &&
            <div id="ChartControlDiv" className={styles.container}>
              <ChartControl type={ChartType.Bar}
                data={{
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
                }}
                options={{
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }} />
            </div>
          }
          {controlVisibility.Map &&
            <div id="MapDiv" className={styles.container}>
              <Map titleText="New map control"
                coordinates={{ latitude: 51.507351, longitude: -0.127758 }}
                enableSearch={true}
                mapType={MapType.normal}
                onUpdateCoordinates={(coordinates) => console.log("Updated location:", coordinates)}
              //  zoom={15}
              //mapType={MapType.cycle}
              //width="50"
              //height={150}
              //loadingMessage="Loading maps"
              //errorMessage="Hmmm, we do not have maps for Mars yet. Working on it..."
              />
            </div>
          }
          {controlVisibility.ModernAudio &&
            <div id="ModernAudioDiv" className={styles.container}>
              <ModernAudio audioUrl='https://www.winhistory.de/more/winstart/mp3/vista.mp3' label="Audio Control" labelPosition={ModernAudioLabelPosition.BottomCenter} />
            </div>
          }
          {controlVisibility.FileTypeIcon &&
            <div id="FileTypeIconDiv" className={styles.container}>
              <p className="ms-font-l">
                File type icon control
              </p>
              <div className="ms-font-m">
                Font icons:
                <FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.docx" />
                <FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.unknown" />
                <FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.doc" />
                <FileTypeIcon type={IconType.font} application={ApplicationType.HTML} />
                <FileTypeIcon type={IconType.font} application={ApplicationType.Mail} />
                <FileTypeIcon type={IconType.font} application={ApplicationType.SASS} />
              </div>
              <div className="ms-font-m">
                Image icons:
                <FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.docx" />
                <FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.unknown" />
                <FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.pptx?querystring='prop1'&amp;prop2='test'" />
                <FileTypeIcon type={IconType.image} application={ApplicationType.Word} />
                <FileTypeIcon type={IconType.image} application={ApplicationType.PDF} />
                <FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.pdf" />
              </div>
              <div className="ms-font-m">
                Image icons with support to events:
                <FileTypeIcon type={IconType.image} application={ApplicationType.PowerApps} size={ImageSize.medium}
                  onClick={(e) => console.log("onClick on FileTypeIcon!")}
                  onDoubleClick={(e) => console.log("onDoubleClick on FileTypeIcon!")}
                  onMouseEnter={(e) => console.log("onMouseEnter on FileTypeIcon!")}
                  onMouseLeave={(e) => console.log("onMouseLeave on FileTypeIcon!")}
                  onMouseOver={(e) => console.log("onMouseOver on FileTypeIcon!")}
                  onMouseUp={(e) => console.log("onMouseUp on FileTypeIcon!")}
                />
              </div>
              <div className="ms-font-m">Icon size tester:
                <Dropdown options={sizeOptions} onChanged={this._onIconSizeChange} />
                <FileTypeIcon type={IconType.image} size={this.state.imgSize} application={ApplicationType.Excel} />
                <FileTypeIcon type={IconType.image} size={this.state.imgSize} application={ApplicationType.PDF} />
                <FileTypeIcon type={IconType.image} size={this.state.imgSize} />
              </div>
            </div>
          }
          {controlVisibility.SecurityTrimmedControl &&
            <div id="SecurityTrimmedControlDiv" className={styles.container}>
              <SecurityTrimmedControl context={this.props.context} level={PermissionLevel.currentWeb} permissions={[SPPermission.viewListItems]} className={"TestingClass"} noPermissionsControl={<p>You do not have permissions.</p>}>
                <p>You have permissions to view list items.</p>
              </SecurityTrimmedControl>
            </div>
          }
          {controlVisibility.SitePicker &&
            <div id="SitePickerDiv" className={styles.container}>
              <div className="ms-font-m">Site picker tester:
                <SitePicker
                  context={this.props.context}
                  label={'select sites'}
                  mode={'site'}
                  allowSearch={true}
                  multiSelect={false}
                  onChange={(sites) => { console.log(sites); }}
                  placeholder={'Select sites'}
                  searchPlaceholder={'Filter sites'} />
              </div>
            </div>
          }
          {controlVisibility.ListPicker &&
            <div id="ListPickerDiv" className={styles.container}>
              <div className="ms-font-m">List picker tester:
                <ListPicker context={this.props.context}
                  label="Select your list(s)"
                  placeholder="Select your list(s)"
                  baseTemplate={100}
                  includeHidden={false}
                  multiSelect={true}
                  contentTypeId="0x01"
                  // filter="Title eq 'Test List'"
                  onSelectionChanged={this.onListPickerChange} />
              </div>
            </div>
          }
          {controlVisibility.ListItemAttachments &&
            <div id="ListItemAttachmentsDiv" className={styles.container}>
              <div className="ms-font-m">List Item Attachments tester:
                <ListItemAttachments listId={this.props.dynamicFormListId}
                  // itemId={1}
                  context={this.props.context}
                  label="ListItem Attachments"
                />
              </div>
            </div>
          }
          {controlVisibility.ListItemPicker &&
            <div id="ListItemPickerDiv" className={styles.container}>
              <div className="ms-font-m">List Item picker list data tester:

                <ListItemPicker listId={'b1416fca-dc77-4198-a082-62a7657dcfa9'}
                  columnInternalName="DateAndTime"
                  keyColumnInternalName="Id"
                  // filter={"Title eq 'SPFx'"}
                  orderBy={'Title desc'}
                  itemLimit={5}
                  context={this.props.context}
                  placeholder={'Select list items'}
                  onSelectedItem={this.listItemPickerDataSelected} />

              </div>
            </div>
          }
          {controlVisibility.ListItemComments &&
            <div id="ListItemCommentsDiv" className={styles.container}>
              <div className="ms-font-m">List Item Comments Tester
                <ListItemComments webUrl='https://contoso.sharepoint.com/sites/ThePerspective'
                  listId='6f151a33-a7af-4fae-b8c4-f2f04cbc690f'
                  itemId={"1"}
                  serviceScope={this.props.context.serviceScope}
                  numberCommentsPerPage={10}
                  label="ListItem Comments"
                />
              </div>
            </div>
          }
          {controlVisibility.ViewPicker &&
            <div id="ViewPickerDiv" className={styles.container}>
              <div className="ms-font-m">View picker tester:
                <ViewPicker context={this.props.context}
                  label="Select view(s)"
                  listId={"9f3908cd-1e88-4ab3-ac42-08efbbd64ec9"}
                  placeholder={'Select list view(s)'}
                  orderBy={1}
                  multiSelect={true}
                  onSelectionChanged={this.onViewPickerChange} />
              </div>
            </div>
          }
          {controlVisibility.FieldPicker &&
            <div id="FieldPickerDiv" className={styles.container}>
              <div className="ms-font-m">Field picker tester:
                <FieldPicker
                  context={this.props.context}
                  label={'Select a field'}
                  listId={this.state.selectedList}
                  onSelectionChanged={(fields) => {
                    console.log(fields);
                  }}
                />
              </div>
            </div>
          }
          {controlVisibility.IconPicker &&
            <div id="IconPickerDiv" className={styles.container}>
              <div>Icon Picker</div>
              <div>
                <IconPicker
                  renderOption="panel"
                  onSave={(value) => { console.log(value); }}
                  currentIcon={'Warning'}
                  buttonLabel="Icon Picker" />
              </div>
              <IconPicker buttonLabel={'Icon'}
                onChange={(iconName: string) => { console.log(iconName); }}
                onCancel={() => { console.log("Panel closed"); }}
                onSave={(iconName: string) => { console.log(iconName); }} />
            </div>
          }
          {controlVisibility.ComboBoxListItemPicker &&
            <div id="ComboBoxListItemPickerDiv" className={styles.container}>
              <div className="ms-font-m">ComboBoxListItemPicker:

                <ComboBoxListItemPicker listId={this.state.comboBoxListItemPickerListId}
                  columnInternalName='Title'
                  keyColumnInternalName='Id'
                  orderBy='Title desc'
                  multiSelect={true}
                  onSelectedItem={(data) => {
                    console.log(`Item(s):`, data);
                  }}
                  defaultSelectedItems={this.state.comboBoxListItemPickerIds}
                  webUrl={this.props.context.pageContext.web.absoluteUrl}
                  spHttpClient={this.props.context.spHttpClient} />

                <PrimaryButton text="Change List" onClick={() => {
                  this.setState({
                    comboBoxListItemPickerListId: '71210430-8436-4962-a14d-5525475abd6b'
                  });
                }} />
                <PrimaryButton text="Change default items" onClick={() => {
                  this.setState({
                    comboBoxListItemPickerIds: [{ Id: 2, Title: '222' }]
                  });
                }} />

              </div>
            </div>
          }
          {controlVisibility.IFrameDialog &&
            <div id="IFrameDialogDiv" className={styles.container}>
              <div className="ms-font-m">iframe dialog tester:
                <PrimaryButton
                  text="Open iframe Dialog"
                  onClick={() => { this.setState({ iFrameDialogOpened: true }); }} />
                <IFrameDialog
                  url={iframeUrl}
                  iframeOnLoad={(iframe: any) => { console.log('iframe loaded'); }}
                  hidden={!this.state.iFrameDialogOpened}
                  onDismiss={() => { this.setState({ iFrameDialogOpened: false }); }}
                  modalProps={{
                    isBlocking: true,
                    styles: {
                      root: {
                        backgroundColor: '#00ff00'
                      },
                      main: {
                        backgroundColor: '#ff0000'
                      }
                    }
                  }}
                  dialogContentProps={{
                    type: DialogType.close,
                    showCloseButton: true
                  }}
                  width={'570px'}
                  height={'315px'} />
              </div>
            </div>
          }
          {controlVisibility.IFramePanel &&
            <div id="IFramePanelDiv" className={styles.container}>
              <div className="ms-font-m">iframe Panel tester:
                <PrimaryButton
                  text="Open iframe Panel"
                  onClick={() => { this.setState({ iFramePanelOpened: true }); }} />
                <IFramePanel
                  url={iframeUrl}
                  type={PanelType.medium}
                  //  height="300px"
                  headerText="iframe panel title"
                  closeButtonAriaLabel="Close"
                  isOpen={this.state.iFramePanelOpened}
                  onDismiss={() => { this.setState({ iFramePanelOpened: false }); }}
                  iframeOnLoad={(iframe: any) => { console.log('iframe loaded'); }}
                />
              </div>
            </div>
          }
          {controlVisibility.ImagePicker &&
            <div id="ImagePickerDiv" className={styles.container}>
              <ImagePicker
                context={this.props.context}
                onFileSelected={(file) => { console.log(file); this.setState({ selectedUrlImagePicker: file.fileAbsoluteUrl }); }}
                onDeleteFile={() => { console.log('file deleted'); }}
                selectedFileUrl={this.state.selectedUrlImagePicker}
              />
            </div>
          }
          {controlVisibility.FolderPicker &&
            <div id="FolderPickerDiv" className={styles.container}>
              <FolderPicker context={this.props.context}
                rootFolder={{
                  Name: 'Documents',
                  ServerRelativeUrl: `${this.props.context.pageContext.web.serverRelativeUrl === '/' ? '' : this.props.context.pageContext.web.serverRelativeUrl}/Shared Documents`
                }}
                onSelect={this._onFolderSelect}
                label='Folder Picker'
                required={true}
                canCreateFolders={true}
              ></FolderPicker>
            </div>
          }
          <div id="FilterBarDiv" className={styles.container} hidden={!controlVisibility.FilterBar}>
            <FilterBar items={this.state.filters} inlineItemCount={3} onClearFilters={this.onClearFilters} onRemoveFilter={this.onRemoveFilter} />
            <button onClick={this.addFilter}>Add new filter</button>
          </div>
          {controlVisibility.Carousel &&

            <div id="CarouselDiv" className={styles.container}>
              <div>
                <h3>Carousel with fixed elements:</h3>
                <Carousel
                  buttonsLocation={CarouselButtonsLocation.top}
                  buttonsDisplay={CarouselButtonsDisplay.block}

                  contentContainerStyles={styles.carouselContent}
                  containerButtonsStyles={styles.carouselButtonsContainer}

                  isInfinite={true}

                  element={this.carouselElements}
                  onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
                />
              </div>
              <div>
                <h3>Carousel with CarouselImage elements:</h3>
                <Carousel
                  buttonsLocation={CarouselButtonsLocation.center}
                  buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}

                  contentContainerStyles={styles.carouselImageContent}
                  //containerButtonsStyles={styles.carouselButtonsContainer}

                  isInfinite={true}
                  indicatorShape={CarouselIndicatorShape.circle}
                  indicatorsDisplay={CarouselIndicatorsDisplay.block}
                  pauseOnHover={true}

                  element={[
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
                  ]}
                  onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
                  onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
                  rootStyles={mergeStyles({
                    backgroundColor: '#C3C3C3'
                  })}
                />
              </div>
              <div>
                <h3>Carousel with triggerPageElement:</h3>
                <Carousel
                  buttonsLocation={CarouselButtonsLocation.bottom}
                  buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}

                  contentContainerStyles={styles.carouselContent}

                  canMoveNext={this.state.canMoveNext}
                  canMovePrev={this.state.canMovePrev}
                  triggerPageEvent={this.triggerNextElement}
                  element={this.state.currentCarouselElement}
                />
              </div>
              <div>
                <h3>Carousel with minimal configuration:</h3>
                <Carousel
                  element={this.carouselElements}
                  contentHeight={200}
                />
              </div>
            </div>
          }
          {controlVisibility.SiteBreadcrumb &&
            <div id="SiteBreadcrumbDiv" className={styles.container}>
              <div className={styles.siteBreadcrumb}>
                <SiteBreadcrumb context={this.props.context} />
              </div>
            </div>
          }
          {controlVisibility.FilePicker &&
            <div id="FilePickerDiv" className={styles.container}>
              <div>
                <h3>File Picker</h3>
                <TextField
                  label="Default SiteFileTab Folder"
                  onChange={debounce((ev, newVal) => { this.setState({ filePickerDefaultFolderAbsolutePath: newVal }); }, 500)}
                  styles={{ root: { marginBottom: 10 } }}
                />
                <FilePicker
                  bingAPIKey="<BING API KEY>"
                  //webAbsoluteUrl="https://023xn.sharepoint.com/sites/test1"
                  //defaultFolderAbsolutePath={"https://aterentiev.sharepoint.com/sites/SPFxinTeamsDemo/Shared%20Documents/General"}
                  //accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
                  buttonLabel="Add File"
                  buttonIconProps={{ iconName: 'Add', styles: { root: { fontSize: 42 } } }}
                  onSave={this._onFilePickerSave}
                  onChange={(filePickerResult: IFilePickerResult[]) => { console.log(filePickerResult); }}
                  context={this.props.context}
                  hideRecentTab={false}
                  includePageLibraries={true}
                  checkIfFileExists={false}
                />
                {
                  this.state.filePickerResult &&
                  <div>
                    <div>
                      FileName: {this.state.filePickerResult[0].fileName}
                    </div>
                    <div>
                      File size: {GeneralHelper.formatBytes(this.state.filePickerResult[0].fileSize, 2)}
                    </div>
                  </div>
                }
              </div>

              <div>
                <h3>File Picker with target folder browser</h3>
                <FilePicker
                  bingAPIKey="<BING API KEY>"
                  //accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
                  buttonLabel="Upload image"
                  buttonIcon="FileImage"
                  onSave={this._onFilePickerSave}
                  onChange={(filePickerResult: IFilePickerResult[]) => { console.log(filePickerResult); }}
                  context={this.props.context}
                  hideRecentTab={false}
                  renderCustomUploadTabContent={() => (
                    <FolderExplorer context={this.props.context}
                      rootFolder={this.rootFolder}
                      defaultFolder={this.rootFolder}
                      onSelect={this._onFolderSelect}
                      canCreateFolders={true}
                    />)}
                />
              </div>
              <p><a href="javascript:;" onClick={this.deleteItem}>Deletes second item</a></p>
            </div>
          }
          {controlVisibility.Progress &&
            <div id="ProgressDiv" className={styles.container}>
              <Progress title={'Progress Test'}
                showOverallProgress={true}
                showIndeterminateOverallProgress={false}
                hideNotStartedActions={false}
                actions={this.state.progressActions}
                currentActionIndex={this.state.currentProgressActionIndex}
                longRunningText={'This operation takes longer than expected'}
                longRunningTextDisplayDelay={7000}
                height={'350px'}
                inProgressIconName={'ChromeBackMirrored'} />
              <PrimaryButton text={'Start Progress'} onClick={this._startProgress} />
            </div>
          }
          {controlVisibility.ProgressStepsIndicator &&
            <div id="ProgressStepsIndicatorDiv" className={styles.container}>
              <ProgressStepsIndicator steps={this.progressSteps} currentStep={0} themeVariant={this.props.themeVariant} />
            </div>
          }
          {controlVisibility.GridLayout &&
            <div id="GridLayoutDiv" className={styles.container}>
              <div className="ms-font-l">Grid Layout</div>
              <GridLayout
                ariaLabel={"List of content, use right and left arrow keys to navigate, arrow down to access details."}
                items={sampleGridData}
                onRenderGridItem={(item: any, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)}
              />
            </div>
          }
          {controlVisibility.HoverReactionsBar &&
            <div ref={this.divRefAddReaction} id="HoverReactionsBarDiv" className={styles.container}>
              <PrimaryButton text="Open HoverReactionsBar" onClick={() => { this.setState({ isOpenHoverReactionBar: true }); }} />
              <HoverReactionsBar
                isOpen={this.state.isOpenHoverReactionBar}
                onSelect={(emoji, emojiInfo) => { console.log(emoji); }}
                onDismiss={(): void => {
                  this.setState({ isOpenHoverReactionBar: false });
                }}
                target={this.divRefAddReaction.current as HTMLDivElement} />
            </div>
          }
          {controlVisibility.FolderExplorer &&
            <div id="FolderExplorerDiv" className={styles.container}>
              <FolderExplorer
                context={this.props.context}
                rootFolder={{
                  Name: 'Documents',
                  ServerRelativeUrl: `${this.props.context.pageContext.web.serverRelativeUrl === '/' ? '' : this.props.context.pageContext.web.serverRelativeUrl}/Shared Documents`
                }}
                defaultFolder={{
                  Name: 'Documents',
                  ServerRelativeUrl: `${this.props.context.pageContext.web.serverRelativeUrl === '/' ? '' : this.props.context.pageContext.web.serverRelativeUrl}/Shared Documents`
                }}
                onSelect={this._onFolderSelect}
                canCreateFolders={true}
                orderby='Name' //'ListItemAllFields/Created'
                orderAscending={true}
                showFiles={true}
                onFileClick={this._onFileClick}
              />
            </div>
          }
          {controlVisibility.TreeView &&
            <div id="TreeViewDiv" className={styles.container}>
              <h3>Tree View</h3>
              <TreeView items={this.treeitems}
                defaultExpanded={false}
                selectionMode={TreeViewSelectionMode.Multiple}
                showCheckboxes={true}
                treeItemActionsDisplayMode={TreeItemActionsDisplayMode.ContextualMenu}
                defaultSelectedKeys={this.state.treeViewSelectedKeys}
                onExpandCollapse={this.onExpandCollapseTree}
                onSelect={this.onItemSelected}
                defaultExpandedChildren={true}
                theme={this.props.themeVariant}
              //expandToSelected={true}
              // onRenderItem={this.renderCustomTreeItem}
              />
              <PrimaryButton onClick={() => { this.setState({ treeViewSelectedKeys: [] }); }}>Clear selection</PrimaryButton>
            </div>
          }
          {controlVisibility.Pagination &&
            <div id="PaginationDiv" className={styles.container}>
              <Pagination
                currentPage={3}
                onChange={(page) => (this._getPage(page))}
                totalPages={this.props.paginationTotalPages || 13}
              //limiter={3}
              // hideFirstPageJump
              //hideLastPageJump
              //limiterIcon={"NumberedListText"}
              />
            </div>
          }
          {controlVisibility.FieldCollectionData &&
            <div id="FieldCollectionDataDiv" className={styles.container}>
              <FieldCollectionData
                key={"FieldCollectionData"}
                label={"Fields Collection"}
                itemsPerPage={3}
                manageBtnLabel={"Manage"}
                onChanged={(value) => { console.log(value); }}
                panelHeader={"Manage values"}
                enableSorting={true}
                panelProps={{ type: PanelType.custom, customWidth: "98vw" }}
                fields={[
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
                ]}
                value={this.getRandomCollectionFieldData()}

                // value = {null}
                context={this.props.context as any} //error when this is omitted and people picker is used
                usePanel={true}
                noDataMessage="No data is selected" //overrides the default message
              />
            </div>
          }
          {controlVisibility.ContentTypePicker &&
            <ContentTypePicker
              context={this.props.context}
            // group="Content Feedback"
            // includeHidden={false}
            // includeReadOnly={false}
            // label="Select your content type"
            // multiSelect={false}
            // orderBy={ContentTypesOrderBy.Name}
            // listId="00000000-0000-0000-0000-000000000000"
            // onSelectionChanged={this.onContentTypePickerChanged}
            // showBlankOption={true}
            />
          }
          {controlVisibility.Dashboard &&
            <div id="DashboardDiv" className={styles.container}>
              <Dashboard
                widgets={[{
                  title: "Card 1",
                  desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
                  widgetActionGroup: calloutItemsExample,
                  size: WidgetSize.Quadruple,
                  body: [
                    {
                      id: "t1",
                      title: "Tab 1",
                      content: (
                        <Flex
                          vAlign="center"
                          hAlign="center"
                          styles={{ height: "100%", border: "1px dashed rgb(179, 176, 173)" }}
                        >
                          <NorthstarText size="large" weight="semibold">
                            Content #1
                          </NorthstarText>
                        </Flex>
                      ),
                    },
                    {
                      id: "t2",
                      title: "Tab 2",
                      content: (
                        <Flex
                          vAlign="center"
                          hAlign="center"
                          styles={{ height: "100%", border: "1px dashed rgb(179, 176, 173)" }}
                        >
                          <NorthstarText size="large" weight="semibold">
                            Content #2
                          </NorthstarText>
                        </Flex>
                      ),
                    },
                    {
                      id: "t3",
                      title: "Tab 3",
                      content: (
                        <Flex
                          vAlign="center"
                          hAlign="center"
                          styles={{ height: "100%", border: "1px dashed rgb(179, 176, 173)" }}
                        >
                          <NorthstarText size="large" weight="semibold">
                            Content #3
                          </NorthstarText>
                        </Flex>
                      ),
                    },
                  ],
                  link: linkExample,
                },
                {
                  title: "Card 2",
                  size: WidgetSize.Single,
                  link: customizedLinkExample,
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
                }]} />
            </div>
          }
          {controlVisibility.Toolbar &&
            <div id="ToolbarDiv" className={styles.container}>
              <div>
                <h3>Uncontrolled toolbar</h3>
                <Toolbar actionGroups={{
                  'group1': {
                    'action1': {
                      title: 'Edit',
                      iconName: 'Edit',
                      onClick: () => { console.log('Edit action click'); }
                    },
                    'action2': {
                      title: 'New',
                      iconName: 'Add',
                      onClick: () => { console.log('New action click'); }
                    }
                  }
                }}
                  filters={toolbarFilters}
                  onSelectedFiltersChange={this.onToolbarSelectedFiltersChange}
                />
              </div>
              <div>
                <h3>Controlled toolbar</h3>
                <Toolbar actionGroups={{
                  'group1': {
                    'action1': {
                      title: 'Edit',
                      iconName: 'Edit',
                      onClick: () => { console.log('Edit action click'); }
                    },
                    'action2': {
                      title: 'New',
                      iconName: 'Add',
                      onClick: () => { console.log('New action click'); }
                    }
                  }
                }}
                  filters={toolbarFilters}
                  selectedFilterIds={this.state.selectedFilters}
                  onSelectedFiltersChange={this.onToolbarSelectedFiltersChange} />
              </div>
              <div>Selected filter IDs: {this.state.selectedFilters.join(", ")}</div>
              <PrimaryButton text='Toggle filter1' onClick={() => this.toggleToolbarFilter("filter1")} />
              <PrimaryButton text='Toggle filter2' onClick={() => this.toggleToolbarFilter("filter2")} />
            </div>
          }
          {controlVisibility.AnimatedDialog &&
            <div id="AnimatedDialogDiv" className={styles.container}>
              <h3>Animated Dialogs</h3>

              {/* Multiple elements added only for demo - can be controlled with fewer elements */}

              <PrimaryButton text='Show animated dialog' onClick={() => { this.setState({ showAnimatedDialog: true }); }} />
              {/* Normal animated dialog */}
              <AnimatedDialog
                hidden={!this.state.showAnimatedDialog}
                onDismiss={() => { this.setState({ showAnimatedDialog: false }); }}
                dialogContentProps={animatedDialogContentProps}
                modalProps={animatedModalProps}
              >
                <DialogFooter>
                  <PrimaryButton onClick={() => { this.setState({ showAnimatedDialog: false }); }} text="Yes" />
                  <DefaultButton onClick={() => { this.setState({ showAnimatedDialog: false }); }} text="No" />
                </DialogFooter>
              </AnimatedDialog>
              <br />
              <br />

              <PrimaryButton text='Show animated dialog with icon' onClick={() => { this.setState({ showCustomisedAnimatedDialog: true }); }} />
              {/* Animated dialog with icon */}
              <AnimatedDialog
                hidden={!this.state.showCustomisedAnimatedDialog}
                onDismiss={() => { this.setState({ showCustomisedAnimatedDialog: false }); }}
                dialogContentProps={customizedAnimatedDialogContentProps}
                modalProps={customizedAnimatedModalProps}
                dialogAnimationInType='fadeInDown'
                dialogAnimationOutType='fadeOutDown'
                iconName='UnknownSolid'
                iconAnimationType='zoomInDown'
                showAnimatedDialogFooter={true}
                okButtonText="Yes"
                cancelButtonText="No"
                onOkClick={() => timeout(1500)}
                onSuccess={() => {
                  this.setState({ showCustomisedAnimatedDialog: false });
                  this.setState({ showSuccessDialog: true });
                }}
                onError={() => {
                  this.setState({ showCustomisedAnimatedDialog: false });
                  this.setState({ showErrorDialog: true });
                }}>
                <div className={styles.dialogContent}>
                  <span>Do you like the animated dialog?</span>
                </div>
              </AnimatedDialog>

              {/* Success animated dialog */}
              <AnimatedDialog
                hidden={!this.state.showSuccessDialog}
                onDismiss={() => { this.setState({ showSuccessDialog: false }); }}
                dialogContentProps={successDialogContentProps}
                modalProps={customizedAnimatedModalProps}
                iconName='CompletedSolid'
              >
                <div className={styles.dialogContent}><span>Thank you.</span></div>
                <div className={styles.dialogFooter}>
                  <PrimaryButton onClick={() => { this.setState({ showSuccessDialog: false }); }} text="OK" >
                  </PrimaryButton>
                </div>
              </AnimatedDialog>

              {/* Error animated dialog */}
              <AnimatedDialog
                hidden={!this.state.showErrorDialog}
                onDismiss={() => { this.setState({ showErrorDialog: false }); }}
                dialogContentProps={errorDialogContentProps}
                modalProps={customizedAnimatedModalProps}
                iconName='StatusErrorFull'
              >
                <div className={styles.dialogContent}><span>Ther was an error.</span></div>
                <div className={styles.dialogFooter}>
                  <PrimaryButton onClick={() => { this.setState({ showErrorDialog: false }); }} text="OK" >
                  </PrimaryButton>
                </div>
              </AnimatedDialog>
            </div>
          }
          {controlVisibility.LivePersona &&
            <div id="LivePersonaDiv" className={styles.container}>
              <LivePersona upn="meganb@contoso.onmicrosoft.com"
                template={
                  <>
                    <Persona text="Megan Bowen" secondaryText="meganb@contoso.onmicrosoft.com" coinSize={48} />
                  </>
                }
                serviceScope={this.props.context.serviceScope}
              />
            </div>
          }
          {controlVisibility.LocationPicker &&
            <div id="LocationPickerDiv" className={styles.container}>
              <LocationPicker context={this.props.context} label="Location" onChange={(locValue: ILocationPickerItem) => { console.log(locValue.DisplayName + ", " + locValue.Address.Street); }}></LocationPicker>
            </div>
          }
          {controlVisibility.ModernTaxonomyPicker &&
            <div id="ModernTaxonomyPickerDiv" className={styles.container}>
              <ModernTaxonomyPicker
                allowMultipleSelections={true}
                termSetId={this.termSetId}
                panelTitle="Panel title"
                label={"Modern Taxonomy Picker"}
                context={this.props.context}
                required={false}
                disabled={false}
                customPanelWidth={400}
              />
            </div>
          }
          {controlVisibility.MonacoEditor &&
            <div id="MonacoEditorDiv" className={styles.container}>
              <MonacoEditor value={""}
                showMiniMap={true}
                onValueChange={(value, validationErrors) => { console.log(value); console.log(validationErrors); }}
                language={"javascript"} />
            </div>
          }
          {controlVisibility.AdaptiveCardHost &&
            <div id="AdaptiveCardHostDiv" className={styles.container}>
              <h3>Adaptive Card Host</h3>
              <AdaptiveCardHost
                card={{
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
                }}
                data={{
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
                }}
                theme={this.props.themeVariant}
                themeType={AdaptiveCardHostThemeType.SharePoint}
                onInvokeAction={(action) => alert(JSON.stringify(action))}
                onError={(error) => console.log(error.message)}
                onSetCustomElements={(registry: CardObjectRegistry<CardElement>) => { }}
                onSetCustomActions={(registry: CardObjectRegistry<Action>) => { }}
                onUpdateHostCapabilities={(hostCapabilities: HostCapabilities) => {
                  hostCapabilities.setCustomProperty("CustomPropertyName", Date.now);
                }}
                context={this.props.context}
              />
            </div>
          }
          {controlVisibility.VariantThemeProvider &&
            <div id="VariantThemeProviderDiv" className={styles.container}>
              <h3>Variant Theme Provider</h3>
              <VariantThemeProvider variantType={VariantType.Strong}>
                <Stack tokens={{ childrenGap: 5, padding: 5 }}>
                  <Label>This Web Part implements an example on how to use the 'Fluent UI' theme library and how to apply/generate theme variation for the Web Part itself.</Label>
                  <PrimaryButton>Primary Button</PrimaryButton>
                  <DefaultButton>Default Button</DefaultButton>
                  <Link>Link</Link>
                </Stack>
              </VariantThemeProvider>
            </div>
          }
          {controlVisibility.EnhancedThemeProvider &&
            <div id="EnhancedThemeProviderDiv" className={styles.container}>
              <h3>Enhanced Theme Provider</h3>
              <EnhancedThemeProvider applyTo="element" context={this.props.context} theme={this.props.themeVariant}>
                <ControlsTestEnhancedThemeProviderFunctionComponent />
                <ControlsTestEnhancedThemeProvider />
              </EnhancedThemeProvider>
            </div>
          }
          {controlVisibility.AdaptiveCardDesignerHost &&
            <div id="AdaptiveCardDesignerHostDiv" className={styles.container}>
              <h3>Adaptive Card Designer Host</h3>
              <AdaptiveCardDesignerHost
                headerText={`Adaptive Card Designer`}
                buttonText="Open Designer"
                card={{ "$schema": "http://adaptivecards.io/schemas/adaptive-card.json", "type": "AdaptiveCard", "version": "1.5", "body": [{ "type": "ColumnSet", "columns": [{ "width": "auto", "items": [{ "type": "Image", "size": "Small", "style": "Person", "url": "/_layouts/15/userphoto.aspx?size=M&username=${$root['@context']['userInfo']['email']}" }], "type": "Column" }, { "width": "stretch", "items": [{ "type": "TextBlock", "text": "${$root['@context']['userInfo']['displayName']}", "weight": "Bolder" }, { "type": "TextBlock", "spacing": "None", "text": "${$root['@context']['userInfo']['email']}" }], "type": "Column" }] }] }}
                data={undefined}
                context={this.props.context}
                theme={this.props.themeVariant}
                onSave={(payload: object) => alert(JSON.stringify(payload))}
                snippets={[{
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
                }]}
              />
            </div>
          }
          {controlVisibility.ShareDialog &&
            <div id="ShareDialogDiv" className={styles.container}>
              <PrimaryButton text="Open Share dialog" onClick={() => { this.setState({ isOpenShareDialog: true }); }} />
              <ShareDialog
                isOpen={this.state.isOpenShareDialog}
                onClose={() => this.setState({ isOpenShareDialog: false })}
                options={{
                  siteUrl: this.props.context.pageContext.web.absoluteUrl,
                  listId: 'b1416fca-dc77-4198-a082-62a7657dcfa9',
                  itemId: 1,
                  name: 'Document Name'
                }} />
            </div>
          }
          {controlVisibility.TaxonomyTree &&
            <div id="TaxonomyTreeDiv" className={styles.container} hidden={!controlVisibility.TaxonomyTree}>
              <h3>Modern Taxonomy Tree</h3>
              {this.state.termStoreInfo && (
                <TaxonomyTree
                  languageTag={this.state.termStoreInfo.defaultLanguageTag}
                  onLoadMoreData={this.spTaxonomyService.getTerms}
                  pageSize={50}
                  setTerms={(value) => this.setState({ testTerms: value as any })}
                  termStoreInfo={this.state.termStoreInfo}
                  termSetInfo={this.state.termSetInfo}
                  terms={this.state.testTerms as any[]}
                  onRenderActionButton={() => <button>test button</button>}
                  hideDeprecatedTerms={false}
                  showIcons={true}
                />
              )}
            </div>
          }
          {controlVisibility.TestControl &&
            <div id="TestControlDiv" className={styles.container}>
              <TestControl context={this.props.context} themeVariant={this.props.themeVariant} />
            </div>
          }
          {controlVisibility.UploadFiles &&
            <div id="UploadFilesDiv" className={styles.container}>
              <h3>Upload Files</h3>
              <EnhancedThemeProvider theme={this.props.themeVariant} context={this.props.context}>
                <Stack>
                  <UploadFiles
                    context={this.props.context}
                    title="Upload Files"
                    onUploadFiles={(files) => {
                      console.log("files", files);
                    }}
                    themeVariant={this.props.themeVariant}
                  />
                </Stack>
              </EnhancedThemeProvider>
            </div>
          }
          {controlVisibility.UserPicker &&
            <div id="UserPickerDiv" className={styles.container}>
              <UserPicker
                context={this.props.context}
                secondaryTextPropertyName="mail"
                theme={this.props.themeVariant}
                placeholder={"Search User"}
              // label={
              //   <div>
              //     <Person20Filled color={tokens.colorBrandForeground1} />
              //     <Body1>Select User</Body1>
              //   </div>
              // }
              // onSelectedUsers={onSelectedUsers}
              // onRemoveSelectedUser={onRemovedUser}
              />
            </div>
          }
          {
            controlVisibility.Calendar &&
            <div id="CalendarDiv" className={styles.container}>
              <TestCalendarControl
                  context={this.props.context} theme={this.props.themeVariant as any}   hasTeamsContext={false} themeString={'default'} title={'Calendar'} appHostName={EAppHostName.SharePoint} />
            </div>

          }
          {controlVisibility.WorldMap &&
            <div id="WorldMapDiv" className={styles.container}>
              <WorldMap description={'World Map Sample'} isDarkTheme={false} hasTeamsContext={false} title={'Microsoft Locations Worldwide'}     />
            </div>
          }
        </div>
      </React.Suspense>
    );
  }

  private getRandomCollectionFieldData = () => {
    let result = [];
    for (let i = 1; i < 16; i++) {

      const sampleDate = new Date();
      sampleDate.setDate(sampleDate.getDate() + i);

      result.push({
        "Field1": `String${i}`,
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
  }

  private onExpandCollapseTree(item: ITreeItem, isExpanded: boolean) {
    console.log((isExpanded ? "item expanded: " : "item collapsed: ") + item);
  }

  private onItemSelected(items: ITreeItem[]) {
    console.log("items selected: " + items.length);
  }

  private renderCustomTreeItem(item: ITreeItem): JSX.Element {
    return (
      <span>
        {
          item.iconProps &&
          <i className={"ms-Icon ms-Icon--" + item.iconProps.iconName} style={{ paddingRight: '4px' }} />
        }
        {item.label}
      </span>
    );
  }

  private _getPage(page: number) {
    console.log('Page:', page);
  }

  // private _onFolderSelect = (folder: IFolder): void => {
  //   console.log('selected folder', folder);
  //
}
