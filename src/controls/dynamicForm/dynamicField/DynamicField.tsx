import '@pnp/sp/folders';
import { sp } from '@pnp/sp/presets/all';
import '@pnp/sp/webs';
import * as strings from 'ControlStrings';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/components/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';
import { DateTimePicker } from '../../dateTimePicker/DateTimePicker';
import { FilePicker, IFilePickerResult } from '../../filePicker';
import { ListItemPicker } from '../../listItemPicker';
import { LocationPicker } from '../../locationPicker';
import { PeoplePicker, PrincipalType } from '../../peoplepicker';
import { RichText } from '../../richText';
import { IPickerTerms, TaxonomyPicker } from '../../taxonomyPicker';
import styles from '../DynamicForm.module.scss';
import { IDynamicFieldProps } from './IDynamicFieldProps';
import { IDynamicFieldState } from './IDynamicFieldState';
import { isArray } from 'lodash';
import CurrencyMap from "../CurrencyMap";


export class DynamicField extends React.Component<IDynamicFieldProps, IDynamicFieldState> {

  constructor(props: IDynamicFieldProps) {
    super(props);
    sp.setup({
      spfxContext: { pageContext: this.props.context.pageContext }
    });
    this.state = {
      changedValue: props.fieldDefaultValue !== undefined || props.fieldDefaultValue !== '' || props.fieldDefaultValue !== null || !this.isEmptyArray(props.fieldDefaultValue) ? props.fieldDefaultValue : null
    };
  }

  public componentDidUpdate(): void {
    if ((this.props.fieldDefaultValue === "" || this.props.fieldDefaultValue === null) && this.state.changedValue === null) {
      this.setState({ changedValue: "" });
    }
  }

  public render(): JSX.Element {
    try {
      return (
        <div className={styles.FieldEditor}>
          {this.getFieldComponent()}
        </div>
      );
    } catch (error) {
      console.log(`Error in DynamicField render`, error);
      return null;
    }
  }

