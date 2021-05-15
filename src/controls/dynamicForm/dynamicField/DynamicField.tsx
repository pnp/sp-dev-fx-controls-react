import * as React from 'react';
import styles from '../DynamicForm.module.scss';
import { IDropdownOption, IDropdownProps, Dropdown } from 'office-ui-fabric-react/lib/components/Dropdown';
import { DatePicker } from 'office-ui-fabric-react';
import { IDynamicFieldProps } from './IDynamicFieldProps';
import { IDynamicFieldState } from './IDynamicFieldState';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PeoplePicker, PrincipalType } from "../../peoplepicker";
import { FilePicker, IFilePickerResult } from '../../filePicker';
import { TaxonomyPicker, IPickerTerms } from "../../taxonomyPicker";
import { ListItemPicker } from '../../listItemPicker';
import { RichText } from "../../richText";
import { Icon } from 'office-ui-fabric-react';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Stack, Link } from 'office-ui-fabric-react/lib/';
import { sp } from "@pnp/sp/presets/all";

export class DynamicField extends React.Component<IDynamicFieldProps, IDynamicFieldState> {

    constructor(props: IDynamicFieldProps) {
        super(props);
        sp.setup({
            spfxContext: this.props.context
        });
        this.state = { changedvalue: null };
    }

    public componentDidUpdate() {
        if (this.props.fieldDefaultValue === "" && this.state.changedvalue === null) {
            this.setState({ changedvalue: "" });
        }
    }

