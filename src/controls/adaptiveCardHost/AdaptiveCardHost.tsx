

import { ThemeProvider } from '@fluentui/react-theme-provider';
import { Action, AdaptiveCard, CardElement, CardObjectRegistry, ExecuteAction, GlobalRegistry, HostConfig, OpenUrlAction, SerializationContext, SubmitAction } from 'adaptivecards';
import { Template } from 'adaptivecards-templating';
import { IPartialTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { CustomizerContext } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import {
    useCallback,
    useEffect,
    useRef
} from 'react';
import './AdaptiveCardHost.css';
import { convertFromPartialThemeToTheme, createDarkTeamsHostConfig, createDefaultTeamsHostConfig, createHighContrastTeamsHostConfig, createSharePointHostConfig, initProcessMarkdown, addSPFxContextDataToDataObject, setFluentUIThemeAsCSSVariables } from './AdaptiveCardHostHelpers';
import { createDarkTeamsTheme, createDefaultTeamsTheme, createHighContrastTeamsTheme, getDefaultFluentUITheme, setFluentUIThemeAsHostCapability, useLocalFluentUI } from './fluentUI';
import { AdaptiveCardHostThemeType, IAdaptiveCardHostActionResult, IAdaptiveCardHostProps } from './IAdaptiveCardHostProps';

// Init Process Markdown
initProcessMarkdown();

export const AdaptiveCardHost = (props: IAdaptiveCardHostProps) => {
    const adaptiveCardInstanceRef = useRef<AdaptiveCard>(null);
    const serializationContextInstanceRef = useRef<SerializationContext>(null);
    const fluentUIThemeInstanceRef = useRef<ITheme>(null);

    const renderElementRef = useRef<HTMLDivElement>(null);
    const fluentUICustomizerContext = React.useContext(CustomizerContext);

    // create the instance of AdaptiveCard & SerializationContext
    useEffect(() => {
        adaptiveCardInstanceRef.current = new AdaptiveCard();
        serializationContextInstanceRef.current = new SerializationContext();
    }, [props.card, props.onSetCustomElements, props.onSetCustomActions, props.onUpdateHostCapabilities]);
    // *****

    // create executeAction
    const invokeAction = useCallback((action: Action) => {
        if (props.onInvokeAction) {
            let actionResult: IAdaptiveCardHostActionResult;
            const type = action.getJsonTypeName();
            switch (type) {
                case OpenUrlAction.JsonTypeName: {
                    let typedAction = action as OpenUrlAction;
                    actionResult = {
                        type: type,
                        title: typedAction.title,
                        url: typedAction.url
                    };
                }
                    break;

                case SubmitAction.JsonTypeName: {
                    let typedAction = action as SubmitAction;
                    actionResult = {
                        type: type,
                        title: typedAction.title,
                        data: typedAction.data
                    };
                }
                    break;
                case ExecuteAction.JsonTypeName: {
                    let typedAction = action as ExecuteAction;
                    actionResult = {
                        type: type,
                        title: typedAction.title,
                        data: typedAction.data,
                        verb: typedAction.verb
                    };
                }
                    break;
            }

            props.onInvokeAction(actionResult);
        }
    }, [props.onInvokeAction]);
    // *****

    // set hostConfig
    useEffect(() => {
        let theme: IPartialTheme | ITheme;
        let themeType = props.themeType;

        if (!themeType) {
            themeType = AdaptiveCardHostThemeType.SharePoint;
        }

        switch (themeType) {
            case AdaptiveCardHostThemeType.SharePoint: {
                let contextTheme = fluentUICustomizerContext.customizations.settings["theme"];
                if (props.theme) {
                    theme = props.theme;
                } else if (contextTheme) {
                    theme = contextTheme;
                } else {
                    theme = getDefaultFluentUITheme();
                }
            }
                break;
            case AdaptiveCardHostThemeType.Teams: {
                theme = createDefaultTeamsTheme();
            }
                break;
            case AdaptiveCardHostThemeType.TeamsDark: {
                theme = createDarkTeamsTheme();
            }
                break;
            case AdaptiveCardHostThemeType.TeamsHighContrast: {
                theme = createHighContrastTeamsTheme();
            }
                break;
        }

        let currentTheme = convertFromPartialThemeToTheme(theme);
        fluentUIThemeInstanceRef.current = currentTheme;

        let hostConfig = props.hostConfig;
        if (!hostConfig) {
            switch (themeType) {
                case AdaptiveCardHostThemeType.SharePoint: {
                    hostConfig = createSharePointHostConfig(currentTheme);
                }
                    break;
                case AdaptiveCardHostThemeType.Teams: {
                    hostConfig = createDefaultTeamsHostConfig(currentTheme);
                }
                    break;
                case AdaptiveCardHostThemeType.TeamsDark: {
                    hostConfig = createDarkTeamsHostConfig(currentTheme);
                }
                    break;
                case AdaptiveCardHostThemeType.TeamsHighContrast: {
                    hostConfig = createHighContrastTeamsHostConfig(currentTheme);
                }
                    break;
            }
        }

        let currentHostConfig = new HostConfig(hostConfig);
        adaptiveCardInstanceRef.current.hostConfig = currentHostConfig;

        setFluentUIThemeAsHostCapability(currentHostConfig, currentTheme);

        if (props.onUpdateHostCapabilities) {
            props.onUpdateHostCapabilities(currentHostConfig.hostCapabilities);
        }

        setFluentUIThemeAsCSSVariables(
            renderElementRef.current,
            theme
        );

        // just to fix the colors of the list actions menu
        setFluentUIThemeAsCSSVariables(
            document.body,
            (props.isUniqueControlInPage) ? theme : getDefaultFluentUITheme()
        );
        // *****

    }, [adaptiveCardInstanceRef.current, fluentUICustomizerContext, props.theme, props.themeType, props.hostConfig, props.isUniqueControlInPage]);
    // *****

    // set invokeAction
    useEffect(() => {
        adaptiveCardInstanceRef.current.onExecuteAction = invokeAction;
    }, [adaptiveCardInstanceRef.current, invokeAction]);
    // *****

    // set elements & actions registry
    useEffect(() => {
        let elementRegistry = new CardObjectRegistry<CardElement>();
        let actionRegistry = new CardObjectRegistry<Action>();

        GlobalRegistry.populateWithDefaultElements(elementRegistry);
        GlobalRegistry.populateWithDefaultActions(actionRegistry);

        useLocalFluentUI(elementRegistry, actionRegistry);

        if (props.onSetCustomElements) {
            props.onSetCustomElements(elementRegistry);
        }

        if (props.onSetCustomActions) {
            props.onSetCustomActions(actionRegistry);
        }

        let currentSerializationContext = serializationContextInstanceRef.current;
        currentSerializationContext.setElementRegistry(elementRegistry);
        currentSerializationContext.setActionRegistry(actionRegistry);

    }, [serializationContextInstanceRef.current]);
    // *****

    // set Adaptive Card
    useEffect(() => {
        let currentRenderElement = renderElementRef.current;

        if (!currentRenderElement) {
            return;
        }

        let currentAdaptiveCard = adaptiveCardInstanceRef.current;
        try {
            let template = new Template(props.card);
            let evaluationContext = addSPFxContextDataToDataObject(props.data, fluentUIThemeInstanceRef.current, props.context);
            let cardPayload = template.expand(evaluationContext);

            currentAdaptiveCard.parse(cardPayload, serializationContextInstanceRef.current);

            let renderedElement = currentAdaptiveCard.render();
            currentRenderElement.innerHTML = "";
            currentRenderElement.appendChild(renderedElement);
        } catch (cardRenderError) {
            if (props.onError) {
                props.onError(cardRenderError);
            }
        }
    }, [adaptiveCardInstanceRef.current, props.data, props.hostConfig, props.onError]);
    // *****

    return (
        <ThemeProvider theme={(fluentUIThemeInstanceRef.current) ? fluentUIThemeInstanceRef.current : getDefaultFluentUITheme()}>
            <div
                ref={renderElementRef}
                className={`${(props.className) ? props.className : ""}`}
                style={props.style}
            />
        </ThemeProvider>
    );
};
