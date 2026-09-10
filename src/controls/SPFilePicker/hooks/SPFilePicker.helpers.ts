import type {
  ISPFilePickerEntry,
  ISPFilePickerRawConfiguration,
  SPFilePickerAuthMode,
  SPFilePickerItemsMode,
  SPFilePickerSelectionMode,
} from '../ISPFilePicker.types';

const SDK_VERSION = '8.0';

export interface IBuildSPFilePickerConfigurationOptions {
  channelId: string;
  parentOrigin: string;
  entry?: ISPFilePickerEntry;
  selectionMode: SPFilePickerSelectionMode;
  itemsMode: SPFilePickerItemsMode;
  fileTypes?: string[];
  authMode: SPFilePickerAuthMode;
  raw?: Partial<ISPFilePickerRawConfiguration>;
}

export interface ISPFilePickerInitializeEvent {
  data: unknown;
  origin: string;
  source: MessageEvent['source'];
}

function isInitializeMessageData(
  value: unknown,
): value is { type?: unknown; channelId?: unknown } {
  return typeof value === 'object' && value !== null;
}

export function buildSPFilePickerConfiguration(
  options: IBuildSPFilePickerConfigurationOptions,
): ISPFilePickerRawConfiguration {
  const {
    channelId,
    parentOrigin,
    entry,
    selectionMode,
    itemsMode,
    fileTypes,
    authMode,
    raw,
  } = options;
  const useCookies = authMode === 'cookie';
  const configuration: ISPFilePickerRawConfiguration = {
    sdk: SDK_VERSION,
    entry: entry ?? { sharePoint: {} },
    ...(useCookies ? {} : { authentication: {} }),
    messaging: {
      origin: parentOrigin,
      channelId,
      ...(useCookies ? { identifyParent: true } : {}),
    },
    selection: { mode: selectionMode },
    typesAndSources: {
      mode: itemsMode,
      ...(fileTypes && fileTypes.length > 0 ? { filters: fileTypes } : {}),
    },
  };

  return Object.assign(configuration, raw ?? {});
}

export function isExpectedPickerInitializeEvent(
  event: ISPFilePickerInitializeEvent,
  pickerWindow: Window,
  channelId: string,
  expectedOrigin: string,
): boolean {
  if (!isInitializeMessageData(event.data)) {
    return false;
  }

  return (
    event.origin === expectedOrigin &&
    event.source === pickerWindow &&
    event.data.type === 'initialize' &&
    event.data.channelId === channelId
  );
}

export function requireAccessToken(accessToken: string, errorMessage: string): string {
  if (!accessToken) {
    throw new Error(errorMessage);
  }

  return accessToken;
}
