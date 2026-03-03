import { isEmpty } from "lodash";
import * as React from "react";
import { Elanguages } from ".";
import { useMonacoEditorStyles } from "./useMonacoEditorStyles";
import { EStatus, useMonaco } from "./useMonaco";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import { Error } from "./Error";
export var MonacoEditor = function (props) {
    var _a = props || {}, value = _a.value, onValueChange = _a.onValueChange, theme = _a.theme, readOnly = _a.readOnly, showLineNumbers = _a.showLineNumbers, showMiniMap = _a.showMiniMap, language = _a.language, jsonDiagnosticsOptions = _a.jsonDiagnosticsOptions, jscriptDiagnosticsOptions = _a.jscriptDiagnosticsOptions;
    var containerRef = React.useRef(null);
    var editorRef = React.useRef(null); // eslint-disable-line @typescript-eslint/no-explicit-any
    var controlClasses = useMonacoEditorStyles().controlClasses;
    var _b = useMonaco(), monaco = _b.monaco, status = _b.status, error = _b.error;
    var onDidChangeModelContent = React.useCallback(function (e) {
        if (editorRef.current) {
            var currentValue = editorRef.current.getValue();
            if (currentValue !== value) {
                var validationErrors = [];
                try {
                    if (language === Elanguages.json) {
                        JSON.parse(currentValue);
                    }
                }
                catch (e) {
                    validationErrors.push(e.message);
                }
                console.log(currentValue);
                onValueChange(currentValue, validationErrors);
            }
        }
    }, [onValueChange]);
    React.useEffect(function () {
        if (status !== EStatus.LOADED)
            return;
        if (!isEmpty(jsonDiagnosticsOptions) && language === Elanguages.json) {
            monaco.languages.json.jsonDefaults.setDiagnosticsOptions(jsonDiagnosticsOptions);
        }
        if (!isEmpty(jscriptDiagnosticsOptions) && language === Elanguages.javascript) {
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(jscriptDiagnosticsOptions);
        }
        monaco.editor.onDidCreateModel(function (m) {
            m.updateOptions({
                tabSize: 2,
            });
        });
        //Create the MonacoEditor
        editorRef.current = monaco.editor.create(containerRef.current, {
            value: value,
            scrollBeyondLastLine: false,
            theme: theme,
            language: language,
            folding: true,
            readOnly: readOnly,
            lineNumbersMinChars: 4,
            lineNumbers: showLineNumbers ? "on" : "off",
            minimap: {
                enabled: showMiniMap,
            },
        });
        editorRef.current.onDidChangeModelContent(onDidChangeModelContent);
        return function () {
            var _a;
            (_a = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _a === void 0 ? void 0 : _a.dispose();
        };
    }, [jsonDiagnosticsOptions, jscriptDiagnosticsOptions, monaco]);
    if (status === EStatus.LOADING) {
        return (React.createElement(Stack, { horizontal: true, horizontalAlign: "center", tokens: { padding: 25 } },
            React.createElement(Spinner, { size: SpinnerSize.medium })));
    }
    if (status === EStatus.ERROR) {
        return React.createElement(Error, { error: error, show: true });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: containerRef, className: controlClasses.containerStyles })));
};
//# sourceMappingURL=MonacoEditor.js.map