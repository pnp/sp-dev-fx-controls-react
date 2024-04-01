import * as React from 'react';
import styles from '../FieldCollectionData.module.scss';
import { ICollectionDataItemProps } from './ICollectionDataItemProps';
import { ICollectionDataItemState } from './ICollectionDataItemState';
import { TextField } from '@fluentui/react/lib/components/TextField';
import { Icon } from '@fluentui/react/lib/components/Icon';
import { Link } from '@fluentui/react/lib/components/Link';
import { Checkbox } from '@fluentui/react/lib/components/Checkbox';
import * as strings from 'ControlStrings';
import { CustomCollectionFieldType, ICustomCollectionField } from '../ICustomCollectionField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/components/Dropdown';
import { ComboBox, IComboBoxOption } from '@fluentui/react/lib/components/ComboBox';
import { PeoplePicker, PrincipalType } from "../../peoplepicker";
import { Callout, DirectionalHint } from '@fluentui/react/lib/components/Callout';
import { CollectionIconField } from '../collectionIconField';
import { clone, findIndex, sortBy } from '@microsoft/sp-lodash-subset';
import { Guid } from '@microsoft/sp-core-library';
import { FieldValidator } from '../FieldValidator';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { IPersonaProps } from '@fluentui/react/lib/Persona';

export class CollectionDataItem extends React.Component<ICollectionDataItemProps, ICollectionDataItemState> {
  private emptyItem: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
  private validation: FieldValidator = {};
  private calloutCellRef: HTMLElement;

  constructor(props: ICollectionDataItemProps) {
    super(props);

    // Create an empty item with all properties
    const emptyItem = this.generateEmptyItem();

    this.state = {
      crntItem: clone(this.props.item) || { ...emptyItem },
      errorMsgs: [],
      showCallout: false
    };
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: ICollectionDataItemProps): void {
    /**
     * Compare if items are not equal
     */
    if (this.props.item !== prevProps.item) {
      this.setState({
        crntItem: clone(this.props.item)
      });
    }
  }

  /**
   * Update the item value on the field change
   */
  private onValueChanged = (fieldId: string, value: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    
    this.setState((prevState: ICollectionDataItemState): ICollectionDataItemState => {
      const { crntItem } = prevState;
      // Update the changed field
      crntItem[fieldId] = value;

      this.doAllFieldChecks();

      // Store this in the current state
      return { crntItem };
    });
  }

  private onValueChangedComboBoxSingle = (fieldId: string, option: IComboBoxOption, value: string): void => {
    let _selectedOption: IComboBoxOption = null;
    if (typeof option === "undefined" && typeof value !== "undefined" && value.length === 0) {
      _selectedOption = null;
    } else if (typeof option === "undefined" && value.length > 0) {
      _selectedOption = {
        key: value,
        text: value
      };
    } else {
      _selectedOption = option;
    }

    this.setState((prevState: ICollectionDataItemState): ICollectionDataItemState => {
      const { crntItem } = prevState;

      // Update the changed field
      crntItem[fieldId] = _selectedOption;

      this.doAllFieldChecks();

      // Store this in the current state

      return { crntItem };
    });

  }

  private onValueChangedComboBoxMulti = (fieldId: string, option: IComboBoxOption, value: string): void => { // eslint-disable-line @typescript-eslint/no-explicit-any

    let _selectedOption: IComboBoxOption = null;
    let _selected: IComboBoxOption[] = [];

    this.setState((prevState: ICollectionDataItemState): ICollectionDataItemState => {
      const { crntItem } = prevState;
      _selected = crntItem[fieldId];

      if (typeof option === "undefined") {
        // freeform
        _selectedOption = {
          key: value,
          text: value,
          selected: true
        };
      } else {
        // selected option
        _selectedOption = {
          key: option.key,
          text: option.text,
          selected: option.selected
        };
      }

      if (_selected === null) {
        _selected = [];
      }

      if (_selectedOption.selected === true) {
        //add to selection
        _selected.push(_selectedOption);
      } else {
        //remove from selection
        _selected = _selected.filter(x => x.key !== _selectedOption.key);
      }

      // Update the changed field
      if (_selected.length === 0) {
        _selected = null;
      }

      crntItem[fieldId] = _selected;

      this.doAllFieldChecks();

      return { crntItem };
    });
  }

