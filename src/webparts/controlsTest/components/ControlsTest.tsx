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
import { TaxonomyPicker, IPickerTerms } from '../../../TaxonomyPicker';
import { ListPicker } from '../../../ListPicker';
import { IFrameDialog } from '../../../IFrameDialog';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SecurityTrimmedControl, PermissionLevel } from '../../../SecurityTrimmedControl';
import { SPPermission } from '@microsoft/sp-page-context';
import { PeoplePicker, PrincipalType } from '../../../PeoplePicker';
import { ListItemPicker } from "../../../ListItemPicker";
import { Carousel } from '../../../../lib/controls/carousel';
import { CarouselButtonsLocation, CarouselButtonsDisplay } from '../../../controls/carousel';

/**
 * Component that can be used to test out the React controls from this project
 */
export default class ControlsTest extends React.Component<IControlsTestProps, IControlsTestState> {
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

  constructor(props: IControlsTestProps) {
    super(props);

    this.state = {
      imgSize: ImageSize.small,
      items: [],
      iFrameDialogOpened: false,
      initialValues: [],
      authorEmails: [],
      selectedList: null,
      canMovePrev: false,
      canMoveNext: true,
      currentCarouselElement: this.carouselElements[0]
    };

    this._onIconSizeChange = this._onIconSizeChange.bind(this);
    this._onConfigure = this._onConfigure.bind(this);
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
    const groupByFields: IGrouping[] = [{ name: "ListItemAllFields.City", order: GroupOrder.ascending }, { name: "ListItemAllFields.Country.Label", order: GroupOrder.descending }];

    let iframeUrl: string = '/temp/workbench.html';
    if (Environment.type === EnvironmentType.SharePoint) {
      iframeUrl = '/_layouts/15/sharepoint.aspx';
    }
    else if (Environment.type === EnvironmentType.ClassicSharePoint) {
      iframeUrl = this.context.pageContext.web.serverRelativeUrl;
    }

    return (
      <div className={styles.controlsTest}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />

        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-neutralLight ms-fontColor-neutralDark ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl">Controls testing</span>

              <SecurityTrimmedControl context={this.props.context} level={PermissionLevel.currentWeb} permissions={[SPPermission.viewListItems]}>
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
              </div>
              <div className="ms-font-m">Icon size tester:
                <Dropdown options={sizeOptions} onChanged={this._onIconSizeChange} />
                <FileTypeIcon type={IconType.image} size={this.state.imgSize} application={ApplicationType.Excel} />
                <FileTypeIcon type={IconType.image} size={this.state.imgSize} />
              </div>

              <div className="ms-font-m">List picker tester:
                <ListPicker context={this.props.context}
                  label="Select your list(s)"
                  placeHolder="Select your list(s)"
                  baseTemplate={100}
                  includeHidden={false}
                  multiSelect={true}
                  onSelectionChanged={this.onListPickerChange} />
              </div>

              <div className="ms-font-m">Field picker list data tester:
                <ListItemPicker listId={this.state.selectedList}
                  columnInternalName="Title"
                  itemLimit={5}
                  context={this.props.context}
                  onSelectedItem={this.listItemPickerDataSelected} />
              </div>

              <div className="ms-font-m">Services tester:
              <TaxonomyPicker
                  allowMultipleSelections={true}
                  termsetNameOrID="ef1d77ab-51f6-492f-bf28-223a8ebc4b65" // id to termset that has a custom sort
                  panelTitle="Select Sorted Term"
                  label="Service Picker"
                  context={this.props.context}
                  onChange={this.onServicePickerChange}
                  isTermSetSelectable={false}
                />

                <TaxonomyPicker
                  allowMultipleSelections={true}
                  termsetNameOrID="e813224c-bb1b-4086-b828-3d71434ddcd7" // id to termset that has a default sort
                  panelTitle="Select Default Sorted Term"
                  label="Service Picker"
                  context={this.props.context}
                  onChange={this.onServicePickerChange}
                  isTermSetSelectable={false}
                />

                <TaxonomyPicker
                  initialValues={this.state.initialValues}
                  allowMultipleSelections={true}
                  termsetNameOrID="b3e9b754-2593-4ae6-abc2-35345402e186"
                  // anchorId="0ec2f948-3978-499e-9d3f-e51c4494d44c"
                  // disabledTermIds={["943fd9f0-3d7c-415c-9192-93c0e54573fb", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                  // disabledTermIds={["943fd9f0-3d7c-415c-9192-93c0e54573fb", "73d18756-20af-41de-808c-2a1e21851e44", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                  // disabledTermIds={["cd6f6d3c-672d-4244-9320-c1e64cc0626f", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"]}
                  // disableChildrenOfDisabledParents={true}
                  panelTitle="Select Term"
                  label="Taxonomy Picker"
                  context={this.props.context}
                  onChange={this._onTaxPickerChange}
                  isTermSetSelectable={false} />

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
            </div>
          </div>
        </div>

        <div className={styles.siteBreadcrumb}>
          <SiteBreadcrumb context={this.props.context} />
        </div>

        <Placeholder
          iconName='Edit'
          iconText='Configure your web part'
          description='Please configure the web part.'
          buttonLabel='Configure'
          onConfigure={this._onConfigure} />

        <ListView
          items={this.state.items}
          viewFields={viewFields}
          iconFieldName='ServerRelativeUrl'
          groupByFields={groupByFields}
          compact={true}
          selectionMode={SelectionMode.single}
          selection={this._getSelection} />

        <p><a href="javascript:;" onClick={this.deleteItem}>Deletes second item</a></p>

        <PeoplePicker
          context={this.props.context}
          titleText="People Picker"
          personSelectionLimit={5}
          // groupName={"Team Site Owners"}
          showtooltip={true}
          isRequired={true}
          //defaultSelectedUsers={["tenantUser@domain.onmicrosoft.com", "test@user.com"]}
          //defaultSelectedUsers={this.state.authorEmails}
          selectedItems={this._getPeoplePickerItems}
          showHiddenInUI={false}
          principleTypes={[PrincipalType.User]}
          suggestionsLimit={2} />

        <PeoplePicker
          context={this.props.context}
          titleText="People Picker (disabled)"
          disabled={true}
          showtooltip={true} />

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
      </div>
    );
  }
}
