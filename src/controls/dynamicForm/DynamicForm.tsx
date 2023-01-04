/* eslint-disable @microsoft/spfx/no-async-await */
import { SPHttpClient } from '@microsoft/sp-http';
import { sp } from '@pnp/sp/presets/all';
import * as strings from 'ControlStrings';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import * as React from 'react';
import { IUploadImageResult } from '../../common/SPEntities';
import SPservice from '../../services/SPService';
import { IFilePickerResult } from '../filePicker';
import { DynamicField } from './dynamicField';
import { DateFormat, FieldChangeAdditionalData, IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
import styles from './DynamicForm.module.scss';
import { IDynamicFormProps } from './IDynamicFormProps';
import { IDynamicFormState } from './IDynamicFormState';

import '@pnp/sp/lists';
import '@pnp/sp/content-types';
import '@pnp/sp/folders';
import '@pnp/sp/items';

const stackTokens: IStackTokens = { childrenGap: 20 };

/**
 * DynamicForm Class Control
 */
export class DynamicForm extends React.Component<IDynamicFormProps, IDynamicFormState> {

  private _spService: SPservice;
  private webURL = this.props.webAbsoluteUrl ? this.props.webAbsoluteUrl : this.props.context.pageContext.web.absoluteUrl;

  constructor(props: IDynamicFormProps) {
    super(props);
    // Initialize pnp sp

    if (this.props.webAbsoluteUrl) {
      sp.setup({
        sp: {
          headers: {
            Accept: "application/json;odata=verbose",
          },
          baseUrl: this.props.webAbsoluteUrl
        },
      });
    } else {
      sp.setup({
        spfxContext: { pageContext: this.props.context.pageContext }
      });
    }

    // Initialize state
    this.state = {
      fieldCollection: []
    };
    // Get SPService Factory
    this._spService = this.props.webAbsoluteUrl ? new SPservice(this.props.context, this.props.webAbsoluteUrl) : new SPservice(this.props.context);

  }

  /**
   * Lifecycle hook when component is mounted
   */
  public componentDidMount(): void {
    this.getFieldInformations().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }

  /**
   * Default React component render method
   */
  public render(): JSX.Element {
    const {
      fieldCollection,
      isSaving
    } = this.state;

    const fieldOverrides = this.props.fieldOverrides;

    return (
      <div>
        {fieldCollection.length === 0 ? <div><ProgressIndicator label={strings.DynamicFormLoading} description={strings.DynamicFormPleaseWait} /></div> :
          <div>
            {fieldCollection.map((v, i) => {
              if(fieldOverrides && Object.prototype.hasOwnProperty.call(fieldOverrides, v.columnInternalName)) {
                v.disabled = v.disabled || isSaving;
                return fieldOverrides[v.columnInternalName](v);
              }
              return <DynamicField key={v.columnInternalName} {...v} disabled={v.disabled || isSaving} />;
            })}
            {
              !this.props.disabled &&
              <Stack className={styles.buttons} horizontal tokens={stackTokens}>
                <PrimaryButton disabled={isSaving} text={strings.Save} onClick={() => this.onSubmitClick()} />
                <DefaultButton disabled={isSaving} text={strings.Cancel} onClick={this.props.onCancelled} />
              </Stack>
            }


          </div>
        }
      </div>
    );
  }

  //trigger when the user submits the form.
  private onSubmitClick = async (): Promise<void> => {
    const {
      listId,
      listItemId,
      contentTypeId,
      onSubmitted,
      onBeforeSubmit,
      onSubmitError
    } = this.props;

    try {
      let shouldBeReturnBack = false;
      const fields = (this.state.fieldCollection || []).slice();
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

      // If we have the item ID, we simply need to update it
      if (listItemId) {
        try {
          const iur = await sp.web.lists.getById(listId).items.getById(listItemId).update(objects);
          if (onSubmitted) {
            onSubmitted(iur.data, this.props.returnListItemInstanceOnSubmit !== false ? iur.item : undefined);
          }
        }
        catch (error) {
          if (onSubmitError) {
            onSubmitError(objects, error);
          }
          console.log("Error", error);
        }

      }
      // Otherwise, depending on the content type ID of the item, if any, we need to behave accordingly
      else if (contentTypeId === undefined || contentTypeId === '' || !contentTypeId.startsWith('0x0120')) {
            // We are adding a new list item
            try {
              const iar = await sp.web.lists.getById(listId).items.add(objects);
              if (onSubmitted) {
                onSubmitted(iar.data, this.props.returnListItemInstanceOnSubmit !== false ? iar.item : undefined);
              }
            }
            catch (error) {
              if (onSubmitError) {
                onSubmitError(objects, error);
              }
              console.log("Error", error);
            }
        } else if (contentTypeId.startsWith('0x0120')) {
          // We are adding a folder or a Document Set
          try {
            const idField = 'ID';
            const titleField = 'Title';
            const contentTypeIdField = 'ContentTypeId';

            const library = await sp.web.lists.getById(listId);
            const folderTitle = (objects[titleField] !== undefined && objects[titleField] !== '') ?
              (objects[titleField] as string).replace(/["|*|:|<|>|?|/|\\||]/g, "_") : // Replace not allowed chars in folder name
              ''; // Empty string will be replaced by SPO with Folder Item ID
            const newFolder = await library.rootFolder.addSubFolderUsingPath(folderTitle);
            const fields = await newFolder.listItemAllFields();
            if (fields[idField]) {

              // Read the ID of the just created folder or Document Set
              const folderId = fields[idField];

              // Set the content type ID for the target item
              objects[contentTypeIdField] = contentTypeId;
              // Update the just created folder or Document Set
              const iur = await library.items.getById(folderId).update(objects);
              if (onSubmitted) {
                onSubmitted(iur.data, this.props.returnListItemInstanceOnSubmit !== false ? iur.item : undefined);
              }
            } else {
              throw new Error('Unable to read the ID of the just created folder or Document Set');
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
  private onChange = async (internalName: string, newValue: any, additionalData?: FieldChangeAdditionalData): Promise<void> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // try {
    const fieldCol = (this.state.fieldCollection || []).slice();
    const field = fieldCol.filter((element, i) => { return element.columnInternalName === internalName; })[0];
    field.newValue = newValue;
    field.additionalData = additionalData;
    if (field.fieldType === "User" && newValue.length !== 0) {

      if (newValue[0].id === undefined || parseInt(newValue[0].id, 10).toString() === "NaN") {
        let user: string = newValue[0].secondaryText;
        if (user.indexOf('@') === -1) {
          user = newValue[0].loginName;
        }
        const result = await sp.web.ensureUser(user);
        field.newValue = result.data.Id; // eslint-disable-line require-atomic-updates
      }
      else {
        field.newValue = newValue[0].id;
      }

    }
    else if (field.fieldType === "UserMulti" && newValue.length !== 0) {
      field.newValue = [];
      for (let index = 0; index < newValue.length; index++) {
        const element = newValue[index];
        if (element.id === undefined || parseInt(element.id, 10).toString() === "NaN") {
          let user: string = element.secondaryText;
          if (user.indexOf('@') === -1) {
            user = element.loginName;
          }
          const result = await sp.web.ensureUser(user);
          field.newValue.push(result.data.Id);
        }
        else {
          field.newValue.push(element.id);
        }
      }
    }
    this.setState({
      fieldCollection: fieldCol
    });
  }

  //getting all the fields information as part of get ready process
  private getFieldInformations = async (): Promise<void> => {
    const { listId, listItemId, disabledFields } = this.props;
    let contentTypeId = this.props.contentTypeId;
    try {
      const spList = await sp.web.lists.getById(listId);
      let item = null;
      if (listItemId !== undefined && listItemId !== null && listItemId !== 0)
        item = await spList.items.getById(listItemId).get();

      if (contentTypeId === undefined || contentTypeId === '') {
        const defaultContentType = await spList.contentTypes.select("Id", "Name").get();
        contentTypeId = defaultContentType[0].Id.StringValue;
      }
      const listFields = await this.getFormFields(listId, contentTypeId, this.webURL);
      const tempFields: IDynamicFieldProps[] = [];
      let order: number = 0;
      const responseValue = listFields.value;
      const hiddenFields = this.props.hiddenFields !== undefined ? this.props.hiddenFields : [];
      let defaultDayOfWeek: number = 0;
      for (let i = 0, len = responseValue.length; i < len; i++) {
        const field = responseValue[i];

        // Handle only fields that are not marked as hidden
        if (hiddenFields.indexOf(field.EntityPropertyName) < 0) {
          order++;
          const fieldType = field.TypeAsString;
          field.order = order;
          let hiddenName = "";
          let termSetId = "";
          let anchorId = "";
          let lookupListId = "";
          let lookupField = "";
          const choices: IDropdownOption[] = [];
          let defaultValue = null;
          const selectedTags: any = []; // eslint-disable-line @typescript-eslint/no-explicit-any
          let richText = false;
          let dateFormat: DateFormat | undefined;
          let principalType = "";
          if (item !== null) {
            defaultValue = item[field.EntityPropertyName];
          } else {
            defaultValue = field.DefaultValue;
          }
          if (fieldType === 'Choice' || fieldType === 'MultiChoice') {
            field.Choices.forEach(element => {
              choices.push({key: element, text: element});
            });
          } else if (fieldType === "Note") {
            richText = field.RichText;
          } else if (fieldType === "Lookup") {
            lookupListId = field.LookupList;
            lookupField = field.LookupField;
            if (item !== null) {
              defaultValue = await this._spService.getLookupValue(listId, listItemId, field.EntityPropertyName, lookupField, this.webURL);
            } else {
              defaultValue = [];
            }

          } else if (fieldType === "LookupMulti") {
            lookupListId = field.LookupList;
            lookupField = field.LookupField;
            if (item !== null) {
              defaultValue = await this._spService.getLookupValues(listId, listItemId, field.EntityPropertyName, lookupField, this.webURL);
            } else {
              defaultValue = [];
            }
          } else if (fieldType === "TaxonomyFieldTypeMulti") {
            const response = await this._spService.getTaxonomyFieldInternalName(this.props.listId, field.InternalName, this.webURL);
            hiddenName = response.value;
            termSetId = field.TermSetId;
            anchorId = field.AnchorId;
            if (item !== null) {
              item[field.InternalName].forEach(element => {
                selectedTags.push({key: element.TermGuid, name: element.Label});
              });

              defaultValue = selectedTags;
            } else {
              if (defaultValue !== "") {
                defaultValue.split(/#|;/).forEach(element => {
                  if (element.indexOf('|') !== -1)
                    selectedTags.push({key: element.split('|')[1], name: element.split('|')[0]});
                });

                defaultValue = selectedTags;
              }
            }
            if (defaultValue === "")
              defaultValue = null;
          } else if (fieldType === "TaxonomyFieldType") {

            termSetId = field.TermSetId;
            anchorId = field.AnchorId;
            if (item !== null) {
              const response = await this._spService.getSingleManagedMtadataLabel(listId, listItemId, field.InternalName);
              if (response) {
                selectedTags.push({key: response.TermID, name: response.Label});
                defaultValue = selectedTags;
              }
            } else {
              if (defaultValue !== "") {
                selectedTags.push({key: defaultValue.split('|')[1], name: defaultValue.split('|')[0].split('#')[1]});
                defaultValue = selectedTags;
              }
            }
            if (defaultValue === "")
              defaultValue = null;
          } else if (fieldType === "DateTime") {
            if (item !== null && item[field.InternalName])
              defaultValue = new Date(item[field.InternalName]);
            else if (defaultValue === '[today]') {
              defaultValue = new Date();
            }

            const schemaXml = field.SchemaXml;
            const dateFormatRegEx = /\s+Format="([^"]+)"/gmi.exec(schemaXml);
            dateFormat = dateFormatRegEx && dateFormatRegEx.length ? dateFormatRegEx[1] as DateFormat : 'DateOnly';
            defaultDayOfWeek = (await this._spService.getRegionalWebSettings()).FirstDayOfWeek;
          }
          else if (fieldType === "UserMulti") {
            if (item !== null)
              defaultValue = await this._spService.getUsersUPNFromFieldValue(listId, listItemId, field.InternalName, this.webURL);
            else {
              defaultValue = [];
            }
            principalType = field.SchemaXml.split('UserSelectionMode="')[1];
            principalType = principalType.substring(0, principalType.indexOf('"'));
          } else if (fieldType === "Thumbnail") {
            if (defaultValue !== null) {
              defaultValue = this.webURL.split('/sites/')[0] + JSON.parse(defaultValue).serverRelativeUrl;
            }
          } else if (fieldType === "User") {
            if (item !== null) {
              const userEmails: string[] = [];
              userEmails.push(await this._spService.getUserUPNFromFieldValue(listId, listItemId, field.InternalName, this.webURL) + '');
              defaultValue = userEmails;
            } else {
              defaultValue = [];
            }
            principalType = field.SchemaXml.split('UserSelectionMode="')[1];
            principalType = principalType.substring(0, principalType.indexOf('"'));
          } else if (fieldType === "Location") {
            defaultValue = JSON.parse(defaultValue);
          } else if (fieldType === "Boolean") {
            defaultValue = Boolean(Number(defaultValue));
          }

          tempFields.push({
            newValue: null,
            fieldTermSetId: termSetId,
            fieldAnchorId: anchorId,
            options: choices,
            lookupListID: lookupListId,
            lookupField: lookupField,
            changedValue: defaultValue,
            fieldType: field.TypeAsString,
            fieldTitle: field.Title,
            fieldDefaultValue: defaultValue,
            context: this.props.context,
            disabled: this.props.disabled || (disabledFields && disabledFields.indexOf(field.InternalName) > -1),
            listId: this.props.listId,
            columnInternalName: field.EntityPropertyName,
            label: field.Title,
            onChanged: this.onChange,
            required: field.Required,
            hiddenFieldName: hiddenName,
            Order: field.order,
            isRichText: richText,
            dateFormat: dateFormat,
            firstDayOfWeek: defaultDayOfWeek,
            listItemId: listItemId,
            principalType: principalType,
            description: field.Description
          });
          tempFields.sort((a, b) => a.Order - b.Order);
        }
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

  private getFormFields = async (listId: string, contentTypeId: string | undefined, webUrl?: string): Promise<any> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const {
        context
      } = this.props;
      const webAbsoluteUrl = !webUrl ? this.webURL : webUrl;
      let apiUrl = '';
      if (contentTypeId !== undefined && contentTypeId !== '') {
        if (contentTypeId.startsWith('0x0120')) {
          apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/contenttypes('${contentTypeId}')/fields?@listId=guid'${encodeURIComponent(listId)}'&$filter=ReadOnlyField eq false and (Hidden eq false or StaticName eq 'Title') and (FromBaseType eq false or StaticName eq 'Title')`;
        } else {
          apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/contenttypes('${contentTypeId}')/fields?@listId=guid'${encodeURIComponent(listId)}'&$filter=ReadOnlyField eq false and Hidden eq false and (FromBaseType eq false or StaticName eq 'Title')`;
        }
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