  private getFieldComponent = (): React.ReactNode => {
    const {
      options,
      fieldTermSetId,
      fieldAnchorId,
      lookupListID,
      lookupField,
      fieldType,
      fieldDefaultValue,
      fieldTitle,
      context,
      disabled,
      label,
      placeholder,
      required,
      isRichText,
      //bingAPIKey,
      dateFormat,
      firstDayOfWeek,
      columnInternalName,
      principalType,
      description,
      maximumValue,
      minimumValue
    } = this.props;

    const {
      changedValue
    } = this.state;

    const dropdownOptions: IDropdownProps = {
      options: options,
      disabled: disabled,
      placeholder: placeholder
    };

    const labelText = fieldTitle !== null ? fieldTitle : label;
    const defaultValue = fieldDefaultValue;


    const labelEl = <label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label>;
    const errorText = this.getRequiredErrorText();
    const errorTextEl = <text className={styles.errormessage}>{errorText}</text>;
    const descriptionEl = <text className={styles.fieldDescription}>{description}</text>;
    const hasImage = !!changedValue;

    switch (fieldType) {
      case 'loading':
        return <Shimmer width="75%" styles={{
          root: {
            margin: '25px'
          }
        }} />;

      case 'Text':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"TextField"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={styles.fieldDisplay}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={errorText}
          />
          {descriptionEl}
        </div>;

      case 'Note':
        if (isRichText) {
          const value = this.props.newValue ? this.props.newValue : defaultValue;
          return <div className={styles.richText}>
            <div className={styles.titleContainer}>
              <Icon className={styles.fieldIcon} iconName={"AlignLeft"} />
              {labelEl}
            </div>
            <RichText
              placeholder={placeholder}
              value={value}
              className={styles.fieldDisplay}
              onChange={(newText) => { this.onChange(newText); return newText; }}
              isEditMode={!disabled} />
            {descriptionEl}
            {errorTextEl}
          </div>;
        }
        else {
          return <div>
            <div className={styles.titleContainer}>
              <Icon className={styles.fieldIcon} iconName={"AlignLeft"} />
              {labelEl}
            </div>
            <TextField
              defaultValue={defaultValue}
              placeholder={placeholder}
              className={styles.fieldDisplay}
              multiline
              onChange={(e, newText) => { this.onChange(newText); }}
              disabled={disabled}
              onBlur={this.onBlur}
              errorMessage={errorText}
            />
            {descriptionEl}
          </div>;
        }

      case 'Choice':
        return <div className={styles.fieldContainer}>
          <div className={`${styles.labelContainer} ${styles.titleContainer}`}>
            <Icon className={styles.fieldIcon} iconName={"CheckMark"} />
            {labelEl}
          </div>
          <Dropdown
            {...dropdownOptions}
            defaultSelectedKey={defaultValue}
            onChange={(e, option) => { this.onChange(option); }}
            onBlur={this.onBlur}
            errorMessage={errorText} />
          {descriptionEl}
        </div>;

      case 'MultiChoice':
        return <div className={styles.fieldContainer}>
          <div className={`${styles.labelContainer} ${styles.titleContainer}`}>
            <Icon className={styles.fieldIcon} iconName={"MultiSelect"} />
            {labelEl}
          </div>
          <Dropdown
            {...dropdownOptions}
            defaultSelectedKeys={defaultValue}
            onChange={this.MultiChoice_selection}
            multiSelect
            onBlur={this.onBlur}
            errorMessage={errorText} />
          {descriptionEl}
        </div>;

      case 'Location':
        return <div className={styles.fieldContainer}>
          <div className={`${styles.labelContainer} ${styles.titleContainer}`}>
            <Icon className={styles.fieldIcon} iconName={"POI"} />
            {labelEl}
          </div>
          <LocationPicker
            context={context}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(newValue) => { this.onChange(newValue); }}
            defaultValue={defaultValue}
            errorMessage={errorText}
          />
          {descriptionEl}
        </div>;

      case 'Lookup':
        //eslint-disable-next-line no-case-declarations
        const lookupValue = this.props.newValue ? this.props.newValue : defaultValue;
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"Switch"} />
            {labelEl}
          </div>
          <ListItemPicker
            disabled={disabled}
            listId={lookupListID}
            defaultSelectedItems={lookupValue}
            columnInternalName={lookupField}
            className={styles.fieldDisplay}
            enableDefaultSuggestions={true}
            keyColumnInternalName='Id'
            itemLimit={1}
            onSelectedItem={(newValue) => { this.onChange(newValue); }}
            context={context}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'LookupMulti':
        //eslint-disable-next-line no-case-declarations
        const lookupMultiValue = this.props.newValue ? this.props.newValue : defaultValue;
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"Switch"} />
            {labelEl}
          </div>
          <ListItemPicker
            disabled={disabled}
            listId={lookupListID}
            defaultSelectedItems={lookupMultiValue}
            columnInternalName={lookupField}
            className={styles.fieldDisplay}
            enableDefaultSuggestions={true}
            keyColumnInternalName='Id'
            itemLimit={100}
            onSelectedItem={(newValue) => { this.onChange(newValue); }}
            context={context}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'Number': {
        const customNumberErrorMessage = this.getNumberErrorText();

        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"NumberField"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={styles.fieldDisplay}
            type={"Number"}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={customNumberErrorMessage} 
            min={minimumValue} 
            max={maximumValue} />
          {descriptionEl}
        </div>;
      }
      case 'Currency': {
        const customNumberErrorMessage = this.getNumberErrorText();

        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"AllCurrency"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={styles.fieldDisplay}
            type={"Currency"}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={customNumberErrorMessage} 
            min={minimumValue} 
            max={maximumValue} />
          {descriptionEl}
        </div>;
      }
      case 'DateTime':
        return <div className={styles.fieldContainer}>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"Calendar"} />
            {labelEl}
          </div>
          {
            dateFormat === 'DateOnly' &&
            <DatePicker
              placeholder={placeholder}
              className={styles.pickersContainer}
              formatDate={(date) => { return date.toLocaleDateString(context.pageContext.cultureInfo.currentCultureName); }}
              value={(changedValue !== null && changedValue !== "") ? changedValue : defaultValue}
              onSelectDate={(newDate) => { this.onChange(newDate); }}
              disabled={disabled}
              firstDayOfWeek={firstDayOfWeek}
            />}
          {
            dateFormat === 'DateTime' &&
            <DateTimePicker
              key={columnInternalName}
              placeholder={placeholder}
              formatDate={(date) => { return date.toLocaleDateString(context.pageContext.cultureInfo.currentCultureName); }}
              value={(changedValue !== null && changedValue !== "") ? changedValue : defaultValue}
              onChange={(newDate) => { this.onChange(newDate); }}
              disabled={disabled}
              firstDayOfWeek={firstDayOfWeek}
            />
          }
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'Boolean':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"CheckboxComposite"} />
            {labelEl}
          </div>
          <Toggle
            className={styles.fieldDisplay}
            defaultChecked={defaultValue}
            onText={strings.Yes}
            offText={strings.No}
            onChange={(e, checkedvalue) => { this.onChange(checkedvalue); }}
            disabled={disabled}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'User':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"Contact"} />
            {labelEl}
          </div>
          <PeoplePicker
            placeholder={placeholder}
            defaultSelectedUsers={defaultValue}
            peoplePickerCntrlclassName={styles.fieldDisplay}
            context={context}
            personSelectionLimit={1}
            showtooltip={false}
            showHiddenInUI={false}
            principalTypes={principalType === 'PeopleOnly' ? [PrincipalType.User] : [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.DistributionList, PrincipalType.SecurityGroup]}
            resolveDelay={1000}
            onChange={(items) => { this.onChange(items); }}
            disabled={disabled}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'UserMulti':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"Contact"} />
            {labelEl}
          </div>
          <PeoplePicker
            placeholder={placeholder}
            defaultSelectedUsers={defaultValue}
            peoplePickerCntrlclassName={styles.fieldDisplay}
            context={context}
            personSelectionLimit={30}
            showtooltip={false}
            showHiddenInUI={false}
            principalTypes={principalType === 'PeopleOnly' ? [PrincipalType.User] : [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.DistributionList, PrincipalType.SecurityGroup]}
            resolveDelay={1000}
            onChange={(items) => { this.onChange(items); }}
            disabled={disabled}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'URL':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"Link"} />
            {labelEl}
          </div>
          <Stack
            tokens={{ childrenGap: 4 }}>
            <TextField
              defaultValue={defaultValue ? defaultValue.Url : ''}
              placeholder={strings.DynamicFormEnterURLPlaceholder}
              className={styles.fieldDisplayNoPadding}
              onChange={(e, newText) => { this.onURLChange(newText, true); }}
              disabled={disabled}
              onBlur={this.onBlur} />
            <TextField
              defaultValue={defaultValue ? defaultValue.Description : ''}
              placeholder={strings.DynamicFormEnterDescriptionPlaceholder}
              className={styles.fieldDisplayNoPadding}
              onChange={(e, newText) => { this.onURLChange(newText, false); }}
              disabled={disabled} />
          </Stack>
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'Thumbnail':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"photo2"} />
            {labelEl}
          </div>
          <Stack
            //className={styles.filePicker}
            horizontal
            tokens={{
              childrenGap: 20
            }}
            horizontalAlign={'space-between'}>
            {hasImage && <Image
              src={changedValue}
              height={60}
            />}
            <div className={styles.thumbnailFieldButtons}>
              <FilePicker
                buttonClassName={styles.fieldDisplay}
                //bingAPIKey={bingAPIKey}
                accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
                buttonLabel={hasImage ? undefined : 'Add an image'}
                buttonIcon={hasImage ? 'Edit' : 'FileImage'}
                onSave={this.saveIntoSharePoint}
                onChange={this.saveIntoSharePoint}
                context={context}
                disabled={disabled}
                hideLocalMultipleUploadTab={true}
                hideOneDriveTab={true}
                hideStockImages={true}
                hideWebSearchTab={true}
              />
              {hasImage &&
                <ActionButton
                  disabled={disabled}
                  iconProps={{
                    iconName: 'Delete'
                  }}
                  onClick={this.onDeleteImage}
                />}
            </div>
          </Stack>
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'TaxonomyFieldTypeMulti':
        return <div className={styles.fieldContainer}>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"BulletedTreeList"} />
            {labelEl}
          </div>
          <div className={styles.pickersContainer}>
            <TaxonomyPicker
              label=""
              disabled={disabled}
              initialValues={defaultValue}
              placeholder={placeholder}
              allowMultipleSelections={true}
              termsetNameOrID={fieldTermSetId}
              anchorId={fieldAnchorId}
              panelTitle={strings.DynamicFormTermPanelTitle}
              context={context}
              onChange={(newValue?: IPickerTerms) => { this.onChange(newValue); }}
              isTermSetSelectable={false}
            />
          </div>
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'TaxonomyFieldType':
        return <div className={styles.fieldContainer}>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"BulletedTreeList"} />
            {labelEl}
          </div>
          <div className={styles.pickersContainer}>
            <TaxonomyPicker
              label=""
              disabled={disabled}
              initialValues={defaultValue}
              placeholder={placeholder}
              allowMultipleSelections={false}
              termsetNameOrID={fieldTermSetId}
              anchorId={fieldAnchorId}
              panelTitle={strings.DynamicFormTermPanelTitle}
              context={context}
              onChange={(newValue?: IPickerTerms) => { this.onChange(newValue); }}
              isTermSetSelectable={false} />
          </div>
          {descriptionEl}
          {errorTextEl}
        </div>;
    }

    return null;
  }

  private onDeleteImage = (): void => {

    const {
      onChanged,
      columnInternalName
    } = this.props;

    this.setState({
      changedValue: ''
    });

    if (onChanged) {
      onChanged(columnInternalName, '', undefined);
    }
  }

  private onURLChange = (value: string, isUrl: boolean): void => {
    const {
      fieldDefaultValue,
      onChanged,
      columnInternalName
    } = this.props;

    let currValue = this.state.changedValue || fieldDefaultValue || {
      Url: '',
      Description: ''
    };
    currValue = {
      ...currValue
    };

    if (isUrl) {
      currValue.Url = value;
    }
    else {
      currValue.Description = value;
    }

    this.setState({
      changedValue: currValue
    });

    if (onChanged) {
      onChanged(columnInternalName, currValue);
    }
  }

  private onChange = (value: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const {
      onChanged,
      columnInternalName
    } = this.props;

    if (onChanged) {
      onChanged(columnInternalName, value);
    }
    this.setState({
      changedValue: value
    });
  }

  private onBlur = (): void => {
    if (this.state.changedValue === null && this.props.fieldDefaultValue === "") {
      this.setState({ changedValue: "" });
    }
  }

  private getRequiredErrorText = (): string => {
    const {
      changedValue
    } = this.state;
    return (changedValue === undefined || changedValue === '' || changedValue === null || this.isEmptyArray(changedValue)) && this.props.required ? strings.DynamicFormRequiredErrorMessage : null;
  }

  private getNumberErrorText = (): string => {
    const {
      changedValue
    } = this.state;
    const {
      cultureName,
      fieldType,
      maximumValue,
      minimumValue,
      showAsPercentage
    } = this.props;

    if ((changedValue === undefined || changedValue === '' || changedValue === null || this.isEmptyArray(changedValue)) && this.props.required) {
      return strings.DynamicFormRequiredErrorMessage;
    }

    let minValue = minimumValue !== undefined && minimumValue !== -(Number.MAX_VALUE) ? minimumValue : undefined;
    let maxValue = maximumValue !== undefined && maximumValue !== Number.MAX_VALUE ? maximumValue : undefined;

    if (showAsPercentage === true) {
      // In case of percentage we need to convert the min and max values to a percentage value
      minValue = minValue !== undefined ? minValue * 100 : undefined;
      maxValue = maxValue !== undefined ? maxValue * 100 : undefined;
    }

    let minValueCur: string, maxValueCur: string;
    if (fieldType === "Currency" && cultureName) {
      const countryCode = cultureName.split('-')?.[1];
      if (minValue) minValueCur = Intl.NumberFormat(cultureName, { style: 'currency', currency: CurrencyMap[countryCode] }).format(minValue);
      if (maxValue) maxValueCur = Intl.NumberFormat(cultureName, { style: 'currency', currency: CurrencyMap[countryCode] }).format(maxValue);
    }

    if (changedValue !== undefined && changedValue !== null && changedValue.length > 0) {
      const numericValue = Number(changedValue);
      if (isNaN(numericValue)) return strings.ProvidedValueIsInvalid;
      if (minValue !== undefined && maxValue !== undefined && (numericValue < minValue || numericValue > maxValue)) {
        return strings.DynamicFormNumberValueMustBeBetween.replace('{0}', minValueCur ?? minValue.toString()).replace('{1}', maxValueCur ?? maxValue.toString());
      }
      else {
        if (minValue !== undefined && numericValue < minValue) {
          return strings.DynamicFormNumberValueMustBeGreaterThan.replace('{0}', minValueCur ?? minValue.toString());
        }
        else if (maxValue !== undefined && numericValue > maxValue) {
          return strings.DynamicFormNumberValueMustBeLowerThan.replace('{0}', maxValueCur ?? maxValue.toString());
        }
      }
    }

    return null;
  }

  private isEmptyArray(value): boolean {
    return Array.isArray(value) && value.length === 0;
  }

  private MultiChoice_selection = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    const {
      changedValue
    } = this.state;

    try {
      let selectedItemArr;

      if (changedValue === null && this.props.fieldDefaultValue !== null) {
        selectedItemArr = [];
        this.props.fieldDefaultValue.forEach(element => {
          selectedItemArr.push(element);
        });
      }
      else {
        selectedItemArr = !changedValue ? [] : isArray(changedValue) ? changedValue : [ changedValue ];
      }

      if (item.selected) {
        selectedItemArr.push(item.key);
      }
      else {
        const i = selectedItemArr.indexOf(item.key);
        if (i >= 0) {
          selectedItemArr.splice(i, 1);
        }
      }

      this.setState({ changedValue: selectedItemArr });
      this.props.onChanged(this.props.columnInternalName, selectedItemArr);
    } catch (error) {
      console.log(`Error MultiChoice_selection`, error);
    }
  }

  private saveIntoSharePoint = async (files: IFilePickerResult[]): Promise<void> => {
    const {
      columnInternalName,
      onChanged
    } = this.props;

    let newValue: string;
    if (!files.length) {
      return;
    }

    try {
      const file = files[0];
      if (file.fileAbsoluteUrl === null) {
        newValue = file.previewDataUrl;
      }
      else {
        newValue = file.fileAbsoluteUrl;
      }

      this.setState({
        changedValue: newValue
      });
      if (onChanged) {
        onChanged(columnInternalName, newValue, file);
      }
    }
    catch (error) {
      console.log(`Error save Into SharePoint`, error);
    }
  }
}
