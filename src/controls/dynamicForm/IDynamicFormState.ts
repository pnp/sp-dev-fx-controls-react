import { IInstalledLanguageInfo } from '@pnp/sp/regional-settings';
import { ISPField } from '../../common/SPEntities';
import { MessageBarType } from '@fluentui/react/lib/MessageBar';
import { ICustomFormattingBodySection, ICustomFormattingNode } from '../../common/utilities/ICustomFormatting';
import { IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
import { IFilePickerResult } from "../filePicker";

export interface IDynamicFormState {
  infoErrorMessages: {
    type: MessageBarType;
    message: string;
  }[];
  /** Form and List Item data */
  fieldCollection: IDynamicFieldProps[];
  installedLanguages?: IInstalledLanguageInfo[];
  /** Validation Formulas set in List Column settings */
  validationFormulas: Record<string, Pick<ISPField, 'ValidationFormula' | 'ValidationMessage'>>;
  /** Field Show / Hide Validation Formulas, set in Edit Form > Edit Columns > Edit Conditional Formula */
  clientValidationFormulas: Record<string, Pick<ISPField, 'ValidationFormula' | 'ValidationMessage'>>;
  /** Tracks fields hidden by ClientValidationFormula */
  hiddenByFormula: string[];
  /** Populated by evaluation of List Column Setting validation. Key is internal field name, value is the configured error message. */
  validationErrors: Record<string, string>;
  customFormatting?: {
    header: ICustomFormattingNode;
    body: ICustomFormattingBodySection[];
    footer: ICustomFormattingNode;
  }
  headerContent?: JSX.Element;
  footerContent?: JSX.Element;
  isSaving?: boolean;
  etag?: string;
  isValidationErrorDialogOpen: boolean;
  selectedFile?: IFilePickerResult;
  missingSelectedFile?: boolean;
  contentTypeId?: string;
}
