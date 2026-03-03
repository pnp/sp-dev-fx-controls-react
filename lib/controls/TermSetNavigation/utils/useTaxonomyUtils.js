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
import * as React from 'react';
import { useGraphTaxonomyAPI } from '../hooks/useGraphTaxonomyAPI';
export var useTaxonomyUtils = function (context) {
    var getTermChildren = useGraphTaxonomyAPI(context).getTermChildren;
    var createChildren = React.useCallback(function (siteId, termSetId, term, level, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var navLinkGroups, navLink, termChildren, _i, termChildren_1, termChild;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    navLinkGroups = [];
                    navLink = {};
                    return [4 /*yield*/, getTermChildren(siteId, termSetId, term.id, refreshCache)];
                case 1:
                    termChildren = _b.sent();
                    _i = 0, termChildren_1 = termChildren;
                    _b.label = 2;
                case 2:
                    if (!(_i < termChildren_1.length)) return [3 /*break*/, 5];
                    termChild = termChildren_1[_i];
                    _a = {
                        isExpanded: true,
                        name: termChild.labels[0].name,
                        key: termChild.id,
                        url: ""
                    };
                    return [4 /*yield*/, createChildren(siteId, termSetId, termChild, level + 1, refreshCache)];
                case 3:
                    navLink = (_a.links = _b.sent(),
                        _a.data = termChild,
                        _a);
                    navLinkGroups.push(navLink);
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, navLinkGroups];
            }
        });
    }); }, [getTermChildren]);
    var createItems = React.useCallback(function (siteId, termSetId, terms, level, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var navLinks, _i, terms_1, term, navLink;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    navLinks = ([]);
                    _i = 0, terms_1 = terms;
                    _b.label = 1;
                case 1:
                    if (!(_i < terms_1.length)) return [3 /*break*/, 4];
                    term = terms_1[_i];
                    _a = {
                        name: term.labels[0].name,
                        key: term.id,
                        url: ""
                    };
                    return [4 /*yield*/, createChildren(siteId, termSetId, term, level + 1, refreshCache)];
                case 2:
                    navLink = (_a.links = _b.sent(),
                        _a.isExpanded = true,
                        _a.data = term,
                        _a);
                    navLinks.push(navLink);
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, navLinks];
            }
        });
    }); }, [getTermChildren, createChildren]);
    return { createItems: createItems, createChildren: createChildren };
};
//# sourceMappingURL=useTaxonomyUtils.js.map