    public render(): JSX.Element {
        const { options, fieldTermSetId, lookupListID, lookupField, fieldType, fieldDefaultValue, fieldTitle, context, className, disabled, label, placeHolder, placeholder, value, required, isRichText } = this.props;

        const dropdownOptions: IDropdownProps = {
            className: className,
            options: options,
            disabled: (disabled),
            placeHolder: placeholder || placeHolder
        };

        let labelText = fieldTitle != null ? fieldTitle : label;
        let defaultValue = fieldDefaultValue;
        let empty = null;

        return (
            <div className={styles.FieldEditor}>
                {(fieldType === 'loading') ? <Shimmer width="75%" style={{ margin: '25px' }} /> :
                    (fieldType === 'Text') ? <div><Icon className={styles.fieldIcon} iconName={"TextField"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><TextField defaultValue={defaultValue} placeholder={placeHolder} className={styles.feildDisplay} onChange={(e, newtext) => { this.props.onChanged(this.props.columnInternalName, newtext); this.setState({ changedvalue: newtext }); }} disabled={disabled} onBlur={() => { this.state.changedvalue === null && defaultValue === "" ? this.setState({ changedvalue: "" }) : empty = null; }} errorMessage={(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}></TextField></div> :
                        (fieldType === 'Note' && isRichText === false) ? <div><Icon className={styles.fieldIcon} iconName={"AlignLeft"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><TextField defaultValue={defaultValue} placeholder={placeHolder} className={styles.feildDisplay} multiline onChange={(e, newtext) => { this.props.onChanged(this.props.columnInternalName, newtext); this.setState({ changedvalue: newtext }); }} disabled={disabled} onBlur={() => { (this.state.changedvalue === null && defaultValue === "" ? this.setState({ changedvalue: "" }) : empty = null); }} errorMessage={(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}></TextField></div> :
                            (fieldType === 'Note' && isRichText === true) ? <div><Icon className={styles.fieldIcon} iconName={"AlignLeft"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><RichText placeholder={placeHolder} value={defaultValue} className={styles.feildDisplay} onChange={(newtext) => { this.props.onChanged(this.props.columnInternalName, newtext); return newtext; }} isEditMode={disabled}></RichText></div> :
                                // (fieldType === 'Location') ? <div><Icon className={styles.fieldIcon} iconName={"POI"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><TextField defaultValue={defaultValue} placeholder={placeHolder} className={styles.feildDisplay} onChange={(e, newtext) => { this.props.onChanged(this.props.columnInternalName, newtext); this.changedvalue = newtext; this.setState({}); }} disabled={disabled}></TextField> </div> : 
                                (fieldType === 'Choice') ? <div style={{ 'paddingBottom': '4px' }}><div style={{ 'paddingBottom': '7px' }}><Icon className={styles.fieldIcon} iconName={"MultiSelect"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label></div><Dropdown placeholder={placeHolder} className={styles.feildDisplay} {...dropdownOptions} defaultSelectedKey={defaultValue} onChange={(e, option) => { this.props.onChanged(this.props.columnInternalName, option); this.setState({ changedvalue: option }); }} disabled={disabled} onBlur={() => { (this.state.changedvalue === null && defaultValue === "" ? this.setState({ changedvalue: "" }) : empty = null); }} errorMessage={(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null} /></div> :
                                    (fieldType === 'MultiChoice') ? <div style={{ 'paddingBottom': '4px' }}><div style={{ 'paddingBottom': '7px' }}><Icon className={styles.fieldIcon} iconName={"MultiSelect"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label></div><Dropdown placeholder={placeHolder} className={styles.feildDisplay} {...dropdownOptions} defaultSelectedKeys={defaultValue} onChange={this.MultiChoice_selection} disabled={disabled} multiSelect onBlur={() => { (this.state.changedvalue === null && defaultValue === "" ? this.setState({ changedvalue: "" }) : empty = null); }} errorMessage={(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null} /></div> :
                                        (fieldType === 'Lookup') ? <div><Icon className={styles.fieldIcon} iconName={"Switch"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><ListItemPicker listId={lookupListID} defaultSelectedItems={defaultValue} columnInternalName={lookupField} className={styles.feildDisplay} keyColumnInternalName='Id' itemLimit={1} onSelectedItem={(newvalue) => { this.props.onChanged(this.props.columnInternalName, newvalue); this.setState({ changedvalue: newvalue }); }} context={this.props.context} /><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                            (fieldType === 'LookupMulti') ? <div><Icon className={styles.fieldIcon} iconName={"Switch"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><ListItemPicker listId={lookupListID} defaultSelectedItems={defaultValue} columnInternalName={lookupField} className={styles.feildDisplay} keyColumnInternalName='Id' itemLimit={100} onSelectedItem={(newvalue) => { this.props.onChanged(this.props.columnInternalName, newvalue); this.setState({ changedvalue: newvalue }); }} context={this.props.context} /><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                                (fieldType === 'Number') ? <div><Icon className={styles.fieldIcon} iconName={"NumberField"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><TextField defaultValue={defaultValue} placeholder={placeHolder} className={styles.feildDisplay} type={"Number"} onChange={(e, newtext) => { this.props.onChanged(this.props.columnInternalName, newtext); this.setState({ changedvalue: newtext }); }} disabled={disabled} onBlur={() => { (this.state.changedvalue === null && defaultValue === "" ? this.setState({ changedvalue: "" }) : empty = null); }} errorMessage={(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}></TextField></div> :
                                                    (fieldType === 'Currency') ? <div><Icon className={styles.fieldIcon} iconName={"AllCurrency"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><TextField defaultValue={defaultValue} placeholder={placeHolder} className={styles.feildDisplay} type={"Currency"} onChange={(e, newtext) => { this.props.onChanged(this.props.columnInternalName, newtext); this.setState({ changedvalue: newtext }); }} disabled={disabled} onBlur={() => { (this.state.changedvalue === null && defaultValue === "" ? this.setState({ changedvalue: "" }) : empty = null); }} errorMessage={(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}></TextField> </div> :
                                                        (fieldType === 'DateTime') ? <div style={{ 'paddingBottom': '4px' }}><Icon className={styles.fieldIcon} iconName={"Calendar"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><DatePicker placeholder={placeHolder} style={{ 'padding': '6px 0 7px' }} formatDate={(date) => { return date.toLocaleDateString(context.pageContext.web.languageName); }} value={(this.state.changedvalue !== null && this.state.changedvalue !== "") ? this.state.changedvalue : defaultValue} onSelectDate={(newdate) => { this.props.onChanged(this.props.columnInternalName, newdate); this.setState({ changedvalue: newdate }); }} disabled={disabled} /><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text> </div> :
                                                            (fieldType === 'Boolean') ? <div><Icon className={styles.fieldIcon} iconName={"CheckboxComposite"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><Toggle className={styles.feildDisplay} defaultChecked={defaultValue} onText="Yes" offText="No" onChange={(e, checkedvalue) => { this.props.onChanged(this.props.columnInternalName, checkedvalue); this.setState({ changedvalue: checkedvalue }); }} disabled={disabled} /><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                                                (fieldType === 'User') ? <div><Icon className={styles.fieldIcon} iconName={"Contact"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><PeoplePicker placeholder={placeHolder} defaultSelectedUsers={defaultValue} peoplePickerCntrlclassName={styles.feildDisplay} context={context} personSelectionLimit={1} showtooltip={true} showHiddenInUI={false} principalTypes={[PrincipalType.User]} resolveDelay={1000} onChange={(items) => { this.props.onChanged(this.props.columnInternalName, items); this.setState({ changedvalue: items }); }} disabled={disabled} /> <text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                                                    (fieldType === 'UserMulti') ? <div><Icon className={styles.fieldIcon} iconName={"Contact"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label> <PeoplePicker placeholder={placeHolder} defaultSelectedUsers={defaultValue} peoplePickerCntrlclassName={styles.feildDisplay} context={context} personSelectionLimit={30} showtooltip={true} showHiddenInUI={false} principalTypes={[PrincipalType.User]} resolveDelay={1000} onChange={(items) => { this.props.onChanged(this.props.columnInternalName, items); this.setState({ changedvalue: items }); }} disabled={disabled} /><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                                                        (fieldType === 'URL') ? <div><Icon className={styles.fieldIcon} iconName={"Link"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><Stack className={styles.filePicker} horizontal tokens={{ childrenGap: 20 }}>{defaultValue === null ? null : <Link href={defaultValue["Url"]}>{defaultValue["Description"]}</Link>}<FilePicker buttonClassName={styles.feildDisplay} bingAPIKey="<BING API KEY>" accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]} buttonIcon="FileImage" onSave={this.saveIntoSharePoint} onChange={this.saveIntoSharePoint} context={context} disabled={disabled} /></Stack><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                                                            (fieldType === 'Thumbnail') ? <div><Icon className={styles.fieldIcon} iconName={"photo2"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><Stack className={styles.filePicker} horizontal tokens={{ childrenGap: 20 }}><Image src={defaultValue} height={60} /><FilePicker buttonClassName={styles.feildDisplay} bingAPIKey="<BING API KEY>" accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]} buttonIcon="FileImage" onSave={this.saveIntoSharePoint} onChange={this.saveIntoSharePoint} context={context} disabled={disabled} /></Stack><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                                                                (fieldType === 'TaxonomyFieldTypeMulti') ? <div style={{ 'paddingBottom': '4px' }}><Icon className={styles.fieldIcon} iconName={"BulletedTreeList"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><div style={{ 'padding': '6px 0 7px' }}><TaxonomyPicker label="" initialValues={defaultValue} placeholder={placeHolder} allowMultipleSelections={true} termsetNameOrID={fieldTermSetId} panelTitle="Select Term" context={context} onChange={(newValue?: IPickerTerms) => { this.props.onChanged(this.props.columnInternalName, newValue); this.setState({ changedvalue: newValue }); }} isTermSetSelectable={false} /></div><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                                                                    (fieldType === 'TaxonomyFieldType') ? <div style={{ 'paddingBottom': '4px' }}><Icon className={styles.fieldIcon} iconName={"BulletedTreeList"}></Icon><label className={(required) ? styles.fieldRequired + ' ' + styles.fieldLabel : styles.fieldLabel}>{labelText}</label><div style={{ 'padding': '6px 0 7px' }}><TaxonomyPicker label="" initialValues={defaultValue} placeholder={placeHolder} allowMultipleSelections={false} termsetNameOrID={fieldTermSetId} panelTitle="Select Term" context={context} onChange={(newValue?: IPickerTerms) => { this.props.onChanged(this.props.columnInternalName, newValue); this.setState({ changedvalue: newValue }); }} isTermSetSelectable={false} /></div><text className={styles.errormessage}>{(this.state.changedvalue === '' && this.props.required) ? 'You can\'t leave this blank.' : null}</text></div> :
                                                                                        null  // <label className={styles.feildDisplay}>unsupported field type</label>
                }
            </div>
        );
    }

    private MultiChoice_selection = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        let seleteditemarr;
        if (this.state.changedvalue === null && this.props.fieldDefaultValue != null) {
            seleteditemarr = [];
            this.props.fieldDefaultValue.forEach(element => {
                seleteditemarr.push(element);
            });
        }
        else
            seleteditemarr = (this.state.changedvalue === "" || this.state.changedvalue === null) ? [] : this.state.changedvalue;
        if (item.selected) {
            seleteditemarr.push(item.key);
        }
        else {
            let i = seleteditemarr.indexOf(item.key);
            if (i >= 0) {
                seleteditemarr.splice(i, 1);
            }
        }
        this.setState({ changedvalue: seleteditemarr });
        this.props.onChanged(this.props.columnInternalName, seleteditemarr);
    }

    private saveIntoSharePoint = async (files: IFilePickerResult[]) => {
        files.forEach(async (file, i) => {
            if (file.fileAbsoluteUrl == null) {
                let resultcontent = await file.downloadFileContent();
                let fileresult = await sp.web.getFolderByServerRelativeUrl(this.props.context.pageContext.web.serverRelativeUrl + "/SiteAssets/Lists/" + this.props.listId).files.add(file.fileName, resultcontent, false);
                this.setState({
                    changedvalue: {
                        "__metadata": { "type": "SP.FieldUrlValue" },
                        "Description": file.fileName,
                        "Url": document.location.origin + fileresult.data.ServerRelativeUrl
                    }
                });
                this.props.onChanged(this.props.columnInternalName, this.state.changedvalue);
            }
            else {
                if (this.props.fieldType === "Thumbnail") {
                    this.setState({
                        changedvalue: JSON.stringify({
                            "fileName": file.fileName,
                            "serverUrl": file.fileAbsoluteUrl.replace(file.fileAbsoluteUrl.replace(/.*\/\/[^\/]*/, ''), ''),
                            "serverRelativeUrl": file.fileAbsoluteUrl.replace(/.*\/\/[^\/]*/, '')
                        })
                    });
                    this.props.onChanged(this.props.columnInternalName, this.state.changedvalue);
                    this.setState({});
                }
                else if (this.props.fieldType === "URL") {
                    {
                        this.setState({
                            changedvalue: {
                                "__metadata": { "type": "SP.FieldUrlValue" },
                                "Description": file.fileName,
                                "Url": file.fileAbsoluteUrl
                            }
                        });
                        this.props.onChanged(this.props.columnInternalName, this.state.changedvalue);
                    }
                }
            }
        });
    }
}