  /**
   * Perform all required field checks at once
   */
  private doAllFieldChecks(): void {
    const { crntItem } = this.state;

    // Check if current item is valid
    if (this.props.fAddInCreation) {
      if (this.checkAllRequiredFieldsValid(crntItem) &&
        this.checkAnyFieldContainsValue(crntItem) &&
        this.checkAllFieldsAreValid()) {
        this.props.fAddInCreation(crntItem);
      } else {
        this.props.fAddInCreation(null);
      }
    }

    // Check if item needs to be updated
    if (this.props.fUpdateItem) {
      this.updateItem();
    }
  }

  /**
   * Check if all values of the required fields are provided
   */
  private checkAllRequiredFieldsValid(item: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Get all the required fields
    const requiredFields: ICustomCollectionField[] = this.props.fields.filter(f => f.required);

    // Check all the required field values
    for (const field of requiredFields) {
      if (typeof item[field.id] === "undefined" || item[field.id] === null || item[field.id] === "") {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if any of the fields contain a value
   * @param item
   */
  private checkAnyFieldContainsValue(item: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { fields } = this.props;
    for (const field of fields) {
      if (typeof item[field.id] !== "undefined" && item[field.id] !== null && item[field.id] !== "") {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if the add action needs to be disabled
   */
  private disableAdd(item: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return !this.checkAllRequiredFieldsValid(item) || !this.checkAnyFieldContainsValue(item) || !this.checkAllFieldsAreValid() || !this.props.fAddItem;
  }

  /**
   * Checks if all fields are valid
   */
  private checkAllFieldsAreValid(): boolean {
    if (this.validation) {
      const keys = Object.keys(this.validation);
      for (const key of keys) {
        if (!this.validation[key]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Add the current row to the collection
   */
  private addRow = (): void => {
    if (this.props.fAddItem) {
      const { crntItem } = this.state;
      // Check if all the fields are correctly provided
      if (this.checkAllRequiredFieldsValid(crntItem) &&
        this.checkAnyFieldContainsValue(crntItem) &&
        this.checkAllFieldsAreValid()) {
        this.props.fAddItem(crntItem);
        // Clear all field values
        const emptyItem = this.generateEmptyItem();
        this.setState({
          crntItem: { ...emptyItem }
        });

      }
    }
  }

  /**
   * Add the current row to the collection
   */
  private updateItem = (): void => {
    const { crntItem } = this.state;
    const isValid = this.checkAllRequiredFieldsValid(crntItem) && this.checkAnyFieldContainsValue(crntItem) && this.checkAllFieldsAreValid();

    if (this.props.fUpdateItem) {
      // Check if all the fields are correctly provided
      if (isValid) {
        this.props.fUpdateItem(this.props.index, crntItem);
      }
    }

    // Set the validation for the item
    if (this.props.fValidation) {
      this.props.fValidation(this.props.index, isValid);
    }
  }

  /**
   * Delete the item from the collection
   */
  private deleteRow = (): void => {
    if (this.props.fDeleteItem) {
      this.props.fDeleteItem(this.props.index);
    }
  }

  /**
   * Allow custom field validation
   *
   * @param field
   * @param value
   */
  private fieldValidation = async (field: ICustomCollectionField, value: any): Promise<string> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    let validation = "";
    // Do the custom validation check
    if (field.onGetErrorMessage) {
      // Set initial field validation
      this.validation[field.id] = false;
      // Do the validation
      validation = await field.onGetErrorMessage(value, this.props.index, this.state.crntItem);
    }
    // Store the field validation
    this.validation[field.id] = validation === "";
    // Add message for the error callout
    this.errorCalloutHandler(field.id, validation);
    this.doAllFieldChecks();
    return validation;
  }

  /**
   * Custom field validation
   */
  private onCustomFieldValidation = (fieldId: string, errorMsg: string): void => {
    console.log(fieldId, errorMsg);
    if (fieldId) {
      this.validation[fieldId] = errorMsg === "";
      this.errorCalloutHandler(fieldId, errorMsg);
      this.doAllFieldChecks();
    }
  }

  /**
   * URL field validation
   *
   * @param field
   * @param value
   * @param item
   */
  private urlFieldValidation = async (field: ICustomCollectionField, value: any, item: any): Promise<string> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    let isValid = true;
    let validation = "";

    // Check if custom validation is configured
    if (field.onGetErrorMessage) {
      // Using the custom validation
      validation = await field.onGetErrorMessage(value, this.props.index, item);
      isValid = validation === "";
    } else {
      // Check if entered value is a valid URL
      const regEx: RegExp = /(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      isValid = (value === null || value.length === 0 || regEx.test(value));
      validation = isValid ? "" : strings.InvalidUrlError;
    }

    // Store the field validation
    this.validation[field.id] = isValid;
    // Add message for the error callout
    this.errorCalloutHandler(field.id, validation);
    this.doAllFieldChecks();
    // Return the error message if needed
    return validation;
  }

  private peoplepickerValidation = async (field: ICustomCollectionField, value: IPersonaProps[], item: any): Promise<string> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    let isValid: boolean = true;
    let validation: string = "";

    // Check if custom validation is configured
    if (field.onGetErrorMessage) {
      // Using the custom validation
      validation = await field.onGetErrorMessage(value, this.props.index, item);
      isValid = validation === "";
    } else if (typeof field.minimumUsers === "number" && value.length < field.minimumUsers) {
      validation = typeof field.minimumUsersMessage === "string" ? field.minimumUsersMessage : strings.CollectionDataMinimumUsersDefaultMessage.replace("{0}", field.minimumUsers.toString());
    }

    // Store the field validation
    this.validation[field.id] = isValid;
    // Add message for the error callout
    this.errorCalloutHandler(field.id, validation);
    this.doAllFieldChecks();
    // Return empty the error message if needed

    return "";
  }

  private comboboxValidation = (field: ICustomCollectionField, selected: string[] | string): void => {
    let isValid = true;
    const validation = "";

    if (field.required && (selected === null || selected.length === 0)) {
      isValid = false;
    }

    // Store the field validation
    this.validation[field.id] = isValid;
    this.errorCalloutHandler(field.id, validation);
  }

  /**
   * Error callout message handler
   *
   * @param field
   * @param message
   */
  private errorCalloutHandler(fieldId: string, message: string): void {
    this.setState((prevState: ICollectionDataItemState) => {
      const { crntItem } = prevState;
      let errorMsgs = prevState.errorMsgs;

      // Get the current field
      const fieldIdx = findIndex(this.props.fields, f => f.id === fieldId);
      if (fieldIdx === -1) {
        return;
      }
      const field = this.props.fields[fieldIdx];

      // Check if there already is a message for the field
      const fieldMsgIdx = findIndex(errorMsgs, msg => msg.field === field.title);

      // Add message
      let fieldMsg;
      if (fieldMsgIdx === -1) {
        fieldMsg = {
          field: field.title,
          message: message
        };
      } else {
        // Update message
        fieldMsg = errorMsgs[fieldMsgIdx];
        if (fieldMsg) {
          fieldMsg.message = message;
        }
      }

      // Check if field required message needs to be shown
      if (field.required) {
        if (typeof crntItem[field.id] === "undefined" || crntItem[field.id] === null || crntItem[field.id] === "") {
          fieldMsg.isRequired = true;
        } else {
          fieldMsg.isRequired = false;
        }
      }

      // If required and message are false, it doesn't need to be added
      if (!fieldMsg.message && !fieldMsg.isRequired) {
        // Remove the item
        if (fieldMsgIdx !== -1) {
          errorMsgs.splice(fieldMsgIdx, 1);
        }
      } else {
        if (fieldMsgIdx === -1) {
          errorMsgs.push(fieldMsg);
        }
      }

      // Sort based on the index
      errorMsgs = sortBy(errorMsgs, ["field"]);

      return {
        errorMsgs
      };
    });
  }

  /**
   * Toggle the error callout
   */
  private toggleErrorCallout = (): void => {
    this.setState((prevState: ICollectionDataItemState) => ({
      showCallout: !prevState.showCallout
    }));
  }

  private hideErrorCallout = (): void => {
    this.setState({
      showCallout: false
    });
  }

  /**
   * Render the field
   *
   * @param field
   * @param item
   */
  private renderField(field: ICustomCollectionField, item: any): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
    const disableFieldOnEdit: boolean = field.disableEdit && !!this.props.fUpdateItem;
    const _selectedComboBoxKeys: string[] = [];
    let _selectedComboBoxKey: string = null;
    let _comboBoxOptions: IComboBoxOption[] = null;
    let _selectedUsers: string[] = null;

    switch (field.type) {
      case CustomCollectionFieldType.boolean:
        return <Checkbox checked={item[field.id] ? item[field.id] : false}
          onChange={(ev, value) => this.onValueChanged(field.id, value)}
          disabled={disableFieldOnEdit}
          className="PropertyFieldCollectionData__panel__boolean-field" />;
      case CustomCollectionFieldType.dropdown:
        return <Dropdown placeHolder={field.placeholder || field.title}
          options={field.options}
          selectedKey={item[field.id] || null}
          required={field.required}
          disabled={disableFieldOnEdit}
          onChanged={(opt) => this.onValueChanged(field.id, opt.key)}
          onRenderOption={field.onRenderOption}
          className="PropertyFieldCollectionData__panel__dropdown-field" />;
      case CustomCollectionFieldType.number:
        return <TextField placeholder={field.placeholder || field.title}
          className={styles.collectionDataField}
          value={item[field.id] ? item[field.id] : ""}
          required={field.required}
          disabled={disableFieldOnEdit}
          type='number'
          onChange={(e, value) => this.onValueChanged(field.id, value)}
          deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
          onGetErrorMessage={async (value: string) => await this.fieldValidation(field, value)}
          inputClassName="PropertyFieldCollectionData__panel__number-field" />;
      case CustomCollectionFieldType.fabricIcon:
        return (
          <CollectionIconField field={field} item={item} disableEdit={disableFieldOnEdit} fOnValueChange={this.onValueChanged} fValidation={this.fieldValidation} />
        );
      case CustomCollectionFieldType.url:
        return <TextField placeholder={field.placeholder || field.title}
          value={item[field.id] ? item[field.id] : ""}
          required={field.required}
          disabled={disableFieldOnEdit}
          className={styles.collectionDataField}
          onChange={(e, value) => this.onValueChanged(field.id, value)}
          deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
          onGetErrorMessage={async (value: string) => this.urlFieldValidation(field, value, item)}
          inputClassName="PropertyFieldCollectionData__panel__url-field" />;
      case CustomCollectionFieldType.date:
        return <DatePicker
          className={styles.collectionDataField}
          placeholder={field.placeholder || field.title}
          isRequired={field.required}
          disabled={disableFieldOnEdit}
          value={item[field.id] ? new Date(item[field.id]) : undefined}
          onSelectDate={(date) => { this.onValueChanged(field.id, date) }}
          formatDate={(date) => { return date ? date?.toLocaleDateString() : ""; }}
        />;
      case CustomCollectionFieldType.custom:
        if (field.onCustomRender) {
          return field.onCustomRender(field, item[field.id], this.onValueChanged, item, item.uniqueId, this.onCustomFieldValidation);
        }
        return null;
      case CustomCollectionFieldType.combobox:
        _comboBoxOptions = field.options;

        if (field.multiSelect) {
          // multivalue

          if (item[field.id] !== null) {
            for (let i: number = 0; i < item[field.id].length; i++) {
              _selectedComboBoxKeys.push(item[field.id][i].key);

              // if selected option is not in list (anymore), add it to choices
              if (typeof _comboBoxOptions.find(value => value.key === item[field.id][i].key) === "undefined") {
                _comboBoxOptions.push(item[field.id][i]);
              }
            }
          }

        } else {
          // single value
          if (item[field.id] !== null) {
            _selectedComboBoxKey = item[field.id].key;

            if (typeof _comboBoxOptions.find(value => value.key === item[field.id].key) === "undefined") {
              _comboBoxOptions.push(item[field.id]);
            }

          }

        }

        return <ComboBox
          onFocus={() => this.comboboxValidation(field, field.multiSelect ? _selectedComboBoxKeys : _selectedComboBoxKey)}
          onBlur={() => this.comboboxValidation(field, field.multiSelect ? _selectedComboBoxKeys : _selectedComboBoxKey)}
          multiSelect={field.multiSelect}
          allowFreeform={field.allowFreeform}
          placeholder={field.placeholder}
          options={_comboBoxOptions}
          selectedKey={field.multiSelect ? _selectedComboBoxKeys : _selectedComboBoxKey}
          required={field.required}
          disabled={disableFieldOnEdit}
          onChange={async (event, option, index, value) => {
            if (field.multiSelect) {
              this.onValueChangedComboBoxMulti(field.id, option, value)
            } else {
              this.onValueChangedComboBoxSingle(field.id, option, value)
            }
          }}
        />;
        
      case CustomCollectionFieldType.peoplepicker:
        _selectedUsers = item[field.id] !== null ? item[field.id] : [];

        return <PeoplePicker
          peoplePickerCntrlclassName={styles.peoplePicker}
          context={this.props.context}
          personSelectionLimit={typeof field.maximumUsers === "number" ? field.maximumUsers : typeof field.multiSelect === "boolean" && field.multiSelect === false ? 1 : 99}
          principalTypes={[PrincipalType.User]}
          ensureUser={true}
          placeholder={field.placeholder || field.title}
          required={field.required}
          onChange={(items: IPersonaProps[]) => {
            const _selected: string[] = items.length === 0 ? null : items.map(({ secondaryText }) => secondaryText);
            this.onValueChanged(field.id, _selected)
          }
          }
          onGetErrorMessage={async (items: IPersonaProps[]) => await this.peoplepickerValidation(field, items, item)}

          defaultSelectedUsers={_selectedUsers}
        />;
      case CustomCollectionFieldType.string:
      default:
        return <TextField placeholder={field.placeholder || field.title}
          className={styles.collectionDataField}
          value={item[field.id] ? item[field.id] : ""}
          required={field.required}
          disabled={disableFieldOnEdit}
          onChange={(e, value) => this.onValueChanged(field.id, value)}
          deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
          onGetErrorMessage={async (value: string) => await this.fieldValidation(field, value)}
          inputClassName="PropertyFieldCollectionData__panel__string-field" />;
    }
  }

  /**
   * Retrieve all dropdown options
   */
  private getSortingOptions(): IDropdownOption[] {
    const opts: IDropdownOption[] = [];
    const { totalItems } = this.props;
    for (let i = 1; i <= totalItems; i++) {
      opts.push({
        text: i.toString(),
        key: i
      });
    }
    return opts;
  }

  /**
  * Creates an empty item with a unique id
  */
  private generateEmptyItem(): any { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Create an empty item with all properties
    const emptyItem: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    emptyItem.uniqueId = Guid.newGuid().toString();

    for (const field of this.props.fields) {
      // Assign default value or null to the emptyItem
      emptyItem[field.id] = field.defaultValue || null;
    }

    return emptyItem;
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<ICollectionDataItemProps> {
    const { crntItem } = this.state;
    const opts = this.getSortingOptions();

    if (!crntItem) {
      return null;
    }

    return (
      <div className={`PropertyFieldCollectionData__panel__table-row ${styles.tableRow} ${this.props.index === null ? styles.tableFooter : ""}`}>
        {
          (this.props.sortingEnabled && this.props.totalItems) && (
            <span className={`PropertyFieldCollectionData__panel__sorting-field ${styles.tableCell}`}>
              <Dropdown options={opts} selectedKey={this.props.index + 1} onChange={(event, opt) => this.props.fOnSorting(this.props.index, opt.key as number)} />
            </span>
          )
        }
        {
          (this.props.sortingEnabled && this.props.totalItems === null) && (
            <span className={`${styles.tableCell}`} />
          )
        }
        {
          this.props.fields.map(f => (
            <span key={`dataitem-${f.id}`} className={`${styles.tableCell} ${styles.inputField}`}>{this.renderField(f, crntItem)}</span>
          ))
        }

        <span className={styles.tableCell}>
          <span ref={ref => { this.calloutCellRef = ref; }}>
            <Link title={strings.CollectionDataItemShowErrorsLabel}
              className={styles.errorCalloutLink}
              disabled={!this.state.errorMsgs || this.state.errorMsgs.length === 0}
              onClick={this.toggleErrorCallout}>
              <Icon iconName="Error" />
            </Link>
          </span>

          {
            this.state.showCallout && (
              <Callout className={styles.errorCallout}
                target={this.calloutCellRef}
                isBeakVisible={true}
                directionalHint={DirectionalHint.bottomLeftEdge}
                directionalHintForRTL={DirectionalHint.rightBottomEdge}
                onDismiss={this.hideErrorCallout}>
                {
                  (this.state.errorMsgs && this.state.errorMsgs.length > 0) && (
                    <div className={styles.errorMsgs}>
                      <p>Field issues:</p>
                      <ul>
                        {
                          this.state.errorMsgs.map((msg, idx) => (
                            <li key={`${msg.field}-${idx}`}><b>{msg.field}</b>: {msg.message ? msg.message : msg.isRequired ? strings.CollectionDataItemFieldRequiredLabel : null}</li>
                          ))
                        }
                      </ul>
                    </div>
                  )
                }
              </Callout>
            )
          }
        </span>

        <span className={styles.tableCell}>
          {
            /* Check add or delete action */
            this.props.index !== null ? (
              <Link title={strings.CollectionDeleteRowButtonLabel} disabled={!this.props.fDeleteItem || this.props.disableItemDeletion} onClick={this.deleteRow}>
                <Icon iconName="Clear" />
              </Link>
            ) : (
              <Link title={strings.CollectionAddRowButtonLabel} className={`${this.disableAdd(crntItem) ? "" : styles.addBtn}`} disabled={this.disableAdd(crntItem)} onClick={this.addRow}>
                <Icon iconName="Add" />
              </Link>
            )
          }
        </span>
      </div>
    );
  }
}
