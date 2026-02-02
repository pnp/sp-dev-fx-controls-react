var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { FieldTextRenderer } from '../../controls/fields/fieldTextRenderer/FieldTextRenderer';
import { FieldDateRenderer } from '../../controls/fields/fieldDateRenderer/FieldDateRenderer';
import { SPHelper } from './SPHelper';
import { FieldTitleRenderer } from '../../controls/fields/fieldTitleRenderer/FieldTitleRenderer';
import { GeneralHelper } from './GeneralHelper';
import { FieldLookupRenderer } from '../../controls/fields/fieldLookupRenderer/FieldLookupRenderer';
import { FieldUrlRenderer } from '../../controls/fields/fieldUrlRenderer/FieldUrlRenderer';
import { FieldTaxonomyRenderer } from '../../controls/fields/fieldTaxonomyRenderer/FieldTaxonomyRenderer';
import { FieldUserRenderer } from '../../controls/fields/fieldUserRenderer/FieldUserRenderer';
import { FieldFileTypeRenderer } from '../../controls/fields/fieldFileTypeRenderer/FieldFileTypeRenderer';
import { FieldAttachmentsRenderer } from '../../controls/fields/fieldAttachmentsRenderer/FieldAttachmentsRenderer';
import { FieldNameRenderer } from '../../controls/fields/fieldNameRenderer/FieldNameRenderer';
/**
 * Field Renderer Helper.
 * Helps to render fields similarly to OOTB SharePoint rendering
 */
var FieldRendererHelper = /** @class */ (function () {
    function FieldRendererHelper() {
    }
    /**
     * Returns JSX.Element with OOTB rendering and applied additional props
     * @param fieldValue Value of the field
     * @param props IFieldRendererProps (CSS classes and CSS styles)
     * @param listItem Current list item
     * @param context Customizer context
     */
    FieldRendererHelper.getFieldRenderer = function (fieldValue, props, listItem, context) {
        return new Promise(function (resolve) {
            var field = context.field;
            var listId = context.pageContext.list.id.toString();
            var fieldType = field.fieldType;
            var fieldName = field.internalName;
            var fieldValueAsEncodedText = fieldValue ? GeneralHelper.encodeText(fieldValue.toString()) : '';
            var fieldStoredName;
            var path;
            var friendlyDisplay;
            var lookupValues;
            var isImage = false;
            var text;
            var terms;
            switch (fieldType) {
                case 'Text':
                case 'Choice':
                case 'Boolean':
                case 'MultiChoice':
                case 'Computed':
                    fieldStoredName = SPHelper.getStoredFieldName(fieldName);
                    if (fieldStoredName === 'Title') {
                        resolve(React.createElement(FieldTitleRenderer, __assign({ text: fieldValueAsEncodedText, isLink: fieldName === 'LinkTitle' || fieldName === 'LinkTitleNoMenu', listId: listId, id: listItem.getValueByName('ID'), baseUrl: context.pageContext.web.absoluteUrl }, props)));
                    }
                    else if (fieldStoredName === 'DocIcon') {
                        path = listItem.getValueByName('FileLeafRef');
                        resolve(React.createElement(FieldFileTypeRenderer, __assign({ path: path, isFolder: SPHelper.getRowItemValueByName(listItem, 'FSObjType') === '1' }, props)));
                    }
                    else if (fieldStoredName === 'FileLeafRef') {
                        resolve(React.createElement(FieldNameRenderer, __assign({ text: fieldValueAsEncodedText, isLink: true, filePath: SPHelper.getRowItemValueByName(listItem, 'FileRef'), isNew: SPHelper.getRowItemValueByName(listItem, 'Created_x0020_Date.ifnew') === '1', hasPreview: true }, props)));
                    }
                    else if (fieldStoredName === 'URL') {
                        resolve(React.createElement(FieldUrlRenderer, __assign({ isImageUrl: false, url: fieldValue.toString(), text: SPHelper.getRowItemValueByName(listItem, "URL.desc") || fieldValueAsEncodedText }, props)));
                    }
                    else {
                        resolve(React.createElement(FieldTextRenderer, __assign({ text: fieldValueAsEncodedText, isSafeForInnerHTML: false, isTruncated: false }, props)));
                    }
                    break;
                case 'Integer':
                case 'Counter':
                case 'Number':
                case 'Currency':
                    resolve(React.createElement(FieldTextRenderer, __assign({ text: fieldValueAsEncodedText, isSafeForInnerHTML: true, isTruncated: false }, props)));
                    break;
                case 'Note':
                    SPHelper.getFieldProperty(field.id.toString(), "RichText", context, false).then(function (richText) {
                        var isRichText = richText === true || richText === 'TRUE';
                        var html = '';
                        if (isRichText) {
                            html = fieldValue.toString();
                        }
                        else {
                            html = fieldValueAsEncodedText.replace(/\n/g, "<br>");
                        }
                        // text is truncated if its length is more that 255 symbols or it has more than 4 lines
                        var isTruncated = html.length > 255 || html.split(/\r|\r\n|\n|<br>/).length > 4;
                        resolve(React.createElement(FieldTextRenderer, __assign({ text: html, isSafeForInnerHTML: true, isTruncated: isTruncated }, props)));
                    }).catch(function () { });
                    break;
                case 'DateTime':
                    friendlyDisplay = SPHelper.getRowItemValueByName(listItem, "".concat(fieldName, ".FriendlyDisplay"));
                    resolve(React.createElement(FieldDateRenderer, __assign({ text: friendlyDisplay ? GeneralHelper.getRelativeDateTimeString(friendlyDisplay) : fieldValueAsEncodedText }, props)));
                    break;
                case "Lookup":
                case "LookupMulti":
                    //
                    // we're providing fieldId and context. In that case Lookup values will be rendered right away
                    // without additional lag of waiting of response to get dispUrl.
                    // The request for DispUrl will be sent only if user click on the value
                    //
                    lookupValues = fieldValue;
                    resolve(React.createElement(FieldLookupRenderer, __assign({ lookups: lookupValues, fieldId: field.id.toString(), context: context }, props)));
                    break;
                case 'URL':
                    SPHelper.getFieldProperty(field.id.toString(), 'Format', context, true).then(function (format) {
                        isImage = format === 'Image';
                        text = SPHelper.getRowItemValueByName(listItem, "".concat(fieldName, ".desc"));
                        resolve(React.createElement(FieldUrlRenderer, __assign({ isImageUrl: isImage, url: fieldValue.toString(), text: text }, props)));
                    }).catch(function () { });
                    break;
                case 'Taxonomy':
                case 'TaxonomyFieldType':
                case 'TaxonomyFieldTypeMulti':
                    terms = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
                    resolve(React.createElement(FieldTaxonomyRenderer, __assign({ terms: terms }, props)));
                    break;
                case 'User':
                case 'UserMulti':
                    resolve(React.createElement(FieldUserRenderer, __assign({ users: fieldValue, context: context }, props)));
                    break;
                case 'Attachments':
                    resolve(React.createElement(FieldAttachmentsRenderer, __assign({ count: parseInt(fieldValue) }, props)));
                    break;
                default:
                    resolve(React.createElement(FieldTextRenderer, __assign({ text: fieldValueAsEncodedText, isSafeForInnerHTML: false, isTruncated: false }, props)));
                    break;
            }
        });
    };
    return FieldRendererHelper;
}());
export { FieldRendererHelper };
//# sourceMappingURL=FieldRendererHelper.js.map