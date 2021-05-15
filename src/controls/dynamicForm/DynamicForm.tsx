import * as React from 'react';
import styles from './DynamicForm.module.scss';
import { IDropdownOption, IDropdownProps, Dropdown } from 'office-ui-fabric-react/lib/components/Dropdown';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { IDynamicFormProps } from './IDynamicFormProps';
import { IDynamicFormState } from './IDynamicFormState';
import { IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
import SPservice from "../../services/SPService";
import { DynamicField } from './dynamicField';
import { IItemAddResult, IItemUpdateResult } from "@pnp/sp/items";
import { sp } from "@pnp/sp/presets/all";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

const stackTokens: IStackTokens = { childrenGap: 20 };
/**
 * DynamicForm Class Control
 */
export class DynamicForm extends React.Component<IDynamicFormProps, IDynamicFormState> {
    private _spservice: SPservice;
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
        this._spservice = new SPservice(this.props.context);
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
        return (
            <div className={'test'}>
                {this.state.fieldCollection.length === 0 ? <div><ProgressIndicator label="Loading..." description="Please wait..." /></div> :
                    <div>
                        {this.state.fieldCollection.map((v, i) => {
                            return <DynamicField {...v} onChanged={this.onchange} />;
                        })}
                        <Stack className={styles.buttons} horizontal tokens={stackTokens}>
                            <PrimaryButton text="Save" onClick={() => this.onSubmitClick()} />
                            <DefaultButton text="Cancel" onClick={this.props.onCancelled} />
                        </Stack>
                    </div>
                }
            </div>
        );
    }

   //trigger when the user submits the form.
    private onSubmitClick = () => {
        let shouldbereturnback = false;
        let fields = this.state.fieldCollection;
        fields.forEach((val, ind) => {
            if (val.required) {
                if (val.newValue === null) {
                    if (val.fieldDefaultValue === null || val.fieldDefaultValue === '' || val.fieldDefaultValue.length === 0) {
                        val.fieldDefaultValue = '';
                        shouldbereturnback = true;
                    }
                }
                else if (val.newValue === '') {
                    val.fieldDefaultValue = '';
                    shouldbereturnback = true;
                }
            }
        });
        if (shouldbereturnback) {
            this.setState({ fieldCollection: fields });
            return;
        }

        var objects = {};
        this.state.fieldCollection.forEach(async (val, ind) => {
            if (val.newValue !== null && val.newValue !== undefined) {
                let value = val.newValue;
                if (val.fieldType === "Lookup") {
                    objects[val.columnInternalName + "Id"] = value[0].key;
                }
                else if (val.fieldType === "LookupMulti") {
                    value = [];
                    val.newValue.forEach(element => {
                        value.push(element.key);
                    });
                    objects[val.columnInternalName + "Id"] = { results: value };
                }
                else if (val.fieldType === "TaxonomyFieldType") {
                    objects[val.columnInternalName] = {
                        "__metadata": { "type": "SP.Taxonomy.TaxonomyFieldValue" },
                        "Label": value[0].name,
                        'TermGuid': value[0].key,
                        'WssId': '-1'
                    };
                }
                else if (val.fieldType === "TaxonomyFieldTypeMulti") {
                    objects[val.hiddenFieldName] = val.newValue.map(term => `-1#;${term.name}|${term.key};`).join('#');
                }
                else if (val.fieldType === "User") {
                    objects[val.columnInternalName + "Id"] = val.newValue;
                }
                else if (val.fieldType === "Choice") {
                    objects[val.columnInternalName] = val.newValue.key;
                }
                else if (val.fieldType === "MultiChoice") {
                    objects[val.columnInternalName] = { results: val.newValue };
                }
                else if (val.fieldType === "UserMulti") {
                    objects[val.columnInternalName + "Id"] = { results: val.newValue };
                }
                else {
                    objects[val.columnInternalName] = val.newValue;
                }
            }
        });

        if (this.props.listItemId !== undefined && this.props.listItemId !== null && this.props.listItemId !== 0) {
            sp.web.lists.getById(this.props.listId).items.getById(this.props.listItemId).update(objects).then((iur: IItemUpdateResult) => {
                this.props.onSubmitted(iur.item);
            }).catch((error: any) => {
                console.log("Error", error);
            });

        }
        else {
            sp.web.lists.getById(this.props.listId).items.add(objects).then((iar: IItemAddResult) => {
                console.log(iar);
                this.props.onSubmitted(iar.item);
            }).catch((error: any) => {
                console.log("Error", error);
            });
        }
    }

      // trigger when the user change any value in the form
    private onchange = async (internalName: string, newValue: any) => {
        console.log(internalName, newValue);
        let fieldcol = this.state.fieldCollection;
        let field = fieldcol.filter((element, i) => { return element.columnInternalName === internalName; })[0];
        field.newValue = newValue;
        if (field.fieldType == "User" && newValue.length !== 0) {
            let result = await sp.web.ensureUser(newValue[0].secondaryText);
            field.newValue = result.data.Id;
        }
        else if (field.fieldType == "UserMulti" && newValue.length !== 0) {
            field.newValue = [];
            newValue.forEach(async element => {
                let result = await sp.web.ensureUser(element.secondaryText);
                field.newValue.push(result.data.Id);
            });
        }
    }

    //getting all the fields information as part of get ready process
    private getFieldInformations = async (): Promise<{ key: string; name: string }[]> => {
        const { context, listId, listItemId } = this.props;
        let contentTypeId = this.props.contentTypeId;
        let arrayItems: { key: string; name: string }[] = [];
        try {
            let splist = await sp.web.lists.getById(listId);
            let item = null;
            if (listItemId !== undefined && listItemId !== null && listItemId !== 0)
                item = await splist.items.getById(listItemId).get();

            if (contentTypeId === undefined || contentTypeId + '' === '') {
                let defaultcontenttype = await splist.contentTypes.select("Id", "Name").get();
                contentTypeId = defaultcontenttype[0]["Id"].StringValue + '';
            }
            let listFeilds = await this._spservice.getListInfo(listId, contentTypeId, context.pageContext.web.absoluteUrl);
            let tempFields: IDynamicFieldProps[] = [];
            let order: number = 0;
            listFeilds["value"].forEach(async (field) => {
                order++;
                field.order = order;
                let hiddenname = "";
                let TermSetId = "";
                let lookupListID = "";
                let lookupField = "";
                let choices: IDropdownOption[] = [];
                let defaultValue = null;
                let selectedtags: any = [];
                let richText = false;
                if (item !== null)
                    defaultValue = item[field.InternalName];
                else
                    defaultValue = field.DefaultValue;
                if (field["TypeAsString"] === 'Choice' || field["TypeAsString"] === 'MultiChoice') {
                    field["Choices"].forEach(element => {
                        choices.push({ key: element, text: element });
                    });
                }
                else if (field["TypeAsString"] === "Note") {
                    richText = field["RichText"];
                }
                else if (field["TypeAsString"] === "Lookup") {
                    lookupListID = field["LookupList"];
                    lookupField = field["LookupField"];
                    if (item !== null) {
                        defaultValue = await this._spservice.getLookUpValue(listId, listItemId, field.InternalName, context.pageContext.web.absoluteUrl);
                    }
                    else {
                        defaultValue = [];
                    }

                }
                else if (field["TypeAsString"] === "LookupMulti") {
                    lookupListID = field["LookupList"];
                    lookupField = field["LookupField"];
                    if (item !== null) {
                        defaultValue = await this._spservice.getLookUpValues(listId, listItemId, field.InternalName, context.pageContext.web.absoluteUrl);
                    }
                    else {
                        defaultValue = [];
                    }
                }
                else if (field["TypeAsString"] === "TaxonomyFieldTypeMulti") {
                    let response = await this._spservice.getInternalName(this.props.listId, field.InternalName, this.props.context.pageContext.web.absoluteUrl);
                    hiddenname = response["value"];
                    TermSetId = field["TermSetId"];
                    if (item !== null) {
                        item[field.InternalName].forEach(element => {
                            selectedtags.push({ key: element.TermGuid, name: element.Label });
                        });

                        defaultValue = selectedtags;
                    }
                    else {
                        if (defaultValue !== "") {
                            defaultValue.split(/#|;/).forEach(element => {
                                if (element.indexOf('|') !== -1)
                                    selectedtags.push({ key: element.split('|')[1], name: element.split('|')[0] });
                            });

                            defaultValue = selectedtags;
                        }
                    }
                    if (defaultValue === "")
                        defaultValue = null;
                }
                else if (field["TypeAsString"] === "TaxonomyFieldType") {

                    TermSetId = field["TermSetId"];
                    if (item !== null) {
                        let response = await this._spservice.getSingleManagedMtadataLabel(listId, listItemId, field.InternalName);
                        selectedtags.push({ key: response["TermID"], name: response["Label"] });
                        defaultValue = selectedtags;
                    }
                    else {
                        if (defaultValue !== "") {
                            selectedtags.push({ key: defaultValue.split('|')[1], name: defaultValue.split('|')[0].split('#')[1] });
                            defaultValue = selectedtags;
                        }
                    }
                    if (defaultValue === "")
                        defaultValue = null;
                }
                else if (field["TypeAsString"] === "DateTime") {
                    if (item !== null)
                        defaultValue = new Date(item[field.InternalName]);
                    else if (defaultValue === '[today]') {
                        defaultValue = new Date();
                    }

                }
                else if (field["TypeAsString"] === "UserMulti") {
                    if (item !== null)
                        defaultValue = await this._spservice.getUserEmailsById(listId, listItemId, field.InternalName, context.pageContext.web.absoluteUrl);
                    else {
                        defaultValue = [];
                    }
                }
                else if (field["TypeAsString"] === "Thumbnail") {
                    if (defaultValue !== null) {
                        defaultValue = context.pageContext.web.absoluteUrl.split('/sites/')[0] + JSON.parse(defaultValue).serverRelativeUrl;
                    }
                }
                else if (field["TypeAsString"] === "User") {
                    if (item !== null) {
                        let useremails: string[] = [];
                        useremails.push(await this._spservice.getUserEmailById(parseInt(item[field.InternalName + "Id"])) + '');
                        defaultValue = useremails;
                    }
                    else {
                        defaultValue = [];
                    }
                }
                tempFields.push({ newValue: null, fieldTermSetId: TermSetId, options: choices, lookupListID: lookupListID, lookupField: lookupField, changedvalue: defaultValue, fieldType: field.TypeAsString, fieldTitle: field.Title, fieldDefaultValue: defaultValue, context: this.props.context, disabled: this.props.disabled, listId: this.props.listId, columnInternalName: field.InternalName, label: field.Title, onChanged: this.onchange, required: field.Required, hiddenFieldName: hiddenname, Order: field.order, isRichText: richText });
                tempFields.sort((a, b) => a.Order - b.Order);
            });
            
            this.setState({ fieldCollection: tempFields });
            return arrayItems;
        } catch (error) {
            console.log(`Error get Items`, error);
            return null;
        }
    }
}
