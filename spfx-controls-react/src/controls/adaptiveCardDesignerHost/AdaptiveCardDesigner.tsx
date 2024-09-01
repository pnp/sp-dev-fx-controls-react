import * as monacoLoader from '@monaco-editor/loader';
import { Versions } from 'adaptivecards';
import { BindingPreviewMode, CardDesigner, FieldDefinition, GlobalSettings, HostContainer, ToolbarChoicePicker } from 'adaptivecards-designer';
import * as markdownit from 'markdown-it';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { injectContextProperty } from '../adaptiveCardHost/AdaptiveCardHost.Utilities';
import { fluentUIDefaultTheme } from '../../common/fluentUIThemes/FluentUIDefaultTheme';
import { addToolbarButton, addToolbarChoicePicker, addToolboxSnippet, convertNullToEmptyString, hideToolbarElement } from './AdaptiveCardDesigner.Helpers';
import { applyAdaptiveCardDesignerStyles } from './AdaptiveCardDesigner.Styles';
import { AdaptiveCardHostContainer, AdaptiveCardHostContainerType } from './fluentUI/AdaptiveCardHostContainer';
import { initializeDesignerPeers } from './fluentUI/peers/DesignerPeers';
import { IAdaptiveCardDesignerHostProps } from './IAdaptiveCardDesignerProps';
import type * as editor from 'monaco-editor';

export const EmptyCard = {
  '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
  'type': 'AdaptiveCard',
  'version': '1.5'
};

