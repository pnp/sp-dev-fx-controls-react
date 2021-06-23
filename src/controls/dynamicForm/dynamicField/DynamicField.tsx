import * as React from 'react';
import styles from '../DynamicForm.module.scss';
import { IDropdownOption, IDropdownProps, Dropdown } from 'office-ui-fabric-react/lib/components/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { IDynamicFieldProps } from './IDynamicFieldProps';
import { IDynamicFieldState } from './IDynamicFieldState';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PeoplePicker, PrincipalType } from '../../peoplepicker';
import { FilePicker, IFilePickerResult } from '../../filePicker';
import { TaxonomyPicker, IPickerTerms } from '../../taxonomyPicker';
import { ListItemPicker } from '../../listItemPicker';
import { LocationPicker } from '../../locationPicker';
import { RichText } from '../../richText';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DateTimePicker } from '../../dateTimePicker/DateTimePicker';
import { IFolder, sp } from '@pnp/sp/presets/all';
import * as strings from 'ControlStrings';
import { urlCombine } from '../../../common/utilities/GeneralHelper';
import '@pnp/sp/folders';
import '@pnp/sp/webs';
import { SPHttpClient } from '@microsoft/sp-http';
import { ActionButton } from 'office-ui-fabric-react';


export class DynamicField extends React.Component<IDynamicFieldProps, IDynamicFieldState> {

