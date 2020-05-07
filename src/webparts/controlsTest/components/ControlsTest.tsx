import * as React from 'react';
import styles from './ControlsTest.module.scss';
import { IControlsTestProps, IControlsTestState } from './IControlsTestProps';
import { FileTypeIcon, IconType, ApplicationType, ImageSize } from '../../../FileTypeIcon';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { DialogType } from 'office-ui-fabric-react/lib/components/Dialog';
import { Placeholder } from '../../../Placeholder';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from '../../../ListView';
import { SPHttpClient } from '@microsoft/sp-http';
import { SiteBreadcrumb } from '../../../SiteBreadcrumb';
import { WebPartTitle } from '../../../WebPartTitle';
import { TaxonomyPicker, IPickerTerms, UpdateType } from '../../../TaxonomyPicker';
import { ListPicker } from '../../../ListPicker';
import { IFrameDialog } from '../../../IFrameDialog';
import { IFramePanel } from '../../../IFramePanel';
import { PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Environment, EnvironmentType, DisplayMode } from '@microsoft/sp-core-library';
import { SecurityTrimmedControl, PermissionLevel } from '../../../SecurityTrimmedControl';
import { SPPermission } from '@microsoft/sp-page-context';
import { PeoplePicker, PrincipalType } from '../../../PeoplePicker';
import { DayOfWeek } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
import { DateTimePicker, DateConvention, TimeConvention } from '../../../DateTimePicker';
import { getItemClassNames } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames';
import { ListItemPicker } from "../../../ListItemPicker";
import { Map, ICoordinates, MapType } from '../../../Map';
import { ChartControl, ChartType } from "../../../ChartControl";
import { Progress, IProgressAction, IProgressProps } from '../../../Progress';
import { ITerm } from '../../../services/ISPTermStorePickerService';
import SPTermStorePickerService from '../../../services/SPTermStorePickerService';
import { TermActionsDisplayStyle } from '../../../controls/taxonomyPicker';
import { TermLabelAction, TermActionsDisplayMode } from '../../../controls/taxonomyPicker/termActions';
import { ListItemAttachments } from '../../../ListItemAttachments';
import { RichText } from '../../../RichText';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay } from '../../../controls/carousel';
import { TimeDisplayControlType } from '../../../controls/dateTimePicker/TimeDisplayControlType';
import { GridLayout } from '../../../GridLayout';
import { ComboBoxListItemPicker } from '../../../controls/listItemPicker/ComboBoxListItemPicker';
import { TreeView, ITreeItem, TreeItemActionsDisplayMode, TreeViewSelectionMode } from '../../../controls/treeView';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { IconPicker } from '../../../controls/iconPicker';
import { ISize } from 'office-ui-fabric-react/lib/Utilities';

// Used to render document cards
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  //DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardLocation,
  DocumentCardType
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { FilePicker, IFilePickerResult } from '../../../FilePicker';
import FolderPicker from '../../../controls/folderPicker/FolderPicker';
import { FolderExplorer, IFolder, IBreadcrumbItem } from '../../../FolderExplorer';
import { Pagination } from '../../../controls/pagination';

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

/**
 * Component that can be used to test out the React controls from this project
 */
