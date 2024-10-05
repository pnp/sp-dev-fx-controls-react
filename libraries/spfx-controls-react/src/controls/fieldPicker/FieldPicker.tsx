import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as telemetry from '../../common/telemetry';
import { ISPService } from '../../services/ISPService';
import { SPServiceFactory } from '../../services/SPServiceFactory';
import { IFieldPickerProps, IFieldPickerState } from './IFieldPicker';

const EMPTY_FIELD_KEY = 'NO_FIELD_SELECTED';

export class FieldPicker extends React.Component<IFieldPickerProps, IFieldPickerState> {

  private _selectedFields: string | string[] = null;

  constructor(props: IFieldPickerProps) {
    super(props);

    telemetry.track('ReactFieldPicker');

    this.state = {
      fields: [],
      loading: false,
    };
  }

  public componentDidMount(): void {
    this.loadFields().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }

  /**
   * Loads the fields from the provided SharePoint site and updates the options state.
   */
  private async loadFields(): Promise<void> {
    const {
      context,
      listId,
      includeHidden,
      includeReadOnly,
      orderBy,
      filter,
      group,
      webAbsoluteUrl,
      filterItems,
    } = this.props;

    // Show the loading indicator and disable the dropdown
    this.setState({ loading: true });

    const service: ISPService = SPServiceFactory.createService(context, true, 5000, webAbsoluteUrl);
    let results = await service.getFields(
      {
        listId,
        filter,
        includeHidden,
        includeReadOnly,
        orderBy,
        group
      }
    );

    // Check if custom filter is specified
    if (filterItems) {
      results = filterItems(results);
    }

    // Hide loading indicator and set the dropdown options.
    this.setState({
      loading: false,
      fields: results,
    });

    this.setSelectedFields();
  }

  /**
   * Set the currently selected field(s);
   */
  private setSelectedFields(): void {
    this._selectedFields = cloneDeep(this.props.selectedFields);

    this.setState({
      selectedFields: this._selectedFields,
    });
  }

  public componentDidUpdate(prevProps: Readonly<IFieldPickerProps>, prevState: Readonly<IFieldPickerState>): void {
    const {
      includeHidden,
      includeReadOnly,
      orderBy,
      webAbsoluteUrl,
      selectedFields,
      listId,
    } = this.props;

    if (
      prevProps.includeHidden !== includeHidden ||
      prevProps.includeReadOnly !== includeReadOnly ||
      prevProps.orderBy !== orderBy ||
      prevProps.webAbsoluteUrl !== webAbsoluteUrl ||
      prevProps.listId !== listId
    ) {
      this.loadFields().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
    }

    if (prevProps.selectedFields !== selectedFields) {
      this.setSelectedFields();
    }
  }

  /**
   * Fires when a field has been selected from the dropdown.
   * @param option The new selection.
   * @param index Index of the selection.
   */
  private onChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption, index?: number): void => {
    const { multiSelect, onSelectionChanged } = this.props;
    const { fields } = this.state;

    if (multiSelect) {
      let selectedFields = this._selectedFields ? cloneDeep(this._selectedFields) as string[] : [];

      if (option.selected) {
        selectedFields.push(option.key.toString());
      }
      else {
        selectedFields = selectedFields.filter(field => field !== option.key);
      }
      this._selectedFields = selectedFields;
    }
    else {
      this._selectedFields = option.key.toString();
    }

    if (onSelectionChanged) {
      if (multiSelect) {
        onSelectionChanged(cloneDeep(fields.filter(f => (this._selectedFields as string[]).some(sf => f.InternalName === sf))));
      }
      else {
        onSelectionChanged(cloneDeep(fields.find(f => f.InternalName === this._selectedFields as string)));
      }
    }
  }

  public render(): React.ReactElement<IFieldPickerProps> {
    const { loading, fields, selectedFields } = this.state;
    const { className, disabled, multiSelect, label, placeholder, showBlankOption } = this.props;

    const options: IDropdownOption[] = fields.map(f => ({
      key: f.InternalName,
      text: f.Title
    }));

    if (showBlankOption && !multiSelect) {
      // Provide empty option
      options.unshift({
        key: EMPTY_FIELD_KEY,
        text: '',
      });
    }

    const dropdownProps: IDropdownProps = {
      className,
      options,
      disabled: loading || disabled,
      label,
      placeholder,
      onChange: this.onChange,
    };

    if (multiSelect) {
      dropdownProps.multiSelect = true;
      dropdownProps.selectedKeys = selectedFields as string[];
    }
    else {
      dropdownProps.selectedKey = selectedFields as string;
    }

    return (
      <>
        {loading && <Spinner size={SpinnerSize.xSmall} />}
        <Dropdown {...dropdownProps} />
      </>
    );
  }
}
