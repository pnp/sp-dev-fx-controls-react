

import { PartialTheme, Theme, ThemeProvider } from '@fluentui/react-theme-provider';
import { Action, AdaptiveCard, CardElement, CardObjectRegistry, ExecuteAction, GlobalRegistry, HostConfig, OpenUrlAction, SerializationContext, SubmitAction } from 'adaptivecards';
import { Template } from 'adaptivecards-templating';
import { CustomizerContext, ITheme } from 'office-ui-fabric-react';
import * as React from 'react';
import {
    useCallback,
    useEffect,
    useRef
} from 'react';
import './AdaptiveCardHost.css';
import { convertFromPartialThemeToTheme, createDarkTeamsHostConfig, createDefaultTeamsHostConfig, createHighContrastTeamsHostConfig, createSharePointHostConfig, initProcessMarkdown, setFluentUIThemeAsCSSVariables } from './AdaptiveCardHostHelpers';
import { createDarkTeamsTheme, createDefaultTeamsTheme, createHighContrastTeamsTheme, getDefaultFluentUITheme, setFluentUIThemeAsHostCapability, useLocalFluentUI } from './fluentUI';
import { IAdaptiveCardHostActionResult, IAdaptiveCardHostProps, AdaptiveCardHostThemeType } from './IAdaptiveCardHostProps';

// Init Process Markdown
initProcessMarkdown();

export const AdaptiveCardHost = (props: IAdaptiveCardHostProps) => {
    const adaptiveCardInstanceRef = useRef<AdaptiveCard>(null);
    const serializationContextInstanceRef = useRef<SerializationContext>(null);
    const renderElementRef = useRef<HTMLDivElement>(null);
    const fluentUICustomizerContext = React.useContext(CustomizerContext);
    const fluentUIThemeInstanceRef = useRef<ITheme>(null);

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
                        type: typedAction.getJsonTypeName(),
                        title: typedAction.title,
                        url: typedAction.url
                    };
                }
                    break;

                case SubmitAction.JsonTypeName: {
                    let typedAction = action as SubmitAction;
                    actionResult = {
                        type: typedAction.getJsonTypeName(),
                        title: typedAction.title,
                        data: typedAction.data
                    };
                }
                    break;
                case ExecuteAction.JsonTypeName: {
                    let typedAction = action as ExecuteAction;
                    actionResult = {
                        type: typedAction.getJsonTypeName(),
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
        let theme: PartialTheme | Theme;
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

        fluentUIThemeInstanceRef.current = convertFromPartialThemeToTheme(theme);

        let hostConfig = props.hostConfig;
        if (!hostConfig) {
            switch (themeType) {
                case AdaptiveCardHostThemeType.SharePoint: {
                    hostConfig = createSharePointHostConfig(fluentUIThemeInstanceRef.current);
                }
                    break;
                case AdaptiveCardHostThemeType.Teams: {
                    hostConfig = createDefaultTeamsHostConfig(fluentUIThemeInstanceRef.current);
                }
                    break;
                case AdaptiveCardHostThemeType.TeamsDark: {
                    hostConfig = createDarkTeamsHostConfig(fluentUIThemeInstanceRef.current);
                }
                    break;
                case AdaptiveCardHostThemeType.TeamsHighContrast: {
                    hostConfig = createHighContrastTeamsHostConfig(fluentUIThemeInstanceRef.current);
                }
                    break;
            }
        }

        adaptiveCardInstanceRef.current.hostConfig = new HostConfig(hostConfig);

        setFluentUIThemeAsHostCapability(adaptiveCardInstanceRef.current.hostConfig, fluentUIThemeInstanceRef.current);

        if (props.onUpdateHostCapabilities) {
            props.onUpdateHostCapabilities(adaptiveCardInstanceRef.current.hostConfig.hostCapabilities);
        }

        setFluentUIThemeAsCSSVariables(
            renderElementRef.current,
            theme
        );

        // just to fix the colors of the list actions menu
        if (props.isUniqueControlInPage) {
            setFluentUIThemeAsCSSVariables(
                document.body,
                theme
            );
        }
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

        serializationContextInstanceRef.current.setElementRegistry(elementRegistry);
        serializationContextInstanceRef.current.setActionRegistry(actionRegistry);

    }, [serializationContextInstanceRef.current]);
    // *****

    // set Adaptive Card
    useEffect(() => {
        if (!renderElementRef.current) {
            return;
        }

        let adaptiveCard = adaptiveCardInstanceRef.current;
        let serializationContext = serializationContextInstanceRef.current;

        try {
            let cardPayload;
            if (props.data) {
                let template = new Template(props.card);
                cardPayload = template.expand(props.data);
            }
            else {
                cardPayload = props.card;
            }

            adaptiveCard.parse(cardPayload, serializationContext);

            let renderedElement = adaptiveCard.render();
            renderElementRef.current.innerHTML = "";
            renderElementRef.current.appendChild(renderedElement);
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