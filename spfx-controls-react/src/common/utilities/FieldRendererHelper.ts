import * as React from 'react';
import { ISPFieldLookupValue, ITerm, IPrincipal } from '../SPEntities';
import { FieldTextRenderer } from '../../controls/fields/fieldTextRenderer/FieldTextRenderer';
import { FieldDateRenderer } from '../../controls/fields/fieldDateRenderer/FieldDateRenderer';
import { ListItemAccessor } from '@microsoft/sp-listview-extensibility';
import { SPHelper } from './SPHelper';
import { FieldTitleRenderer } from '../../controls/fields/fieldTitleRenderer/FieldTitleRenderer';
import { SPField } from '@microsoft/sp-page-context';
import { IContext } from '../Interfaces';
import { GeneralHelper } from './GeneralHelper';
import { FieldLookupRenderer } from '../../controls/fields/fieldLookupRenderer/FieldLookupRenderer';
import { FieldUrlRenderer } from '../../controls/fields/fieldUrlRenderer/FieldUrlRenderer';
import { FieldTaxonomyRenderer } from '../../controls/fields/fieldTaxonomyRenderer/FieldTaxonomyRenderer';
import { IFieldRendererProps } from '../../controls/fields/fieldCommon/IFieldRendererProps';
import { FieldUserRenderer } from '../../controls/fields/fieldUserRenderer/FieldUserRenderer';
import { FieldFileTypeRenderer } from '../../controls/fields/fieldFileTypeRenderer/FieldFileTypeRenderer';
import { FieldAttachmentsRenderer } from '../../controls/fields/fieldAttachmentsRenderer/FieldAttachmentsRenderer';
import { FieldNameRenderer } from '../../controls/fields/fieldNameRenderer/FieldNameRenderer';

/**
 * Field Renderer Helper.
 * Helps to render fields similarly to OOTB SharePoint rendering
 */
