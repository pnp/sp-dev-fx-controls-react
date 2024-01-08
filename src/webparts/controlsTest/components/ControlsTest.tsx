import * as React from "react";
import {
  IBasePickerStyles,
  ITag,
} from "@fluentui/react/lib/Pickers";
import {
  Stack,
} from "@fluentui/react/lib/Stack";
import {
  Text,
} from "@fluentui/react/lib/Text";
import {
  TextField
} from "@fluentui/react/lib/TextField";
import {
  DefaultButton,
  PrimaryButton
} from "@fluentui/react/lib/components/Button";
import { DialogType, DialogFooter, IDialogContentProps } from "@fluentui/react/lib/components/Dialog";
import { IModalProps } from "@fluentui/react/lib/Modal";
import {
  Dropdown,
  IDropdownOption
} from "@fluentui/react/lib/components/Dropdown";
import { Link } from "@fluentui/react/lib/components/Link";
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  IDocumentCardPreviewProps
} from "@fluentui/react/lib/DocumentCard";
import { IIconProps } from "@fluentui/react/lib/Icon";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { ImageFit } from "@fluentui/react/lib/Image";
import { PanelType } from "@fluentui/react/lib/Panel";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { ISize } from "@fluentui/react/lib/Utilities";

import {
  ExclamationCircleIcon,
  Flex,
  ScreenshareIcon,
  ShareGenericIcon,
  Text as NorthstarText
} from "@fluentui/react-northstar";
import { DayOfWeek } from "@fluentui/react/lib/DateTimeUtilities";
import {
  DisplayMode,
  Environment,
  EnvironmentType,
  Guid,
  ServiceScope
} from "@microsoft/sp-core-library";

import { SPHttpClient } from "@microsoft/sp-http";
import { SPPermission } from "@microsoft/sp-page-context";

