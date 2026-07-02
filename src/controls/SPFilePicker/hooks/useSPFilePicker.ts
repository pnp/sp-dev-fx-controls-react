import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { WebPartContext } from '@microsoft/sp-webpart-base';

import type {
  ISPFilePickerConfig,
  ISPFilePickerError,
  ISPFilePickerItem,
  ISPFilePickerRawConfiguration,
  SPFilePickerTarget,
  SPFilePickerTokenResolver,
} from '../ISPFilePicker.types';
import { useLogging } from './useLogging';
import * as strings from 'ControlStrings';

/**
 * Options accepted by {@link useSPFilePicker}.
 */
export interface IUseSPFilePickerOptions extends ISPFilePickerConfig {
  /** The SPFx web part context used for token acquisition. */
  context: WebPartContext;

  /** Where the picker is hosted. Defaults to `iframe`. */
  target?: SPFilePickerTarget;

  /**
   * Optional custom token resolver. When omitted, the hook uses the SPFx
   * `aadTokenProviderFactory` from `context` to acquire a token for the
   * SharePoint host origin.
   */
  getToken?: SPFilePickerTokenResolver;

  /** Fired with the picked items when the user confirms a selection. */
  onPicked?: (items: ISPFilePickerItem[]) => void;

  /** Fired when the picker is cancelled / closed without a selection. */
  onCancel?: () => void;

  /** Fired when an error occurs during the picker workflow. */
  onError?: (error: ISPFilePickerError) => void;
}

/**
 * Return value of {@link useSPFilePicker}.
 */
export interface IUseSPFilePickerReturn {
  /** Whether the picker surface is currently open. */
  isOpen: boolean;

  /** Whether the picker is currently being launched / loading. */
  isLoading: boolean;

  /** The last error, if any. */
  error: ISPFilePickerError | undefined;

  /**
   * Ref to attach to the hosting `<iframe>` element when `target === 'iframe'`.
   * The consumer must render the iframe (e.g. inside a dialog) while `isOpen`.
   */
  iframeRef: React.RefObject<HTMLIFrameElement>;

  /** Opens the picker. */
  open: () => void;

  /** Closes the picker and tears down messaging. */
  close: () => void;

  /**
   * Clears the loading state. Attach to the hosting `<iframe onLoad>` so the
   * loading overlay is removed once the picker page has loaded.
   */
  markLoaded: () => void;
}

const SDK_VERSION = '8.0';

