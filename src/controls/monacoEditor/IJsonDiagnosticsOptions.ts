export type SeverityLevel = 'error' | 'warning' | 'ignore';
export interface IJsonDiagnosticsOptions {
  /**
   * If set, the validator will be enabled and perform syntax and schema based validation,
   * unless `DiagnosticsOptions.schemaValidation` is set to `ignore`.
   */
  readonly validate?: boolean;
  /**
   * If set, comments are tolerated. If set to false, syntax errors will be emitted for comments.
   * `DiagnosticsOptions.allowComments` will override this setting.
   */
  readonly allowComments?: boolean;
  /**
   * A list of known schemas and/or associations of schemas to file names.
   */
  readonly schemas?: {
      /**
       * The URI of the schema, which is also the identifier of the schema.
       */
      readonly uri: string;
      /**
       * A list of glob patterns that describe for which file URIs the JSON schema will be used.
       * '*' and '**' wildcards are supported. Exclusion patterns start with '!'.
       * For example '*.schema.json', 'package.json', '!foo*.schema.json', 'foo/**\/BADRESP.json'.
       * A match succeeds when there is at least one pattern matching and last matching pattern does not start with '!'.
       */
      readonly fileMatch?: string[];
      /**
       * The schema for the given URI.
       */
      readonly schema?: any;
  }[];
  /**
   *  If set, the schema service would load schema content on-demand with 'fetch' if available
   */
  readonly enableSchemaRequest?: boolean;
  /**
   * The severity of problems from schema validation. If set to 'ignore', schema validation will be skipped. If not set, 'warning' is used.
   */
  readonly schemaValidation?: SeverityLevel;
  /**
   * The severity of problems that occurred when resolving and loading schemas. If set to 'ignore', schema resolving problems are not reported. If not set, 'warning' is used.
   */
  readonly schemaRequest?: SeverityLevel;
  /**
   * The severity of reported trailing commas. If not set, trailing commas will be reported as errors.
   */
  readonly trailingCommas?: SeverityLevel;
  /**
   * The severity of reported comments. If not set, 'DiagnosticsOptions.allowComments' defines whether comments are ignored or reported as errors.
   */
  readonly comments?: SeverityLevel;
}
