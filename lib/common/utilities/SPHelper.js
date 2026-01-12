var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { GeneralHelper } from './GeneralHelper';
import * as Constants from '../Constants';
import { sp } from '@pnp/sp';
import '@pnp/sp/fields';
import { SPHttpClient } from '@microsoft/sp-http';
import '@pnp/sp/site-users/web';
import '@pnp/sp/webs';
import "@pnp/sp/lists";
/**
 * Helper class to work with SharePoint objects and entities
 */
var SPHelper = /** @class */ (function () {
    function SPHelper() {
    }
    /**
     * Gets field's Real Name from FieldNamesMapping
     * @param columnName current field name
     */
    SPHelper.getStoredFieldName = function (columnName) {
        if (!columnName)
            return '';
        return Constants.FieldNamesMapping[columnName] ? Constants.FieldNamesMapping[columnName].storedName : columnName;
    };
    /**
     * Gets Field's text
     * @param fieldValue field value as it appears in Field Customizer's onRenderCell event
     * @param listItem List Item accessor
     * @param context Customizer's context
     */
    SPHelper.getFieldText = function (fieldValue, listItem, context) {
        var _this = this;
        return new Promise(function (resolve) {
            var field = context.field;
            if (!field) {
                resolve('');
                return;
            }
            var fieldName = field.internalName; //this.getFieldNameById(field.id.toString());
            var fieldType = field.fieldType;
            var strFieldValue = fieldValue ? fieldValue.toString() : '';
            var friendlyDisplay;
            var titles;
            var users;
            var lookupValues;
            var lookupTexts;
            var isImage = false;
            var terms;
            var termTexts;
            var storedName;
            switch (fieldType) {
                case 'Note':
                    SPHelper.getFieldProperty(field.id.toString(), "RichText", context, false).then(function (richText) {
                        var isRichText = richText === 'TRUE';
                        if (isRichText) {
                            resolve(GeneralHelper.getTextFromHTML(strFieldValue));
                        }
                        resolve(fieldValue);
                    }).catch(function () { });
                    break;
                case 'DateTime':
                    friendlyDisplay = SPHelper.getRowItemValueByName(listItem, "".concat(fieldName, ".FriendlyDisplay"));
                    resolve(friendlyDisplay ? GeneralHelper.getRelativeDateTimeString(friendlyDisplay) : strFieldValue);
                    break;
                case 'User':
                case 'UserMulti':
                    titles = [];
                    users = fieldValue;
                    if (!users) {
                        resolve('');
                    }
                    for (var i = 0, len = users.length; i < len; i++) {
                        titles.push(users[i].title);
                    }
                    resolve(titles.join('\n'));
                    break;
                case "Lookup":
                case "LookupMulti":
                    lookupValues = fieldValue;
                    if (!lookupValues) {
                        resolve('');
                    }
                    lookupTexts = [];
                    for (var i = 0, len = lookupValues.length; i < len; i++) {
                        lookupTexts.push(lookupValues[i].lookupValue);
                    }
                    resolve(lookupTexts.join('\n'));
                    break;
                case 'URL':
                    SPHelper.getFieldProperty(field.id.toString(), 'Format', context, true).then(function (format) {
                        isImage = format === 'Image';
                        if (isImage) {
                            resolve('');
                        }
                        resolve(SPHelper.getRowItemValueByName(listItem, "".concat(fieldName, ".desc")));
                    }).catch(function () { });
                    break;
                case 'Taxonomy':
                case 'TaxonomyFieldType':
                case 'TaxonomyFieldTypeMulti':
                    terms = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
                    if (!terms) {
                        resolve('');
                    }
                    termTexts = [];
                    for (var i = 0, len = terms.length; i < len; i++) {
                        termTexts.push(terms[i].Label);
                    }
                    resolve(termTexts.join('\n'));
                    break;
                case 'Attachments':
                    resolve('');
                    break;
                case 'Computed':
                    storedName = _this.getStoredFieldName(fieldName);
                    if (storedName === 'URL') {
                        resolve(_this.getRowItemValueByName(listItem, 'URL.desc') || strFieldValue);
                    }
                    resolve(strFieldValue);
                    break;
                default:
                    resolve(strFieldValue);
            }
        });
    };
    /**
     * Gets property of the Field by Field's ID and Property Name
     * @param fieldId Field's ID
     * @param propertyName Property name
     * @param context SPFx context
     * @param fromSchemaXml true if the field should be read from Field Schema Xml
     */
    SPHelper.getFieldProperty = function (fieldId, propertyName, context, fromSchemaXml) {
        return new Promise(function (resolve) {
            var loadedViewFields = SPHelper._getLoadedViewFieldsFromStorage();
            var viewId = SPHelper.getPageViewId(context);
            if (!loadedViewFields) {
                loadedViewFields = {};
            }
            if (!loadedViewFields[viewId]) {
                loadedViewFields[viewId] = {};
            }
            var field = loadedViewFields[viewId][fieldId];
            if (!field) {
                field = {
                    Id: fieldId
                };
            }
            if (GeneralHelper.isDefined(field[propertyName])) {
                resolve(field[propertyName]);
                return;
            }
            sp.setup({
                spfxContext: context
            });
            if (fromSchemaXml) {
                SPHelper.getFieldSchemaXmlById(fieldId, context.pageContext.list.title, context).then(function (schemaXml) {
                    var fieldValue;
                    var xml = GeneralHelper.parseXml(schemaXml);
                    var fieldEls = xml.getElementsByTagName('Field');
                    if (fieldEls.length) {
                        var fieldEl = fieldEls[0];
                        fieldValue = fieldEl.getAttribute(propertyName);
                        if (!GeneralHelper.isDefined(fieldValue)) {
                            fieldValue = fieldEl.textContent;
                        }
                    }
                    if (!GeneralHelper.isDefined(fieldValue)) {
                        fieldValue = '';
                    }
                    field[propertyName] = fieldValue;
                    SPHelper._updateFieldInSessionStorage(field, context);
                }, function (error) {
                    resolve('');
                });
            }
            else {
                sp.web.lists.getByTitle(context.pageContext.list.title).fields.getById(fieldId).select(propertyName).get().then(function (f) {
                    field[propertyName] = f[propertyName];
                    loadedViewFields[viewId][field.Id] = field;
                    SPHelper._updateSessionStorageLoadedViewFields(loadedViewFields);
                    resolve(field[propertyName]);
                }, function (error) {
                    resolve('');
                });
            }
        });
    };
    /**
     * Asynchronously gets the Diplay Form Url for the Lookup field
     * @param fieldId Field Id
     * @param context SPFx Context
     */
    SPHelper.getLookupFieldListDispFormUrl = function (fieldId, context) {
        return new Promise(function (resolve, reject) {
            var loadedViewFields = SPHelper._getLoadedViewFieldsFromStorage();
            var viewId = SPHelper.getPageViewId(context);
            if (!loadedViewFields) {
                loadedViewFields = {};
            }
            if (!loadedViewFields[viewId]) {
                loadedViewFields[viewId] = {};
            }
            var field = loadedViewFields[viewId][fieldId];
            if (!field) {
                field = {
                    Id: fieldId
                };
            }
            if (GeneralHelper.isDefined(field.LookupDisplayUrl)) {
                resolve(field.LookupDisplayUrl);
                return;
            }
            sp.setup({
                spfxContext: context
            });
            sp.web.lists.getByTitle(context.pageContext.list.title).fields.getById(fieldId).select('LookupWebId', 'LookupList').get().then(function (f) {
                sp.site.openWebById(f.LookupWebId).then(function (openedWeb) {
                    openedWeb.web.select('Url').get().then(function (w) {
                        field.LookupDisplayUrl = "".concat(w.Url, "/_layouts/15/listform.aspx?PageType=4&ListId=").concat(f.LookupList);
                        SPHelper._updateFieldInSessionStorage(field, context);
                        resolve(field.LookupDisplayUrl);
                    }, function (error) {
                        reject(error);
                    });
                }).catch(function () { });
            }).catch(function () { });
        });
    };
    /**
     * Gets column's value for the row using List Item Accessor.
     * This method works with private property _values of List Item Accessor to get such values as FriendlyDisplay text for Date, and more.
     * @param listItem List Item Accessor
     * @param itemName column name
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    SPHelper.getRowItemValueByName = function (listItem, itemName) {
        var _values = listItem._values;
        if (_values) {
            return _values.get(itemName);
        }
        else {
            //
            // TODO: here we should call make a POST request to _api/web/GetList(@listUrl)/RenderListDataAsStream with correct parameters to get correct data
            // the parameters should contain view, folder, pagination data, etc.
            // I hope that Dev team will expose this data in API before I implement that because it's pretty complicated and they already have it in place
            //
            return null;
        }
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    /**
     * Gets SchemaXml for the field by List Title and Field Id
     * @param fieldId Field's Id
     * @param listTitle List Title
     * @param context Customizer's context
     */
    SPHelper.getFieldSchemaXmlById = function (fieldId, listTitle, context) {
        return new Promise(function (resolve) {
            var loadedViewFields = SPHelper._getLoadedViewFieldsFromStorage();
            var viewId = SPHelper.getPageViewId(context);
            if (!loadedViewFields) {
                loadedViewFields = {};
            }
            if (!loadedViewFields[viewId]) {
                loadedViewFields[viewId] = {};
            }
            var field = loadedViewFields[viewId][fieldId];
            if (!field) {
                field = {
                    Id: fieldId
                };
            }
            if (GeneralHelper.isDefined(field.SchemaXml)) {
                resolve(field.SchemaXml);
                return;
            }
            sp.setup({
                spfxContext: context
            });
            sp.web.lists.getByTitle(listTitle).fields.getById(fieldId).select('SchemaXml').get().then(function (f) {
                field.SchemaXml = f && f.SchemaXml;
                loadedViewFields[viewId][field.Id] = field;
                SPHelper._updateSessionStorageLoadedViewFields(loadedViewFields);
                resolve(f ? f.SchemaXml : '');
            }, function (error) {
                resolve('');
            });
        });
    };
    /**
     * Gets correct view id from the page
     * @param context SPFx Context
     */
    SPHelper.getPageViewId = function (context) {
        var urlParams = new URLSearchParams(location.search);
        var viewIdQueryParam = urlParams.get('viewid');
        if (viewIdQueryParam && viewIdQueryParam.indexOf('{') !== 0) {
            viewIdQueryParam = "{".concat(viewIdQueryParam, "}");
        }
        return viewIdQueryParam || context.pageContext.legacyPageContext.viewId;
    };
    /**
     * Returns the user corresponding to the specified member identifier for the current site
     * @param id user id
     * @param context SPFx context
     */
    SPHelper.getUserById = function (id, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                sp.setup({
                    spfxContext: context
                });
                return [2 /*return*/, sp.web.getUserById(id).get()];
            });
        });
    };
    /**
     * Returns user profile properties
     * @param loginName User's login name
     * @param context SPFx context
     */
    SPHelper.getUserProperties = function (loginName, context) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = context.pageContext.web.absoluteUrl;
                url = GeneralHelper.trimSlash(url);
                url += "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent(loginName) + "'";
                return [2 /*return*/, context.spHttpClient.get(url, SPHttpClient.configurations.v1)
                        .then(function (response) {
                        return response.json();
                    })
                        .then(function (value) {
                        return value;
                    })];
            });
        });
    };
    SPHelper.isTextFieldType = function (fieldType) {
        if (!fieldType) {
            return true;
        }
        var lowercasedFieldType = fieldType.toLowerCase();
        return lowercasedFieldType === 'text' || lowercasedFieldType === 'note';
    };
    SPHelper._updateFieldInSessionStorage = function (field, context) {
        var loadedViewFields = SPHelper._getLoadedViewFieldsFromStorage();
        if (!loadedViewFields) {
            loadedViewFields = {};
        }
        var viewId = SPHelper.getPageViewId(context);
        if (!loadedViewFields[viewId]) {
            loadedViewFields[viewId] = {};
        }
        loadedViewFields[viewId][field.Id] = field;
        SPHelper._updateSessionStorageLoadedViewFields(loadedViewFields);
    };
    SPHelper._updateSessionStorageLoadedViewFields = function (loadedViewFields) {
        try {
            if (window.sessionStorage) {
                window.sessionStorage.setItem(Constants.LoadedViewFieldsKey, JSON.stringify(loadedViewFields));
            }
        }
        catch (_a) {
            // do nothing, no need to stop fn execution
        }
    };
    SPHelper._getLoadedViewFieldsFromStorage = function () {
        try {
            if (window.sessionStorage) {
                var loadedViewFields = sessionStorage.getItem(Constants.LoadedViewFieldsKey);
                if (loadedViewFields) {
                    return JSON.parse(loadedViewFields);
                }
            }
            else {
                return null;
            }
        }
        catch (_a) {
            return null;
        }
    };
    return SPHelper;
}());
export { SPHelper };
//# sourceMappingURL=SPHelper.js.map