import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

export interface ISPFilePickerStyles {
  dialogSurface: string;
  iframeWrapper: string;
  iframe: string;
  spinnerOverlay: string;
}

export const useSPFilePickerStyles = (height: number): ISPFilePickerStyles => ({
  dialogSurface: css({
    padding: 0,
    overflow: 'hidden',
  }),

  iframeWrapper: css({
    position: 'relative',
    width: '100%',
    height,
    minHeight: 230,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground1,
  }),

  iframe: css({
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
  }),

  spinnerOverlay: css({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 1,
  }),
});