  constructor(props: IDynamicFieldProps) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });
    this.state = {
      changedValue: props.fieldType === 'Thumbnail' ? props.fieldDefaultValue : null
    };
  }

  public componentDidUpdate() {
    if (this.props.fieldDefaultValue === "" && this.state.changedValue === null) {
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
      columnInternalName
    } = this.props;

    const {
      changedValue
    } = this.state;

    const dropdownOptions: IDropdownProps = {
      options: options,
      disabled: disabled,
      placeholder: placeholder
    };

    const labelText = fieldTitle != null ? fieldTitle : label;
    const defaultValue = fieldDefaultValue;
    let empty = null;

    const labelEl = <label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label>;
    const errorText = this.getRequiredErrorText();
    const errorTextEl = <text className={styles.errormessage}>{errorText}</text>;

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
            className={styles.feildDisplay}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={errorText}
          />
        </div>;

      case 'Note':
        if (isRichText) {
          return <div className={styles.richText}>
            <div className={styles.titleContainer}>
              <Icon className={styles.fieldIcon} iconName={"AlignLeft"} />
              {labelEl}
            </div>
            <RichText
              placeholder={placeholder}
              value={defaultValue}
              className={styles.feildDisplay}
              onChange={(newText) => { this.onChange(newText); return newText; }}
              isEditMode={disabled}>
            </RichText>
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
              className={styles.feildDisplay}
              multiline
              onChange={(e, newText) => { this.onChange(newText); }}
              disabled={disabled}
              onBlur={this.onBlur}
              errorMessage={errorText}
            />
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
        </div>;

      case 'Lookup':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"Switch"} />
            {labelEl}
          </div>
          <ListItemPicker
            disabled={disabled}
            listId={lookupListID}
            defaultSelectedItems={defaultValue}
            columnInternalName={lookupField}
            className={styles.feildDisplay}
            keyColumnInternalName='Id'
            itemLimit={1}
            onSelectedItem={(newValue) => { this.onChange(newValue); }}
            context={context}
          />
          {errorTextEl}
        </div>;

      case 'LookupMulti':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"Switch"} />
            {labelEl}
          </div>
          <ListItemPicker
            disabled={disabled}
            listId={lookupListID}
            defaultSelectedItems={defaultValue}
            columnInternalName={lookupField}
            className={styles.feildDisplay}
            keyColumnInternalName='Id'
            itemLimit={100}
            onSelectedItem={(newValue) => { this.onChange(newValue); }}
            context={context}
          />
          {errorTextEl}
        </div>;

      case 'Number':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"NumberField"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={styles.feildDisplay}
            type={"Number"}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={errorText} />
        </div>;

      case 'Currency':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"AllCurrency"} />
            {labelEl}
          </div>
          <TextField
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={styles.feildDisplay}
            type={"Currency"}
            onChange={(e, newText) => { this.onChange(newText); }}
            disabled={disabled}
            onBlur={this.onBlur}
            errorMessage={errorText} />
        </div>;

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
              formatDate={(date) => { return date.toLocaleDateString(context.pageContext.web.languageName); }}
              value={(changedValue !== null && changedValue !== "") ? changedValue : defaultValue}
              onSelectDate={(newDate) => { this.onChange(newDate); }}
              disabled={disabled}
            />}
          {
            dateFormat === 'DateTime' &&
            <DateTimePicker
              key={columnInternalName}
              placeholder={placeholder}
              formatDate={(date) => { return date.toLocaleDateString(context.pageContext.web.languageName); }}
              value={(changedValue !== null && changedValue !== "") ? changedValue : defaultValue}
              onChange={(newDate) => { this.onChange(newDate); }}
              disabled={disabled} />
          }
          {errorTextEl}
        </div>;

      case 'Boolean':
        return <div>
          <div className={styles.titleContainer}>
            <Icon className={styles.fieldIcon} iconName={"CheckboxComposite"} />
            {labelEl}
          </div>
          <Toggle
            className={styles.feildDisplay}
            defaultChecked={defaultValue}
            onText={strings.Yes}
            offText={strings.No}
            onChange={(e, checkedvalue) => { this.onChange(checkedvalue); }}
            disabled={disabled}
          />
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
            peoplePickerCntrlclassName={styles.feildDisplay}
            context={context}
            personSelectionLimit={1}
            showtooltip={false}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]} // TODO: principal types should be read from the column settings
            resolveDelay={1000}
            onChange={(items) => { this.onChange(items); }}
            disabled={disabled}
          />
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
            peoplePickerCntrlclassName={styles.feildDisplay}
            context={context}
            personSelectionLimit={30}
            showtooltip={false}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]} // TODO: principal types should be read from the column settings
            resolveDelay={1000}
            onChange={(items) => { this.onChange(items); }}
            disabled={disabled}
          />
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
              defaultValue={defaultValue ? defaultValue['Url'] : ''}
              placeholder={strings.DynamicFormEnterURLPlaceholder}
              className={styles.feildDisplayNoPadding}
              onChange={(e, newText) => { this.onURLChange(newText, true); }}
              disabled={disabled}
              onBlur={this.onBlur} />
            <TextField
              defaultValue={defaultValue ? defaultValue['Description'] : ''}
              placeholder={strings.DynamicFormEnterDescriptionPlaceholder}
              className={styles.feildDisplayNoPadding}
              onChange={(e, newText) => { this.onURLChange(newText, false); }}
              disabled={disabled} />
          </Stack>
          {errorTextEl}
        </div>;

      case 'Thumbnail':
        const hasImage = !!changedValue;// || !!defaultValue;
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
                buttonClassName={styles.feildDisplay}
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
              panelTitle={strings.DynamicFormTermPanelTitle}
              context={context}
              onChange={(newValue?: IPickerTerms) => { this.onChange(newValue); }}
              isTermSetSelectable={false}
            />
          </div>
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
              panelTitle={strings.DynamicFormTermPanelTitle}
              context={context}
              onChange={(newValue?: IPickerTerms) => { this.onChange(newValue); }}
              isTermSetSelectable={false} />
          </div>
          {errorTextEl}
        </div>;
    }

    return null;
  }

  private onDeleteImage = () => {

    const {
      onChanged,
      columnInternalName
    } = this.props;

    this.setState({
      changedValue: undefined
    });

    if (onChanged) {
      onChanged(columnInternalName, undefined, undefined);
    }
  }

  private onURLChange = (value: string, isUrl: boolean) => {
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

  private onChange = (value: any) => {
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

  private onBlur = () => {
    if (this.state.changedValue === null && this.props.fieldDefaultValue === "") {
      this.setState({ changedValue: "" });
    }
  }

  private getRequiredErrorText = (): string => {
    const {
      changedValue
    } = this.state;
    return (changedValue === undefined || changedValue === '') && this.props.required ? strings.DynamicFormRequiredErrorMessage : null;
  }

  private MultiChoice_selection = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
    const {
      changedValue
    } = this.state;
    try {
      let seletedItemArr;
      if (changedValue === null && this.props.fieldDefaultValue != null) {
        seletedItemArr = [];
        this.props.fieldDefaultValue.forEach(element => {
          seletedItemArr.push(element);
        });
      }
      else
        seletedItemArr = !changedValue ? [] : changedValue;
      if (item.selected) {
        seletedItemArr.push(item.key);
      }
      else {
        let i = seletedItemArr.indexOf(item.key);
        if (i >= 0) {
          seletedItemArr.splice(i, 1);
        }
      }
      this.setState({ changedValue: seletedItemArr });
      this.props.onChanged(this.props.columnInternalName, seletedItemArr);
    } catch (error) {
      console.log(`Error MultiChoice_selection`, error);
    }
  }

  private saveIntoSharePoint = async (files: IFilePickerResult[]) => {
    const {
      columnInternalName,
      onChanged
    } = this.props;

    let newValue: any;
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
