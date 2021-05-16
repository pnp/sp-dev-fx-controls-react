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
import { RichText } from '../../richText';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { sp } from '@pnp/sp/presets/all';
import * as strings from 'ControlStrings';

export class DynamicField extends React.Component<IDynamicFieldProps, IDynamicFieldState> {

  constructor(props: IDynamicFieldProps) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });
    this.state = { changedValue: null };
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
      className,
      disabled,
      label,
      placeholder,
      required,
      isRichText,
      bingAPIKey
    } = this.props;

    const {
      changedValue
    } = this.state;

    const dropdownOptions: IDropdownProps = {
      className: className,
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
          <Icon className={styles.fieldIcon} iconName={"TextField"} />
          {labelEl}
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
          return <div>
            <Icon className={styles.fieldIcon} iconName={"AlignLeft"} />
            {labelEl}
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
            <Icon className={styles.fieldIcon} iconName={"AlignLeft"} />
            {labelEl}
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
          <div className={styles.labelContainer}>
            <Icon className={styles.fieldIcon} iconName={"MultiSelect"} />
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
          <div className={styles.labelContainer}>
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

      case 'Lookup':
        return <div>
          <Icon className={styles.fieldIcon} iconName={"Switch"} />
          {labelEl}
          <ListItemPicker
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
          <Icon className={styles.fieldIcon} iconName={"Switch"} />
          {labelEl}
          <ListItemPicker
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
          <Icon className={styles.fieldIcon} iconName={"NumberField"} />
          {labelEl}
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
          <Icon className={styles.fieldIcon} iconName={"AllCurrency"} />
          {labelEl}
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
          <Icon className={styles.fieldIcon} iconName={"Calendar"} />
          {labelEl}
          <DatePicker
            placeholder={placeholder}
            className={styles.pickersContainer}
            formatDate={(date) => { return date.toLocaleDateString(context.pageContext.web.languageName); }}
            value={(changedValue !== null && changedValue !== "") ? changedValue : defaultValue}
            onSelectDate={(newDate) => { this.onChange(newDate); }}
            disabled={disabled}
          />
          {errorTextEl}
        </div>;

      case 'Boolean':
        return <div>
          <Icon className={styles.fieldIcon} iconName={"CheckboxComposite"} />
          {labelEl}
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
          <Icon className={styles.fieldIcon} iconName={"Contact"} />
          {labelEl}
          <PeoplePicker
            placeholder={placeholder}
            defaultSelectedUsers={defaultValue}
            peoplePickerCntrlclassName={styles.feildDisplay}
            context={context}
            personSelectionLimit={1}
            showtooltip={true}
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
          <Icon className={styles.fieldIcon} iconName={"Contact"} />
          {labelEl}
          <PeoplePicker
            placeholder={placeholder}
            defaultSelectedUsers={defaultValue}
            peoplePickerCntrlclassName={styles.feildDisplay}
            context={context}
            personSelectionLimit={30}
            showtooltip={true}
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
          <Icon className={styles.fieldIcon} iconName={"Link"} />
          {labelEl}
          <Stack
            className={styles.filePicker}
            horizontal
            tokens={{ childrenGap: 20 }}>
            {defaultValue === null ? null :
              <Link
                href={defaultValue["Url"]}>
                {defaultValue["Description"]}
              </Link>
            }
            <FilePicker
              buttonClassName={styles.feildDisplay}
              bingAPIKey={bingAPIKey}
              accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
              buttonIcon="FileImage"
              onSave={this.saveIntoSharePoint}
              onChange={this.saveIntoSharePoint}
              context={context}
              disabled={disabled}
            />
          </Stack>
          {errorTextEl}
        </div>;

      case 'Thumbnail':
        return <div>
          <Icon className={styles.fieldIcon} iconName={"photo2"} />
          {labelEl}
          <Stack
            className={styles.filePicker}
            horizontal
            tokens={{ childrenGap: 20 }}>
            <Image
              src={defaultValue}
              height={60}
            />
            <FilePicker
              buttonClassName={styles.feildDisplay}
              bingAPIKey={bingAPIKey}
              accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
              buttonIcon="FileImage"
              onSave={this.saveIntoSharePoint}
              onChange={this.saveIntoSharePoint}
              context={context}
              disabled={disabled}
            />
          </Stack>
          {errorTextEl}
        </div>;

      case 'TaxonomyFieldTypeMulti':
        return <div className={styles.fieldContainer}>
          <Icon className={styles.fieldIcon} iconName={"BulletedTreeList"} />
          {labelEl}
          <div className={styles.pickersContainer}>
            <TaxonomyPicker
              label=""
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
          <Icon className={styles.fieldIcon} iconName={"BulletedTreeList"} />
          {labelEl}
          <div className={styles.pickersContainer}>
            <TaxonomyPicker
              label=""
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
    return this.state.changedValue === '' && this.props.required ? strings.DynamicFormRequiredErrorMessage : null;
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
        seletedItemArr = (changedValue === "" || changedValue === null) ? [] : changedValue;
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
      context,
      listId,
      columnInternalName,
      onChanged,
      fieldType
    } = this.props;

    let newValue: any;

    if (!files.length) {
      return;
    }

    try {
      const file = files[0];
      if (file.fileAbsoluteUrl == null) {
        let resultContent = await file.downloadFileContent();
        let fileResult = await sp.web.getFolderByServerRelativeUrl(`${context.pageContext.web.serverRelativeUrl}/SiteAssets/Lists/${listId}`).files.add(file.fileName, resultContent, false);
        newValue = {
          "__metadata": { "type": "SP.FieldUrlValue" },
          "Description": file.fileName,
          "Url": document.location.origin + fileResult.data.ServerRelativeUrl
        };
      }
      else {
        if (fieldType === "Thumbnail") {
          newValue = JSON.stringify({
            "fileName": file.fileName,
            "serverUrl": file.fileAbsoluteUrl.replace(file.fileAbsoluteUrl.replace(/.*\/\/[^\/]*/, ''), ''),
            "serverRelativeUrl": file.fileAbsoluteUrl.replace(/.*\/\/[^\/]*/, '')
          });
        }
        else if (fieldType === "URL") {
          newValue = {
            "__metadata": { "type": "SP.FieldUrlValue" },
            "Description": file.fileName,
            "Url": file.fileAbsoluteUrl
          };
        }
      }

      this.setState({
        changedValue: newValue
      });
      if (onChanged) {
        onChanged(columnInternalName, this.state.changedValue);
      }
    }
    catch (error) {
      console.log(`Error save Into SharePoint`, error);
    }
  }
}
