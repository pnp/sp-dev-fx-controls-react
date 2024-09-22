import { BaseComponentContext } from '@microsoft/sp-component-base';
import { AdaptiveCard } from 'adaptivecards';
import { IEvaluationContext } from 'adaptivecards-templating/lib/template-engine';
import * as markdown from 'markdown-it';
import { ITheme } from '@fluentui/react/lib/Styling';
import { IAdaptiveCardHostEvaluationContext } from './models/IAdaptiveCardHostEvaluationContext';

export const initProcessMarkdown = (): void => {
    if (!AdaptiveCard.onProcessMarkdown) {
        AdaptiveCard.onProcessMarkdown = (text, result) => {
            result.outputHtml = new markdown.default().render(text);
            result.didProcess = true;

            try {
                result.outputHtml = new markdown.default().render(text);
                result.didProcess = true;
            } catch (error) {
                console.error('AdaptiveCardHost: Error parsing Markdown', error);
                result.didProcess = false;
            }
        };
    }
};

export const injectContextProperty = (dataObject: { "$root": object }, theme: ITheme, spfxContext?: BaseComponentContext): IEvaluationContext => {
    let evaluationContext: IEvaluationContext;
    let context: IAdaptiveCardHostEvaluationContext;

    if (spfxContext) {
        context = {
            theme: theme,
            aadInfo: (spfxContext?.pageContext?.aadInfo) ? {
                instanceUrl: spfxContext.pageContext.aadInfo?.instanceUrl,
                tenantId: spfxContext.pageContext.aadInfo?.tenantId?._guid,
                userId: spfxContext.pageContext.aadInfo?.userId?._guid,
            } : null,
            cultureInfo: (spfxContext?.pageContext?.cultureInfo) ? {
                currentCultureName: spfxContext.pageContext.cultureInfo.currentCultureName,
                currentUICultureName: spfxContext.pageContext.cultureInfo.currentUICultureName,
                isRightToLeft: spfxContext.pageContext.cultureInfo.isRightToLeft
            } : null,
            userInfo: (spfxContext?.pageContext?.user) ? {
                displayName: spfxContext.pageContext.user.displayName,
                email: spfxContext.pageContext.user.email,
                isAnonymousGuestUser: spfxContext.pageContext.user.isAnonymousGuestUser,
                isExternalGuestUser: spfxContext.pageContext.user.isExternalGuestUser,
                loginName: spfxContext.pageContext.user.loginName,
                preferUserTimeZone: spfxContext.pageContext.user.preferUserTimeZone
            } : null,
            spListInfo: (spfxContext?.pageContext?.list) ? {
                id: spfxContext.pageContext.list.id.toString(),
                serverRelativeUrl: spfxContext.pageContext.list.serverRelativeUrl,
                title: spfxContext.pageContext.list.title
            } : null,
            spListItemInfo: (spfxContext?.pageContext?.listItem) ? {
                id: spfxContext.pageContext.listItem.id.toString(),
            } : null,
            spSiteInfo: (spfxContext?.pageContext?.site) ? {
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
            spWebInfo: (spfxContext?.pageContext?.web) ? {
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
    } else {
        context = {
            theme: theme
        };
    }

    if (dataObject) {
        evaluationContext = { $root: { ...dataObject?.$root, "@context": context } };
    } else {
        evaluationContext = { $root: { "@context": context } };
    }

    return evaluationContext;
};
