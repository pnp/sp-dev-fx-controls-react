export interface IJscriptDiagnosticsOptions {
  noSemanticValidation?: boolean;
  noSyntaxValidation?: boolean;
  noSuggestionDiagnostics?: boolean;
  /**
   * Limit diagnostic computation to only visible files.
   * Defaults to false.
   */
  onlyVisible?: boolean;
  diagnosticCodesToIgnore?: number[];
}