/** Small RFC-4122-ish unique id used for the picker channel. */
function createChannelId(): string {
  const cryptoObj = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined;
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Removes any trailing slash so the resource can be combined with `.default`. */
function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

/**
 * Reusable engine hook that drives the SharePoint / OneDrive File Picker (v8).
 *
 * It encapsulates the full workflow — building the configuration, POSTing the
 * form into the iframe (or popup), establishing the `MessageChannel`, and
 * responding to the `authenticate`, `pick` and `close` commands — so any
 * control can offer a SharePoint file picker with just a few lines.
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, iframeRef } = useSPFilePicker({
 *   baseUrl: context.pageContext.web.absoluteUrl,
 *   selectionMode: 'multiple',
 *   fileTypes: ['docx', 'pdf'],
 *   onPicked: (items) => console.info(items),
 * });
 * ```
 */
export function useSPFilePicker(options: IUseSPFilePickerOptions): IUseSPFilePickerReturn {
  const {
    context,
    baseUrl,
    entry,
    selectionMode = 'single',
    itemsMode = 'files',
    fileTypes,
    locale = 'en-us',
    authMode = 'token',
    app,
    scenario,
    raw,
    target = 'iframe',
    getToken,
    onPicked,
    onCancel,
    onError,
  } = options;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ISPFilePickerError | undefined>(undefined);

  const { error: logError, info } = useLogging();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Mutable refs so the message listeners always see the latest values.
  const portRef = useRef<MessagePort | undefined>(undefined);
  const popupRef = useRef<Window | null>(null);
  const channelIdRef = useRef<string>('');
  const windowListenerRef = useRef<((event: MessageEvent) => void) | undefined>(undefined);

  // Keep the callbacks in refs so the messaging handlers are stable.
  const callbacksRef = useRef({ onPicked, onCancel, onError, getToken });
  callbacksRef.current = { onPicked, onCancel, onError, getToken };

  const raiseError = useCallback(
    (code: string, message: string) => {
      const err: ISPFilePickerError = { code, message };
      setError(err);
      logError(`${code}: ${message}`);
      callbacksRef.current.onError?.(err);
    },
    [logError],
  );

  /** Resolves a SharePoint token for the requested resource. */
  const resolveToken = useCallback(
    async (resource: string): Promise<string> => {
      const custom = callbacksRef.current.getToken;
      if (custom) {
        return custom(resource);
      }
      // The token resource must be the SharePoint host origin
      // (e.g. https://contoso.sharepoint.com), NOT a site-collection path.
      let origin = trimTrailingSlash(resource);
      try {
        origin = new URL(resource).origin;
      } catch {
        /* keep the trimmed value */
      }
      const tokenProvider = await context.aadTokenProviderFactory.getTokenProvider();
      return tokenProvider.getToken(origin);
    },
    [context],
  );

  /** Builds the v8 picker configuration object. */
  const buildConfiguration = useCallback(
    (channelId: string): ISPFilePickerRawConfiguration => {
      const useCookies = authMode === 'cookie';
      const base: ISPFilePickerRawConfiguration = {
        sdk: SDK_VERSION,
        // The current SharePoint site of `baseUrl` by default.
        entry: entry ?? { sharePoint: {} },
        // IMPORTANT: presence of `authentication` (even empty) tells the picker
        // the HOST will provide tokens (token mode). The empty object is ALSO
        // REQUIRED when embedding the picker in an iframe — without it the picker
        // renders but never delivers pick/close commands over the channel.
        // Cookie mode (omitting it) only works for a popup window target.
        ...(useCookies ? {} : { authentication: {} }),
        messaging: {
          origin: window.location.origin,
          channelId,
          // identifyParent is only relevant for the first-party (cookie) flow.
          ...(useCookies ? { identifyParent: true } : {}),
        },
        selection: { mode: selectionMode },
        typesAndSources: {
          mode: itemsMode,
          ...(fileTypes && fileTypes.length > 0 ? { filters: fileTypes } : {}),
        },
      };

      return { ...base, ...(raw ?? {}) } as ISPFilePickerRawConfiguration;
    },
    [entry, selectionMode, itemsMode, fileTypes, raw, authMode],
  );

  /** Tears down the message channel, listeners, and popup. */
  const teardown = useCallback(() => {
    if (windowListenerRef.current) {
      window.removeEventListener('message', windowListenerRef.current);
      windowListenerRef.current = undefined;
    }
    if (portRef.current) {
      try {
        portRef.current.close();
      } catch {
        /* no-op */
      }
      portRef.current = undefined;
    }
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }
    popupRef.current = null;
    channelIdRef.current = '';
  }, []);

  const close = useCallback(() => {
    teardown();
    setIsOpen(false);
    setIsLoading(false);
  }, [teardown]);

  /** Handles a single message received on the picker's message port. */
  const handlePortMessage = useCallback(
    async (message: MessageEvent): Promise<void> => {
      const port = portRef.current;
      if (!port) return;

      const payload = message.data;

      if (payload?.type === 'notification') {
        if (payload.data?.notification === 'page-loaded') {
          setIsLoading(false);
        }
        return;
      }

      if (payload?.type !== 'command') return;

      // All commands must be acknowledged.
      port.postMessage({ type: 'acknowledge', id: payload.id });

      const command = payload.data;

      switch (command?.command) {
        case 'authenticate': {
          try {
            const token = await resolveToken(command.resource);
            if (!token) {
              throw new Error(strings.SPFilePickerUnableToObtainTokenError);
            }
            port.postMessage({
              type: 'result',
              id: payload.id,
              data: { result: 'token', token },
            });
          } catch (e) {
            const messageText = e instanceof Error ? e.message : String(e);
            port.postMessage({
              type: 'result',
              id: payload.id,
              data: { result: 'error', error: { code: 'unableToObtainToken', message: messageText } },
            });
            raiseError('unableToObtainToken', messageText);
          }
          break;
        }

        case 'pick': {
          try {
            const items: ISPFilePickerItem[] = command.items ?? [];
            callbacksRef.current.onPicked?.(items);
            port.postMessage({
              type: 'result',
              id: payload.id,
              data: { result: 'success' },
            });
            close();
          } catch (e) {
            const messageText = e instanceof Error ? e.message : String(e);
            port.postMessage({
              type: 'result',
              id: payload.id,
              data: { result: 'error', error: { code: 'unusableItem', message: messageText } },
            });
            raiseError('unusableItem', messageText);
          }
          break;
        }

        case 'close': {
          callbacksRef.current.onCancel?.();
          close();
          break;
        }

        default: {
          port.postMessage({
            type: 'result',
            id: payload.id,
            data: {
              result: 'error',
              error: { code: 'unsupportedCommand', message: command?.command ?? 'unknown' },
            },
          });
          break;
        }
      }
    },
    [resolveToken, close, raiseError],
  );

  /** Wires the `initialize` handshake to the picker window. */
  const attachWindowListener = useCallback(
    (_pickerWindow: Window, channelId: string) => {
      const listener = (event: MessageEvent): void => {
        const data = event.data;
        // Match by channelId (a unique per-launch id). Source identity is not
        // reliable once the iframe navigates cross-origin, so we don't gate on it.
        if (data?.type === 'initialize' && data?.channelId === channelId) {
          const port = event.ports?.[0];
          if (!port) return;

          portRef.current = port;
          port.addEventListener('message', (m) => {
            void handlePortMessage(m);
          });
          port.start();
          port.postMessage({ type: 'activate' });
        }
      };

      windowListenerRef.current = listener;
      window.addEventListener('message', listener);
    },
    [handlePortMessage],
  );

  /** Loads the picker into the given window. */
  const submitPickerForm = useCallback(
    async (pickerWindow: Window, channelId: string): Promise<void> => {
      const useCookies = authMode === 'cookie';
      const configuration = buildConfiguration(channelId);

      const params = new URLSearchParams();
      if (app) params.set('app', app);
      if (scenario) params.set('scenario', scenario);
      params.set('filePicker', JSON.stringify(configuration));
      params.set('locale', locale);
      // Cookie mode uses the existing SharePoint session; no bearer token.
      if (useCookies) params.set('auth', 'none');

      const url = `${trimTrailingSlash(baseUrl)}/_layouts/15/FilePicker.aspx?${params.toString()}`;

      if (useCookies) {
        // GET navigation — the browser sends the user's SharePoint cookies.
        pickerWindow.location.href = url;
        return;
      }

      // Token mode: POST the access token so the picker can authenticate.
      const accessToken = await resolveToken(baseUrl);
      const doc = pickerWindow.document;
      const form = doc.createElement('form');
      form.setAttribute('action', url);
      form.setAttribute('method', 'POST');

      const tokenInput = doc.createElement('input');
      tokenInput.setAttribute('type', 'hidden');
      tokenInput.setAttribute('name', 'access_token');
      tokenInput.setAttribute('value', accessToken);
      form.appendChild(tokenInput);

      doc.body.append(form);
      form.submit();
    },
    [authMode, buildConfiguration, app, scenario, locale, baseUrl, resolveToken],
  );

  /** Performs the launch once a target window is available. */
  const launch = useCallback(
    async (pickerWindow: Window): Promise<void> => {
      const channelId = createChannelId();
      channelIdRef.current = channelId;
      attachWindowListener(pickerWindow, channelId);
      try {
        await submitPickerForm(pickerWindow, channelId);
      } catch (e) {
        const messageText = e instanceof Error ? e.message : String(e);
        raiseError('launchFailed', messageText);
        close();
      }
    },
    [attachWindowListener, submitPickerForm, raiseError, close],
  );

  const open = useCallback(() => {
    if (!baseUrl) {
      raiseError('missingBaseUrl', strings.SPFilePickerMissingBaseUrlError);
      return;
    }
    setError(undefined);
    setIsLoading(true);
    setIsOpen(true);

    if (target === 'window') {
      const win = window.open('', 'SPFilePicker', 'width=1080,height=680');
      if (!win) {
        raiseError('popupBlocked', strings.SPFilePickerPopupBlockedError);
        setIsOpen(false);
        setIsLoading(false);
        return;
      }
      popupRef.current = win;
      void launch(win);
    }
    // For iframe target the launch happens in the effect below once the
    // iframe has been rendered by the consumer.
  }, [baseUrl, target, launch, raiseError]);

  // Launch into the iframe once it is mounted and open.
  useEffect(() => {
    if (!isOpen || target !== 'iframe') return;
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    // Avoid re-launching if a channel is already established.
    if (channelIdRef.current) return;
    info('launching picker into iframe');
    void launch(win);
  }, [isOpen, target, launch, info]);

  // Clean up on unmount.
  useEffect(() => teardown, [teardown]);

  /** Clears the loading state — call from the iframe's `onLoad`. */
  const markLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  return useMemo(
    () => ({ isOpen, isLoading, error, iframeRef, open, close, markLoaded }),
    [isOpen, isLoading, error, open, close, markLoaded],
  );
}
