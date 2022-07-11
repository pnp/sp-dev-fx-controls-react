import { ThemeProvider } from '@fluentui/react-theme-provider';
import { mergeThemes } from '@fluentui/theme/lib/mergeThemes';
import { Action, AdaptiveCard, CardElement, CardObjectRegistry, ExecuteAction, GlobalRegistry, OpenUrlAction, SerializationContext, SubmitAction } from 'adaptivecards';
import { Template } from 'adaptivecards-templating';
import { IPartialTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { CustomizerContext } from 'office-ui-fabric-react/lib/Utilities';
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

export const AdaptiveCardHost = (props: IAdaptiveCardHostProps) => {
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
          let typedAction = action as OpenUrlAction;
          actionResult = { type: type, title: typedAction.title, url: typedAction.url };
        }
          break;
        case SubmitAction.JsonTypeName: {
          let typedAction = action as SubmitAction;
          actionResult = { type: type, title: typedAction.title, data: typedAction.data };
        }
          break;
        case ExecuteAction.JsonTypeName: {
          let typedAction = action as ExecuteAction;
          actionResult = { type: type, title: typedAction.title, data: typedAction.data, verb: typedAction.verb };
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
    let contextTheme = fluentUICustomizerContext.customizations.settings["theme"];
    // *****

    if (props.theme) {
      inputFluentUITheme = props.theme;
    } else if (contextTheme) {
      inputFluentUITheme = contextTheme;
    } else {
      inputFluentUITheme = fluentUIDefaultTheme();
    }
    // **********

    let hostConfigResult = initializeAdaptiveCardHost(inputThemeType, mergeThemes(fluentUIDefaultTheme(), inputFluentUITheme));
    let currentHostConfig = hostConfigResult.hostConfig;

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
    let elementRegistry = new CardObjectRegistry<CardElement>();
    let actionRegistry = new CardObjectRegistry<Action>();

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

    let currentSerializationContext = serializationContextInstanceRef.current;
    currentSerializationContext.setElementRegistry(elementRegistry);
    currentSerializationContext.setActionRegistry(actionRegistry);

  }, [...adaptiveCardInstanceRefDependencies]);
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
      let evaluationContext = injectContextProperty(props.data, fluentUIThemeInstanceRef.current, props.context);
      let cardPayload = template.expand(evaluationContext);

      currentAdaptiveCard.parse(cardPayload, serializationContextInstanceRef.current);

      let renderedElement = currentAdaptiveCard.render();
      currentRenderElement.innerHTML = "";
      currentRenderElement.appendChild(renderedElement);

      // just for debugging pourpouse
      console.log(evaluationContext);
      // *****
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
