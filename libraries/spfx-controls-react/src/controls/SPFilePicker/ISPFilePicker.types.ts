/**
 * Types for the SharePoint / OneDrive File Picker (SDK v8).
 *
 * The picker is a Microsoft-hosted page (`/_layouts/15/FilePicker.aspx`) that is
 * embedded in an iframe (or opened in a popup window). The host application and
 * the picker communicate through `postMessage` + a `MessageChannel` port.
 *
 * @see https://learn.microsoft.com/onedrive/developer/controls/file-pickers/
 */

/** Selection mode passed to the picker configuration. */
export type SPFilePickerSelectionMode = 'single' | 'multiple' | 'pick';

/** What kind of items the user is allowed to pick. */
export type SPFilePickerItemsMode = 'files' | 'folders' | 'all';

/** How the picker surface is hosted. */
export type SPFilePickerTarget = 'iframe' | 'window';

/**
 * How the picker authenticates.
 * - `token` (default): the host supplies SharePoint bearer tokens in response to
 *   the picker's `authenticate` command (via the SPFx `aadTokenProviderFactory`
 *   or a custom `getToken`). This is REQUIRED when embedding the picker in an
 *   iframe (`target: 'iframe'`) — the picker only delivers `pick`/`close`
 *   commands once a token channel is established — and is the correct mode for
 *   SPFx web parts. It requires the SharePoint API permissions
 *   (`AllSites.Read`, `MyFiles.Read`) to be approved in the tenant.
 * - `cookie`: relies on the user's existing SharePoint session cookies and omits
 *   the `authentication` config. This ONLY works with the popup window target
 *   (`target: 'window'`); it is not supported for iframe embedding, where the
 *   picker would render but never return a selection.
 */
export type SPFilePickerAuthMode = 'cookie' | 'token';

/**
 * The `entry` section of the picker configuration. Only ONE of these should be
 * supplied — the picker works with either OneDrive OR SharePoint per instance.
 * When omitted, the picker defaults to the SharePoint site of `baseUrl`.
 */
export interface ISPFilePickerEntry {
  /** Show the user's OneDrive. */
  oneDrive?: Record<string, unknown>;
  /** Show a SharePoint location. */
  sharePoint?: Record<string, unknown>;
  /** Show the current SharePoint site (of `baseUrl`). */
  site?: Record<string, unknown>;
}

/**
 * Raw v8 picker configuration object. Provided as an escape hatch through
 * {@link ISPFilePickerConfig.raw} for advanced scenarios not covered by the
 * friendly options.
 */
export interface ISPFilePickerRawConfiguration extends Record<string, unknown> {
  sdk: string;
  entry: ISPFilePickerEntry;
  /**
   * Presence of this object (even if empty) tells the picker the HOST will
   * supply tokens (token mode). Omit it entirely to make the picker rely on
   * the user's SharePoint cookies (cookie mode).
   */
  authentication?: Record<string, unknown>;
  messaging: {
    origin: string;
    channelId: string;
    /** Whether the picker should identify/verify the parent window. */
    identifyParent?: boolean;
    /** Whether the picker waits for the host configuration before rendering. */
    waitForConfiguration?: boolean;
  };
}

/**
 * Friendly configuration used to build the v8 picker configuration.
 */
export interface ISPFilePickerConfig {
  /**
   * SharePoint web URL used both as the picker host and the token resource,
   * e.g. `https://contoso.sharepoint.com/sites/dev` or
   * `https://contoso-my.sharepoint.com`.
   */
  baseUrl: string;

  /** Picker entry point. Defaults to `{ sharePoint: {} }`. */
  entry?: ISPFilePickerEntry;

  /** Selection mode. Defaults to `single`. */
  selectionMode?: SPFilePickerSelectionMode;

  /** Kind of items that can be picked. Defaults to `files`. */
  itemsMode?: SPFilePickerItemsMode;

  /**
   * Allowed file extensions (without the dot), e.g. `['docx', 'pdf']`.
   * When omitted, all file types are allowed.
   */
  fileTypes?: string[];

  /** Locale / LCID for the picker UI, e.g. `en-us`. Defaults to `en-us`. */
  locale?: string;

  /**
   * How the picker authenticates. Defaults to `token` (SharePoint bearer tokens
   * via the SPFx `aadTokenProviderFactory`), which is REQUIRED for the iframe
   * target and is the correct mode for SPFx web parts. Use `cookie` only with
   * the popup window target (`target: 'window'`).
   */
  authMode?: SPFilePickerAuthMode;

  /**
   * The hosting app identifier passed to the picker (query string `app`).
   * Not set by default. Only needed to opt into a specific SharePoint scenario.
   */
  app?: string;

  /**
   * The picker scenario passed to the picker (query string `scenario`).
   * Not set by default. Avoid SharePoint-internal scenarios (e.g. `SPBannerEdit`)
   * when embedding in a third-party context, as they run scenario-specific init.
   */
  scenario?: string;

  /**
   * Advanced escape hatch. When supplied, this object is merged over the
   * generated configuration, allowing any v8 option to be set directly.
   */
  raw?: Partial<ISPFilePickerRawConfiguration>;
}

/**
 * The `authenticate` command the picker sends when it needs a token.
 */
export interface ISPFilePickerAuthenticateCommand {
  command: 'authenticate';
  /** The resource the token must be issued for (a SharePoint URL). */
  resource: string;
  /** Token type requested by the picker, e.g. `SharePoint`. */
  type?: string;
}

/**
 * A single item returned by the picker. Only the guaranteed fields are typed;
 * the picker returns many more properties depending on the item.
 *
 * A drive-item URL can be built as:
 * `item['@sharePoint.endpoint'] + '/drives/' + item.parentReference.driveId + '/items/' + item.id`
 */
export interface ISPFilePickerItem extends Record<string, unknown> {
  id: string;
  name?: string;
  webUrl?: string;
  size?: number;
  parentReference?: {
    driveId?: string;
    [key: string]: unknown;
  };
  '@sharePoint.endpoint'?: string;
}

/** Error surfaced by the picker workflow. */
export interface ISPFilePickerError {
  code: string;
  message: string;
}

/**
 * Signature for the token resolver. Given the resource requested by the picker
 * it must return a valid SharePoint access token for that resource.
 */
export type SPFilePickerTokenResolver = (resource: string) => Promise<string>;
