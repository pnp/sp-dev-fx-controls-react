import * as React from 'react';
import styles from './ControlsTest.module.scss';
import { IControlsTestProps, IControlsTestState } from './IControlsTestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FileTypeIcon, IconType, ApplicationType, ImageSize } from '../../../FileTypeIcon';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button';
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

/**
 * Component that can be used to test out the React controls from this project
 */
export default class ControlsTest extends React.Component<IControlsTestProps, IControlsTestState> {
  constructor(props: IControlsTestProps) {
    super(props);

    this.state = {
      imgSize: ImageSize.small,
      items: [],
      iFrameDialogOpened: false
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
   * Method that retrieves the selected terms from the taxonomy picker
   * @param terms
   */
  private _onTaxPickerChange(terms : IPickerTerms) {
      console.log("Terms:", terms);
  }

  /**
   * Selected lists change event
   * @param lists
   */
  private onListPickerChange (lists: string | string[]) {
    console.log("Lists:", lists);
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
        sorting: true
      },
      {
        name: 'ListItemAllFields.Underscore_Field',
        displayName: "Underscore_Field",
        sorting: true
      },
      {
        name: 'Name',
        linkPropertyName: 'ServerRelativeUrl',
        sorting: true
      },
      {
        name: 'ServerRelativeUrl',
        displayName: 'Path',
        render: (item: any) => {
          return <a href={item['ServerRelativeUrl']}>Link</a>;
        }
      },
      {
        name: 'Title'
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

              <div className="ms-font-m">TaxonomyPicker tester:
                <TaxonomyPicker
                  allowMultipleSelections={true}
                  termsetNameOrID="8ed8c9ea-7052-4c1d-a4d7-b9c10bffea6f"
                  // anchorId="0ec2f948-3978-499e-9d3f-e51c4494d44c"
                  panelTitle="Select Term"
                  label="Taxonomy Picker"
                  context={this.props.context}
                  onChange={this._onTaxPickerChange}
                  isTermSetSelectable={false} />
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
          selectionMode={SelectionMode.multiple}
          selection={this._getSelection} />

          <p><a href="javascript:;" onClick={this.deleteItem}>Deletes second item</a></p>
      </div>
    );
  }
}
