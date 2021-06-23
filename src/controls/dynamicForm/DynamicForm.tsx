import * as React from 'react';
import styles from './DynamicForm.module.scss';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { IDynamicFormProps } from './IDynamicFormProps';
import { IDynamicFormState } from './IDynamicFormState';
import { DateFormat, FieldChangeAdditionalData, IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
import SPservice from '../../services/SPService';
import { DynamicField } from './dynamicField';
import { sp } from '@pnp/sp/presets/all';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as strings from 'ControlStrings';
import { IFilePickerResult } from '../filePicker';
import { IUploadImageResult } from '../../common/SPEntities';
import { SPHttpClient } from '@microsoft/sp-http';

const stackTokens: IStackTokens = { childrenGap: 20 };

/**
 * DynamicForm Class Control
 */
export class DynamicForm extends React.Component<IDynamicFormProps, IDynamicFormState> {
  private _spService: SPservice;
  constructor(props: IDynamicFormProps) {
    super(props);
    // Initialize pnp sp
    sp.setup({
      spfxContext: this.props.context
    });
    // Initialize state
    this.state = {
      fieldCollection: []
    };
    // Get SPService Factory
    this._spService = new SPservice(this.props.context);
  }

  /**
   * Lifecycle hook when component is mounted
   */
  public componentDidMount() {
    this.getFieldInformations();
  }

  /**
   * Default React component render method
   */
  public render(): JSX.Element {
    const {
      fieldCollection,
      isSaving
    } = this.state;
    return (
      <div>
        {fieldCollection.length === 0 ? <div><ProgressIndicator label={strings.DynamicFormLoading} description={strings.DynamicFormPleaseWait} /></div> :
          <div>
            {fieldCollection.map((v, i) => {
              return <DynamicField {...v} disabled={v.disabled || isSaving} />;
            })}
            <Stack className={styles.buttons} horizontal tokens={stackTokens}>
              <PrimaryButton disabled={isSaving} text={strings.Save} onClick={() => this.onSubmitClick()} />
              <DefaultButton disabled={isSaving} text={strings.Cancel} onClick={this.props.onCancelled} />
            </Stack>
          </div>
        }
      </div>
    );
  }

  //trigger when the user submits the form.
  private onSubmitClick = async () => {
    const {
      listId,
      listItemId,
      onSubmitted,
      onBeforeSubmit,
      onSubmitError
    } = this.props;

    try {
      let shouldBeReturnBack = false;
      let fields = (this.state.fieldCollection || []).slice();
      fields.forEach((val) => {
        if (val.required) {
          if (val.newValue === null) {
            if (val.fieldDefaultValue === null || val.fieldDefaultValue === '' || val.fieldDefaultValue.length === 0) {
              if (val.fieldType === "DateTime")
                val.fieldDefaultValue = null;
              else
                val.fieldDefaultValue = '';
              shouldBeReturnBack = true;
            }
          }
          else if (val.newValue === '') {
            val.fieldDefaultValue = '';
            shouldBeReturnBack = true;
          }
        }
      });
      if (shouldBeReturnBack) {
        this.setState({ fieldCollection: fields });
        return;
      }

      this.setState({
        isSaving: true
      });

      const objects = {};
      for (let i = 0, len = fields.length; i < len; i++) {
        const val = fields[i];
        const {
          fieldType,
          additionalData,
          columnInternalName,
          hiddenFieldName
        } = val;
        if (val.newValue !== null && val.newValue !== undefined) {
          let value = val.newValue;
          if (fieldType === "Lookup") {
            objects[`${columnInternalName}Id`] = value[0].key;
          }
          else if (fieldType === "LookupMulti") {
            value = [];
            val.newValue.forEach(element => {
              value.push(element.key);
            });
            objects[`${columnInternalName}Id`] = { results: value };
          }
          else if (fieldType === "TaxonomyFieldType") {
            objects[columnInternalName] = {
              '__metadata': { 'type': 'SP.Taxonomy.TaxonomyFieldValue' },
              'Label': value[0].name,
              'TermGuid': value[0].key,
              'WssId': '-1'
            };
          }
          else if (fieldType === "TaxonomyFieldTypeMulti") {
            objects[hiddenFieldName] = val.newValue.map(term => `-1#;${term.name}|${term.key};`).join('#');
          }
          else if (fieldType === "User") {
            objects[`${columnInternalName}Id`] = val.newValue;
          }
          else if (fieldType === "Choice") {
            objects[columnInternalName] = val.newValue.key;
          }
          else if (fieldType === "MultiChoice") {
            objects[columnInternalName] = { results: val.newValue };
          }
          else if (fieldType === "Location") {
            objects[columnInternalName] = JSON.stringify(val.newValue);
          }
          else if (fieldType === "UserMulti") {
            objects[`${columnInternalName}Id`] = { results: val.newValue };
          }
          else if (fieldType === 'Thumbnail') {
            if (additionalData) {
              const uploadedImage = await this.uplaodImage(additionalData);
              objects[columnInternalName] = JSON.stringify({
                type: 'thumbnail',
                fileName: uploadedImage.Name,
                serverRelativeUrl: uploadedImage.ServerRelativeUrl,
                id: uploadedImage.UniqueId
              });
            }
            else {
              objects[columnInternalName] = null;
            }
          }
          else {
            objects[columnInternalName] = val.newValue;
          }
        }
      }

      if (onBeforeSubmit) {
        const isCancelled = await onBeforeSubmit(objects);

        if (isCancelled) {
          this.setState({
            isSaving: false
          });
          return;
        }
      }

      if (listItemId) {
        try {
          const iur = await sp.web.lists.getById(listId).items.getById(listItemId).update(objects);
          if (onSubmitted) {
            onSubmitted(iur.data);
          }
        }
        catch (error) {
          if (onSubmitError) {
            onSubmitError(objects, error);
          }
          console.log("Error", error);
        }

      }
      else {
        try {
          const iar = await sp.web.lists.getById(listId).items.add(objects);
          if (onSubmitted) {
            onSubmitted(iar.data);
          }
        }
        catch (error) {
          if (onSubmitError) {
            onSubmitError(objects, error);
          }
          console.log("Error", error);
        }
      }
      this.setState({
        isSaving: false
      });
    } catch (error) {
      if (onSubmitError) {
        onSubmitError(null, error);
      }
      console.log(`Error onSubmit`, error);
    }
  }

  // trigger when the user change any value in the form
  private onChange = async (internalName: string, newValue: any, additionalData?: FieldChangeAdditionalData) => {
    try {
      let fieldCol = (this.state.fieldCollection || []).slice();
      let field = fieldCol.filter((element, i) => { return element.columnInternalName === internalName; })[0];
      field.newValue = newValue;
      field.additionalData = additionalData;
      if (field.fieldType === "User" && newValue.length !== 0) {
        let result = await sp.web.ensureUser(newValue[0].secondaryText);
        field.newValue = result.data.Id;
      }
      else if (field.fieldType === "UserMulti" && newValue.length !== 0) {
        field.newValue = [];
        for (let index = 0; index < newValue.length; index++) {
          const element = newValue[index];
          let user: string = element.secondaryText;
          if (user.indexOf('@') === -1) {
            user = element.loginName;
          }
          let result = await sp.web.ensureUser(user);
          field.newValue.push(result.data.Id);
        }
      }
      this.setState({
        fieldCollection: fieldCol
      });
    } catch (error) {

      console.log(`Error onchange`, error);
      return null;
    }
  }

  //getting all the fields information as part of get ready process
  private getFieldInformations = async (): Promise<void> => {
    const { context, listId, listItemId } = this.props;
    let contentTypeId = this.props.contentTypeId;
    //let arrayItems: { key: string; name: string }[] = [];
    try {
      const spList = await sp.web.lists.getById(listId);
      let item = null;
      if (listItemId !== undefined && listItemId !== null && listItemId !== 0)
        item = await spList.items.getById(listItemId).get();

      if (contentTypeId === undefined || contentTypeId === '') {
        let defaultContentType = await spList.contentTypes.select("Id", "Name").get();
        contentTypeId = defaultContentType[0]["Id"].StringValue;
      }
      const listFeilds = await this.getFormFields(listId, contentTypeId, context.pageContext.web.absoluteUrl);
      const tempFields: IDynamicFieldProps[] = [];
      let order: number = 0;
      const responseValue = listFeilds['value'];
      for (let i = 0, len = responseValue.length; i < len; i++) {
        const field = responseValue[i];
        order++;
        const fieldType = field['TypeAsString'];
        field.order = order;
        let hiddenName = "";
        let termSetId = "";
        let lookupListId = "";
        let lookupField = "";
        let choices: IDropdownOption[] = [];
        let defaultValue = null;
        let selectedTags: any = [];
        let richText = false;
        let dateFormat: DateFormat | undefined;
        if (item !== null) {
          defaultValue = item[field.InternalName];
        }
        else {
          defaultValue = field.DefaultValue;
        }
        if (fieldType === 'Choice' || fieldType === 'MultiChoice') {
          field["Choices"].forEach(element => {
            choices.push({ key: element, text: element });
          });
        }
        else if (fieldType === "Note") {
          richText = field["RichText"];
        }
        else if (fieldType === "Lookup") {
          lookupListId = field["LookupList"];
          lookupField = field["LookupField"];
          if (item !== null) {
            defaultValue = await this._spService.getLookupValue(listId, listItemId, field.InternalName, context.pageContext.web.absoluteUrl);
          }
          else {
            defaultValue = [];
          }

        }
        else if (fieldType === "LookupMulti") {
          lookupListId = field["LookupList"];
          lookupField = field["LookupField"];
          if (item !== null) {
            defaultValue = await this._spService.getLookupValues(listId, listItemId, field.InternalName, context.pageContext.web.absoluteUrl);
          }
          else {
            defaultValue = [];
          }
        }
        else if (fieldType === "TaxonomyFieldTypeMulti") {
          let response = await this._spService.getTaxonomyFieldInternalName(this.props.listId, field.InternalName, this.props.context.pageContext.web.absoluteUrl);
          hiddenName = response["value"];
          termSetId = field["TermSetId"];
          if (item !== null) {
            item[field.InternalName].forEach(element => {
              selectedTags.push({ key: element.TermGuid, name: element.Label });
            });

            defaultValue = selectedTags;
          }
          else {
            if (defaultValue !== "") {
              defaultValue.split(/#|;/).forEach(element => {
                if (element.indexOf('|') !== -1)
                  selectedTags.push({ key: element.split('|')[1], name: element.split('|')[0] });
              });

              defaultValue = selectedTags;
            }
          }
          if (defaultValue === "")
            defaultValue = null;
        }
        else if (fieldType === "TaxonomyFieldType") {

          termSetId = field["TermSetId"];
          if (item !== null) {
            const response = await this._spService.getSingleManagedMtadataLabel(listId, listItemId, field.InternalName);
            if (response) {
              selectedTags.push({ key: response["TermID"], name: response["Label"] });
              defaultValue = selectedTags;
            }
          }
          else {
            if (defaultValue !== "") {
              selectedTags.push({ key: defaultValue.split('|')[1], name: defaultValue.split('|')[0].split('#')[1] });
              defaultValue = selectedTags;
            }
          }
          if (defaultValue === "")
            defaultValue = null;
        }
        else if (fieldType === "DateTime") {
          if (item !== null && item[field.InternalName])
            defaultValue = new Date(item[field.InternalName]);
          else if (defaultValue === '[today]') {
            defaultValue = new Date();
          }

          const schemaXml = field.SchemaXml;
          const dateFormatRegEx = /\s+Format=\"([^\"]+)\"/gmi.exec(schemaXml);
          dateFormat = dateFormatRegEx && dateFormatRegEx.length ? dateFormatRegEx[1] as DateFormat : 'DateOnly';

        }
        else if (fieldType === "UserMulti") {
          if (item !== null)
            defaultValue = await this._spService.getUsersUPNFromFieldValue(listId, listItemId, field.InternalName, context.pageContext.web.absoluteUrl);
          else {
            defaultValue = [];
          }
        }
        else if (fieldType === "Thumbnail") {
          if (defaultValue !== null) {
            defaultValue = context.pageContext.web.absoluteUrl.split('/sites/')[0] + JSON.parse(defaultValue).serverRelativeUrl;
          }
        }
        else if (fieldType === "User") {
          if (item !== null) {
            let userEmails: string[] = [];
            userEmails.push(await this._spService.getUserUPNById(parseInt(item[field.InternalName + "Id"])) + '');
            defaultValue = userEmails;
          }
          else {
            defaultValue = [];
          }
        }
        else if (fieldType === "Location") {
          defaultValue = JSON.parse(defaultValue);
        }

        tempFields.push({
          newValue: null,
          fieldTermSetId: termSetId,
          options: choices,
          lookupListID: lookupListId,
          lookupField: lookupField,
          changedValue: defaultValue,
          fieldType: field.TypeAsString,
          fieldTitle: field.Title,
          fieldDefaultValue: defaultValue,
          context: this.props.context,
          disabled: this.props.disabled,
          listId: this.props.listId,
          columnInternalName: field.InternalName,
          label: field.Title,
          onChanged: this.onChange,
          required: field.Required,
          hiddenFieldName: hiddenName,
          Order: field.order,
          isRichText: richText,
          dateFormat: dateFormat,
          listItemId: listItemId
        });
        tempFields.sort((a, b) => a.Order - b.Order);
      }

      this.setState({ fieldCollection: tempFields });
      //return arrayItems;
    } catch (error) {
      console.log(`Error get field informations`, error);
      return null;
    }
  }

  private uplaodImage = async (file: IFilePickerResult): Promise<IUploadImageResult> => {
    const {
      listId,
      listItemId
    } = this.props;
    if (file.fileAbsoluteUrl) {
      return {
        Name: file.fileName,
        ServerRelativeUrl: file.fileAbsoluteUrl,
        UniqueId: ''
      };
    }
    else {
      const fileInstance = await file.downloadFileContent();
      const buffer = await this.getImageArrayBuffer(fileInstance);
      return await this._spService.uploadImage(listId, listItemId, file.fileName, buffer, undefined);
    }
  }

  private getImageArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise<ArrayBuffer>(resolve => {

      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
    });
  }

  private getFormFields = async (listId: string, contentTypeId: string | undefined, webUrl?: string): Promise<any[]> => {
    try {
      const {
        context
      } = this.props;
      const webAbsoluteUrl = !webUrl ? context.pageContext.web.absoluteUrl : webUrl;
      let apiUrl = '';
      if (contentTypeId !== undefined && contentTypeId !== '') {
        apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/contenttypes('${contentTypeId}')/fields?@listId=guid'${encodeURIComponent(listId)}'&$filter=ReadOnlyField eq false and Hidden eq false and (FromBaseType eq false or StaticName eq 'Title')`;
      }
      else {
        apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/fields?@listId=guid'${encodeURIComponent(listId)}'&$filter=ReadOnlyField eq false and Hidden eq false and (FromBaseType eq false or StaticName eq 'Title')`;
      }
      const data = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results) {
          return results;
        }
      }

      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }
}
