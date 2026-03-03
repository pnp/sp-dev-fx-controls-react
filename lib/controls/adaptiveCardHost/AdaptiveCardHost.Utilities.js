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
import { AdaptiveCard } from 'adaptivecards';
import * as markdown from 'markdown-it';
export var initProcessMarkdown = function () {
    if (!AdaptiveCard.onProcessMarkdown) {
        AdaptiveCard.onProcessMarkdown = function (text, result) {
            result.outputHtml = new markdown.default().render(text);
            result.didProcess = true;
            try {
                result.outputHtml = new markdown.default().render(text);
                result.didProcess = true;
            }
            catch (error) {
                console.error('AdaptiveCardHost: Error parsing Markdown', error);
                result.didProcess = false;
            }
        };
    }
};
export var injectContextProperty = function (dataObject, theme, spfxContext) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var evaluationContext;
    var context;
    if (spfxContext) {
        context = {
            theme: theme,
            aadInfo: ((_a = spfxContext === null || spfxContext === void 0 ? void 0 : spfxContext.pageContext) === null || _a === void 0 ? void 0 : _a.aadInfo) ? {
                instanceUrl: (_b = spfxContext.pageContext.aadInfo) === null || _b === void 0 ? void 0 : _b.instanceUrl,
                tenantId: (_d = (_c = spfxContext.pageContext.aadInfo) === null || _c === void 0 ? void 0 : _c.tenantId) === null || _d === void 0 ? void 0 : _d._guid,
                userId: (_f = (_e = spfxContext.pageContext.aadInfo) === null || _e === void 0 ? void 0 : _e.userId) === null || _f === void 0 ? void 0 : _f._guid,
            } : null,
            cultureInfo: ((_g = spfxContext === null || spfxContext === void 0 ? void 0 : spfxContext.pageContext) === null || _g === void 0 ? void 0 : _g.cultureInfo) ? {
                currentCultureName: spfxContext.pageContext.cultureInfo.currentCultureName,
                currentUICultureName: spfxContext.pageContext.cultureInfo.currentUICultureName,
                isRightToLeft: spfxContext.pageContext.cultureInfo.isRightToLeft
            } : null,
            userInfo: ((_h = spfxContext === null || spfxContext === void 0 ? void 0 : spfxContext.pageContext) === null || _h === void 0 ? void 0 : _h.user) ? {
                displayName: spfxContext.pageContext.user.displayName,
                email: spfxContext.pageContext.user.email,
                isAnonymousGuestUser: spfxContext.pageContext.user.isAnonymousGuestUser,
                isExternalGuestUser: spfxContext.pageContext.user.isExternalGuestUser,
                loginName: spfxContext.pageContext.user.loginName,
                preferUserTimeZone: spfxContext.pageContext.user.preferUserTimeZone
            } : null,
            spListInfo: ((_j = spfxContext === null || spfxContext === void 0 ? void 0 : spfxContext.pageContext) === null || _j === void 0 ? void 0 : _j.list) ? {
                id: spfxContext.pageContext.list.id.toString(),
                serverRelativeUrl: spfxContext.pageContext.list.serverRelativeUrl,
                title: spfxContext.pageContext.list.title
            } : null,
            spListItemInfo: ((_k = spfxContext === null || spfxContext === void 0 ? void 0 : spfxContext.pageContext) === null || _k === void 0 ? void 0 : _k.listItem) ? {
                id: spfxContext.pageContext.listItem.id.toString(),
            } : null,
            spSiteInfo: ((_l = spfxContext === null || spfxContext === void 0 ? void 0 : spfxContext.pageContext) === null || _l === void 0 ? void 0 : _l.site) ? {
                absoluteUrl: spfxContext.pageContext.site.absoluteUrl,
                cdnPrefix: spfxContext.pageContext.site.cdnPrefix,
                classification: spfxContext.pageContext.site.classification,
                correlationId: spfxContext.pageContext.site.correlationId.toString(),
                id: spfxContext.pageContext.site.id.toString(),
                isNoScriptEnabled: spfxContext.pageContext.site.isNoScriptEnabled,
                recycleBinItemCount: spfxContext.pageContext.site.recycleBinItemCount,
                serverRelativeUrl: spfxContext.pageContext.site.serverRelativeUrl,
                serverRequestPath: spfxContext.pageContext.site.serverRequestPath,
                sitePagesEnabled: spfxContext.pageContext.site.sitePagesEnabled
            } : null,
            spWebInfo: ((_m = spfxContext === null || spfxContext === void 0 ? void 0 : spfxContext.pageContext) === null || _m === void 0 ? void 0 : _m.web) ? {
                absoluteUrl: spfxContext.pageContext.web.absoluteUrl,
                id: spfxContext.pageContext.web.id.toString(),
                isAppWeb: spfxContext.pageContext.web.isAppWeb,
                language: spfxContext.pageContext.web.language,
                languageName: spfxContext.pageContext.web.languageName,
                logoUrl: spfxContext.pageContext.web.logoUrl,
                serverRelativeUrl: spfxContext.pageContext.web.serverRelativeUrl,
                templateName: spfxContext.pageContext.web.templateName,
                title: spfxContext.pageContext.web.title,
                description: spfxContext.pageContext.web.description
            } : null
        };
    }
    else {
        context = {
            theme: theme
        };
    }
    if (dataObject) {
        evaluationContext = { $root: __assign(__assign({}, dataObject === null || dataObject === void 0 ? void 0 : dataObject.$root), { "@context": context }) };
    }
    else {
        evaluationContext = { $root: { "@context": context } };
    }
    return evaluationContext;
};
//# sourceMappingURL=AdaptiveCardHost.Utilities.js.map