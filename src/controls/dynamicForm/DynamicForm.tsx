/* eslint-disable @microsoft/spfx/no-async-await */
import * as React from "react";
import * as strings from "ControlStrings";
import styles from "./DynamicForm.module.scss";

// Controls
import {
  DefaultButton,
  PrimaryButton,
} from "@fluentui/react/lib/Button";
import {
  Dialog,
  DialogFooter,
  DialogType,
} from "@fluentui/react/lib/Dialog";
import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator";
import { IStackTokens, Stack } from "@fluentui/react/lib/Stack";
import { Icon } from "@fluentui/react/lib/components/Icon/Icon";
import { DynamicField } from "./dynamicField";
import {
  DateFormat,
  FieldChangeAdditionalData,
  IDynamicFieldProps,
} from "./dynamicField/IDynamicFieldProps";
import { FilePicker, IFilePickerResult } from "../filePicker";

// pnp/sp, helpers / utils
import { sp } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/content-types";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import { IInstalledLanguageInfo } from "@pnp/sp/presets/all";
import { cloneDeep, isEqual } from "lodash";
import { ICustomFormatting, ICustomFormattingBodySection, ICustomFormattingNode } from "../../common/utilities/ICustomFormatting";
import SPservice from "../../services/SPService";
import { IRenderListDataAsStreamClientFormResult } from "../../services/ISPService";
import { ISPField, IUploadImageResult } from "../../common/SPEntities";
import { FormulaEvaluation } from "../../common/utilities/FormulaEvaluation";
import { Context } from "../../common/utilities/FormulaEvaluation.types";
import CustomFormattingHelper from "../../common/utilities/CustomFormatting";

// Dynamic Form Props / State
import { IDynamicFormProps } from "./IDynamicFormProps";
import { IDynamicFormState } from "./IDynamicFormState";

const stackTokens: IStackTokens = { childrenGap: 20 };

/**
 * DynamicForm Class Control
 */
export class DynamicForm extends React.Component<
  IDynamicFormProps,
  IDynamicFormState
