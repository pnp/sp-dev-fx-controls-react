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
import { Guid } from '@microsoft/sp-core-library';
import { LambdaParser } from '@pnp/odata/parsers';
import { SharePointQueryableCollection, sp } from '@pnp/sp';
import '@pnp/sp/taxonomy';
var SPTaxonomyService = /** @class */ (function () {
    function SPTaxonomyService(context) {
        this.context = context;
    }
    SPTaxonomyService.prototype.getTerms = function (termSetId, parentTermId, skiptoken, hideDeprecatedTerms, pageSize) {
        if (pageSize === void 0) { pageSize = 50; }
        return __awaiter(this, void 0, void 0, function () {
            var parser, legacyChildrenUrlAndQuery, legacyChildrenQueryable, termsResult, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        parser = new LambdaParser(function (r) { return __awaiter(_this, void 0, void 0, function () {
                            var json, newSkiptoken, urlParams;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, r.json()];
                                    case 1:
                                        json = _a.sent();
                                        newSkiptoken = '';
                                        if (json['@odata.nextLink']) {
                                            urlParams = new URLSearchParams(json['@odata.nextLink'].split('?')[1]);
                                            if (urlParams.has('$skiptoken')) {
                                                newSkiptoken = urlParams.get('$skiptoken');
                                            }
                                        }
                                        return [2 /*return*/, { value: json.value, skiptoken: newSkiptoken }];
                                }
                            });
                        }); });
                        legacyChildrenUrlAndQuery = '';
                        if (parentTermId && parentTermId !== Guid.empty) {
                            legacyChildrenUrlAndQuery = sp.termStore.sets.getById(termSetId.toString()).terms.getById(parentTermId.toString()).concat('/getLegacyChildren').toUrl();
                        }
                        else {
                            legacyChildrenUrlAndQuery = sp.termStore.sets.getById(termSetId.toString()).concat('/getLegacyChildren').toUrl();
                        }
                        legacyChildrenQueryable = SharePointQueryableCollection(legacyChildrenUrlAndQuery).top(pageSize).usingParser(parser);
                        if (hideDeprecatedTerms) {
                            legacyChildrenQueryable = legacyChildrenQueryable.filter('isDeprecated eq false');
                        }
                        if (skiptoken && skiptoken !== '') {
                            legacyChildrenQueryable.query.set('$skiptoken', skiptoken);
                        }
                        return [4 /*yield*/, legacyChildrenQueryable()];
                    case 1:
                        termsResult = _b.sent();
                        return [2 /*return*/, termsResult];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { value: [], skiptoken: '' }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SPTaxonomyService.prototype.getTermById = function (termSetId, termId) {
        return __awaiter(this, void 0, void 0, function () {
            var termInfo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (termId === Guid.empty) {
                            return [2 /*return*/, undefined];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.termStore.sets.getById(termSetId.toString()).terms.getById(termId.toString()).expand("parent")()];
                    case 2:
                        termInfo = _b.sent();
                        return [2 /*return*/, termInfo];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SPTaxonomyService.prototype.searchTerm = function (termSetId, label, languageTag, parentTermId, allowSelectingChildren, stringMatchOption, pageSize) {
        if (allowSelectingChildren === void 0) { allowSelectingChildren = true; }
        if (stringMatchOption === void 0) { stringMatchOption = 'StartsWith'; }
        if (pageSize === void 0) { pageSize = 50; }
        return __awaiter(this, void 0, void 0, function () {
            var query, searchTermUrl, searchTermQuery, filteredTerms, hasParentId, set, collection, childrenIds_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        query = [
                            "label='".concat(label, "'"),
                            "setId='".concat(termSetId, "'"),
                            "languageTag='".concat(languageTag, "'"),
                            "stringMatchOption='".concat(stringMatchOption, "'")
                        ];
                        if (parentTermId !== Guid.empty) {
                            query.push("parentTermId='".concat(parentTermId, "'"));
                        }
                        searchTermUrl = sp.termStore.concat("/searchTerm(".concat(query.join(','), ")")).toUrl();
                        searchTermQuery = SharePointQueryableCollection(searchTermUrl).top(pageSize);
                        return [4 /*yield*/, searchTermQuery()];
                    case 1:
                        filteredTerms = _b.sent();
                        if (!(allowSelectingChildren === false)) return [3 /*break*/, 3];
                        hasParentId = parentTermId !== Guid.empty;
                        set = sp.termStore.sets.getById(termSetId.toString());
                        collection = hasParentId ? set.terms.getById(parentTermId.toString()).children : set.children;
                        return [4 /*yield*/, collection.select("id").get().then(function (children) { return children.map(function (c) { return c.id; }); })];
                    case 2:
                        childrenIds_1 = _b.sent();
                        filteredTerms = filteredTerms.filter(function (term) { return childrenIds_1.includes(term.id); });
                        _b.label = 3;
                    case 3: return [2 /*return*/, filteredTerms];
                    case 4:
                        _a = _b.sent();
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SPTaxonomyService.prototype.getTermSetInfo = function (termSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var tsInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.termStore.sets.getById(termSetId.toString()).get()];
                    case 1:
                        tsInfo = _a.sent();
                        return [2 /*return*/, tsInfo];
                }
            });
        });
    };
    SPTaxonomyService.prototype.getTermStoreInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var termStoreInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.termStore()];
                    case 1:
                        termStoreInfo = _a.sent();
                        return [2 /*return*/, termStoreInfo];
                }
            });
        });
    };
    return SPTaxonomyService;
}());
export { SPTaxonomyService };
//# sourceMappingURL=SPTaxonomyService.js.map