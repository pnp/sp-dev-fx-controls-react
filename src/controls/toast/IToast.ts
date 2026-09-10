import type * as React from 'react';
import type {
  Theme,
  ToastBodyProps,
  ToastFooterProps,
  ToastIntent,
  ToastOffset,
  ToastPosition,
  ToastProps as FluentToastProps,
  ToastTitleProps,
  ToasterProps,
} from '@fluentui/react-components';

export interface IToastClassNames {
  root?: string;
  title?: string;
  body?: string;
  footer?: string;
}

export interface IToastStyles {
  root?: React.CSSProperties;
  title?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
}

export interface IToastHandle {
  element: HTMLDivElement | undefined;
  show: () => void;
  dismiss: () => void;
  isVisible: () => boolean;
  focus: () => void;
}

export interface IToastProps extends Omit<FluentToastProps, 'children' | 'title'> {
  theme?: Theme;
  idPrefix?: string;
  intent?: ToastIntent;
  title?: React.ReactNode;
  body?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  media?: React.ReactNode;
  action?: React.ReactNode;
  autoDismiss?: boolean;
  duration?: number;
  durationUnit?: 'milliseconds' | 'seconds';
  position?: ToastPosition;
  pauseOnHover?: boolean;
  pauseOnWindowBlur?: boolean;
  dismissible?: boolean;
  dismissAriaLabel?: string;
  dismissAction?: React.ReactElement;
  onDismiss?: () => void;
  children?: React.ReactNode;
  classNames?: IToastClassNames;
  styles?: IToastStyles;
  titleProps?: ToastTitleProps;
  bodyProps?: ToastBodyProps;
  footerProps?: ToastFooterProps;
}

export interface IShowToastOptions extends Omit<IToastProps, 'theme' | 'idPrefix'> {
  toastId?: string;
}

export interface IToastProviderProps {
  children?: React.ReactNode;
  theme?: Theme;
  idPrefix?: string;
  toasterId?: string;
  position?: ToastPosition;
  pauseOnHover?: boolean;
  pauseOnWindowBlur?: boolean;
  limit?: number;
  offset?: ToastOffset;
  mountNode?: ToasterProps['mountNode'];
  inline?: boolean;
}

export interface IToastController {
  showToast: (options: IShowToastOptions) => string;
  dismissToast: (toastId: string) => void;
  dismissAllToasts: () => void;
  pauseToast: (toastId: string) => void;
  playToast: (toastId: string) => void;
}