> {
  private _spService: SPservice;
  private _formulaEvaluation: FormulaEvaluation;
  private _customFormatter: CustomFormattingHelper;

  private webURL = this.props.webAbsoluteUrl
    ? this.props.webAbsoluteUrl
    : this.props.context.pageContext.web.absoluteUrl;

  constructor(props: IDynamicFormProps) {
    super(props);

    // Initialize pnp sp
    if (this.props.webAbsoluteUrl) {
      sp.setup({
        sp: {
          headers: {
            Accept: "application/json;odata=verbose",
          },
          baseUrl: this.props.webAbsoluteUrl,
        },
      });
    } else {
      sp.setup({
        spfxContext: { pageContext: this.props.context.pageContext },
      });
    }

    // Initialize state
    this.state = {
      infoErrorMessages: [],
      fieldCollection: [],
      validationFormulas: {},
      clientValidationFormulas: {},
      validationErrors: {},
      hiddenByFormula: [],
      isValidationErrorDialogOpen: false,
    };

    // Get SPService Factory
    this._spService = this.props.webAbsoluteUrl
      ? new SPservice(this.props.context, this.props.webAbsoluteUrl)
      : new SPservice(this.props.context);

    // Setup Formula Validation utils
    this._formulaEvaluation = new FormulaEvaluation(this.props.context, this.props.webAbsoluteUrl);

    // Setup Custom Formatting utils
    this._customFormatter = new CustomFormattingHelper(this._formulaEvaluation);
  }

  /**
   * Lifecycle hook when component is mounted
   */
  public componentDidMount(): void {
    this.getListInformation()
      .then(() => {
        /* no-op; */
      })
      .catch((err) => {
        /* no-op; */
        console.error(err);
      });
  }

  public componentDidUpdate(prevProps: IDynamicFormProps, prevState: IDynamicFormState): void {
    if (!isEqual(prevProps, this.props)) {
      // Props have changed due to parent component or workbench config, reset state
      this.setState({
        infoErrorMessages: [], // Reset info/error messages
        validationErrors: {} // Reset validation errors
      }, () => {
        // If listId or listItemId have changed, reload list information
        if (prevProps.listId !== this.props.listId || prevProps.listItemId !== this.props.listItemId) {
          this.getListInformation()
            .then(() => {
              /* no-op; */
            })
            .catch((err) => {
              /* no-op; */
              console.error(err);
            });
        } else {
          this.performValidation();
        }
      });
    }
  }

  /**
   * Default React component render method
   */
  public render(): JSX.Element {
    const { customFormatting, fieldCollection, hiddenByFormula, infoErrorMessages, isSaving } = this.state;

    const customFormattingDisabled = this.props.useCustomFormatting === false;

    // Custom Formatting - Header
    let headerContent: JSX.Element;
    if (!customFormattingDisabled && customFormatting?.header) {
      headerContent = this._customFormatter.renderCustomFormatContent(customFormatting.header, this.getFormValuesForValidation(), true) as JSX.Element;
    }

    // Custom Formatting - Body
    const bodySections: ICustomFormattingBodySection[] = [];
    if (!customFormattingDisabled && customFormatting?.body) {
      bodySections.push(...customFormatting.body.slice());
      if (bodySections.length > 0) {
        const specifiedFields: string[] = bodySections.reduce((prev, cur) => {
          prev.push(...cur.fields);
          return prev;
        }, []);
        const omittedFields = fieldCollection.filter(f => !specifiedFields.includes(f.label)).map(f => f.label);
        bodySections[bodySections.length - 1].fields.push(...omittedFields);
      }
    }

    // Custom Formatting - Footer
    let footerContent: JSX.Element;
    if (!customFormattingDisabled && customFormatting?.footer) {
      footerContent = this._customFormatter.renderCustomFormatContent(customFormatting.footer, this.getFormValuesForValidation(), true) as JSX.Element;
    }

    // Content Type
    let contentTypeId = this.props.contentTypeId;
    if (this.state.contentTypeId !== undefined) contentTypeId = this.state.contentTypeId;

    return (
      <div>
        {infoErrorMessages.map((ie, i) => (
          <MessageBar key={i} messageBarType={ie.type}>{ie.message}</MessageBar>
        ))}
        {fieldCollection.length === 0 ? (
          <div>
            <ProgressIndicator
              label={strings.DynamicFormLoading}
              description={strings.DynamicFormPleaseWait}
            />
          </div>
        ) : (
          <div>
            {headerContent}
            {this.props.enableFileSelection === true &&
              this.props.listItemId === undefined &&
              contentTypeId !== undefined &&
              contentTypeId.startsWith("0x0101") &&
              this.renderFileSelectionControl()}
            {(bodySections.length > 0 && !customFormattingDisabled) && bodySections
              .filter(bs => bs.fields.filter(bsf => hiddenByFormula.indexOf(bsf) < 0).length > 0)
              .map((section, i) => (
              <>
                <h2 className={styles.sectionTitle}>{section.displayname}</h2>
                <div className={styles.sectionFormFields}>
                  {section.fields.map((f, i) => (
                    <div key={f} className={styles.sectionFormField}>
                      {this.renderField(fieldCollection.find(fc => fc.label === f) as IDynamicFieldProps)}
                    </div>
                  ))}
                </div>
                {i < bodySections.length - 1 && <hr className={styles.sectionLine} aria-hidden={true} />}
              </>
            ))}
            {(bodySections.length === 0 || customFormattingDisabled) && fieldCollection.map((f, i) => this.renderField(f))}
            {footerContent}
            {!this.props.disabled && (
              <Stack className={styles.buttons} horizontal tokens={stackTokens}>
                <PrimaryButton
                  disabled={isSaving}
                  text={strings.Save}
                  onClick={() => this.onSubmitClick()}
                />
                <DefaultButton
                  disabled={isSaving}
                  text={strings.Cancel}
                  onClick={this.props.onCancelled}
                />
              </Stack>
            )}
          </div>
        )}
        <Dialog
          hidden={!this.state.isValidationErrorDialogOpen}
          onDismiss={this.closeValidationErrorDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: this.getValidationErrorTitle(),
            showCloseButton: true,
          }}
          modalProps={{
            className: styles.validationErrorDialog,
            isBlocking: true,
            containerClassName: "ms-dialogMainOverride",
          }}
        >
          {this.getValidationErrorMessage()}
          <DialogFooter className={styles.actions}>
            <div className={`ms-Dialog-actionsRight ${styles.actionsRight}`}>
              <DefaultButton
                className={styles.action}
                onClick={this.closeValidationErrorDialog}
                text={strings.CloseButton}
              />
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private renderField = (field: IDynamicFieldProps): JSX.Element => {
    const { fieldOverrides } = this.props;
    const { hiddenByFormula, isSaving, validationErrors } = this.state;

    // If the field is hidden by a formula, don't render it
    if (hiddenByFormula.find(h => h === field.columnInternalName)) {
      return null;
    }

    // If validation error, show error message
    let validationErrorMessage: string = "";
    if (validationErrors[field.columnInternalName]) {
      validationErrorMessage = validationErrors[field.columnInternalName];
    }

    // If field override is provided, use it instead of the DynamicField component
    if (
      fieldOverrides &&
      Object.prototype.hasOwnProperty.call(
        fieldOverrides,
        field.columnInternalName
      )
    ) {
      return fieldOverrides[field.columnInternalName]({ ...field,disabled: field.disabled || isSaving} )
    }

    // Default render
    return (
      <DynamicField
        key={field.columnInternalName}
        {...field}
        disabled={field.disabled || isSaving}
        validationErrorMessage={validationErrorMessage}
      />
    );
  }

  private updateFormMessages(type: MessageBarType, message: string): void {
    const { infoErrorMessages } = this.state;
    const newMessages = infoErrorMessages.slice();
    newMessages.push({ type, message });
    this.setState({ infoErrorMessages: newMessages });
  }

  /** Triggered when the user submits the form. */
  private onSubmitClick = async (): Promise<void> => {
    const {
      listId,
      listItemId,
      onSubmitted,
      onBeforeSubmit,
      onSubmitError,
      enableFileSelection,
      validationErrorDialogProps,
      returnListItemInstanceOnSubmit
    } = this.props;

    let contentTypeId = this.props.contentTypeId;
    if (this.state.contentTypeId !== undefined) contentTypeId = this.state.contentTypeId;

    const fileSelectRendered = !listItemId && contentTypeId.startsWith("0x0101") && enableFileSelection === true;

    try {

      /** Set to true to cancel form submission */
      let shouldBeReturnBack = false;

      const fields = (this.state.fieldCollection || []).slice();
      fields.forEach((field) => {

        // When a field is required and has no value
        if (field.required) {
          if (field.newValue === null) {
            if (
              field.defaultValue === null ||
              field.defaultValue === "" ||
              field.defaultValue.length === 0 ||
              field.defaultValue === undefined
            ) {
              if (field.fieldType === "DateTime") field.defaultValue = null;
              else field.defaultValue = "";
              shouldBeReturnBack = true;
            }
          } else if (field.newValue === "") {
            field.defaultValue = "";
            shouldBeReturnBack = true;
          } else if (Array.isArray(field.newValue) && field.newValue.length === 0) {
            field.defaultValue = null;
            shouldBeReturnBack = true;
          }
        }

        // Check min and max values for number fields
        if (field.fieldType === "Number" && field.newValue !== undefined && field.newValue.trim() !== "") {
          if ((field.newValue < field.minimumValue) || (field.newValue > field.maximumValue)) {
            shouldBeReturnBack = true;
          }
        }

      });

      // Perform validation
      const validationDisabled = this.props.useFieldValidation === false;
      let validationErrors: Record<string, string> = {};
      if (!validationDisabled) {
        validationErrors = await this.evaluateFormulas(this.state.validationFormulas, true, true, this.state.hiddenByFormula) as Record<string, string>;
        if (Object.keys(validationErrors).length > 0) {
          shouldBeReturnBack = true;
        }
      }

      // If validation failed, return without saving
      if (shouldBeReturnBack) {
        this.setState({
          fieldCollection: fields,
          isValidationErrorDialogOpen:
            validationErrorDialogProps
              ?.showDialogOnValidationError === true,
        });
        return;
      }

      if (fileSelectRendered === true && this.state.selectedFile === undefined && this.props.listItemId === undefined) {
        this.setState({
          missingSelectedFile: true,
          isValidationErrorDialogOpen:
            validationErrorDialogProps
              ?.showDialogOnValidationError === true,
          validationErrors
        });
        return;
      }

      this.setState({
        isSaving: true,
      });

      /** Item values for save / update */
      const objects = {};

      for (let i = 0, len = fields.length; i < len; i++) {
        const field = fields[i];
        const {
          fieldType,
          additionalData,
          columnInternalName,
          hiddenFieldName,
        } = field;
        if (field.newValue !== null && field.newValue !== undefined) {

          let value = field.newValue;
          if (["Lookup", "LookupMulti", "User", "UserMulti", "TaxonomyFieldTypeMulti"].indexOf(fieldType) < 0) {
            objects[columnInternalName] = value;
          }

          // Choice fields

          if (fieldType === "Choice") {
            objects[columnInternalName] = field.newValue.key;
          }
          if (fieldType === "MultiChoice") {
            objects[columnInternalName] = { results: field.newValue };
          }

          // Lookup fields

          if (fieldType === "Lookup") {
            if (value && value.length > 0) {
              objects[`${columnInternalName}Id`] = value[0].key;
            } else {
              objects[`${columnInternalName}Id`] = null;
            }
          }
          if (fieldType === "LookupMulti") {
            value = [];
            field.newValue.forEach((element) => {
              value.push(element.key);
            });
            objects[`${columnInternalName}Id`] = {
              results: value.length === 0 ? null : value,
            };
          }

          // User fields

          if (fieldType === "User") {
            objects[`${columnInternalName}Id`] = field.newValue.length === 0 ? null : field.newValue;
          }
          if (fieldType === "UserMulti") {
            objects[`${columnInternalName}Id`] = {
              results: field.newValue.length === 0 ? null : field.newValue,
            };
          }

          // Taxonomy / Managed Metadata fields

          if (fieldType === "TaxonomyFieldType") {
            objects[columnInternalName] = {
              __metadata: { type: "SP.Taxonomy.TaxonomyFieldValue" },
              Label: value[0]?.name ?? "",
              TermGuid: value[0]?.key ?? "11111111-1111-1111-1111-111111111111",
              WssId: "-1",
            };
          }
          if (fieldType === "TaxonomyFieldTypeMulti") {
            objects[hiddenFieldName] = field.newValue
              .map((term) => `-1#;${term.name}|${term.key};`)
              .join("#");
          }

          // Other fields

          if (fieldType === "Location") {
            objects[columnInternalName] = JSON.stringify(field.newValue);
          }
          if (fieldType === "Thumbnail") {
            if (additionalData) {
              const uploadedImage = await this.uploadImage(additionalData);
              objects[columnInternalName] = JSON.stringify({
                type: "thumbnail",
                fileName: uploadedImage.Name,
                serverRelativeUrl: uploadedImage.ServerRelativeUrl,
                id: uploadedImage.UniqueId,
              });
            } else {
              objects[columnInternalName] = null;
            }
          }
        }
      }

      if (onBeforeSubmit) {
        const isCancelled = await onBeforeSubmit(objects);

        if (isCancelled) {
          this.setState({
            isSaving: false,
          });
          return;
        }
      }

      let apiError: string;

      // If we have the item ID, we simply need to update it
      let newETag: string | undefined = undefined;
      if (listItemId) {
        try {
          const iur = await sp.web.lists
            .getById(listId)
            .items.getById(listItemId)
            .update(objects, this.state.etag);
          newETag = iur.data["odata.etag"];
          if (onSubmitted) {
            onSubmitted(
              iur.data,
              returnListItemInstanceOnSubmit !== false
                ? iur.item
                : undefined
            );
          }
        } catch (error) {
          apiError = error.message;
          if (onSubmitError) {
            onSubmitError(objects, error);
          }
          console.log("Error", error);
        }
      }

      // Otherwise, depending on the content type ID of the item, if any, we need to behave accordingly
      else if (
        contentTypeId === undefined ||
        contentTypeId === "" ||
        (!contentTypeId.startsWith("0x0120") &&
        contentTypeId.startsWith("0x01"))
      ) {
        if (fileSelectRendered === true) {
          await this.addFileToLibrary(objects);
        }
        else {
          // We are adding a new list item
          try {
            const contentTypeIdField = "ContentTypeId";
            // check if item contenttype is passed, then update the object with content type id, else, pass the object
            if (contentTypeId !== undefined && contentTypeId.startsWith("0x01")) objects[contentTypeIdField] = contentTypeId;
            const iar = await sp.web.lists.getById(listId).items.add(objects);
            if (onSubmitted) {
              onSubmitted(
                iar.data,
                this.props.returnListItemInstanceOnSubmit !== false
                  ? iar.item
                  : undefined
              );
            }
          } catch (error) {
            apiError = error.message;
            if (onSubmitError) {
              onSubmitError(objects, error);
            }
            console.log("Error", error);
          }
        }
      }
      else if (contentTypeId.startsWith("0x0120")) {
        // We are adding a folder or a Document Set
        try {
          const idField = "ID";
          const titleField = "Title";
          const contentTypeIdField = "ContentTypeId";

          const library = await sp.web.lists.getById(listId);
          const folderTitle =
            objects[titleField] !== undefined && objects[titleField] !== ""
              ? (objects[titleField] as string).replace(
                /["|*|:|<|>|?|/|\\||]/g,
                "_"
              ) // Replace not allowed chars in folder name
              : ""; // Empty string will be replaced by SPO with Folder Item ID
          const newFolder = await library.rootFolder.addSubFolderUsingPath(
            folderTitle
          );
          const fields = await newFolder.listItemAllFields();
          if (fields[idField]) {
            // Read the ID of the just created folder or Document Set
            const folderId = fields[idField];

            // Set the content type ID for the target item
            objects[contentTypeIdField] = contentTypeId;
            // Update the just created folder or Document Set
            const iur = await library.items.getById(folderId).update(objects);
            if (onSubmitted) {
              onSubmitted(
                iur.data,
                this.props.returnListItemInstanceOnSubmit !== false
                  ? iur.item
                  : undefined
              );
            }
          } else {
            throw new Error(
              "Unable to read the ID of the just created folder or Document Set"
            );
          }
        } catch (error) {
          apiError = error.message;
          if (onSubmitError) {
            onSubmitError(objects, error);
          }
          console.log("Error", error);
        }
      }

      this.setState({
        isSaving: false,
        etag: newETag,
        infoErrorMessages: apiError ? [{ type: MessageBarType.error, message: apiError }] : [],
      });
    } catch (error) {
      if (onSubmitError) {
        onSubmitError(null, error);
      }
      console.log(`Error onSubmit`, error);
    }
  };

  /**
   * Adds selected file to the library
   */
  private addFileToLibrary = async (objects: {}): Promise<void> => {
    const {
      selectedFile
    } = this.state;

    const {
      listId,
      contentTypeId,
      onSubmitted,
      onSubmitError,
      returnListItemInstanceOnSubmit
    } = this.props;


    if (selectedFile !== undefined) {
        try {
          const idField = "ID";
          const contentTypeIdField = "ContentTypeId";

          const library = await sp.web.lists.getById(listId);
          const itemTitle =
            selectedFile !== undefined && selectedFile.fileName !== undefined && selectedFile.fileName !== ""
              ? (selectedFile.fileName as string).replace(
                /["|*|:|<|>|?|/|\\||]/g,
                "_"
              ) // Replace not allowed chars in folder name
              : ""; // Empty string will be replaced by SPO with Folder Item ID

          const fileCreatedResult = await library.rootFolder.files.addChunked(encodeURI(itemTitle), await selectedFile.downloadFileContent());
          const fields = await fileCreatedResult.file.listItemAllFields();

          if (fields[idField]) {
            // Read the ID of the just created folder or Document Set
            const folderId = fields[idField];

            // Set the content type ID for the target item
            objects[contentTypeIdField] = contentTypeId;
            // Update the just created folder or Document Set
            const iur = await library.items.getById(folderId).update(objects);
            if (onSubmitted) {
              onSubmitted(
                iur.data,
                returnListItemInstanceOnSubmit !== false
                  ? iur.item
                  : undefined
              );
            }
          } else {
            throw new Error(
              "Unable to read the ID of the just created folder or Document Set"
            );
          }
        } catch (error) {
          if (onSubmitError) {
            onSubmitError(objects, error);
          }
          console.log("Error", error);
        }
      }
  }

  /**
   * Triggered when the user makes any field value change in the form
   */
  private onChange = async (
    internalName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newValue: any,
    validate: boolean,
    additionalData?: FieldChangeAdditionalData,
  ): Promise<void> => {

    const fieldCol = cloneDeep(this.state.fieldCollection || []);
    const field = fieldCol.filter((element, i) => {
      return element.columnInternalName === internalName;
    })[0];

    // Init new value(s)
    field.newValue = newValue;
    field.stringValue = newValue.toString();
    field.additionalData = additionalData;
    field.subPropertyValues = {};

    // Store string values for various field types

    if (field.fieldType === "Choice") {
      field.stringValue = newValue.text;
    }
    if (field.fieldType === "MultiChoice") {
      field.stringValue = newValue.join(';#');
    }
    if (field.fieldType === "Lookup" || field.fieldType === "LookupMulti") {
      field.stringValue = newValue.map(nv => nv.key + ';#' + nv.name).join(';#');
    }
    if (field.fieldType === "TaxonomyFieldType" || field.fieldType === "TaxonomyFieldTypeMulti") {
      field.stringValue = newValue.map(nv => nv.name).join(';');
    }

    // Capture additional property data for User fields

    if (field.fieldType === "User" && newValue.length !== 0) {
      if (
        newValue[0].id === undefined ||
        parseInt(newValue[0].id, 10).toString() === "NaN"
      ) {
        let user: string = newValue[0].secondaryText;
        if (user.indexOf("@") === -1) {
          user = newValue[0].loginName;
        }
        const result = await sp.web.ensureUser(user);
        field.newValue = result.data.Id; // eslint-disable-line require-atomic-updates
        field.stringValue = user;
        field.subPropertyValues = {
          id: result.data.Id,
          title: result.data.Title,
          email: result.data.Email,
        };
      } else {
        field.newValue = newValue[0].id;
      }
    }
    if (field.fieldType === "UserMulti" && newValue.length !== 0) {
      field.newValue = [];
      const emails: string[] = [];
      for (let index = 0; index < newValue.length; index++) {
        const element = newValue[index];
        if (
          element.id === undefined ||
          parseInt(element.id, 10).toString() === "NaN"
        ) {
          let user: string = element.secondaryText;
          if (user.indexOf("@") === -1) {
            user = element.loginName;
          }
          const result = await sp.web.ensureUser(user);
          field.newValue.push(result.data.Id);
          emails.push(user);
        } else {
          field.newValue.push(element.id);
        }
      }
      field.stringValue = emails.join(";");
    }

    const validationErrors = {...this.state.validationErrors};
    if (validationErrors[field.columnInternalName]) delete validationErrors[field.columnInternalName];

    this.setState({
      fieldCollection: fieldCol,
      validationErrors
    }, () => {
      if (validate) this.performValidation();
    });
  };

  /** Validation callback, used when form first loads (getListInformation) and following onChange */
  private performValidation = (skipFieldValueValidation?: boolean): void => {
    const { useClientSideValidation, useFieldValidation } = this.props;
    const { clientValidationFormulas, validationFormulas } = this.state;
    if (Object.keys(clientValidationFormulas).length || Object.keys(validationFormulas).length) {
      this.setState({
        isSaving: true, // Disable save btn and fields while validation in progress
      }, () => {
        const clientSideValidationDisabled = useClientSideValidation === false;
        const fieldValidationDisabled = useFieldValidation === false;
        const hiddenByFormula: string[] = !clientSideValidationDisabled ? this.evaluateColumnVisibilityFormulas() : [];
        let validationErrors = { ...this.state.validationErrors };
        if (!skipFieldValueValidation && !fieldValidationDisabled) validationErrors = this.evaluateFieldValueFormulas(hiddenByFormula);
        this.setState({ hiddenByFormula, isSaving: false, validationErrors });
      });
    }
  }

  /** Determines visibility of fields that have show/hide formulas set in Edit Form > Edit Columns > Edit Conditional Formula */
  private evaluateColumnVisibilityFormulas = (): string[] => {
    return this.evaluateFormulas(this.state.clientValidationFormulas, false) as string[];
  }

  /** Evaluates field validation formulas set in column settings and returns a Record of error messages */
  private evaluateFieldValueFormulas = (hiddenFields: string[]): Record<string, string> => {
    return this.evaluateFormulas(this.state.validationFormulas, true, true, hiddenFields) as Record<string, string>;
  }

  /**
   * Evaluates formulas and returns a Record of error messages or an array of column names that have failed validation
   * @param formulas A Record / dictionary-like object, where key is internal column name and value is an object with ValidationFormula and ValidationMessage properties
   * @param returnMessages Determines whether a Record of error messages is returned or an array of column names that have failed validation
   * @param requireValue Set to true if the formula should only be evaluated when the field has a value
   * @returns
   */
  private evaluateFormulas = (
    formulas: Record<string, Pick<ISPField, "ValidationFormula" | "ValidationMessage">>,
    returnMessages = true,
    requireValue: boolean = false,
    ignoreFields: string[] = []
  ): string[] | Record<string, string> => {
    const { fieldCollection } = this.state;
    const results: Record<string, string> = {};
    for (let i = 0; i < Object.keys(formulas).length; i++) {
      const fieldName = Object.keys(formulas)[i];
      if (formulas[fieldName]) {
        const field = fieldCollection.find(f => f.columnInternalName === fieldName);
        if (!field) continue;
        if (ignoreFields.indexOf(fieldName) > -1) continue; // Skip fields that are being ignored (e.g. hidden by formula)
        const formula = formulas[fieldName].ValidationFormula;
        const message = formulas[fieldName].ValidationMessage;
        if (!formula) continue;
        const context = this.getFormValuesForValidation();
        if (requireValue && !context[fieldName]) continue;
        const result = this._formulaEvaluation.evaluate(formula, context);
        if (Boolean(result) !== true) {
          results[fieldName] = message;
        }
      }
    }
    if (!returnMessages) { return Object.keys(results); }
    return results;
  }

  /**
   * Used for validation. Returns a Record of field values, where key is internal column name and value is the field value.
   * Expands certain properties and stores many of them as primitives (strings, numbers or bools) so the expression evaluator
   * can process them. For example: a User column named Person will have values stored as Person, Person.email, Person.title etc.
   * This is so the expression evaluator can process expressions like '=[$Person.title] == "Contoso Employee 1138"'
   * @param fieldCollection Optional. Could be used to compare field values in state with previous state.
   * @returns
   */
  private getFormValuesForValidation = (fieldCollection?: IDynamicFieldProps[]): Context => {
    const { fieldCollection: fieldColFromState } = this.state;
    if (!fieldCollection) fieldCollection = fieldColFromState;
    return fieldCollection.reduce((prev, cur) => {
      let value: boolean | number | object | string | undefined = cur.value;
      switch (cur.fieldType) {
        case "Lookup":
        case "Choice":
        case "TaxonomyFieldType":
        case "LookupMulti":
        case "MultiChoice":
        case "TaxonomyFieldTypeMulti":
        case "User":
        case "UserMulti":
          value = cur.stringValue;
          break;
        case "Currency":
        case "Number":
          if (cur.value !== undefined && cur.value !== null) value = Number(cur.value);
          if (cur.newValue !== undefined && cur.newValue !== null) value = Number(cur.newValue);
          break;
        case "URL":
          if (cur.value !== undefined && cur.value !== null) value = cur.value.Url;
          if (cur.newValue !== undefined && cur.newValue !== null) value = cur.newValue.Url;
          value = cur.newValue ? cur.newValue.Url : null;
          break;
        default:
          value = cur.newValue || cur.value;
          break;
      }
      prev[cur.columnInternalName] = value;
      if (cur.subPropertyValues) {
        Object.keys(cur.subPropertyValues).forEach((key) => {
          prev[`${cur.columnInternalName}.${key}`] = cur.subPropertyValues[key];
        });
      }
      return prev;
    }, {} as Context);
  }

  /**
   * Invoked when component first mounts, loads information about the SharePoint list, fields and list item
   */
  private getListInformation = async (): Promise<void> => {
    const {
      listId,
      listItemId,
      disabledFields,
      respectETag,
      onListItemLoaded,
    } = this.props;
    let contentTypeId = this.props.contentTypeId;

    try {

      // Fetch form rendering information from SharePoint
      const listInfo = await this._spService.getListFormRenderInfo(listId);

      // Fetch additional information about fields from SharePoint
      // (Number fields for min and max values, and fields with validation)
      const additionalInfo = await this._spService.getAdditionalListFormFieldInfo(listId);
      const numberFields = additionalInfo.filter((f) => f.TypeAsString === "Number" || f.TypeAsString === "Currency");

      // Build a dictionary of validation formulas and messages
      const validationFormulas: Record<string, Pick<ISPField, "ValidationFormula" | "ValidationMessage">> = additionalInfo.reduce((prev, cur) => {
        if (!prev[cur.InternalName] && cur.ValidationFormula) {
          prev[cur.InternalName] = {
            ValidationFormula: cur.ValidationFormula,
            ValidationMessage: cur.ValidationMessage,
          };
        }
        return prev;
      }, {});

      // If no content type ID is provided, use the default (first one in the list)
      if (contentTypeId === undefined || contentTypeId === "") {
        contentTypeId = Object.keys(listInfo.ContentTypeIdToNameMap)[0];
      }
      const contentTypeName: string = listInfo.ContentTypeIdToNameMap[contentTypeId];

      // Build a dictionary of client validation formulas and messages
      // These are formulas that are added in Edit Form > Edit Columns > Edit Conditional Formula
      // They are evaluated on the client side, and determine whether a field should be hidden or shown
      const clientValidationFormulas = listInfo.ClientForms.Edit[contentTypeName].reduce((prev, cur) => {
        if (cur.ClientValidationFormula) {
          prev[cur.InternalName] = {
            ValidationFormula: cur.ClientValidationFormula,
            ValidationMessage: cur.ClientValidationMessage,
          };
        }
        return prev;
      }, {} as Record<string, Pick<ISPField, "ValidationFormula" | "ValidationMessage">>);

      // Custom Formatting
      let headerJSON: ICustomFormattingNode, footerJSON: ICustomFormattingNode;
      let bodySections: ICustomFormattingBodySection[];
      if (listInfo.ClientFormCustomFormatter && listInfo.ClientFormCustomFormatter[contentTypeId]) {
        const customFormatInfo = JSON.parse(listInfo.ClientFormCustomFormatter[contentTypeId]) as ICustomFormatting;
        bodySections = customFormatInfo.bodyJSONFormatter.sections;
        headerJSON = customFormatInfo.headerJSONFormatter;
        footerJSON = customFormatInfo.footerJSONFormatter;
      }

      // Load SharePoint list item
      const spList = sp.web.lists.getById(listId);
      let item = null;
      let etag: string | undefined = undefined;
      if (listItemId !== undefined && listItemId !== null && listItemId !== 0) {
        item = await spList.items.getById(listItemId).get().catch(err => this.updateFormMessages(MessageBarType.error, err.message));

        if (onListItemLoaded) {
          await onListItemLoaded(item);
        }

        if (respectETag !== false) {
          etag = item["odata.etag"];
        }
      }

      // Build the field collection
      const tempFields: IDynamicFieldProps[] = await this.buildFieldCollection(
        listInfo,
        contentTypeName,
        item,
        numberFields,
        listId,
        listItemId,
        disabledFields
      );

      // Get installed languages for Currency fields
      let installedLanguages: IInstalledLanguageInfo[];
      if (tempFields.filter(f => f.fieldType === "Currency").length > 0) {
        installedLanguages = await sp.web.regionalSettings.getInstalledLanguages();
      }

      this.setState({
        contentTypeId,
        clientValidationFormulas,
        customFormatting: {
          header: headerJSON,
          body: bodySections,
          footer: footerJSON
        },
        etag,
        fieldCollection: tempFields,
        installedLanguages,
        validationFormulas
      }, () => this.performValidation(true));

    } catch (error) {
      this.updateFormMessages(MessageBarType.error, 'An error occurred while loading: ' + error.message);
      console.error(`An error occurred while loading DynamicForm`, error);
      return null;
    }
  }

  /**
   * Builds a collection of fields to be rendered in the form
   * @param listInfo Data returned by RenderListDataAsStream with RenderOptions = 64 (ClientFormSchema)
   * @param contentTypeName SharePoint List Content Type
   * @param item SharePoint List Item
   * @param numberFields Additional information about Number fields (min and max values)
   * @param listId SharePoint List ID
   * @param listItemId SharePoint List Item ID
   * @param disabledFields Fields that should be disabled due to configuration
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async buildFieldCollection(listInfo: IRenderListDataAsStreamClientFormResult, contentTypeName: string, item: any, numberFields: ISPField[], listId: string, listItemId: number, disabledFields: string[]): Promise<IDynamicFieldProps[]> {
    const tempFields: IDynamicFieldProps[] = [];
    let order: number = 0;
    const hiddenFields = this.props.hiddenFields !== undefined ? this.props.hiddenFields : [];
    let defaultDayOfWeek: number = 0;

    for (let i = 0, len = listInfo.ClientForms.Edit[contentTypeName].length; i < len; i++) {
      const field = listInfo.ClientForms.Edit[contentTypeName][i];

      // Process fields that are not marked as hidden
      if (hiddenFields.indexOf(field.InternalName) < 0) {
        order++;
        let hiddenName = "";
        let termSetId = "";
        let anchorId = "";
        let lookupListId = "";
        let lookupField = "";
        const choices: IDropdownOption[] = [];
        let defaultValue = null;
        let value = undefined;
        let stringValue = null;
        const subPropertyValues: Record<string, unknown> = {};
        let richText = false;
        let dateFormat: DateFormat | undefined;
        let principalType = "";
        let cultureName: string;
        let minValue: number | undefined;
        let maxValue: number | undefined;
        let showAsPercentage: boolean | undefined;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedTags: any = [];

        // If a SharePoint Item was loaded, get the field value from it
        if (item !== null && item[field.InternalName]) {
          value = item[field.InternalName];
          stringValue = value.toString();
        } else {
          defaultValue = field.DefaultValue;
        }

        // Store choices for Choice fields
        if (field.FieldType === "Choice") {
          field.Choices.forEach((element) => {
            choices.push({ key: element, text: element });
          });
        }
        if (field.FieldType === "MultiChoice") {
          field.MultiChoices.forEach((element) => {
            choices.push({ key: element, text: element });
          });
        }

        // Setup Note, Number and Currency fields
        if (field.FieldType === "Note") {
          richText = field.RichText;
        }
        if (field.FieldType === "Number" || field.FieldType === "Currency") {
          const numberField = numberFields.find(f => f.InternalName === field.InternalName);
          if (numberField) {
            minValue = numberField.MinimumValue;
            maxValue = numberField.MaximumValue;
          }
          showAsPercentage = field.ShowAsPercentage;
          if (field.FieldType === "Currency") {
            cultureName = this.cultureNameLookup(numberField.CurrencyLocaleId);
          }
        }

        // Setup Lookup fields
        if (field.FieldType === "Lookup" || field.FieldType === "LookupMulti") {
          lookupListId = field.LookupListId;
          lookupField = field.LookupFieldName;
          if (item !== null) {
            value = await this._spService.getLookupValues(
              listId,
              listItemId,
              field.InternalName,
              lookupField,
              this.webURL
            );
            stringValue = value?.map(dv => dv.key + ';#' + dv.name).join(';#');
            if (item[field.InternalName + "Id"]) {
              subPropertyValues.id = item[field.InternalName + "Id"];
              subPropertyValues.lookupId = subPropertyValues.id;
            }
            subPropertyValues.lookupValue = value?.map(dv => dv.name);
          } else {
            value = [];
          }
        }

        // Setup User fields
        if (field.FieldType === "User") {
          if (item !== null) {
            const userEmails: string[] = [];
            userEmails.push(
              (await this._spService.getUserUPNFromFieldValue(
                listId,
                listItemId,
                field.InternalName,
                this.webURL
              )) + ""
            );
            value = userEmails;
            stringValue = userEmails?.map(dv => dv.split('/').shift()).join(';');
            if (item[field.InternalName + "Id"]) {
              subPropertyValues.id = item[field.InternalName + "Id"];
            }
            subPropertyValues.title = userEmails?.map(dv => dv.split('/').pop())[0];
            subPropertyValues.email = userEmails[0];
          } else {
            value = [];
          }
          principalType = field.PrincipalAccountType;
        }
        if (field.FieldType === "UserMulti") {
          if (item !== null) {
            value = await this._spService.getUsersUPNFromFieldValue(
              listId,
              listItemId,
              field.InternalName,
              this.webURL
            );
            stringValue = value?.map(dv => dv.split('/').pop()).join(';');
          } else {
            value = [];
          }
          principalType = field.PrincipalAccountType;
        }

        // Setup Taxonomy / Metadata fields
        if (field.FieldType === "TaxonomyFieldType") {
          termSetId = field.TermSetId;
          anchorId = field.AnchorId;
          if (item !== null) {
            const response = await this._spService.getSingleManagedMetadataLabel(
              listId,
              listItemId,
              field.InternalName
            );
            if (response) {
              selectedTags.push({
                key: response.TermID,
                name: response.Label,
              });
              value = selectedTags;
              stringValue = selectedTags?.map(dv => dv.key + ';#' + dv.name).join(';#');
            }
          } else {
            if (defaultValue !== "") {
              selectedTags.push({
                key: defaultValue.split("|")[1],
                name: defaultValue.split("|")[0].split("#")[1],
              });
              value = selectedTags;
            }
          }
          if (defaultValue === "") defaultValue = null;
        }
        if (field.FieldType === "TaxonomyFieldTypeMulti") {
          hiddenName = field.HiddenListInternalName;
          termSetId = field.TermSetId;
          anchorId = field.AnchorId;
          if (item && item[field.InternalName]) {
            item[field.InternalName].forEach((element) => {
              selectedTags.push({
                key: element.TermGuid,
                name: element.Label,
              });
            });

            value = selectedTags;
          } else {
            if (defaultValue && defaultValue !== "") {
              defaultValue.split(/#|;/).forEach((element) => {
                if (element.indexOf("|") !== -1)
                  selectedTags.push({
                    key: element.split("|")[1],
                    name: element.split("|")[0],
                  });
              });

              value = selectedTags;
              stringValue = selectedTags?.map(dv => dv.key + ';#' + dv.name).join(';#');
            }
          }
          if (defaultValue === "") defaultValue = null;
        }

        // Setup DateTime fields
        if (field.FieldType === "DateTime") {
          if (item !== null && item[field.InternalName]) {
            value = new Date(item[field.InternalName]);
            stringValue = value.toISOString();
          } else if (defaultValue === "[today]") {
            defaultValue = new Date();
          } else if (defaultValue) {
            defaultValue = new Date(defaultValue);
          }

          dateFormat = field.DateFormat || "DateOnly";
          defaultDayOfWeek = (await this._spService.getRegionalWebSettings()).FirstDayOfWeek;
        }

        // Setup Thumbnail, Location and Boolean fields
        if (field.FieldType === "Thumbnail") {
          if (defaultValue) {
            defaultValue = JSON.parse(defaultValue).serverRelativeUrl;
          }
          if (value) {
            value = JSON.parse(value).serverRelativeUrl;
          }
        }
        if (field.FieldType === "Location") {
          if (defaultValue) defaultValue = JSON.parse(defaultValue);
          if (value) value = JSON.parse(value);
        }
        if (field.FieldType === "Boolean") {
          if (defaultValue !== undefined && defaultValue !== null) defaultValue = Boolean(Number(defaultValue));
          if (value !== undefined && value !== null) value = Boolean(Number(value));
        }

        tempFields.push({
          value,
          newValue: undefined,
          stringValue,
          subPropertyValues,
          cultureName,
          fieldTermSetId: termSetId,
          fieldAnchorId: anchorId,
          options: choices,
          lookupListID: lookupListId,
          lookupField: lookupField,
          // changedValue: defaultValue,
          fieldType: field.FieldType,
          // fieldTitle: field.Title,
          defaultValue: defaultValue,
          context: this.props.context,
          disabled: this.props.disabled ||
            (disabledFields &&
              disabledFields.indexOf(field.InternalName) > -1),
          // listId: this.props.listId,
          columnInternalName: field.InternalName,
          label: field.Title,
          onChanged: this.onChange,
          required: field.Required,
          hiddenFieldName: hiddenName,
          Order: order,
          isRichText: richText,
          dateFormat: dateFormat,
          firstDayOfWeek: defaultDayOfWeek,
          listItemId: listItemId,
          principalType: principalType,
          description: field.Description,
          minimumValue: minValue,
          maximumValue: maxValue,
          showAsPercentage: showAsPercentage,
        });

        // This may not be necessary now using RenderListDataAsStream
        tempFields.sort((a, b) => a.Order - b.Order);
      }
    }
    return tempFields;
  }

  private cultureNameLookup(lcid: number): string {
    const pageCulture = this.props.context.pageContext.cultureInfo.currentCultureName;
    if (!lcid) return pageCulture;
    return this.state.installedLanguages?.find(lang => lang.Lcid === lcid).DisplayName ?? pageCulture;
  }

  private uploadImage = async (
    file: IFilePickerResult
  ): Promise<IUploadImageResult> => {
    const { listId, listItemId } = this.props;
    if (file.fileAbsoluteUrl) {
      return {
        Name: file.fileName,
        ServerRelativeUrl: file.fileAbsoluteUrl,
        UniqueId: "",
      };
    } else {
      const fileInstance = await file.downloadFileContent();
      const buffer = await this.getImageArrayBuffer(fileInstance);
      return await this._spService.uploadImage(
        listId,
        listItemId,
        file.fileName,
        buffer,
        undefined
      );
    }
  };

  private getImageArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise<ArrayBuffer>((resolve) => {
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
    });
  };

  private closeValidationErrorDialog = (): void => {
    this.setState({
      isValidationErrorDialogOpen: false,
    });
  };

  private getValidationErrorTitle = (): string => {
    let errorTitle = strings.DynamicFormDialogValidationErrorTitle;
    const validationDialogProps = this.props.validationErrorDialogProps;

    if (validationDialogProps?.customTitle) {
      errorTitle = validationDialogProps.customTitle;
    }

    return errorTitle;
  };

  private getValidationErrorMessage = (): string => {
    let errorMessage = strings.DynamicFormDialogValidationErrorMessage;
    const validationDialogProps = this.props.validationErrorDialogProps;

    if (validationDialogProps?.customMessage) {
      errorMessage = validationDialogProps.customMessage;
    }

    return errorMessage;
  };

  private renderFileSelectionControl = (): React.ReactElement => {
    const {
      selectedFile,
      missingSelectedFile
    } = this.state;

    const labelEl = <label className={styles.fieldRequired + ' ' + styles.fieldLabel}>{strings.DynamicFormChooseFileLabel}</label>;

    return <div>
      <div className={styles.titleContainer}>
        <Icon className={styles.fieldIcon} iconName={"DocumentSearch"} />
        {labelEl}
      </div>
      <FilePicker
        buttonLabel={strings.DynamicFormChooseFileButtonText}
        accepts={this.props.supportedFileExtensions ? this.props.supportedFileExtensions : [".docx", ".doc", ".pptx", ".ppt", ".xlsx", ".xls", ".pdf"]}
        onSave={(filePickerResult: IFilePickerResult[]) => {
          if (filePickerResult.length === 1) {
            this.setState({
              selectedFile: filePickerResult[0],
              missingSelectedFile: false
            });
          }
          else {
            this.setState({
              missingSelectedFile: true
            });
          }
        }}
        required={true}
        context={this.props.context}
        hideWebSearchTab={true}
        hideStockImages={true}
        hideLocalMultipleUploadTab={true}
        hideLinkUploadTab={true}
        hideSiteFilesTab={true}
        checkIfFileExists={true}
      />
      {selectedFile && <div className={styles.selectedFileContainer}>
        <Icon iconName={this.getFileIconFromExtension()} />
        {selectedFile.fileName}
      </div>}
      {missingSelectedFile === true &&
        <div className={styles.errormessage}>{strings.DynamicFormRequiredFileMessage}</div>}
    </div>;
  }

  private getFileIconFromExtension = (): string => {
    const fileExtension = this.state.selectedFile.fileName.split('.').pop();
    switch (fileExtension) {
      case 'pdf':
        return 'PDF';
      case 'docx':
      case 'doc':
        return 'WordDocument';
      case 'pptx':
      case 'ppt':
        return 'PowerPointDocument';
      case 'xlsx':
      case 'xls':
        return 'ExcelDocument';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'FileImage';
      default:
        return 'Document';
    }
  }

}
