import * as React from "react";
import { ITag } from "office-ui-fabric-react/lib/Pickers";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { Text } from "office-ui-fabric-react/lib/Text";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/components/Button";
import { DialogType, DialogFooter, IDialogContentProps } from "office-ui-fabric-react/lib/components/Dialog";
import { IModalProps } from "office-ui-fabric-react/lib/Modal";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";
import { Link } from "office-ui-fabric-react/lib/components/Link";
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  IDocumentCardPreviewProps,
} from "office-ui-fabric-react/lib/DocumentCard";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { ImageFit } from "office-ui-fabric-react/lib/Image";
import { PanelType } from "office-ui-fabric-react/lib/Panel";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { ISize } from "office-ui-fabric-react/lib/Utilities";
import { DayOfWeek } from "office-ui-fabric-react/lib/utilities/dateValues/DateValues";

import {
  ExclamationCircleIcon,
  Flex,
  ScreenshareIcon,
  ShareGenericIcon,
  Text as NorthstarText,
} from "@fluentui/react-northstar";
import { DisplayMode, Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { SPHttpClient } from "@microsoft/sp-http";
import { SPPermission } from "@microsoft/sp-page-context";

import { Accordion } from "../../../controls/accordion";
import { ChartControl, ChartType } from "../../../ChartControl";
import {
  Accordion as AccessibleAccordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "../../../controls/accessibleAccordion";
import {
  Carousel,
  CarouselButtonsDisplay,
  CarouselButtonsLocation,
  CarouselIndicatorsDisplay,
  CarouselIndicatorShape,
} from "../../../controls/carousel";
import { Dashboard, WidgetSize } from "../../../controls/dashboard";
import { TimeDisplayControlType } from "../../../controls/dateTimePicker/TimeDisplayControlType";
import { IconPicker } from "../../../controls/iconPicker";
import { ComboBoxListItemPicker } from "../../../controls/listItemPicker/ComboBoxListItemPicker";
import { Pagination } from "../../../controls/pagination";
import { TermActionsDisplayStyle } from "../../../controls/taxonomyPicker";
import { TermActionsDisplayMode } from "../../../controls/taxonomyPicker/termActions";
import { Toolbar } from "../../../controls/toolbar";
import { ITreeItem, TreeItemActionsDisplayMode, TreeView, TreeViewSelectionMode } from "../../../controls/treeView";
import { DateConvention, DateTimePicker, TimeConvention } from "../../../DateTimePicker";
import { CustomCollectionFieldType, FieldCollectionData } from "../../../FieldCollectionData";
import { FilePicker, IFilePickerResult } from "../../../FilePicker";
import { ApplicationType, FileTypeIcon, IconType, ImageSize } from "../../../FileTypeIcon";
import { FolderExplorer, IBreadcrumbItem, IFolder } from "../../../FolderExplorer";
import { FolderPicker } from "../../../FolderPicker";
import { GridLayout } from "../../../GridLayout";
import { IFrameDialog } from "../../../IFrameDialog";
import { IFramePanel } from "../../../IFramePanel";
import { ListItemPicker } from "../../../ListItemPicker";
import { ListPicker } from "../../../ListPicker";
import { GroupOrder, IGrouping, IViewField, ListView, SelectionMode } from "../../../ListView";
import { Map, MapType } from "../../../Map";
import { PeoplePicker, PrincipalType } from "../../../PeoplePicker";
import { Placeholder } from "../../../Placeholder";
import { IProgressAction, Progress } from "../../../Progress";
import { RichText } from "../../../RichText";
import { PermissionLevel, SecurityTrimmedControl } from "../../../SecurityTrimmedControl";
import { ITerm } from "../../../services/ISPTermStorePickerService";
import SPTermStorePickerService from "../../../services/SPTermStorePickerService";
import { SiteBreadcrumb } from "../../../SiteBreadcrumb";
import { IPickerTerms, TaxonomyPicker, UpdateType } from "../../../TaxonomyPicker";
import { WebPartTitle } from "../../../WebPartTitle";
import { AnimatedDialog } from "../../../AnimatedDialog";
import styles from "./ControlsTest.module.scss";
import { IControlsTestProps, IControlsTestState } from "./IControlsTestProps";
import { MyTeams } from "../../../controls/MyTeams";
import { TeamPicker } from "../../../TeamPicker";
import { TeamChannelPicker } from "../../../TeamChannelPicker";
import { DragDropFiles } from "../../../DragDropFiles";
import { SitePicker } from "../../../controls/sitePicker/SitePicker";
import { DynamicForm } from "../../../controls/dynamicForm";
import { LocationPicker } from "../../../controls/locationPicker/LocationPicker";
import { ILocationPickerItem } from "../../../controls/locationPicker/ILocationPicker";
import { ListItemComments } from "../../../controls/listItemComments";

// Used to render document card
/**
 * The sample data below was randomly generated (except for the title). It is used by the grid layout
 */
const sampleGridData: any[] = [
  {
    thumbnail:
      "https://pixabay.com/get/57e9dd474952a414f1dc8460825668204022dfe05555754d742e7bd6/hot-air-balloons-1984308_640.jpg",
    title: "Adventures in SPFx",
    name: "Perry Losselyong",
    profileImageSrc: "https://robohash.org/blanditiisadlabore.png?size=50x50&set=set1",
    location: "SharePoint",
    activity: "3/13/2019",
  },
  {
    thumbnail:
      "https://pixabay.com/get/55e8d5474a52ad14f1dc8460825668204022dfe05555754d742d79d0/autumn-3804001_640.jpg",
    title: "The Wild, Untold Story of SharePoint!",
    name: "Ebonee Gallyhaock",
    profileImageSrc: "https://robohash.org/delectusetcorporis.bmp?size=50x50&set=set1",
    location: "SharePoint",
    activity: "6/29/2019",
  },
  {
    thumbnail:
      "https://pixabay.com/get/57e8dd454c50ac14f1dc8460825668204022dfe05555754d742c72d7/log-cabin-1886620_640.jpg",
    title: "Low Code Solutions: PowerApps",
    name: "Seward Keith",
    profileImageSrc: "https://robohash.org/asperioresautquasi.jpg?size=50x50&set=set1",
    location: "PowerApps",
    activity: "12/31/2018",
  },
  {
    thumbnail:
      "https://pixabay.com/get/55e3d445495aa514f1dc8460825668204022dfe05555754d742b7dd5/portrait-3316389_640.jpg",
    title: "Not Your Grandpa's SharePoint",
    name: "Sharona Selkirk",
    profileImageSrc: "https://robohash.org/velnammolestiae.png?size=50x50&set=set1",
    location: "SharePoint",
    activity: "11/20/2018",
  },
  {
    thumbnail:
      "https://pixabay.com/get/57e6dd474352ae14f1dc8460825668204022dfe05555754d742a7ed1/faucet-1684902_640.jpg",
    title: "Get with the Flow",
    name: "Boyce Batstone",
    profileImageSrc: "https://robohash.org/nulladistinctiomollitia.jpg?size=50x50&set=set1",
    location: "Flow",
    activity: "5/26/2019",
  },
];

const sampleItems = [
  {
    Langue: { Nom: "Français" },
    Question: "Charger des fichiers et dossiers",
    Reponse:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    Langue: { Nom: "Français" },
    Question: "Enregistrer un fichier",
    Reponse:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    Langue: { Nom: "Français" },
    Question: "Troisième exemple",
    Reponse:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    Langue: { Nom: "Français" },
    Question: "Quatrième exemple",
    Reponse:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    Langue: { Nom: "Français" },
    Question: "Cinquième exemple",
    Reponse:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    Langue: { Nom: "Français" },
    Question: "Sixième exemple",
    Reponse:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

/**
 * Component that can be used to test out the React controls from this project
 */
export default class ControlsTest extends React.Component<IControlsTestProps, IControlsTestState> {
  private taxService: SPTermStorePickerService = null;
  private richTextValue: string = null;

  private onSelectedChannel = (teamsId: string, channelId: string) => {
    alert(`TeamId: ${teamsId}\n ChannelId: ${channelId}\n`);
    console.log("TeamsId", teamsId);
    console.log("ChannelId", channelId);
  }

  /**
   * Static array for carousel control example.
   */
  private carouselElements = [
    <div id="1" key="1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a mattis libero, nec consectetur neque. Suspendisse
      potenti. Fusce ultrices faucibus consequat. Suspendisse ex diam, ullamcorper sit amet justo ac, accumsan congue
      neque. Vestibulum aliquam mauris non justo convallis, id molestie purus sodales. Maecenas scelerisque aliquet
      turpis, ac efficitur ex iaculis et. Vivamus finibus mi eget urna tempor, sed porta justo tempus. Vestibulum et
      lectus magna. Integer ante felis, ullamcorper venenatis lectus ac, vulputate pharetra magna. Morbi eget nisl
      tempus, viverra diam ac, mollis tortor. Nam odio ex, viverra bibendum mauris vehicula, consequat suscipit ligula.
      Nunc sed ultrices augue, eu tincidunt diam.
    </div>,
    <div id="2" key="2">
      Quisque metus lectus, facilisis id consectetur ac, hendrerit eget quam. Interdum et malesuada fames ac ante ipsum
      primis in faucibus. Ut faucibus posuere felis vel efficitur. Maecenas et massa in sem tincidunt finibus. Duis sit
      amet bibendum nisi. Vestibulum pretium pretium libero, vel tincidunt sem vestibulum sed. Interdum et malesuada
      fames ac ante ipsum primis in faucibus. Proin quam lorem, venenatis id bibendum id, tempus eu nibh. Sed tristique
      semper ligula, vitae gravida diam gravida vitae. Donec eget posuere mauris, pharetra semper lectus.
    </div>,
    <div id="3" key="3">
      Pellentesque tempor et leo at tincidunt. Vivamus et leo sed eros vehicula mollis vitae in dui. Duis posuere
      sodales enim ut ultricies. Cras in venenatis nulla. Ut sed neque dignissim, sollicitudin tellus convallis,
      placerat leo. Aliquam vestibulum, leo pharetra sollicitudin pretium, ipsum nisl tincidunt orci, in molestie ipsum
      dui et mi. Praesent aliquam accumsan risus sed bibendum. Cras consectetur elementum turpis, a mollis velit gravida
      sit amet. Praesent non augue cursus, varius justo at, molestie lorem. Nulla cursus tellus quis odio congue
      elementum. Vivamus sit amet quam nec lectus hendrerit blandit. Duis ac condimentum sem. Morbi hendrerit elementum
      purus, non facilisis arcu bibendum vitae. Vivamus commodo tristique euismod.
    </div>,
    <div id="4" key="4">
      Proin semper egestas porta. Nullam risus nisl, auctor ac hendrerit in, dapibus quis ex. Quisque vitae nisi quam.
      Etiam vel sapien ut libero ornare rhoncus nec vestibulum dolor. Curabitur lacinia aliquam arcu. Proin ultrices
      risus velit, in vehicula tellus vehicula at. Sed ultrices et felis fringilla ultricies.
    </div>,
    <div id="5" key="5">
      Donec orci lorem, imperdiet eu nisi sit amet, condimentum scelerisque tortor. Etiam nec lacinia dui. Duis non
      turpis neque. Sed pellentesque a erat et accumsan. Pellentesque elit odio, elementum nec placerat nec, ornare in
      tortor. Suspendisse gravida magna maximus mollis facilisis. Duis odio libero, finibus ac suscipit sed, aliquam et
      diam. Aenean posuere lacus ex. Donec dapibus, sem ac luctus ultrices, justo libero tempor eros, vitae lacinia ex
      ante non dolor. Curabitur condimentum, ligula id pharetra dictum, libero libero ullamcorper nunc, eu blandit sem
      arcu ut felis. Nullam lacinia dapibus auctor.
    </div>,
  ];

  private skypeCheckIcon: IIconProps = { iconName: "SkypeCheck" };
  private treeitems = [
    {
      key: "R1",
      label: "Root",
      subLabel: "This is a sub label for node",
      iconProps: this.skypeCheckIcon,
      actions: [
        {
          title: "Get item",
          iconProps: {
            iconName: "Warning",
            style: {
              color: "salmon",
            },
          },
          id: "GetItem",
          actionCallback: async (treeItem: ITreeItem) => {
            console.log(treeItem);
          },
        },
      ],
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
              actions: [
                {
                  title: "Share",
                  iconProps: {
                    iconName: "Share",
                  },
                  id: "GetItem",
                  actionCallback: async (treeItem: ITreeItem) => {
                    console.log(treeItem);
                  },
                },
              ],
              children: [
                {
                  key: "gc1",
                  label: "Grand Child 1",
                  actions: [
                    {
                      title: "Get Grand Child item",
                      iconProps: {
                        iconName: "Mail",
                      },
                      id: "GetItem",
                      actionCallback: async (treeItem: ITreeItem) => {
                        console.log(treeItem);
                      },
                    },
                  ],
                },
              ],
            },
            {
              key: "4",
              label: "Child 2",
              iconProps: this.skypeCheckIcon,
            },
          ],
        },
        {
          key: "2",
          label: "Parent 2",
        },
        {
          key: "5",
          label: "Parent 3",
          disabled: true,
        },
        {
          key: "6",
          label: "Parent 4",
          selectable: true,
        },
      ],
    },
    {
      key: "R2",
      label: "Root 2",
      children: [
        {
          key: "8",
          label: "Parent 5",
        },
        {
          key: "9",
          label: "Parent 6",
        },
        {
          key: "10",
          label: "Parent 7",
        },
        {
          key: "11",
          label: "Parent 8",
        },
      ],
    },
    {
      key: "R3",
      label: "Root 3",
      children: [
        {
          key: "12",
          label: "Parent 9",
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
                  label: "Grandchild of Parent 10",
                },
              ],
            },
          ],
        },
        {
          key: "14",
          label: "Parent 11",
        },
        {
          key: "15",
          label: "Parent 12",
        },
      ],
    },
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
      comboBoxListItemPickerListId: "0ffa51d7-4ad1-4f04-8cfe-98209905d6da",
      treeViewSelectedKeys: ["gc1", "gc3"],
      showAnimatedDialog: false,
      showCustomisedAnimatedDialog: false,
      showSuccessDialog: false,
      showErrorDialog: false,
      selectedTeam: [],
      selectedTeamChannels: [],
    };

    this._onIconSizeChange = this._onIconSizeChange.bind(this);
    this._onConfigure = this._onConfigure.bind(this);
    this._startProgress = this._startProgress.bind(this);
    this.onServicePickerChange = this.onServicePickerChange.bind(this);
  }

  /**
   * React componentDidMount lifecycle hook
   */
  public componentDidMount() {
    const restApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('Shared%20Documents')/files?$expand=ListItemAllFields`;
    this.props.context.spHttpClient
      .get(restApi, SPHttpClient.configurations.v1)
      .then((resp) => {
        return resp.json();
      })
      .then((items) => {
        this.setState({
          items: items.value ? items.value : [],
        });
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
      imgSize: parseInt(element.key.toString()),
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
    console.log("Items:", items);
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
      initialValues: terms,
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
      selectedList: typeof lists === "string" ? lists : lists.pop(),
    });
  }

  /**
   * Deletes second item from the list
   */
  private deleteItem = () => {
    const { items } = this.state;
    if (items.length >= 2) {
      items.splice(1, 1);
      this.setState({
        items: items,
      });
    }
  }

  /**
   * Method that retrieves the selected items from People  Picker
   * @param items
   */
  private _getPeoplePickerItems(items: any[]) {
    console.log("Items:", items);
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
        if (currentIndex == 1) {
          // just a test for error
          action.hasError = true;
          action.errorMessage = "some error message";
        }
      }

      this.setState({
        currentProgressActionIndex: currentIndex,
        progressActions: actions,
      });
      currentIndex++;
    }, 5000);
  }

  private _initProgressActions(): IProgressAction[] {
    return [
      {
        title: "First Step",
        subActionsTitles: ["Sub action 1", "Sub action 2"],
      },
      {
        title: "Second step",
      },
      {
        title: "Third Step",
        subActionsTitles: ["Sub action 1", "Sub action 2", "Sub action 3"],
      },
      {
        title: "Fourth Step",
      },
    ];
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
        currentCarouselElement: nextElement,
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

  private rootFolder: IFolder = {
    Name: "Site",
    ServerRelativeUrl: this.props.context.pageContext.web.serverRelativeUrl,
  };

  private _onFolderSelect = (folder: IFolder): void => {
    console.log("selected folder", folder);
  }

  private _onRenderGridItem = (item: any, _finalSize: ISize, isCompact: boolean): JSX.Element => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.thumbnail,
          imageFit: ImageFit.cover,
          height: 130,
        },
      ],
    };

    return (
      <div
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
            <DocumentCardTitle title={item.title} shouldTruncate={true} />
            <DocumentCardActivity
              activity={item.activity}
              people={[{ name: item.name, profileImageSrc: item.profileImageSrc }]}
            />
          </div>
        </DocumentCard>
      </div>
    );
  }

  /**
   * Renders the component
   */
  public render(): React.ReactElement<IControlsTestProps> {
    // Size options for the icon size dropdown
    const sizeOptions: IDropdownOption[] = [
      {
        key: ImageSize.small,
        text: ImageSize[ImageSize.small],
        selected: ImageSize.small === this.state.imgSize,
      },
      {
        key: ImageSize.medium,
        text: ImageSize[ImageSize.medium],
        selected: ImageSize.medium === this.state.imgSize,
      },
      {
        key: ImageSize.large,
        text: ImageSize[ImageSize.large],
        selected: ImageSize.large === this.state.imgSize,
      },
    ];

    // Specify the fields that need to be viewed in the listview
    const viewFields: IViewField[] = [
      {
        name: "ListItemAllFields.Id",
        displayName: "ID",
        maxWidth: 40,
        sorting: true,
        isResizable: true,
      },
      {
        name: "ListItemAllFields.Underscore_Field",
        displayName: "Underscore_Field",
        sorting: true,
        isResizable: true,
      },
      {
        name: "Name",
        linkPropertyName: "ServerRelativeUrl",
        sorting: true,
        isResizable: true,
      },
      {
        name: "ServerRelativeUrl",
        displayName: "Path",
        render: (item: any) => {
          return <a href={item["ServerRelativeUrl"]}>Link</a>;
        },
        isResizable: true,
      },
      {
        name: "Title",
        isResizable: true,
      },
    ];

    // Specify the fields on which you want to group your items
    // Grouping is takes the field order into account from the array
    // const groupByFields: IGrouping[] = [{ name: "ListItemAllFields.City", order: GroupOrder.ascending }, { name: "ListItemAllFields.Country.Label", order: GroupOrder.descending }];
    const groupByFields: IGrouping[] = [{ name: "ListItemAllFields.Department.Label", order: GroupOrder.ascending }];

    let iframeUrl: string = "/temp/workbench.html";
    if (Environment.type === EnvironmentType.SharePoint) {
      iframeUrl = "/_layouts/15/sharepoint.aspx";
    } else if (Environment.type === EnvironmentType.ClassicSharePoint) {
      iframeUrl = this.context.pageContext.web.serverRelativeUrl;
    }

    const additionalBreadcrumbItems: IBreadcrumbItem[] = [
      {
        text: "Places",
        key: "Places",
        onClick: () => {
          console.log("additional breadcrumb item");
        },
      },
    ];

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
      title: "Animated Dialog",
      subText: "Do you like the animated dialog?",
    };

    const animatedModalProps: IModalProps = {
      isDarkOverlay: true,
    };

    const customizedAnimatedModalProps: IModalProps = {
      isDarkOverlay: true,
      containerClassName: `${styles.dialogContainer}`,
    };

    const customizedAnimatedDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: "Animated Dialog",
    };

    const successDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: "Good answer!",
    };

    const errorDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: "Uh oh!",
    };

    const timeout = (ms: number): Promise<void> => {
      return new Promise((resolve, reject) => setTimeout(resolve, ms));
    };

    return (
      <div className={styles.controlsTest}>
        <div className="ms-font-m">
          {/* Change the list Id and list item id before you start to test this control */}
          {/* <DynamicForm context={this.props.context} listId={"3071c058-549f-461d-9d73-8b9a52049a80"} listItemId={1} onCancelled={() => { console.log('Cancelled'); }} onSubmitted={async (listItem) => { let itemdata = await listItem.get(); console.log(itemdata["ID"]); }}></DynamicForm> */}
        </div>
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty}
          moreLink={<Link href="https://pnp.github.io/sp-dev-fx-controls-react/">See all</Link>}
        />

        <Stack>
          <ListItemComments
            numberCommentsPerPage={5}
            webUrl="https://spteck.sharepoint.com/sites/ThePerspective"
            listId="e738c4b3-6cff-493a-a8da-dbbf4732e3bf"
            itemId={"30"}
            serviceScope={this.props.context.serviceScope}
          />
        </Stack>
      </div>
    );
  }

  private getRandomCollectionFieldData = () => {
    let result = [];
    for (let i = 1; i < 16; i++) {
      result.push({ Field1: `String${i}`, Field2: i, Field3: "https://pnp.github.io/", Field4: true });
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
        {item.iconProps && (
          <i className={"ms-Icon ms-Icon--" + item.iconProps.iconName} style={{ paddingRight: "4px" }} />
        )}
        {item.label}
      </span>
    );
  }

  private _getPage(page: number) {
    console.log("Page:", page);
  }

  // private _onFolderSelect = (folder: IFolder): void => {
  //   console.log('selected folder', folder);
  // }
}
