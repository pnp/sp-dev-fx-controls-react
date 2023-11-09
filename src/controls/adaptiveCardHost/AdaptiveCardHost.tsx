import { ThemeProvider } from '@fluentui/react-theme-provider';
import { mergeThemes } from '@fluentui/theme/lib/mergeThemes';
import { Action, AdaptiveCard, CardElement, CardObjectRegistry, ExecuteAction, GlobalRegistry, OpenUrlAction, SerializationContext, SubmitAction } from 'adaptivecards';
import { Template } from 'adaptivecards-templating';
import { IPartialTheme, ITheme } from '@fluentui/react/lib/Styling';
import { CustomizerContext } from '@fluentui/react/lib/Utilities';
import * as React from 'react';
import {
  useCallback,
  useEffect,
  useRef
} from 'react';
import { fluentUIDefaultTheme } from '../../common/fluentUIThemes/FluentUIDefaultTheme';
import { initializeAdaptiveCardHost } from './AdaptiveCardHost.HostConfig';
import { initProcessMarkdown, injectContextProperty } from './AdaptiveCardHost.Utilities';
import { registerFluentUIActions, registerFluentUIElements } from './fluentUI';
import { IAdaptiveCardHostProps } from './IAdaptiveCardHostProps';
import { AdaptiveCardHostThemeType } from './models/AdaptiveCardHostThemeType';
import { IAdaptiveCardHostActionResult } from './models/IAdaptiveCardHostActionResult';

export const AdaptiveCardHost = (props: IAdaptiveCardHostProps): JSX.Element => {
  const renderElementRef = useRef<HTMLDivElement>(null);
  const adaptiveCardInstanceRef = useRef<AdaptiveCard>(null);
  const serializationContextInstanceRef = useRef<SerializationContext>(null);
  const fluentUIThemeInstanceRef = useRef<ITheme>(null);
  const fluentUICustomizerContext = React.useContext(CustomizerContext);
  const adaptiveCardInstanceRefDependencies = [props.card, props.onSetCustomElements, props.onSetCustomActions, props.onUpdateHostCapabilities];

  // Init Process Markdown
  useEffect(() => {
    initProcessMarkdown();
  }, []);
  // *****

  // create the instance of AdaptiveCard & SerializationContext
  useEffect(() => {
    adaptiveCardInstanceRef.current = new AdaptiveCard();
    serializationContextInstanceRef.current = new SerializationContext();
  }, [...adaptiveCardInstanceRefDependencies]);
  // *****

  // create executeAction
  const invokeAction = useCallback((action: Action) => {
    if (props.onInvokeAction) {
      let actionResult: IAdaptiveCardHostActionResult;
      const type = action.getJsonTypeName();
      switch (type) {
        case OpenUrlAction.JsonTypeName: {
          const openUrlAction = action as OpenUrlAction;
          actionResult = { type: type, title: openUrlAction.title, url: openUrlAction.url };
        }
          break;
        case SubmitAction.JsonTypeName: {
          const submitAction = action as SubmitAction;
          actionResult = { type: type, title: submitAction.title, data: submitAction.data };
        }
          break;
        case ExecuteAction.JsonTypeName: {
          const executeAction = action as ExecuteAction;
          actionResult = { type: type, title: executeAction.title, data: executeAction.data, verb: executeAction.verb };
        }
          break;
      }

      props.onInvokeAction(actionResult);
    }
  }, [props.onInvokeAction]);
  // *****

  // set hostConfig
  useEffect(() => {
    // set the input Fluent UI Theme
    let inputFluentUITheme: IPartialTheme | ITheme;
    let inputThemeType = props.themeType;

    if (!inputThemeType) {
      inputThemeType = AdaptiveCardHostThemeType.SharePoint;
    }

    // if this control is wrapped on "ThemeProvider" take the theme from the context
    const contextTheme: ITheme | IPartialTheme = fluentUICustomizerContext.customizations.settings.theme;
    // *****

    if (props.theme) {
      inputFluentUITheme = props.theme;
    } else if (contextTheme) {
      inputFluentUITheme = contextTheme;
    } else {
      inputFluentUITheme = fluentUIDefaultTheme();
    }
    // **********

    const hostConfigResult = initializeAdaptiveCardHost(inputThemeType, mergeThemes(fluentUIDefaultTheme(), inputFluentUITheme));
    const currentHostConfig = hostConfigResult.hostConfig;

    fluentUIThemeInstanceRef.current = hostConfigResult.theme;
    adaptiveCardInstanceRef.current.hostConfig = hostConfigResult.hostConfig;


    if (props.onUpdateHostCapabilities) {
      props.onUpdateHostCapabilities(currentHostConfig.hostCapabilities);
    }

  }, [...adaptiveCardInstanceRefDependencies, fluentUICustomizerContext, props.theme, props.themeType, props.hostConfig]);
  // *****

  // set invokeAction
  useEffect(() => {
    adaptiveCardInstanceRef.current.onExecuteAction = invokeAction;
  }, [...adaptiveCardInstanceRefDependencies, invokeAction]);
  // *****

  // set elements & actions registry
  useEffect(() => {
    const elementRegistry = new CardObjectRegistry<CardElement>();
    const actionRegistry = new CardObjectRegistry<Action>();

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

    const currentSerializationContext = serializationContextInstanceRef.current;
    currentSerializationContext.setElementRegistry(elementRegistry);
    currentSerializationContext.setActionRegistry(actionRegistry);

  }, [...adaptiveCardInstanceRefDependencies]);
  // *****

  // set Adaptive Card
  useEffect(() => {
    const currentRenderElement = renderElementRef.current;

    if (!currentRenderElement) {
      return;
    }

    const currentAdaptiveCard = adaptiveCardInstanceRef.current;
    try {
      const template = new Template(props.card);
      const evaluationContext = injectContextProperty(props.data, fluentUIThemeInstanceRef.current, props.context);
      const cardPayload = template.expand(evaluationContext);

      currentAdaptiveCard.parse(cardPayload, serializationContextInstanceRef.current);

      const renderedElement = currentAdaptiveCard.render();
      // If this isn't acceptable, we should compare the old template with the new template
      if (renderedElement.outerHTML !== currentRenderElement.innerHTML) {
        currentRenderElement.innerHTML = "";
        currentRenderElement.appendChild(renderedElement);
      }
    } catch (cardRenderError) {
      if (props.onError) {
        props.onError(cardRenderError);
      }
    }
  }, [...adaptiveCardInstanceRefDependencies, props.data, props.hostConfig, props.onError]);
  // *****

  return (
    <ThemeProvider theme={(fluentUIThemeInstanceRef.current) ? fluentUIThemeInstanceRef.current : fluentUIDefaultTheme()}>
      <div
        ref={renderElementRef}
        className={`${(props.className) ? props.className : ""}`}
        style={props.style}
      />
    </ThemeProvider>
  );
};
