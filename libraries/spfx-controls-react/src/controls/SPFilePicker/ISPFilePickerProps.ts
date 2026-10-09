import type { MouseEventHandler, ReactElement } from 'react';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import type {
  ISPFilePickerEntry,
  ISPFilePickerError,
  ISPFilePickerItem,
  SPFilePickerAuthMode,
  SPFilePickerItemsMode,
  SPFilePickerSelectionMode,
  SPFilePickerTarget,
  SPFilePickerTokenResolver,
} from './ISPFilePicker.types';

export interface ISPFilePickerTriggerProps {
  'aria-disabled'?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

/**
 * Props for the ready-to-use {@link SPFilePicker} component.
 *
 * The component renders a trigger button that opens the SharePoint / OneDrive
 * File Picker (v8) inside a modal dialog (iframe) or a popup window. For full
 * control over the surface, use the {@link useSPFilePicker} hook directly.
 */
export interface ISPFilePickerProps {
  /**
   * The SPFx web part context. Used to resolve the default `baseUrl` from
   * `pageContext.web.absoluteUrl` and to acquire SharePoint access tokens via
   * the `aadTokenProviderFactory` when no custom `getToken` is supplied.
   */
  context: WebPartContext;

  /**
   * SharePoint web URL used as the picker host and token resource. When omitted,
   * the component falls back to `context.pageContext.web.absoluteUrl`.
   */
  baseUrl?: string;

  /** Picker entry point. Defaults to `{ sharePoint: {} }`. */
  entry?: ISPFilePickerEntry;

  /** Selection mode. Defaults to `single`. */
  selectionMode?: SPFilePickerSelectionMode;

  /** Kind of items that can be picked. Defaults to `files`. */
  itemsMode?: SPFilePickerItemsMode;

  /** Allowed file extensions (without the dot), e.g. `['docx', 'pdf']`. */
  fileTypes?: string[];

  /** Locale / LCID for the picker UI. Defaults to `en-us`. */
  locale?: string;

  /**
   * How the picker authenticates. Defaults to `token` (SharePoint bearer tokens
   * via the SPFx `aadTokenProviderFactory` or a custom `getToken`), which is
   * REQUIRED for the iframe target and is the correct mode for SPFx web parts.
   * Use `cookie` only with the popup window target (`target: 'window'`).
   */
  authMode?: SPFilePickerAuthMode;

  /** Hosting app identifier (query string `app`). Not set by default. */
  app?: string;

  /** Picker scenario (query string `scenario`). Not set by default. */
  scenario?: string;

  /** Where the picker is hosted. Defaults to `iframe` (rendered in a dialog). */
  target?: SPFilePickerTarget;

  /**
   * Custom token resolver. When omitted, the SPFx `aadTokenProviderFactory`
   * from `context` is used to acquire a token for the SharePoint resource.
   */
  getToken?: SPFilePickerTokenResolver;

  /* ---- callbacks ---- */
  /** Fired with the picked items when the user confirms a selection. */
  onPicked: (items: ISPFilePickerItem[]) => void;

  /** Fired when the picker is cancelled / closed without a selection. */
  onCancel?: () => void;

  /** Fired when an error occurs during the picker workflow. */
  onError?: (error: ISPFilePickerError) => void;

  /* ---- appearance ---- */
  /**
   * Custom interactive trigger element. When provided it replaces the default
   * button and receives an `onClick` handler that opens the picker.
   */
  trigger?: ReactElement<ISPFilePickerTriggerProps>;

  /** Text for the default trigger button. Defaults to `Select from SharePoint`. */
  buttonText?: string;

  /** Accessible title applied to the picker iframe. Defaults to `Select a file`. */
  dialogTitle?: string;

  /** Disable the trigger. */
  disabled?: boolean;

  /** Dialog width in px (iframe target). Defaults to `1080`. */
  dialogWidth?: number;

  /** Dialog / iframe height in px (iframe target). Defaults to `680`. */
  dialogHeight?: number;

  /** Additional CSS class applied to the trigger element. */
  className?: string;
}
