import { isEmpty } from "lodash";
import * as React from "react";
import { Elanguages } from ".";
import { IMonacoEditorProps } from "./IMonacoEditorProps";
import { useMonacoEditorStyles } from "./useMonacoEditorStyles";
import { EStatus, useMonaco } from "./useMonaco";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import { Error } from "./Error";
import { editor } from "monaco-editor";

export const MonacoEditor: React.FunctionComponent<IMonacoEditorProps> = (
  props: React.PropsWithChildren<IMonacoEditorProps>
) => {
  const {
    value,
    onValueChange,
    theme,
    readOnly,
    showLineNumbers,
    showMiniMap,
    language,
    jsonDiagnosticsOptions,
    jscriptDiagnosticsOptions,
  } = props || ({} as IMonacoEditorProps);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const { controlClasses } = useMonacoEditorStyles();
  const { monaco, status, error } = useMonaco();

  const onDidChangeModelContent = React.useCallback(
    (e: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (editorRef.current) {
        const currentValue: string = editorRef.current.getValue();
        if (currentValue !== value) {
          const validationErrors: string[] = [];
          try {
            if (language === Elanguages.json) {
              JSON.parse(currentValue);
            }
          } catch (e) {
            validationErrors.push(e.message);
          }
          console.log(currentValue);
          onValueChange(currentValue, validationErrors);
        }
      }
    },
    [onValueChange]
  );

  React.useEffect(() => {
    if (status !== EStatus.LOADED) return;

    if (!isEmpty(jsonDiagnosticsOptions) && language === Elanguages.json) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions(jsonDiagnosticsOptions);
    }
    if (!isEmpty(jscriptDiagnosticsOptions) && language === Elanguages.javascript) {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(jscriptDiagnosticsOptions);
    }

    monaco.editor.onDidCreateModel((m: editor.ITextModel) => {
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
    return () => {
      editorRef?.current?.dispose();
    };
  }, [jsonDiagnosticsOptions, jscriptDiagnosticsOptions, monaco]);

  if (status === EStatus.LOADING) {
    return (
      <Stack horizontal horizontalAlign="center" tokens={{ padding: 25 }}>
        <Spinner size={SpinnerSize.medium} />
      </Stack>
    );
  }
  if (status === EStatus.ERROR) {
    return <Error error={error} show={true} />;
  }
  return (
    <>
      <div ref={containerRef} className={controlClasses.containerStyles} />
    </>
  );
};