export const AdaptiveCardDesigner = (props: IAdaptiveCardDesignerHostProps): JSX.Element => {
  const adaptiveCardDesignerInstanceRef = useRef<CardDesigner>(null);
  const renderElementRef = useRef<HTMLDivElement>();
  const currentBreakpointValueRef = useRef<string>('100%');
  const [isMonacoLoaded, setIsMonacoLoaded] = useState(false);
  const monacoRef = useRef<typeof editor>(null);

  // updateLayout on windows resize
  useEffect(() => {
    function handleResize(): void {
      adaptiveCardDesignerInstanceRef.current?.designerSurface?.updateLayout(true);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  // *****

  useEffect(() => {
    CardDesigner.onProcessMarkdown = (text, result) => {
      result.outputHtml = new markdownit().render(text);
      result.didProcess = true;
    };

    applyAdaptiveCardDesignerStyles();

    monacoLoader.default.init().then(monaco => {
      // monaco as any => fix the problem with the type definition
      monacoRef.current = monaco;
      setIsMonacoLoaded(true);
    })
      .catch(() => { /* no-op; */ });
  }, []);

  useEffect(() => {

    if (props.addDefaultAdaptiveCardHostContainer) {
      initializeDesignerPeers();
    }

    GlobalSettings.enableDataBindingSupport = props.enableDataBindingSupport;
    GlobalSettings.selectedHostContainerControlsTargetVersion = props.selectedHostContainerControlsTargetVersion;
    GlobalSettings.showDataStructureToolbox = props.showDataStructureToolbox;
    GlobalSettings.showSampleDataEditorToolbox = props.showSampleDataEditorToolbox;
    GlobalSettings.showTargetVersionMismatchWarning = props.showTargetVersionMismatchWarning;
    GlobalSettings.showVersionPicker = props.showVersionPicker;
    GlobalSettings.supportedTargetVersions = props.supportedTargetVersions;

  }, [props.addDefaultAdaptiveCardHostContainer,
  props.enableDataBindingSupport,
  props.selectedHostContainerControlsTargetVersion,
  props.showDataStructureToolbox,
  props.showSampleDataEditorToolbox,
  props.showTargetVersionMismatchWarning,
  props.showVersionPicker,
  props.supportedTargetVersions]);

  useEffect(() => {

    if (!isMonacoLoaded) {
      return;
    }

    const hosts: HostContainer[] = [];

    if (props.hostContainers) {
      hosts.push(...props.hostContainers);
    }

    if (props.addDefaultAdaptiveCardHostContainer) {
      hosts.push(...[
        new AdaptiveCardHostContainer('ACH - Default', AdaptiveCardHostContainerType.Default),
        new AdaptiveCardHostContainer('ACH - Teams', AdaptiveCardHostContainerType.TeamsDefault),
        new AdaptiveCardHostContainer('ACH - Teams Dark', AdaptiveCardHostContainerType.TeamsDark),
        new AdaptiveCardHostContainer('ACH - Teams High Contrast', AdaptiveCardHostContainerType.TeamsHighContrast)
      ]);
    }

    const cardDesigner = new CardDesigner(hosts);

    cardDesigner.bindingPreviewMode = (props.bindingPreviewMode)
      ? props.bindingPreviewMode
      : BindingPreviewMode.GeneratedData;

    addToolbarButton(cardDesigner, 'New Card', 'acd-icon-newCard',
      CardDesigner.ToolbarCommands.NewCard,
      true,
      CardDesigner.ToolbarCommands.NewCard,
      (sender) => {
        const text = 'Do you want to create a new Card?';
        if (confirm(text) === true) {
          cardDesigner.setCard((props.newCardPayload) ? props.newCardPayload : EmptyCard);
          cardDesigner.clearUndoStack();
          cardDesigner.designerSurface.updateLayout(true);
        }
      });

    if (props.onSave) {
      addToolbarButton(cardDesigner, 'Save', 'acd-icon-save',
        CardDesigner.ToolbarCommands.NewCard,
        true,
        null,
        (sender) => {
          const payload = cardDesigner.designerSurface.getCardPayloadAsObject();
          props.onSave(payload);
        });
    }

    if (props.showFluentBreakpointsPicker) {
      addToolbarChoicePicker(cardDesigner, CardDesigner.ToolbarCommands.HostAppPicker, true, 'Breakpoints:',
        [
          { name: 'Fluid (fit content)', value: '100%' },
          { name: 'Small (>= 320px)', value: '320px' },
          { name: 'Medium (>= 480px)', value: '480px' },
          { name: 'Large (>= 640px)', value: '640px' },
          { name: 'Extra large (>= 1024px)', value: '1024px' },
          { name: 'Extra extra large (>= 1366px)', value: '1366px' },
          { name: 'Extra extra extra large (>= 1920px)', value: '1920px' }
        ],
        (sender: ToolbarChoicePicker) => {
          currentBreakpointValueRef.current = sender.value;
          cardDesigner.designerSurface.context.hostContainer.cardHost.style.width = sender.value;
          cardDesigner.designerSurface.updateLayout(false);
        });
    }

    hideToolbarElement(cardDesigner, CardDesigner.ToolbarCommands.Help);

    if (props.showCopyToJsonToolbarCommand === false)
      hideToolbarElement(cardDesigner, CardDesigner.ToolbarCommands.CopyJSON);


    if (props.snippets) {
      props.snippets.forEach(item => {
        addToolboxSnippet(cardDesigner, item.category, item.name, item.payload);
      });
    }

    adaptiveCardDesignerInstanceRef.current = cardDesigner;
    cardDesigner.attachTo(renderElementRef.current);

    cardDesigner.monacoModuleLoaded(monacoRef.current);

    cardDesigner.setCard((props.card) ? props.card : (props.newCardPayload) ? props.newCardPayload : EmptyCard);
    cardDesigner.clearUndoStack();
    cardDesigner.designerSurface.updateLayout(true);

    cardDesigner.onActiveHostContainerChanged = (designer: CardDesigner) => {
      const hostConfig = designer.hostContainer.getHostConfig();
      cardDesigner.designerSurface.context.hostContainer.cardHost.style.width = currentBreakpointValueRef.current;
      cardDesigner.designerSurface.updateLayout(false);
      console.log(hostConfig);
    };

    cardDesigner.designerSurface.context.hostContainer.cardHost.style.width = '100%';
    cardDesigner.dataToolbox.collapse();

    const data = (props.data) ? props.data : { $root: {} };
    const dataObject = injectContextProperty(data,
      fluentUIDefaultTheme(),
      props.context);

    convertNullToEmptyString(dataObject);
    cardDesigner.dataStructure = FieldDefinition.deriveFrom(dataObject.$root);
  }, [isMonacoLoaded,
    props.addDefaultAdaptiveCardHostContainer,
    props.onSave,
    props.showFluentBreakpointsPicker,
    props.showCopyToJsonToolbarCommand,
    props.snippets]);

  return (<>
    <div ref={renderElementRef} />
    {!isMonacoLoaded &&
      <Spinner
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
        size={SpinnerSize.medium}
        label='loading...'
        ariaLive='assertive'
        labelPosition='bottom' />
    }
  </>);
};

AdaptiveCardDesigner.defaultProps = {
  newCardPayload: EmptyCard,
  hostContainers: [],
  supportedTargetVersions: [Versions.v1_0, Versions.v1_1, Versions.v1_2, Versions.v1_3, Versions.v1_4, Versions.v1_5],
  snippets: [],
  bindingPreviewMode: BindingPreviewMode.GeneratedData,
  enableDataBindingSupport: true,
  selectedHostContainerControlsTargetVersion: false,
  showTargetVersionMismatchWarning: true,
  showVersionPicker: false,
  showSampleDataEditorToolbox: false,
  showDataStructureToolbox: true,
  showFluentBreakpointsPicker: true,
  showCopyToJsonToolbarCommand: false,
  addDefaultAdaptiveCardHostContainer: true,
  injectAdaptiveCardHostContextProperty: true
};