export class FieldRendererHelper {
  /**
   * Returns JSX.Element with OOTB rendering and applied additional props
   * @param fieldValue Value of the field
   * @param props IFieldRendererProps (CSS classes and CSS styles)
   * @param listItem Current list item
   * @param context Customizer context
   */
  public static getFieldRenderer(fieldValue: any, props: IFieldRendererProps, listItem: ListItemAccessor, context: IContext): Promise<JSX.Element> { // eslint-disable-line @typescript-eslint/no-explicit-any
    return new Promise<JSX.Element>(resolve => {
      const field: SPField = context.field;
      const listId: string = context.pageContext.list.id.toString();
      const fieldType: string = field.fieldType;
      const fieldName: string = field.internalName;
      const fieldValueAsEncodedText: string = fieldValue ? GeneralHelper.encodeText(fieldValue.toString()) : '';
      let fieldStoredName: string | undefined;
      let path: string | undefined;
      let friendlyDisplay: string | undefined;
      let lookupValues: ISPFieldLookupValue[] | undefined;
      let isImage: boolean = false;
      let text: string | undefined;
      let terms: ITerm[] | undefined;

      switch (fieldType) {
        case 'Text':
        case 'Choice':
        case 'Boolean':
        case 'MultiChoice':
        case 'Computed':
          fieldStoredName = SPHelper.getStoredFieldName(fieldName);
          if (fieldStoredName === 'Title') {
            resolve(React.createElement(FieldTitleRenderer, {
              text: fieldValueAsEncodedText,
              isLink: fieldName === 'LinkTitle' || fieldName === 'LinkTitleNoMenu',
              listId: listId,
              id: listItem.getValueByName('ID'),
              baseUrl: context.pageContext.web.absoluteUrl,
              ...props
            }));
          }
          else if (fieldStoredName === 'DocIcon') {
            path = listItem.getValueByName('FileLeafRef');
            resolve(React.createElement(FieldFileTypeRenderer, {
              path: path,
              isFolder: SPHelper.getRowItemValueByName(listItem, 'FSObjType') === '1',
              ...props
            }));
          }
          else if (fieldStoredName === 'FileLeafRef') {
            resolve(React.createElement(FieldNameRenderer, {
              text: fieldValueAsEncodedText,
              isLink: true,
              filePath: SPHelper.getRowItemValueByName(listItem, 'FileRef'),
              isNew: SPHelper.getRowItemValueByName(listItem, 'Created_x0020_Date.ifnew') === '1',
              hasPreview: true,
              ...props
            }));
          }
          else if (fieldStoredName === 'URL') {
            resolve(React.createElement(FieldUrlRenderer, {
              isImageUrl: false,
              url: fieldValue.toString(),
              text: SPHelper.getRowItemValueByName(listItem, `URL.desc`) || fieldValueAsEncodedText,
              ...props
            }));
          }
          else {
            resolve(React.createElement(FieldTextRenderer, {
              text: fieldValueAsEncodedText,
              isSafeForInnerHTML: false,
              isTruncated: false,
              ...props
            }));
          }
          break;
        case 'Integer':
        case 'Counter':
        case 'Number':
        case 'Currency':
          resolve(React.createElement(FieldTextRenderer, {
            text: fieldValueAsEncodedText,
            isSafeForInnerHTML: true,
            isTruncated: false,
            ...props
          }));
          break;
        case 'Note':
          SPHelper.getFieldProperty(field.id.toString(), "RichText", context, false).then(richText => {
            const isRichText: boolean = richText === true || richText === 'TRUE';
            let html: string = '';

            if (isRichText) {
              html = fieldValue.toString();
            }
            else {
              html = fieldValueAsEncodedText.replace(/\n/g, "<br>");
            }
            // text is truncated if its length is more that 255 symbols or it has more than 4 lines
            const isTruncated: boolean = html.length > 255 || html.split(/\r|\r\n|\n|<br>/).length > 4;
            resolve(React.createElement(FieldTextRenderer, {
              text: html,
              isSafeForInnerHTML: true,
              isTruncated: isTruncated,
              ...props
            }));
          }).catch(() => { /* no-op */ });
          break;
        case 'DateTime':
          friendlyDisplay = SPHelper.getRowItemValueByName(listItem, `${fieldName}.FriendlyDisplay`);
          resolve(React.createElement(FieldDateRenderer, {
            text: friendlyDisplay ? GeneralHelper.getRelativeDateTimeString(friendlyDisplay) : fieldValueAsEncodedText,
            ...props
          }));
          break;
        case "Lookup":
        case "LookupMulti":
          //
          // we're providing fieldId and context. In that case Lookup values will be rendered right away
          // without additional lag of waiting of response to get dispUrl.
          // The request for DispUrl will be sent only if user click on the value
          //
          lookupValues = fieldValue as ISPFieldLookupValue[];
          resolve(React.createElement(FieldLookupRenderer, {
            lookups: lookupValues,
            fieldId: field.id.toString(),
            context: context,
            ...props
          }));
          break;
        case 'URL':
          SPHelper.getFieldProperty(field.id.toString(), 'Format', context, true).then(format => {
            isImage = format === 'Image';
            text = SPHelper.getRowItemValueByName(listItem, `${fieldName}.desc`);
            resolve(React.createElement(FieldUrlRenderer, {
              isImageUrl: isImage,
              url: fieldValue.toString(),
              text: text,
              ...props
            }));
          }).catch(() => { /* no-op; */ });
          break;
        case 'Taxonomy':
        case 'TaxonomyFieldType':
        case 'TaxonomyFieldTypeMulti':
          terms = Array.isArray(fieldValue) ? <ITerm[]>fieldValue : <ITerm[]>[fieldValue];
          resolve(React.createElement(FieldTaxonomyRenderer, {
            terms: terms,
            ...props
          }));
          break;
        case 'User':
        case 'UserMulti':
          resolve(React.createElement(FieldUserRenderer, {
            users: <IPrincipal[]>fieldValue,
            context: context,
            ...props
          }));
          break;
        case 'Attachments':
          resolve(React.createElement(FieldAttachmentsRenderer, {
            count: parseInt(fieldValue),
            ...props
          }));
          break;
        default:
          resolve(React.createElement(FieldTextRenderer, {
            text: fieldValueAsEncodedText,
            isSafeForInnerHTML: false,
            isTruncated: false,
            ...props
          }));
          break;
      }
    });
  }
}
