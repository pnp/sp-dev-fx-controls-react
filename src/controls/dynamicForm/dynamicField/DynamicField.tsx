import '@pnp/sp/folders';
import { ChoiceFieldFormatType, sp } from '@pnp/sp/presets/all';
import '@pnp/sp/webs';
import * as strings from 'ControlStrings';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Icon } from '@fluentui/react/lib/Icon';
import { Image } from '@fluentui/react/lib/Image';
import { Shimmer } from '@fluentui/react/lib/Shimmer';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import * as React from 'react';
import { DateTimePicker } from '../../dateTimePicker/DateTimePicker';
import { FilePicker, IFilePickerResult } from '../../filePicker';
import { ListItemPicker } from '../../listItemPicker';
import { LocationPicker } from '../../locationPicker';
import { IPeoplePickerContext, PeoplePicker, PrincipalType } from '../../peoplepicker';
import { RichText } from '../../richText';
import { IPickerTerms, TaxonomyPicker } from '../../taxonomyPicker';
import { IDynamicFieldProps, IDynamicFieldStyleProps, IDynamicFieldStyles } from './IDynamicFieldProps';
import { IDynamicFieldState } from './IDynamicFieldState';
import CurrencyMap from "../CurrencyMap";
import { ModernTaxonomyPicker } from '../../modernTaxonomyPicker';
import { classNamesFunction, IProcessedStyleSet, styled, ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';
import { getFluentUIThemeOrDefault } from '../../../common/utilities/ThemeUtility';
import { getFieldStyles } from './DynamicField.styles';

const getClassNames = classNamesFunction<IDynamicFieldStyleProps, IDynamicFieldStyles>();

export class DynamicFieldBase extends React.Component<IDynamicFieldProps, IDynamicFieldState> {

  constructor(props: IDynamicFieldProps) {
    super(props);
    sp.setup({
      spfxContext: { pageContext: this.props.context.pageContext }
    });
    this.state = {
      changedValue: props.defaultValue !== undefined || props.defaultValue !== '' || props.defaultValue !== null || !this.isEmptyArray(props.defaultValue) ? props.defaultValue : null
    };
  }

  private _classNames: IProcessedStyleSet<IDynamicFieldStyles>;

  public componentDidUpdate(): void {
    if ((this.props.defaultValue === "" || this.props.defaultValue === null) && this.state.changedValue === null) {
      this.setState({ changedValue: "" });
    }
  }

  public render(): JSX.Element {
    try {
      const theme = getFluentUIThemeOrDefault();
      const styles = (this._classNames = getClassNames(this.props.styles, {
        theme: theme,
        required:this.props.required
      }));
      return (
        <div className={styles.fieldEditor}>
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
      defaultValue,
      newValue,
      value,
      context,
      disabled,
      label,
      placeholder,
      isRichText,
      //bingAPIKey,
      dateFormat,
      firstDayOfWeek,
      columnInternalName,
      principalType,
      description,
      maximumValue,
      minimumValue,
      itemsQueryCountLimit,
      customIcon,
      orderBy,
      choiceType,
      useModernTaxonomyPickerControl
    } = this.props;

    const {
      changedValue
    } = this.state;

    const dropdownOptions: IDropdownProps = {
      options: options,
      disabled: disabled,
      placeholder: placeholder
    };

    const peoplePickerContext: IPeoplePickerContext = {
      absoluteUrl: context.pageContext.web.absoluteUrl,
      msGraphClientFactory: context.msGraphClientFactory,
      spHttpClient: context.spHttpClient
    };

    // const defaultValue = fieldDefaultValue;
    const styles=this._classNames;
    const labelEl = <label className={styles.fieldLabel}>{label}</label>;
    const errorText = this.props.validationErrorMessage || this.getRequiredErrorText();
    const errorTextEl = <text className={styles.errormessage}>{errorText}</text>;
    const descriptionEl = <text className={styles.fieldDescription}>{description}</text>;
    const hasImage = !!changedValue;

    const valueToDisplay = newValue !== undefined ? newValue : value;

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
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "TextField"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            value={valueToDisplay}
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
          const noteValue = valueToDisplay !== undefined ? valueToDisplay : defaultValue;
          return <div className={styles.richText}>
            <div className={styles.titleContainer}>
              <Icon className={styles.fieldIcon} iconName={customIcon ?? "AlignLeft"} />
              {labelEl}
            </div>
            <RichText
              placeholder={placeholder}
              value={noteValue}
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
              <Icon className={styles.fieldIcon} iconName={customIcon ?? "AlignLeft"} />
              {labelEl}
            </div>
            <TextField
              defaultValue={defaultValue}
              value={valueToDisplay}
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

      case 'Choice': {
        let choiceControl: JSX.Element = undefined;

        // If the choiceType is dropdown
        if (choiceType === ChoiceFieldFormatType.Dropdown) {
          choiceControl = <Dropdown
            {...dropdownOptions}
            defaultSelectedKey={valueToDisplay ? undefined : defaultValue}
            selectedKey={typeof valueToDisplay === "object" ? valueToDisplay?.key : valueToDisplay}
            onChange={(e, option) => { this.onChange(option, true); }}
            onBlur={this.onBlur}
            errorMessage={errorText} />;
        }
        // If the choiceType is radio buttons
        else {
          // Parse options into radio buttons
          const optionsGroup: IChoiceGroupOption[] =
            options.map((option) => {
              return {
                key: option.key.toString(),
                text: option.text,
                checked: option.key.toString() === valueToDisplay
              };
            });

          // Create radio group
          choiceControl = <ChoiceGroup
            defaultSelectedKey={valueToDisplay ? undefined : defaultValue}
            selectedKey={typeof valueToDisplay === "object" ? valueToDisplay?.key : valueToDisplay}
            options={optionsGroup}
            onChange={(e, option) => { this.onChange(option, true); }}
            disabled={disabled}
            />;
        }

        return <div className={styles.fieldContainer}>
          <div className={`${styles.labelContainer} ${styles.titleContainer}`}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "CheckMark"} />
            {labelEl}
          </div>
          {choiceControl}
          {descriptionEl}
        </div>;
}
      case 'MultiChoice':
        return <div className={styles.fieldContainer}>
          <div className={`${styles.labelContainer} ${styles.titleContainer}`}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "MultiSelect"} />
            {labelEl}
          </div>
          <Dropdown
            {...dropdownOptions}
            defaultSelectedKeys={valueToDisplay ? undefined : defaultValue}
            selectedKeys={valueToDisplay}
            onChange={this.MultiChoice_selection}
            multiSelect
            onBlur={this.onBlur}
            errorMessage={errorText} />
          {descriptionEl}
        </div>;

      case 'Location':
        return <div className={styles.fieldContainer}>
          <div className={`${styles.labelContainer} ${styles.titleContainer}`}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "POI"} />
            {labelEl}
          </div>
          <LocationPicker
            context={context}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(newValue) => { this.onChange(newValue, true); }}
            defaultValue={valueToDisplay !== undefined ? valueToDisplay : defaultValue}
            errorMessage={errorText}
          />
          {descriptionEl}
        </div>;

      case 'Lookup':
        //eslint-disable-next-line no-case-declarations
        const lookupValue = valueToDisplay !== undefined ? valueToDisplay : defaultValue;
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "Switch"} />
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
            onSelectedItem={(newValue) => { this.onChange(newValue, true); }}
            context={context}
            itemsQueryCountLimit={itemsQueryCountLimit}
            orderBy={orderBy}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'LookupMulti':
        //eslint-disable-next-line no-case-declarations
        const lookupMultiValue = valueToDisplay !== undefined ? valueToDisplay : defaultValue;
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "Switch"} />
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
            onSelectedItem={(newValue) => { this.onChange(newValue, true); }}
            context={context}
            itemsQueryCountLimit={itemsQueryCountLimit}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'Number': {
        const customNumberErrorMessage = this.getNumberErrorText();

        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "NumberField"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            value={valueToDisplay}
            placeholder={placeholder}
            className={styles.fieldDisplay}
            type={"Number"}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={errorText || customNumberErrorMessage}
            min={minimumValue}
            max={maximumValue} />
          {descriptionEl}
        </div>;
      }
      case 'Currency': {
        const customNumberErrorMessage = this.getNumberErrorText();

        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "AllCurrency"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            value={valueToDisplay}
            placeholder={placeholder}
            className={styles.fieldDisplay}
            type={"Currency"}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={errorText || customNumberErrorMessage}
            min={minimumValue}
            max={maximumValue} />
          {descriptionEl}
        </div>;
      }
      case 'DateTime':
        return <div className={styles.fieldContainer}>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "Calendar"} />
            {labelEl}
          </div>
          {
            dateFormat === 'DateOnly' &&
            <DatePicker
              placeholder={placeholder}
              className={styles.pickersContainer}
              formatDate={(date) => { return date.toLocaleDateString(context.pageContext.cultureInfo.currentCultureName); }}
              value={valueToDisplay !== undefined ? valueToDisplay : defaultValue}
              onSelectDate={(newDate) => { this.onChange(newDate, true); }}
              disabled={disabled}
              firstDayOfWeek={firstDayOfWeek}
              allowTextInput={true}
            />}
          {
            dateFormat === 'DateTime' &&
            <DateTimePicker
              key={columnInternalName}
              placeholder={placeholder}
              formatDate={(date) => { return date.toLocaleDateString(context.pageContext.cultureInfo.currentCultureName); }}
              value={valueToDisplay !== undefined ? valueToDisplay : defaultValue}
              onChange={(newDate) => { this.onChange(newDate, true); }}
              disabled={disabled}
              firstDayOfWeek={firstDayOfWeek}
              allowTextInput={true}
            />
          }
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'Boolean':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "CheckboxComposite"} />
            {labelEl}
          </div>
          <Toggle
            className={styles.fieldDisplay}
            defaultChecked={defaultValue}
            checked={valueToDisplay}
            onText={strings.Yes}
            offText={strings.No}
            onChange={(e, checkedvalue) => { this.onChange(checkedvalue, true); }}
            disabled={disabled}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'User': {
        const userValue = Boolean(changedValue) ? changedValue.map(cv => cv.secondaryText) : (value ? value : defaultValue);
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "Contact"} />
            {labelEl}
          </div>
          <PeoplePicker
            placeholder={placeholder}
            defaultSelectedUsers={userValue}
            peoplePickerCntrlclassName={styles.fieldDisplay}
            context={peoplePickerContext}
            personSelectionLimit={1}
            showtooltip={false}
            showHiddenInUI={false}
            principalTypes={principalType === 'PeopleOnly' ? [PrincipalType.User] : [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.DistributionList, PrincipalType.SecurityGroup]}
            resolveDelay={1000}
            onChange={(items) => { this.onChange(items, true); }}
            disabled={disabled}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;
      }

      case 'UserMulti':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "Contact"} />
            {labelEl}
          </div>
          <PeoplePicker
            placeholder={placeholder}
            defaultSelectedUsers={valueToDisplay !== undefined ? valueToDisplay : defaultValue}
            peoplePickerCntrlclassName={styles.fieldDisplay}
            context={peoplePickerContext}
            personSelectionLimit={30}
            showtooltip={false}
            showHiddenInUI={false}
            principalTypes={principalType === 'PeopleOnly' ? [PrincipalType.User] : [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.DistributionList, PrincipalType.SecurityGroup]}
            resolveDelay={1000}
            onChange={(items) => { this.onChange(items, true); }}
            disabled={disabled}
          />
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'URL':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "Link"} />
            {labelEl}
          </div>
          <Stack
            tokens={{ childrenGap: 4 }}>
            <TextField
              defaultValue={defaultValue ? defaultValue.Url : ''}
              value={valueToDisplay ? valueToDisplay.Url : undefined}
              placeholder={strings.DynamicFormEnterURLPlaceholder}
              className={styles.fieldDisplayNoPadding}
              onChange={(e, newText) => { this.onURLChange(newText, true); }}
              disabled={disabled}
              onBlur={this.onBlur}
            />
            <TextField
              defaultValue={defaultValue ? defaultValue.Description : ''}
              value={valueToDisplay ? valueToDisplay.Description : undefined}
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
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "photo2"} />
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
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "BulletedTreeList"} />
            {labelEl}
          </div>
          {useModernTaxonomyPickerControl ?
            <div className={styles.pickersContainer}>
              <ModernTaxonomyPicker
                label=""
                disabled={disabled}
                initialValues={valueToDisplay !== undefined ? valueToDisplay : defaultValue}
                placeHolder={placeholder}
                allowMultipleSelections={true}
                termSetId={fieldTermSetId}
                anchorTermId={fieldAnchorId}
                panelTitle={strings.DynamicFormTermPanelTitle}
                context={context}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(newValue?: any) => { this.onChange(newValue, true); }}
              />
            </div>
            :
            <div className={styles.pickersContainer}>
              <TaxonomyPicker
                label=""
                disabled={disabled}
                initialValues={valueToDisplay !== undefined ? valueToDisplay : defaultValue}
                placeholder={placeholder}
                allowMultipleSelections={true}
                termsetNameOrID={fieldTermSetId}
                anchorId={fieldAnchorId}
                panelTitle={strings.DynamicFormTermPanelTitle}
                context={context}
                onChange={(newValue?: IPickerTerms) => { this.onChange(newValue, true); }}
                isTermSetSelectable={false}
              />
            </div>
          }
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'TaxonomyFieldType':
        return <div className={styles.fieldContainer}>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "BulletedTreeList"} />
            {labelEl}
          </div>
          {useModernTaxonomyPickerControl ?
            <div className={styles.pickersContainer}>
              <ModernTaxonomyPicker
                label=""
                disabled={disabled}
                initialValues={valueToDisplay !== undefined ? [valueToDisplay] : defaultValue}
                placeHolder={placeholder}
                allowMultipleSelections={false}
                termSetId={fieldTermSetId}
                anchorTermId={fieldAnchorId}
                panelTitle={strings.DynamicFormTermPanelTitle}
                context={context}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(newValue?: any) => { this.onChange(newValue, true); }}
              />
            </div>
          :
            <div className={styles.pickersContainer}>
              <TaxonomyPicker
                label=""
                disabled={disabled}
                initialValues={valueToDisplay !== undefined ? valueToDisplay : defaultValue}
                placeholder={placeholder}
                allowMultipleSelections={false}
                termsetNameOrID={fieldTermSetId}
                anchorId={fieldAnchorId}
                panelTitle={strings.DynamicFormTermPanelTitle}
                context={context}
                onChange={(newValue?: IPickerTerms) => { this.onChange(newValue, true); }}
                isTermSetSelectable={false}
              />
            </div>
          }
          {descriptionEl}
          {errorTextEl}
        </div>;

      case 'File':
        return <div className={styles.fieldContainer}>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={customIcon ?? "Page"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            value={valueToDisplay}
            placeholder={placeholder}
            className={styles.fieldDisplay}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={errorText}
          />
          {descriptionEl}
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
      defaultValue,
      onChanged,
      columnInternalName
    } = this.props;

    let currValue = this.state.changedValue || defaultValue || {
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
      onChanged(columnInternalName, currValue, false);
    }
  }

  private onChange = (value: any, callValidation = false): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const {
      onChanged,
      columnInternalName
    } = this.props;

    if (onChanged) {
      onChanged(columnInternalName, value, callValidation);
    }
    this.setState({
      changedValue: value
    });
  }

  private onBlur = (): void => {
    if (this.state.changedValue === null && this.props.defaultValue === "") {
      this.setState({ changedValue: "" });
    }
    this.props.onChanged(this.props.columnInternalName, this.state.changedValue, true);
  }

  private getRequiredErrorText = (): string => {
    const {
      changedValue
    } = this.state;

    const { value, newValue, required,listItemId } = this.props;

    if (listItemId !== undefined && listItemId !== null) {
      if (newValue === undefined) {
        return required && (changedValue === undefined || changedValue === '' || changedValue === null || this.isEmptyArray(changedValue))
        && (value === undefined || value === '' || value === null || this.isEmptyArray(value) || this.checkUserArrayIsEmpty(value)) ? strings.DynamicFormRequiredErrorMessage : null;
      } else {
        return required && (changedValue === undefined || changedValue === '' || changedValue === null || this.isEmptyArray(changedValue) || this.checkUserArrayIsEmpty(value)) ? strings.DynamicFormRequiredErrorMessage : null;
      }
    }

    return null;
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
      showAsPercentage,
      value,
      newValue,
      required,
      listItemId
    } = this.props;

    if (required && newValue!==undefined && (changedValue === undefined || changedValue === '' || changedValue === null || this.isEmptyArray(changedValue)) ) {
      return strings.DynamicFormRequiredErrorMessage;
    }

    if(listItemId !== undefined && listItemId !== null){
      if (required && newValue===undefined &&  (value === undefined || value === '' || value === null || this.isEmptyArray(value)) && (changedValue === undefined || changedValue === '' || changedValue === null || this.isEmptyArray(changedValue)) ) {
        return strings.DynamicFormRequiredErrorMessage;
      }
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

  private checkUserArrayIsEmpty = (value): boolean => {
    return Array.isArray(value) && value.every(item => item === "");
  }

  private MultiChoice_selection = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    const {
      changedValue
    } = this.state;

    try {
      let selectedItemArr;
      const value = this.props.value || this.props.defaultValue;
      if (changedValue === null && value !== null) {
        selectedItemArr = [];
        value.forEach(element => {
          selectedItemArr.push(element);
        });
      }
      else {
        // selectedItemArr = this.props.value;
        selectedItemArr = !changedValue ? [] :
        ( Array.isArray(changedValue) ? [ ...changedValue ] : [ changedValue] );
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
      this.props.onChanged(this.props.columnInternalName, selectedItemArr, true);
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
        onChanged(columnInternalName, newValue, true, file);
      }
    }
    catch (error) {
      console.log(`Error save Into SharePoint`, error);
    }
  }
}

export const DynamicField = styled<IDynamicFieldProps, IDynamicFieldStyleProps, IDynamicFieldStyles>(
  DynamicFieldBase,
  getFieldStyles,
  undefined,
  {
    scope: 'DynamicField',
  },
);
