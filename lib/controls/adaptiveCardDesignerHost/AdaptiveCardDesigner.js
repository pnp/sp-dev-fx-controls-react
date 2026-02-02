import * as monacoLoader from '@monaco-editor/loader';
import { Versions } from 'adaptivecards';
import { BindingPreviewMode, CardDesigner, FieldDefinition, GlobalSettings } from 'adaptivecards-designer';
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
export var EmptyCard = {
    '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
    'type': 'AdaptiveCard',
    'version': '1.5'
};
export var AdaptiveCardDesigner = function (props) {
    var adaptiveCardDesignerInstanceRef = useRef(null);
    var renderElementRef = useRef();
    var currentBreakpointValueRef = useRef('100%');
    var _a = useState(false), isMonacoLoaded = _a[0], setIsMonacoLoaded = _a[1];
    var monacoRef = useRef(null);
    // updateLayout on windows resize
    useEffect(function () {
        function handleResize() {
            var _a, _b;
            (_b = (_a = adaptiveCardDesignerInstanceRef.current) === null || _a === void 0 ? void 0 : _a.designerSurface) === null || _b === void 0 ? void 0 : _b.updateLayout(true);
        }
        window.addEventListener('resize', handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    });
    // *****
    useEffect(function () {
        CardDesigner.onProcessMarkdown = function (text, result) {
            result.outputHtml = new markdownit().render(text);
            result.didProcess = true;
        };
        applyAdaptiveCardDesignerStyles();
        monacoLoader.default.init().then(function (monaco) {
            // monaco as any => fix the problem with the type definition
            monacoRef.current = monaco;
            setIsMonacoLoaded(true);
        })
            .catch(function () { });
    }, []);
    useEffect(function () {
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
    useEffect(function () {
        if (!isMonacoLoaded) {
            return;
        }
        var hosts = [];
        if (props.hostContainers) {
            hosts.push.apply(hosts, props.hostContainers);
        }
        if (props.addDefaultAdaptiveCardHostContainer) {
            hosts.push.apply(hosts, [
                new AdaptiveCardHostContainer('ACH - Default', AdaptiveCardHostContainerType.Default),
                new AdaptiveCardHostContainer('ACH - Teams', AdaptiveCardHostContainerType.TeamsDefault),
                new AdaptiveCardHostContainer('ACH - Teams Dark', AdaptiveCardHostContainerType.TeamsDark),
                new AdaptiveCardHostContainer('ACH - Teams High Contrast', AdaptiveCardHostContainerType.TeamsHighContrast)
            ]);
        }
        var cardDesigner = new CardDesigner(hosts);
        cardDesigner.bindingPreviewMode = (props.bindingPreviewMode)
            ? props.bindingPreviewMode
            : BindingPreviewMode.GeneratedData;
        addToolbarButton(cardDesigner, 'New Card', 'acd-icon-newCard', CardDesigner.ToolbarCommands.NewCard, true, CardDesigner.ToolbarCommands.NewCard, function (sender) {
            var text = 'Do you want to create a new Card?';
            if (confirm(text) === true) {
                cardDesigner.setCard((props.newCardPayload) ? props.newCardPayload : EmptyCard);
                cardDesigner.clearUndoStack();
                cardDesigner.designerSurface.updateLayout(true);
            }
        });
        if (props.onSave) {
            addToolbarButton(cardDesigner, 'Save', 'acd-icon-save', CardDesigner.ToolbarCommands.NewCard, true, null, function (sender) {
                var payload = cardDesigner.designerSurface.getCardPayloadAsObject();
                props.onSave(payload);
            });
        }
        if (props.showFluentBreakpointsPicker) {
            addToolbarChoicePicker(cardDesigner, CardDesigner.ToolbarCommands.HostAppPicker, true, 'Breakpoints:', [
                { name: 'Fluid (fit content)', value: '100%' },
                { name: 'Small (>= 320px)', value: '320px' },
                { name: 'Medium (>= 480px)', value: '480px' },
                { name: 'Large (>= 640px)', value: '640px' },
                { name: 'Extra large (>= 1024px)', value: '1024px' },
                { name: 'Extra extra large (>= 1366px)', value: '1366px' },
                { name: 'Extra extra extra large (>= 1920px)', value: '1920px' }
            ], function (sender) {
                currentBreakpointValueRef.current = sender.value;
                cardDesigner.designerSurface.context.hostContainer.cardHost.style.width = sender.value;
                cardDesigner.designerSurface.updateLayout(false);
            });
        }
        hideToolbarElement(cardDesigner, CardDesigner.ToolbarCommands.Help);
        if (props.showCopyToJsonToolbarCommand === false)
            hideToolbarElement(cardDesigner, CardDesigner.ToolbarCommands.CopyJSON);
        if (props.snippets) {
            props.snippets.forEach(function (item) {
                addToolboxSnippet(cardDesigner, item.category, item.name, item.payload);
            });
        }
        adaptiveCardDesignerInstanceRef.current = cardDesigner;
        cardDesigner.attachTo(renderElementRef.current);
        cardDesigner.monacoModuleLoaded(monacoRef.current);
        cardDesigner.setCard((props.card) ? props.card : (props.newCardPayload) ? props.newCardPayload : EmptyCard);
        cardDesigner.clearUndoStack();
        cardDesigner.designerSurface.updateLayout(true);
        cardDesigner.onActiveHostContainerChanged = function (designer) {
            var hostConfig = designer.hostContainer.getHostConfig();
            cardDesigner.designerSurface.context.hostContainer.cardHost.style.width = currentBreakpointValueRef.current;
            cardDesigner.designerSurface.updateLayout(false);
            console.log(hostConfig);
        };
        cardDesigner.designerSurface.context.hostContainer.cardHost.style.width = '100%';
        cardDesigner.dataToolbox.collapse();
        var data = (props.data) ? props.data : { $root: {} };
        var dataObject = injectContextProperty(data, fluentUIDefaultTheme(), props.context);
        convertNullToEmptyString(dataObject);
        cardDesigner.dataStructure = FieldDefinition.deriveFrom(dataObject.$root);
    }, [isMonacoLoaded,
        props.addDefaultAdaptiveCardHostContainer,
        props.onSave,
        props.showFluentBreakpointsPicker,
        props.showCopyToJsonToolbarCommand,
        props.snippets]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: renderElementRef }),
        !isMonacoLoaded &&
            React.createElement(Spinner, { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }, size: SpinnerSize.medium, label: 'loading...', ariaLive: 'assertive', labelPosition: 'bottom' })));
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
//# sourceMappingURL=AdaptiveCardDesigner.js.map