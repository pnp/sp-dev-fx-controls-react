import * as React from 'react';

import cloneDeep from 'lodash/cloneDeep';
import {
  Dropdown,
  IDropdownOption,
  IDropdownProps,
} from '@fluentui/react/lib/Dropdown';
import {
  Spinner,
  SpinnerSize,
} from '@fluentui/react/lib/Spinner';

import * as telemetry from '../../common/telemetry';
import { ISPService } from '../../services/ISPService';
import { SPServiceFactory } from '../../services/SPServiceFactory';
import {
  IContentTypePickerProps,
  IContentTypePickerState,
} from './IContentTypePicker';

const EMPTY_CONTENTTYPE_KEY = 'NO_CONTENTTYPE_SELECTED';

export class ContentTypePicker extends React.Component<IContentTypePickerProps, IContentTypePickerState> {

  private _selectedContentTypes: string | string[] = null;

  constructor(props: IContentTypePickerProps) {
    super(props);

    telemetry.track('ReactContentTypePicker');

    this.state = {
      contentTypes: [],
      loading: false,
    };
  }

  public componentDidMount(): void {
    this.loadContentTypes().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }

  private async loadContentTypes(): Promise<void> {
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
    let results = await service.getContentTypes(
      {
        listId,
        filter,
        includeHidden,
        includeReadOnly,
        orderBy,
        group,
      }
    );

    // Check if custom filter is specified
    if (filterItems) {
      results = filterItems(results);
    }

    // Hide the loading indicator and set the dropdown options
    this.setState({
      loading: false,
      contentTypes: results,
    });

    this.setSelectedContentTypes();
  }

  /**
   * Set the currently selected content type(s).
   */
  private setSelectedContentTypes(): void {
    this._selectedContentTypes = cloneDeep(this.props.selectedContentTypes);

    this.setState({
      selectedContentTypes: this._selectedContentTypes,
    });
  }

  public componentDidUpdate(prevProps: Readonly<IContentTypePickerProps>, prevState: Readonly<IContentTypePickerState>): void {
    const {
      includeHidden,
      includeReadOnly,
      orderBy,
      webAbsoluteUrl,
      selectedContentTypes,
      listId,
    } = this.props;

    if (
      prevProps.includeHidden !== includeHidden ||
      prevProps.includeReadOnly !== includeReadOnly ||
      prevProps.orderBy !== orderBy ||
      prevProps.webAbsoluteUrl !== webAbsoluteUrl ||
      prevProps.listId !== listId
    ) {
      this.loadContentTypes().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
    }

    if (prevProps.selectedContentTypes !== selectedContentTypes) {
      this.setSelectedContentTypes();
    }
  }

  /**
   * Fires when an item has been selected from the dropdown.
   * @param event Event that has been fired.
   * @param option The new selection.
   * @param index Index of the selection.
   */
  private onChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption, index?: number): void => {
    const { multiSelect, onSelectionChanged } = this.props;
    const { contentTypes } = this.state;

    if (multiSelect) {
      let selectedContentTypes = this._selectedContentTypes ? cloneDeep(this._selectedContentTypes) as string[] : [];

      if (option.selected) {
        selectedContentTypes.push(option.key.toString());
      }
      else {
        selectedContentTypes = selectedContentTypes.filter(ct => ct !== option.key);
      }
      this._selectedContentTypes = selectedContentTypes;
    }
    else {
      this._selectedContentTypes = option.key.toString();
    }

    if (onSelectionChanged) {
      if (multiSelect) {
        onSelectionChanged(cloneDeep(contentTypes.filter(ct => (this._selectedContentTypes as string[]).some(sct => ct.StringId === sct))));
      }
      else {
        onSelectionChanged(cloneDeep(contentTypes.find(ct => ct.StringId === this._selectedContentTypes as string)));
      }
    }
  }

  public render(): React.ReactElement<IContentTypePickerProps> {
    const { loading, contentTypes, selectedContentTypes } = this.state;
    const { className, disabled, multiSelect, label, placeholder, showBlankOption } = this.props;

    const options: IDropdownOption[] = contentTypes.map(f => ({
      key: f.StringId,
      text: f.Name,
    }));

    if (showBlankOption && !multiSelect) {
      // Provide empty option
      options.unshift({
        key: EMPTY_CONTENTTYPE_KEY,
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
      styles: this.props.styles
    };

    if (multiSelect) {
      dropdownProps.multiSelect = true;
      dropdownProps.selectedKeys = selectedContentTypes as string[];
    }
    else {
      dropdownProps.selectedKey = selectedContentTypes as string;
    }

    return (
      <>
        {loading && <Spinner size={SpinnerSize.xSmall} />}
        <Dropdown {...dropdownProps} />
      </>
    );
  }
}
