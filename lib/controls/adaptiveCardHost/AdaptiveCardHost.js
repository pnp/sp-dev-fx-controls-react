var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { mergeThemes } from '@fluentui/theme';
import { AdaptiveCard, CardObjectRegistry, ExecuteAction, GlobalRegistry, OpenUrlAction, SerializationContext, SubmitAction, } from 'adaptivecards';
import { Template } from 'adaptivecards-templating';
import { CustomizerContext } from '@fluentui/react';
import { fluentUIDefaultTheme } from '../../common/fluentUIThemes/FluentUIDefaultTheme';
import { initializeAdaptiveCardHost } from './AdaptiveCardHost.HostConfig';
import { initProcessMarkdown, injectContextProperty, } from './AdaptiveCardHost.Utilities';
import { registerFluentUIActions, registerFluentUIElements } from './fluentUI';
import { AdaptiveCardHostThemeType } from './models/AdaptiveCardHostThemeType';
export var AdaptiveCardHost = function (props) {
    var renderElementRef = useRef(null);
    var adaptiveCardInstanceRef = useRef(null);
    var serializationContextInstanceRef = useRef(null);
    var fluentUIThemeInstanceRef = useRef(null);
    var fluentUICustomizerContext = React.useContext(CustomizerContext);
    var adaptiveCardInstanceRefDependencies = [
        props.card,
        props.onSetCustomElements,
        props.onSetCustomActions,
        props.onUpdateHostCapabilities,
    ];
    // Init Process Markdown
    useEffect(function () {
        initProcessMarkdown();
    }, []);
    // *****
    // create the instance of AdaptiveCard & SerializationContext
    useEffect(function () {
        adaptiveCardInstanceRef.current = new AdaptiveCard();
        serializationContextInstanceRef.current = new SerializationContext();
    }, __spreadArray([], adaptiveCardInstanceRefDependencies, true));
    // *****
    // create executeAction
    var invokeAction = useCallback(function (action) {
        if (props.onInvokeAction) {
            var actionResult = void 0;
            var type = action.getJsonTypeName();
            switch (type) {
                case OpenUrlAction.JsonTypeName:
                    {
                        var openUrlAction = action;
                        actionResult = {
                            type: type,
                            title: openUrlAction.title,
                            url: openUrlAction.url,
                        };
                    }
                    break;
                case SubmitAction.JsonTypeName:
                    {
                        var submitAction = action;
                        actionResult = {
                            type: type,
                            title: submitAction.title,
                            data: submitAction.data,
                        };
                    }
                    break;
                case ExecuteAction.JsonTypeName:
                    {
                        var executeAction = action;
                        actionResult = {
                            type: type,
                            title: executeAction.title,
                            data: executeAction.data,
                            verb: executeAction.verb,
                        };
                    }
                    break;
            }
            props.onInvokeAction(actionResult);
        }
    }, [props.onInvokeAction]);
    // *****
    // set hostConfig
    useEffect(function () {
        // set the input Fluent UI Theme
        var inputFluentUITheme;
        var inputThemeType = props.themeType;
        if (!inputThemeType) {
            inputThemeType = AdaptiveCardHostThemeType.SharePoint;
        }
        // if this control is wrapped on "ThemeProvider" take the theme from the context
        var contextTheme = fluentUICustomizerContext.customizations.settings.theme;
        // *****
        if (props.theme) {
            inputFluentUITheme = props.theme;
        }
        else if (contextTheme) {
            inputFluentUITheme = contextTheme;
        }
        else {
            inputFluentUITheme = fluentUIDefaultTheme();
        }
        // **********
        var hostConfigResult = initializeAdaptiveCardHost(inputThemeType, mergeThemes(fluentUIDefaultTheme(), inputFluentUITheme));
        var currentHostConfig = hostConfigResult.hostConfig;
        fluentUIThemeInstanceRef.current = hostConfigResult.theme;
        adaptiveCardInstanceRef.current.hostConfig = hostConfigResult.hostConfig;
        if (props.onUpdateHostCapabilities) {
            props.onUpdateHostCapabilities(currentHostConfig.hostCapabilities);
        }
    }, __spreadArray(__spreadArray([], adaptiveCardInstanceRefDependencies, true), [
        fluentUICustomizerContext,
        props.theme,
        props.themeType,
        props.hostConfig,
    ], false));
    // *****
    // set invokeAction
    useEffect(function () {
        adaptiveCardInstanceRef.current.onExecuteAction = invokeAction;
    }, __spreadArray(__spreadArray([], adaptiveCardInstanceRefDependencies, true), [invokeAction], false));
    // *****
    // set elements & actions registry
    useEffect(function () {
        var elementRegistry = new CardObjectRegistry();
        var actionRegistry = new CardObjectRegistry();
        GlobalRegistry.populateWithDefaultElements(elementRegistry);
        GlobalRegistry.populateWithDefaultActions(actionRegistry);
        registerFluentUIElements(elementRegistry);
        registerFluentUIActions(actionRegistry);
        if (props.onSetCustomElements) {
            props.onSetCustomElements(elementRegistry);
        }
        if (props.onSetCustomActions) {
            props.onSetCustomActions(actionRegistry);
        }
        var currentSerializationContext = serializationContextInstanceRef.current;
        currentSerializationContext.setElementRegistry(elementRegistry);
        currentSerializationContext.setActionRegistry(actionRegistry);
    }, __spreadArray([], adaptiveCardInstanceRefDependencies, true));
    // *****
    // set Adaptive Card
    useEffect(function () {
        var currentRenderElement = renderElementRef.current;
        if (!currentRenderElement) {
            return;
        }
        var currentAdaptiveCard = adaptiveCardInstanceRef.current;
        try {
            var template = new Template(props.card);
            var evaluationContext = injectContextProperty(props.data, fluentUIThemeInstanceRef.current, props.context);
            var cardPayload = template.expand(evaluationContext);
            currentAdaptiveCard.parse(cardPayload, serializationContextInstanceRef.current);
            var renderedElement = currentAdaptiveCard.render();
            // If this isn't acceptable, we should compare the old template with the new template
            if (renderedElement.outerHTML !== currentRenderElement.innerHTML) {
                currentRenderElement.innerHTML = '';
                currentRenderElement.appendChild(renderedElement);
            }
        }
        catch (cardRenderError) {
            if (props.onError) {
                props.onError(cardRenderError);
            }
        }
    }, __spreadArray(__spreadArray([], adaptiveCardInstanceRefDependencies, true), [
        props.data,
        props.hostConfig,
        props.onError,
    ], false));
    // *****
    return (React.createElement(ThemeProvider, { theme: fluentUIThemeInstanceRef.current
            ? fluentUIThemeInstanceRef.current
            : fluentUIDefaultTheme() },
        React.createElement("div", { ref: renderElementRef, className: "".concat(props.className ? props.className : ''), style: props.style })));
};
//# sourceMappingURL=AdaptiveCardHost.js.map