export default class ControlsTest extends React.Component<IControlsTestProps, IControlsTestState> {
  private taxService: SPTermStorePickerService = null;
  private richTextValue: string = null;

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
      currentCarouselElement: this.carouselElements[0]
    };

    this._onIconSizeChange = this._onIconSizeChange.bind(this);
    this._onConfigure = this._onConfigure.bind(this);
    this._startProgress = this._startProgress.bind(this);
  }

  /**
   * React componentDidMount lifecycle hook
   */
  public componentDidMount() {
    const restApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('Shared%20Documents')/files?$expand=ListItemAllFields`;
    this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)
      .then(resp => { return resp.json(); })
      .then(items => {
        this.setState({
          items: items.value ? items.value : []
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
   *
   *Method that retrieves the selected terms from the taxonomy picker and sets state
   * @private
   * @param {IPickerTerms} terms
   * @memberof ControlsTest
   */
  private onServicePickerChange(terms: IPickerTerms): void {
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
      initialValues: terms
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
        if (currentIndex == 1) { // just a test for error
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

  private _onFilePickerSave = async (filePickerResult: IFilePickerResult) => {
    this.setState({ filePickerResult });
    if (filePickerResult) {
      const fileResultContent = await filePickerResult.downloadFileContent();
      console.log(fileResultContent);
    }
  }

  private _onFolderSelect = (folder: IFolder): void => {
    console.log('selected folder', folder);

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

    return (
      <div className={styles.controlsTest}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty}
          moreLink={
            <Link href="https://pnp.github.io/sp-dev-fx-controls-react/">See all</Link>
          } />


        <DateTimePicker label="DateTime Picker (unspecified = date and time)" isMonthPickerVisible={false} showSeconds={false} onChange={(value) => console.log("DateTimePicker value:", value)} placeholder="Pick a date" />
        <DateTimePicker label="DateTime Picker 12-hour clock" showSeconds={true} onChange={(value) => console.log("DateTimePicker value:", value)} />
        <DateTimePicker label="DateTime Picker 24-hour clock" showSeconds={true} timeConvention={TimeConvention.Hours24} onChange={(value) => console.log("DateTimePicker value:", value)} />
        <DateTimePicker label="DateTime Picker no seconds" value={new Date()} onChange={(value) => console.log("DateTimePicker value:", value)} />
        <DateTimePicker label="DateTime Picker (unspecified = date and time)" timeConvention={TimeConvention.Hours24} value={new Date()} onChange={(value) => console.log("DateTimePicker value:", value)} />
        <DateTimePicker label="DateTime Picker dropdown" showSeconds={true} timeDisplayControlType={TimeDisplayControlType.Dropdown} value={new Date()} onChange={(value) => console.log("DateTimePicker value:", value)} />
        <DateTimePicker label="DateTime Picker date only" showLabels={false} dateConvention={DateConvention.Date} value={new Date()} onChange={(value) => console.log("DateTimePicker value:", value)} />

        {/* <RichText isEditMode={this.props.displayMode === DisplayMode.Edit} onChange={value => { this.richTextValue = value; return value; }} /> */}
        <RichText isEditMode={this.props.displayMode === DisplayMode.Edit} onChange={value => { this.setState({ richTextValue: value }); return value; }} />

        {/* <ListItemAttachments listId='0ffa51d7-4ad1-4f04-8cfe-98209905d6da'
          itemId={1}
          context={this.props.context}
          disabled={false} /> */}

        <Placeholder iconName='Edit'
          iconText='Configure your web part'
          description='Please configure the web part.'
          buttonLabel='Configure'
          hideButton={this.props.displayMode === DisplayMode.Read}
          onConfigure={this._onConfigure} />

        <PeoplePicker context={this.props.context}
          titleText="People Picker (Group not found)"
          webAbsoluteUrl={this.props.context.pageContext.site.absoluteUrl}
          groupName="Team Site Visitors 123"
          ensureUser={true}
          principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
          defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
          selectedItems={this._getPeoplePickerItems} />

        <PeoplePicker context={this.props.context}
          titleText="People Picker (search for group)"
          groupName="Team Site Visitors"
          principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
          defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
          selectedItems={this._getPeoplePickerItems} />

        <PeoplePicker context={this.props.context}
          titleText="People Picker (pre-set global users)"
          principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
          defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
          selectedItems={this._getPeoplePickerItems}
          personSelectionLimit={2}
          ensureUser={true} />

        <PeoplePicker context={this.props.context}
          titleText="People Picker (pre-set local users)"
          webAbsoluteUrl={this.props.context.pageContext.site.absoluteUrl}
          principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
          defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
          selectedItems={this._getPeoplePickerItems} />

        <PeoplePicker context={this.props.context}
          titleText="People Picker (tenant scoped)"
          personSelectionLimit={5}
          // groupName={"Team Site Owners"}
          showtooltip={true}
          isRequired={true}
          //defaultSelectedUsers={["tenantUser@domain.onmicrosoft.com", "test@user.com"]}
          //defaultSelectedUsers={this.state.authorEmails}
          selectedItems={this._getPeoplePickerItems}
          showHiddenInUI={false}
          principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
          suggestionsLimit={2}
          resolveDelay={200}
          placeholder={'Select a SharePoint principal (User or Group)'} />

        <PeoplePicker context={this.props.context}
          titleText="People Picker (local scoped)"
          webAbsoluteUrl={this.props.context.pageContext.site.absoluteUrl}
          personSelectionLimit={5}
          // groupName={"Team Site Owners"}
          showtooltip={true}
          isRequired={true}
          //defaultSelectedUsers={["tenantUser@domain.onmicrosoft.com", "test@user.com"]}
          //defaultSelectedUsers={this.state.authorEmails}
          selectedItems={this._getPeoplePickerItems}
          showHiddenInUI={false}
          principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
          suggestionsLimit={2}
          resolveDelay={200} />

        <PeoplePicker context={this.props.context}
          titleText="People Picker (disabled)"
          disabled={true}
          showtooltip={true}
          defaultSelectedUsers={['aleksei.dovzhyk@sharepointalist.com']} />

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
        />

        <DateTimePicker
          label="DateTime Picker (date only)"
          dateConvention={DateConvention.Date}
        />

        <DateTimePicker label="DateTime Picker (disabled)" disabled={true} />

        <ListView items={this.state.items}
          viewFields={viewFields}
          iconFieldName='ServerRelativeUrl'
          groupByFields={groupByFields}
          compact={true}
          selectionMode={SelectionMode.single}
          selection={this._getSelection}
          showFilter={true}
        // defaultFilter="Team"
        />


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

        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-neutralLight ms-fontColor-neutralDark ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl">Controls testing</span>

              <SecurityTrimmedControl context={this.props.context} level={PermissionLevel.currentWeb} permissions={[SPPermission.viewListItems]} className={"TestingClass"} noPermissionsControl={<p>You do not have permissions.</p>}>
                <p>You have permissions to view list items.</p>
              </SecurityTrimmedControl>

              <p className="ms-font-l">
                File type icon control
              </p>
              <div className="ms-font-m">
                Font icons:&nbsp;
                <FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.docx" />&nbsp;
                <FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.unknown" />&nbsp;
                <FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.doc" />&nbsp;
                <FileTypeIcon type={IconType.font} application={ApplicationType.HTML} />&nbsp;
                <FileTypeIcon type={IconType.font} application={ApplicationType.Mail} />&nbsp;
                <FileTypeIcon type={IconType.font} application={ApplicationType.SASS} />
              </div>
              <div className="ms-font-m">
                Image icons:&nbsp;
                <FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.docx" />&nbsp;
                <FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.unknown" />&nbsp;
                <FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.pptx?querystring='prop1'&amp;prop2='test'" /> &nbsp;
                <FileTypeIcon type={IconType.image} application={ApplicationType.Word} />&nbsp;
                <FileTypeIcon type={IconType.image} application={ApplicationType.PDF} />&nbsp;
                <FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.pdf" />
              </div>
              <div className="ms-font-m">Icon size tester:
                <Dropdown options={sizeOptions} onChanged={this._onIconSizeChange} />
                <FileTypeIcon type={IconType.image} size={this.state.imgSize} application={ApplicationType.Excel} />
                <FileTypeIcon type={IconType.image} size={this.state.imgSize} application={ApplicationType.PDF} />
                <FileTypeIcon type={IconType.image} size={this.state.imgSize} />
              </div>

              <div className="ms-font-m">List picker tester:
                <ListPicker context={this.props.context}
                  label="Select your list(s)"
                  placeholder="Select your list(s)"
                  baseTemplate={100}
                  includeHidden={false}
                  multiSelect={true}
                  // filter="Title eq 'Test List'"
                  onSelectionChanged={this.onListPickerChange} />
              </div>

              <div className="ms-font-m">List Item picker list data tester:

                <ListItemPicker listId={'76a8231b-35b6-4703-b1f4-5d03d3dfb1ca'}
                  columnInternalName="Title"
                  keyColumnInternalName="Id"
                  filter={"Title eq 'SPFx'"}
                  itemLimit={5}
                  context={this.props.context}
                  placeholder={'Select list items'}
                  onSelectedItem={this.listItemPickerDataSelected} />

              </div>
              <div>Icon Picker</div>
              <div>
                <IconPicker
                  renderOption="panel"
                  onSave={(value) => { console.log(value); }}
                  currentIcon={'Warning'}
                  buttonLabel="Icon Picker">
                </IconPicker>
              </div>

              <div className="ms-font-m">ComboBoxListItemPicker:

                <ComboBoxListItemPicker listId={'0ffa51d7-4ad1-4f04-8cfe-98209905d6da'}
                  columnInternalName='Title'
                  keyColumnInternalName='Id'
                  multiSelect={true}
                  onSelectedItem={(data) => {
                    console.log(`Item(s):`, data);
                  }}
                  webUrl={this.props.context.pageContext.web.absoluteUrl}
                  spHttpClient={this.props.context.spHttpClient} />

              </div>

              <div className="ms-font-m">Services tester:
                <TaxonomyPicker
                  allowMultipleSelections={true}
                  termsetNameOrID="61837936-29c5-46de-982c-d1adb6664b32" // id to termset that has a custom sort
                  panelTitle="Select Sorted Term"
                  label="Service Picker with custom actions"
                  context={this.props.context}
                  onChange={this.onServicePickerChange}
                  isTermSetSelectable={false}
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
                    termActionsDisplayStyle: TermActionsDisplayStyle.textAndIcon
                  }}
                />

                <TaxonomyPicker
                  allowMultipleSelections={true}
                  termsetNameOrID="e813224c-bb1b-4086-b828-3d71434ddcd7" // id to termset that has a default sort
                  panelTitle="Select Default Sorted Term"
                  label="Service Picker"
                  context={this.props.context}
                  onChange={this.onServicePickerChange}
                  isTermSetSelectable={false}
                  placeholder="Select service"
                />

                <TaxonomyPicker
                  initialValues={this.state.initialValues}
                  allowMultipleSelections={true}
                  termsetNameOrID="313362ca-6813-4433-bcce-7bf74a18b9cb"
                  // anchorId="0ec2f948-3978-499e-9d3f-e51c4494d44c"
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
                  hideTagsNotAvailableForTagging={true} />

                <DefaultButton text="Add" onClick={() => {
                  this.setState({
                    initialValues: [{
                      key: "ab703558-2546-4b23-b8b8-2bcb2c0086f5",
                      name: "HR",
                      path: "HR",
                      termSet: "b3e9b754-2593-4ae6-abc2-35345402e186"
                    }]
                  });
                }} />
              </div>
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
                    isBlocking: true
                  }}
                  dialogContentProps={{
                    type: DialogType.close,
                    showCloseButton: true
                  }}
                  width={'570px'}
                  height={'315px'} />
              </div>
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
              <div>
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
            </div>
          </div>
        </div>

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

        <div className={styles.siteBreadcrumb}>
          <SiteBreadcrumb context={this.props.context} />
        </div>

        <div>
          <FilePicker
            bingAPIKey="<BING API KEY>"
            //accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
            buttonLabel="Upload image"
            buttonIcon="FileImage"
            onSave={this._onFilePickerSave}
            onChanged={(filePickerResult: IFilePickerResult) => { this.setState({ filePickerResult }); }}
            context={this.props.context}
          />
          {
            this.state.filePickerResult &&
            <div>
              FileName: {this.state.filePickerResult.fileName}
            </div>
          }
        </div>

        <p><a href="javascript:;" onClick={this.deleteItem}>Deletes second item</a></p>
        <div>
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

        <div className="ms-font-l">Grid Layout</div>
        <GridLayout
          ariaLabel={"List of content, use right and left arrow keys to navigate, arrow down to access details."}
          items={sampleGridData}
          onRenderGridItem={(item: any, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)}
        />

        <IconPicker buttonLabel={'Icon'}
            onChange={(iconName: string) => { console.log(iconName); }}
            onSave={(iconName: string) => { console.log(iconName); }} />

        <div>
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
          />
        </div>

        <div>
          <h3>Tree View</h3>
          <TreeView items={this.treeitems}
            defaultExpanded={false}
            selectionMode={TreeViewSelectionMode.Multiple}
            showCheckboxes={true}
            treeItemActionsDisplayMode={TreeItemActionsDisplayMode.ContextualMenu}
            defaultSelectedKeys={['R2', '6']}
            onExpandCollapse={this.onExpandCollapseTree}
            onSelect={this.onItemSelected}
          // onRenderItem={this.renderCustomTreeItem}
          />

        </div>

        <div>
          <Pagination
            currentPage={3}
            onChange={(page) => (this._getPage(page))}
            totalPages={13}
          //limiter={3}
          // hideFirstPageJump
          //hideLastPageJump
          //limiterIcon={"NumberedListText"}
          />
        </div>
      </div>
    );
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
}
