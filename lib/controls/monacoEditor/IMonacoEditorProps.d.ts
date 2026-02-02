import * as monaco from "monaco-editor";
export declare enum Elanguages {
    typescript = "typescript",
    javascript = "javascript",
    css = "css",
    html = "html",
    json = "json",
    xml = "xml",
    markdown = "markdown",
    less = "less",
    scss = "scss",
    handlebars = "handlebars"
}
export interface IMonacoEditorProps {
    value: string;
    theme?: string;
    readOnly?: boolean;
    showLineNumbers?: boolean;
    showMiniMap?: boolean;
    onValueChange?: (newValue: string, validationErrors: string[]) => void;
    language: string | Elanguages;
    jsonDiagnosticsOptions?: monaco.languages.json.DiagnosticsOptions;
    jscriptDiagnosticsOptions?: monaco.languages.typescript.DiagnosticsOptions;
}
//# sourceMappingURL=IMonacoEditorProps.d.ts.map