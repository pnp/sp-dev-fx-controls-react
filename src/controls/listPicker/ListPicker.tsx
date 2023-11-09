import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/components/Dropdown';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/components/Spinner';
import * as React from 'react';

import * as telemetry from '../../common/telemetry';
import { ISPService } from '../../services/ISPService';
import { SPServiceFactory } from '../../services/SPServiceFactory';
import { IListPickerProps, IListPickerState } from './IListPicker';
import styles from './ListPicker.module.scss';

/**
* Empty list value, to be checked for single list selection
*/
const EMPTY_LIST_KEY = 'NO_LIST_SELECTED';

/**
* Renders the controls for the ListPicker component
*/
export class ListPicker extends React.Component<IListPickerProps, IListPickerState> {
  private _selectedList: string | string[] = null;

  /**
  * Constructor method
  */
  constructor(props: IListPickerProps) {
    super(props);

    telemetry.track('ReactListPicker');

    this.state = {
      options: [],
      loading: false
    };
  }

  /**
  * Lifecycle hook when component is mounted
  */
  public componentDidMount(): void {
    this.loadLists();
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IListPickerProps, prevState: IListPickerState): void {
    if (
      prevProps.baseTemplate !== this.props.baseTemplate ||
      prevProps.includeHidden !== this.props.includeHidden ||
      prevProps.orderBy !== this.props.orderBy ||
      prevProps.webAbsoluteUrl !== this.props.webAbsoluteUrl||
      prevProps.refreshToggle !== this.props.refreshToggle
    ) {
      this.loadLists();
    }

    if (prevProps.selectedList !== this.props.selectedList) {
      this.setSelectedLists();
    }
  }

  /**
  * Loads the list from SharePoint current web site
  */
  private loadLists(): void {
    const { context, baseTemplate, includeHidden, orderBy, multiSelect, filter, webAbsoluteUrl, contentTypeId } = this.props;

    // Show the loading indicator and disable the dropdown
    this.setState({ loading: true });

    const service: ISPService = SPServiceFactory.createService(context, true, 5000, webAbsoluteUrl);
    service.getLibs({
      baseTemplate: baseTemplate,
      includeHidden: includeHidden,
      orderBy: orderBy,
      filter: filter,
      contentTypeId: contentTypeId
    }).then((results) => {
      let options: IDropdownOption[] = [];

      // Start mapping the lists to the dropdown option
      options = results.value.map(list => ({
        key: list.Id,
        text: list.Title
      }));

      if (multiSelect !== true) {
        // Add option to unselct list
        options.unshift({
          key: EMPTY_LIST_KEY,
          text: ''
        });
      }

      this.setSelectedLists();

      // Hide the loading indicator and set the dropdown options and enable the dropdown
      this.setState({
        loading: false,
        options: options
      });
    })
    .catch(() => {
      // no-op;
    });
  }

  /**
   * Set the currently selected list
   */
  private setSelectedLists(): void {
    this._selectedList = cloneDeep(this.props.selectedList);
    this.setState({
      selectedList: this._selectedList
    });
  }

  /**
  * Raises when a list has been selected
  * @param option the new selection
  * @param index the index of the selection
  */
  private onChanged = (option: IDropdownOption, index?: number): void => {
    const { multiSelect, onSelectionChanged } = this.props;

    if (multiSelect === true) {
      // Check if option was selected
      let selectedLists = this._selectedList ? cloneDeep(this._selectedList) as string[] : [];
      if (option.selected) {
        selectedLists.push(option.key as string);
      } else {
        // Filter out the unselected list
        selectedLists = selectedLists.filter(list => list !== option.key);
      }
      this._selectedList = selectedLists;
    } else {
      this._selectedList = option.key as string;
    }

    if (onSelectionChanged) {
      onSelectionChanged(cloneDeep(this._selectedList));
    }
  }

  /**
  * Renders the ListPicker controls with Office UI Fabric
  */
  public render(): JSX.Element {
    const { loading, options, selectedList } = this.state;
    const { className, disabled, multiSelect, label, placeHolder, placeholder } = this.props;

    const dropdownOptions: IDropdownProps = {
      className: className,
      options: options,
      disabled: (loading || disabled),
      label: label,
      placeHolder: placeholder || placeHolder,
      onChanged: this.onChanged
    };

    if (multiSelect === true) {
      dropdownOptions.multiSelect = true;
      dropdownOptions.selectedKeys = selectedList as string[];
    } else {
      dropdownOptions.selectedKey = selectedList as string;
    }

    return (
      <div className={styles.listPicker}>
        { loading && <Spinner className={styles.spinner} size={SpinnerSize.xSmall} />}
        <Dropdown {...dropdownOptions} />
      </div>
    );
  }
}
