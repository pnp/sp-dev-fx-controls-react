import * as React from 'react';
import {
  Button,
  Dialog,
  DialogSurface,
  Spinner,
} from '@fluentui/react-components';
import { useSPFilePicker } from './hooks/useSPFilePicker';
import { useSPFilePickerStyles } from './useSPFilePickerStyles';
import type { ISPFilePickerProps } from './ISPFilePickerProps';
import * as strings from 'ControlStrings';

const DEFAULT_WIDTH = 1080;
const DEFAULT_HEIGHT = 680;

/**
 * Ready-to-use SharePoint / OneDrive File Picker (SDK v8) control.
 *
 * Renders a trigger button that opens the Microsoft-hosted file picker inside a
 * modal dialog (iframe) or a popup window, and returns the selected items via
 * `onPicked`. Tokens are resolved through the SPFx `context`
 * (`aadTokenProviderFactory`) or a custom `getToken`.
 *
 * @example
 * ```tsx
 * <SPFilePicker
 *   context={this.context}
 *   selectionMode="multiple"
 *   fileTypes={['docx', 'pdf']}
 *   onPicked={(items) => setFiles(items)}
 * />
 * ```
 */
export const SPFilePicker: React.FunctionComponent<ISPFilePickerProps> = (props) => {
  const {
    context,
    baseUrl,
    entry,
    selectionMode = 'single',
    itemsMode = 'files',
    fileTypes,
    locale,
    authMode,
    app,
    scenario,
    target = 'iframe',
    getToken,
    onPicked,
    onCancel,
    onError,
    trigger,
    buttonText = strings.SPFilePickerButtonText,
    dialogTitle = strings.SPFilePickerDialogTitle,
    disabled = false,
    dialogWidth = DEFAULT_WIDTH,
    dialogHeight = DEFAULT_HEIGHT,
    className,
  } = props;

  const resolvedBaseUrl = baseUrl ?? context.pageContext.web.absoluteUrl ?? '';
  const styles = useSPFilePickerStyles(dialogHeight);

  const { isOpen, isLoading, iframeRef, open, markLoaded } = useSPFilePicker({
    context,
    baseUrl: resolvedBaseUrl,
    entry,
    selectionMode,
    itemsMode,
    fileTypes,
    locale,
    authMode,
    app,
    scenario,
    target,
    getToken,
    onPicked,
    onCancel,
    onError,
  });

  const renderTrigger = (): React.ReactNode => {
    if (trigger) {
      return (
        <span className={className} onClick={disabled ? undefined : open}>
          {trigger}
        </span>
      );
    }
    return (
      <Button
        className={className}
        appearance="primary"
        disabled={disabled || !resolvedBaseUrl}
        onClick={open}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <>
      {renderTrigger()}

      {target === 'iframe' && (
        <Dialog open={isOpen} modalType="modal">
          <DialogSurface
            className={styles.dialogSurface}
            style={{ maxWidth: dialogWidth, width: dialogWidth }}
          >
            <div className={styles.iframeWrapper}>
              {isLoading && (
                <div className={styles.spinnerOverlay}>
                  <Spinner size="large" />
                </div>
              )}
              <iframe
                ref={iframeRef}
                className={styles.iframe}
                title={dialogTitle}
                onLoad={markLoaded}
              />
            </div>
          </DialogSurface>
        </Dialog>
      )}
    </>
  );
};

SPFilePicker.displayName = 'SPFilePicker';