import { Accordion } from "../../../controls/accordion";
import {
  ChartControl,
  ChartType
} from "../../../ChartControl";
import {
  Accordion as AccessibleAccordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "../../../controls/accessibleAccordion";
import {
  Carousel,
  CarouselButtonsDisplay,
  CarouselButtonsLocation,
  CarouselIndicatorsDisplay,
  CarouselIndicatorShape
} from "../../../controls/carousel";
import {
  Dashboard,
  WidgetSize
} from "../../../controls/dashboard";
import {
  TimeDisplayControlType
} from "../../../controls/dateTimePicker/TimeDisplayControlType";
import { IconPicker } from "../../../controls/iconPicker";
import {
  ComboBoxListItemPicker
} from "../../../controls/listItemPicker/ComboBoxListItemPicker";
import { Pagination } from "../../../controls/pagination";
import { TermActionsDisplayStyle } from "../../../controls/taxonomyPicker";
import {
  TermActionsDisplayMode
} from "../../../controls/taxonomyPicker/termActions";
import { Toolbar } from "../../../controls/toolbar";
import {
  ITreeItem,
  TreeItemActionsDisplayMode,
  TreeView,
  TreeViewSelectionMode
} from "../../../controls/treeView";
import {
  DateConvention,
  DateTimePicker,
  TimeConvention
} from "../../../DateTimePicker";
import {
  CustomCollectionFieldType,
  FieldCollectionData
} from "../../../FieldCollectionData";
import {
  FilePicker,
  IFilePickerResult
} from "../../../FilePicker";
import {
  ApplicationType,
  FileTypeIcon,
  IconType,
  ImageSize
} from "../../../FileTypeIcon";
import {
  FolderExplorer,
  IBreadcrumbItem,
  IFolder
} from "../../../FolderExplorer";
import { FolderPicker } from "../../../FolderPicker";
import { GridLayout } from "../../../GridLayout";
import { IFrameDialog } from "../../../IFrameDialog";
import { IFramePanel } from "../../../IFramePanel";
import { ListItemPicker } from "../../../ListItemPicker";
import { ListPicker } from "../../../ListPicker";
import {
  GroupOrder,
  IGrouping,
  IViewField,
  ListView,
  SelectionMode
} from "../../../ListView";
import {
  Map,
  MapType
} from "../../../Map";
import {
  PeoplePicker,
  PrincipalType
} from "../../../controls/peoplepicker";
import { Placeholder } from "../../../Placeholder";
import {
  IProgressAction,
  Progress
} from "../../../Progress";
import { RichText } from "../../../RichText";
import {
  PermissionLevel,
  SecurityTrimmedControl
} from "../../../SecurityTrimmedControl";
import { ITerm } from "../../../services/ISPTermStorePickerService";
import SPTermStorePickerService
  from "../../../services/SPTermStorePickerService";
import { SiteBreadcrumb } from "../../../SiteBreadcrumb";
import {
  IPickerTerms,
  TaxonomyPicker,
  UpdateType
} from "../../../TaxonomyPicker";
import { WebPartTitle } from "../../../WebPartTitle";
import { AnimatedDialog } from "../../../AnimatedDialog";
import styles from "./ControlsTest.module.scss";
import {
  IControlsTestProps
} from "./IControlsTestProps";
import {
  IControlsTestState
} from "./IControlsTestState";
import { MyTeams } from "../../../controls/MyTeams";
import { TeamPicker } from "../../../TeamPicker";
import { TeamChannelPicker } from "../../../TeamChannelPicker";
import { DragDropFiles } from "../../../DragDropFiles";
import { SitePicker } from "../../../controls/sitePicker/SitePicker";
import { DynamicForm } from '../../../controls/dynamicForm';
import { LocationPicker } from "../../../controls/locationPicker/LocationPicker";
import { ILocationPickerItem } from "../../../controls/locationPicker/ILocationPicker";
import { debounce } from "lodash";
import { ModernTaxonomyPicker } from "../../../controls/modernTaxonomyPicker/ModernTaxonomyPicker";
import { AdaptiveCardHost, IAdaptiveCardHostActionResult, AdaptiveCardHostThemeType, CardObjectRegistry, CardElement, Action, HostCapabilities } from "../../../AdaptiveCardHost";
import { VariantThemeProvider, VariantType } from "../../../controls/variantThemeProvider";
import { Label } from "@fluentui/react/lib/Label";
import { EnhancedThemeProvider } from "../../../EnhancedThemeProvider";
import { ControlsTestEnhancedThemeProvider, ControlsTestEnhancedThemeProviderFunctionComponent } from "./ControlsTestEnhancedThemeProvider";
import { AdaptiveCardDesignerHost } from "../../../AdaptiveCardDesignerHost";
import { ModernAudio, ModernAudioLabelPosition } from "../../../ModernAudio";
import { SPTaxonomyService, TaxonomyTree } from "../../../ModernTaxonomyPicker";
import { TestControl } from "./TestControl";
import { UploadFiles } from "../../../controls/uploadFiles";
import { IFileInfo } from "@pnp/sp/files";
import { FieldPicker } from "../../../FieldPicker";
import { IPersonaProps, Toggle } from "@fluentui/react";
import { ListItemComments } from "../../../ListItemComments";
import { ViewPicker } from "../../../controls/viewPicker";



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

/**
 * Component that can be used to test out the React controls from this project
 */
export default class ControlsTest extends React.Component<IControlsTestProps, IControlsTestState> {
  private taxService: SPTermStorePickerService = null;
  private spTaxonomyService = new SPTaxonomyService(this.props.context);
  private serviceScope : ServiceScope;
  private richTextValue: string = null;
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
      testTerms: []
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

    this.setState({
      items: items.value ? items.value : [],
      termStoreInfo: await this.spTaxonomyService.getTermStoreInfo(),
      termSetInfo: await this.spTaxonomyService.getTermSetInfo(Guid.parse("4bc86596-7caf-4e70-80c9-d9769e448988")),
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
    this.setState({ filePickerResult: filePickerResult });
    if (filePickerResult && filePickerResult.length > 0) {
      for (var i = 0; i < filePickerResult.length; i++) {
        const item = filePickerResult[i];
        const fileResultContent = await item.downloadFileContent();
        console.log(fileResultContent);
      }
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

    let dynamicFormListItemId:number;
    if (!isNaN(Number(this.props.dynamicFormListItemId))) {
      dynamicFormListItemId = Number(this.props.dynamicFormListItemId);
    }

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

    const additionalBreadcrumbItems: IBreadcrumbItem[] = [{
      text: 'Places', key: 'Places', onClick: () => {
        console.log('additional breadcrumb item');
      },
    }];

    const linkExample = { href: "#" };
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
      <div className={styles.controlsTest}>
        <div className={styles.container}>
          <h3 className={styles.instruction}>Choose which controls to display</h3>
          <div className={`${styles.row} ${styles.controlFiltersContainer}`}>
            <PrimaryButton text="Open Web Part Settings" iconProps={{ iconName: 'Settings' }} onClick={this.props.onOpenPropertyPane} />
          </div>
        </div>
        <div id="WebPartTitleDiv" className={styles.container} hidden={!controlVisibility.WebPartTitle}>
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty}
            moreLink={
              <Link href="https://pnp.github.io/sp-dev-fx-controls-react/">See all</Link>
            } />
        </div>
        <div id="DynamicFormDiv" className={styles.container} hidden={!controlVisibility.DynamicForm}>
          <div className="ms-font-m">
            <DynamicForm 
              key={this.props.dynamicFormListId} 
              context={this.props.context} 
              listId={this.props.dynamicFormListId} 
              listItemId={dynamicFormListItemId} 
              validationErrorDialogProps={this.props.dynamicFormErrorDialogEnabled ? { showDialogOnValidationError: true } : undefined}
              returnListItemInstanceOnSubmit={true}
              onCancelled={() => { console.log('Cancelled'); }} 
              onSubmitted={async (data, item) => { let itemdata = await item.get(); console.log('Saved item', itemdata)}}
              useClientSideValidation={this.props.dynamicFormClientSideValidationEnabled}
              useFieldValidation={this.props.dynamicFormFieldValidationEnabled}
              useCustomFormatting={this.props.dynamicFormCustomFormattingEnabled}
              enableFileSelection={this.props.dynamicFormFileSelectionEnabled}
            />
          </div>
        </div>
        <div id="TeamsDiv" className={styles.container} hidden={!controlVisibility.Teams}>
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
        <div id="accessibleAccordionDiv" className={styles.container} hidden={!controlVisibility.accessibleAccordion}>
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
        <div id="TaxonomyPickerDiv" className={styles.container} hidden={!controlVisibility.TaxonomyPicker}>
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
        <div id="DateTimePickerDiv" className={styles.container} hidden={!controlVisibility.DateTimePicker}>
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
        </div>
        <div id="RichTextDiv" className={styles.container} hidden={!controlVisibility.RichText}>
          {/* <RichText isEditMode={this.props.displayMode === DisplayMode.Edit} onChange={value => { this.richTextValue = value; return value; }} /> */}
          <RichText label="My rich text field" value={this.state.richTextValue} isEditMode={this.props.displayMode === DisplayMode.Edit} onChange={value => { this.setState({ richTextValue: value }); return value; }} />
          <PrimaryButton text='Reset text' onClick={() => { this.setState({ richTextValue: 'test' }); }} />
        </div>
        <div id="PlaceholderDiv" className={styles.container} hidden={!controlVisibility.Placeholder}>
          <Placeholder iconName='Edit'
            iconText='Configure your web part'
            description={defaultClassNames => <span className={defaultClassNames}>Please configure the web part.</span>}
            buttonLabel='Configure'
            hideButton={this.props.displayMode === DisplayMode.Read}
            onConfigure={this._onConfigure}
            theme={this.props.themeVariant} />
        </div>
        <div id="PeoplePickerDiv" className={styles.container} hidden={!controlVisibility.PeoplePicker}>
          <PeoplePicker context={this.props.context}
            titleText="People Picker custom styles"
            styles={this.pickerStylesSingle}
            personSelectionLimit={5}
            ensureUser={true}
            principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
            onChange={this._getPeoplePickerItems} />

          <PeoplePicker context={this.props.context}
            titleText="People Picker with filter for '.com'"
            personSelectionLimit={5}
            ensureUser={true}
            principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
            resultFilter={(result: IPersonaProps[]) => {
              return result.filter(p => p["loginName"].indexOf(".com") !== -1);
            }}
            onChange={this._getPeoplePickerItems} />

          <PeoplePicker context={this.props.context}
            titleText="People Picker (Group not found)"
            webAbsoluteUrl={this.props.context.pageContext.site.absoluteUrl}
            groupName="Team Site Visitors 123"
            ensureUser={true}
            principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
            defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
            onChange={this._getPeoplePickerItems} />

          <PeoplePicker context={this.props.context}
            titleText="People Picker (search for group)"
            groupName="Team Site Visitors"
            principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
            defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
            onChange={this._getPeoplePickerItems} />

          <PeoplePicker context={this.props.context}
            titleText="People Picker (pre-set global users)"
            principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
            defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
            onChange={this._getPeoplePickerItems}
            personSelectionLimit={2}
            ensureUser={true} />

          <PeoplePicker context={this.props.context}
            titleText="People Picker (pre-set local users)"
            webAbsoluteUrl={this.props.context.pageContext.site.absoluteUrl}
            principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
            defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
            onChange={this._getPeoplePickerItems} />

          <PeoplePicker context={this.props.context}
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


          <PeoplePicker context={this.props.context}
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

          <PeoplePicker context={this.props.context}
            titleText="People Picker (disabled)"
            disabled={true}
            showtooltip={true}
            defaultSelectedUsers={['aleksei.dovzhyk@sharepointalist.com']} />
        </div>
        <div id="DragDropFilesDiv" className={styles.container} hidden={!controlVisibility.DragDropFiles}>
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
        <div id="ListViewDiv" className={styles.container} hidden={!controlVisibility.ListView}>
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
        <div id="ChartControlDiv" className={styles.container} hidden={!controlVisibility.ChartControl}>
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
        <div id="MapDiv" className={styles.container} hidden={!controlVisibility.Map}>
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
        <div id="ModernAudioDiv" className={styles.container} hidden={!controlVisibility.ModernAudio}>
          <ModernAudio audioUrl='https://www.winhistory.de/more/winstart/mp3/vista.mp3' label="Audio Control" labelPosition={ModernAudioLabelPosition.BottomCenter} />
        </div>
        <div id="FileTypeIconDiv" className={styles.container} hidden={!controlVisibility.FileTypeIcon}>
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
          <div className="ms-font-m">Icon size tester:
            <Dropdown options={sizeOptions} onChanged={this._onIconSizeChange} />
            <FileTypeIcon type={IconType.image} size={this.state.imgSize} application={ApplicationType.Excel} />
            <FileTypeIcon type={IconType.image} size={this.state.imgSize} application={ApplicationType.PDF} />
            <FileTypeIcon type={IconType.image} size={this.state.imgSize} />
          </div>
        </div>
        <div id="SecurityTrimmedControlDiv" className={styles.container} hidden={!controlVisibility.SecurityTrimmedControl}>
          <SecurityTrimmedControl context={this.props.context} level={PermissionLevel.currentWeb} permissions={[SPPermission.viewListItems]} className={"TestingClass"} noPermissionsControl={<p>You do not have permissions.</p>}>
            <p>You have permissions to view list items.</p>
          </SecurityTrimmedControl>
        </div>
        <div id="SitePickerDiv" className={styles.container} hidden={!controlVisibility.SitePicker}>
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
        <div id="ListPickerDiv" className={styles.container} hidden={!controlVisibility.ListPicker}>
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
        <div id="ListItemPickerDiv" className={styles.container} hidden={!controlVisibility.ListItemPicker}>
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

        <div id="ListItemCommentsDiv" className={styles.container} hidden={!controlVisibility.ListItemComments}>
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

        <div id="ViewPickerDiv" className={styles.container} hidden={!controlVisibility.ViewPicker}>
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

        <div id="FieldPickerDiv" className={styles.container} hidden={!controlVisibility.FieldPicker}>
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
        <div id="IconPickerDiv" className={styles.container} hidden={!controlVisibility.IconPicker}>
          <div>Icon Picker</div>
          <div>
            <IconPicker
              renderOption="panel"
              onSave={(value) => { console.log(value); }}
              currentIcon={'Warning'}
              buttonLabel="Icon Picker">
            </IconPicker>
          </div>
          <IconPicker buttonLabel={'Icon'}
            onChange={(iconName: string) => { console.log(iconName); }}
            onCancel={() => { console.log("Panel closed"); }}
            onSave={(iconName: string) => { console.log(iconName); }} />
        </div>
        <div id="ComboBoxListItemPickerDiv" className={styles.container} hidden={!controlVisibility.ComboBoxListItemPicker}>
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
        <div id="IFrameDialogDiv" className={styles.container} hidden={!controlVisibility.IFrameDialog}>
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
        <div id="IFramePanelDiv" className={styles.container} hidden={!controlVisibility.IFramePanel}>
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
        <div id="FolderPickerDiv" className={styles.container} hidden={!controlVisibility.FolderPicker}>
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
        <div id="CarouselDiv" className={styles.container} hidden={!controlVisibility.Carousel}>
          <div>
            <h3>Carousel with fixed elements:</h3>
            <Carousel
              buttonsLocation={CarouselButtonsLocation.top}
              buttonsDisplay={CarouselButtonsDisplay.block}

              contentContainerStyles={styles.carouselContent}
              containerButtonsStyles={styles.carouselButtonsContainer}

              isInfinite={true}

              element={this.carouselElements}
              onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
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
        </div>
        <div id="SiteBreadcrumbDiv" className={styles.container} hidden={!controlVisibility.SiteBreadcrumb}>
          <div className={styles.siteBreadcrumb}>
            <SiteBreadcrumb context={this.props.context} />
          </div>
        </div>
        <div id="FilePickerDiv" className={styles.container} hidden={!controlVisibility.FilePicker}>

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
                  File size: {this.state.filePickerResult[0].fileSize}
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
        <div id="ProgressDiv" className={styles.container} hidden={!controlVisibility.Progress}>
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
        <div id="GridLayoutDiv" className={styles.container} hidden={!controlVisibility.GridLayout}>
          <div className="ms-font-l">Grid Layout</div>
          <GridLayout
            ariaLabel={"List of content, use right and left arrow keys to navigate, arrow down to access details."}
            items={sampleGridData}
            onRenderGridItem={(item: any, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)}
          />
        </div>
        <div id="FolderExplorerDiv" className={styles.container} hidden={!controlVisibility.FolderExplorer}>
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
        <div id="TreeViewDiv" className={styles.container} hidden={!controlVisibility.TreeView}>
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
        <div id="PaginationDiv" className={styles.container} hidden={!controlVisibility.Pagination}>
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
        <div id="FieldCollectionDataDiv" className={styles.container} hidden={!controlVisibility.FieldCollectionData}>
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
                multiSelect: false, options: [{key: "choice 1", text: "choice 1"}, {key: "choice 2", text: "choice 2"}, {key: "choice 3", text: "choice 3"}]
              },
              {
                id: "Field7", title: "Combo Multi", type: CustomCollectionFieldType.combobox,
                allowFreeform: true, multiSelect: true, options: [{key: "choice 1", text: "choice 1"}, {key: "choice 2", text: "choice 2"}, {key: "choice 3", text: "choice 3"}]
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
        <div id="DashboardDiv" className={styles.container} hidden={!controlVisibility.Dashboard}>
          <Dashboard
            widgets={[{
              title: "Card 1",
              desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
              widgetActionGroup: calloutItemsExample,
              size: WidgetSize.Triple,
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
              link: linkExample,
            },
            {
              title: "Card 3",
              size: WidgetSize.Double,
              link: linkExample,
            },
            {
              title: "Card 4",
              size: WidgetSize.Single,
              link: linkExample,
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
        <div id="ToolbarDiv" className={styles.container} hidden={!controlVisibility.Toolbar}>
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
        <div id="AnimatedDialogDiv" className={styles.container} hidden={!controlVisibility.animatedDialog}>
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
        <div id="LocationPickerDiv" className={styles.container} hidden={!controlVisibility.LocationPicker}>
          <LocationPicker context={this.props.context} label="Location" onChange={(locValue: ILocationPickerItem) => { console.log(locValue.DisplayName + ", " + locValue.Address.Street); }}></LocationPicker>
        </div>
        <div id="ModernTaxonomyPickerDiv" className={styles.container} hidden={!controlVisibility.ModernTaxonomyPicker}>
          <ModernTaxonomyPicker
            allowMultipleSelections={true}
            termSetId={"7b84b0b6-50b8-4d26-8098-029eba42fe8a"}
            panelTitle="Panel title"
            label={"Modern Taxonomy Picker"}
            context={this.props.context}
            required={false}
            disabled={false}
            customPanelWidth={400}
          />
        </div>
        <div id="AdaptiveCardHostDiv" className={styles.container} hidden={!controlVisibility.adaptiveCardHost}>
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
        <div id="VariantThemeProviderDiv" className={styles.container} hidden={!controlVisibility.VariantThemeProvider}>
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
        <div id="EnhancedThemeProviderDiv" className={styles.container} hidden={!controlVisibility.EnhancedThemeProvider}>
          <h3>Enhanced Theme Provider</h3>
          <EnhancedThemeProvider applyTo="element" context={this.props.context} theme={this.props.themeVariant}>
            <ControlsTestEnhancedThemeProviderFunctionComponent />
            <ControlsTestEnhancedThemeProvider />
          </EnhancedThemeProvider>
        </div>
        <div id="AdaptiveCardDesignerHostDiv" className={styles.container} hidden={!controlVisibility.adaptiveCardDesignerHost}>
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
        <div id="TestControlDiv" className={styles.container} hidden={!controlVisibility.TestControl}>
          <h3>Monaco Editor</h3>
          <TestControl context={this.props.context} themeVariant={this.props.themeVariant} />
        </div>
        <div id="UploadFilesDiv" className={styles.container} hidden={!controlVisibility.UploadFiles}>
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
      </div>
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
          "Field6": {key: "choice 1", text: "choice 1"},
          "Field7": [{key: "choice 1", text: "choice 1"}, {key: "choice 2", text: "choice 2"}],
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
