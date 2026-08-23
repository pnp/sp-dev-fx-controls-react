import * as React from 'react';
import {
  Button,
  FluentProvider,
  IdPrefixProvider,
  mergeClasses,
  Toast as FluentToast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  ToastTrigger,
  Toaster,
  useToastController,
  webLightTheme,
} from '@fluentui/react-components';
import type { Theme, ToastStatus } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

import type { IShowToastOptions, IToastController, IToastProviderProps } from './IToast';

const DEFAULT_DURATION_MS = 3000;
const DEFAULT_ID_PREFIX = 'toastControl-';
let providerInstanceId = 0;
let toastInstanceId = 0;

interface IDispatchMetadata {
  elementRef?: React.RefObject<HTMLDivElement>;
  onStatusChange?: (status: ToastStatus) => void;
}

export interface IToastContextValue extends IToastController {
  dispatchToast: (options: IShowToastOptions, metadata?: IDispatchMetadata) => string;
}

export const ToastContext = React.createContext<IToastContextValue | undefined>(undefined);

const hasContent = (content: React.ReactNode): boolean => content !== undefined && content !== null;

const getTimeout = (options: IShowToastOptions): number => {
  if (!options.autoDismiss) {
    return -1;
  }

  const duration = options.duration ?? DEFAULT_DURATION_MS;
  return options.durationUnit === 'seconds' ? duration * 1000 : duration;
};

interface IToastProviderControllerProps extends Omit<IToastProviderProps, 'toasterId'> {
  theme: Theme;
  idPrefix: string;
  toasterId: string;
}

const ToastProviderController = (props: IToastProviderControllerProps): React.ReactElement => {
  const {
    children,
    theme,
    idPrefix,
    toasterId,
    position = 'top-end',
    pauseOnHover = true,
    pauseOnWindowBlur = true,
    limit,
    offset,
    mountNode,
    inline,
  } = props;
  const controller = useToastController(toasterId);

  const dispatch = React.useCallback((options: IShowToastOptions, metadata?: IDispatchMetadata): string => {
    const {
      toastId: providedToastId,
      intent,
      title,
      body,
      subtitle,
      footer,
      media,
      action,
      position: toastPosition = position,
      pauseOnHover: toastPauseOnHover = pauseOnHover,
      pauseOnWindowBlur: toastPauseOnWindowBlur = pauseOnWindowBlur,
      dismissible = false,
      dismissAriaLabel = 'Dismiss notification',
      dismissAction,
      onDismiss,
      children: toastChildren,
      classNames,
      styles,
      titleProps,
      bodyProps,
      footerProps,
      autoDismiss = false,
      duration,
      durationUnit,
      ...toastProps
    } = options;
    const toastId = providedToastId ?? `${toasterId}-toast-${++toastInstanceId}`;
    const dismissActionElement = dismissAction ?? (
      <Button appearance="transparent" icon={<DismissRegular />} aria-label={dismissAriaLabel} />
    );
    const renderedAction = action ?? (dismissible ? <ToastTrigger>{dismissActionElement}</ToastTrigger> : undefined);

    controller.dispatchToast(
      <FluentToast
        {...toastProps}
        ref={metadata?.elementRef}
        className={mergeClasses(toastProps.className, classNames?.root)}
        style={{ ...toastProps.style, ...styles?.root }}
      >
        {hasContent(title) ? (
          <ToastTitle
            {...titleProps}
            media={hasContent(media) ? { children: media } : titleProps?.media}
            action={hasContent(renderedAction) ? { children: renderedAction } : titleProps?.action}
            className={mergeClasses(titleProps?.className, classNames?.title)}
            style={{ ...titleProps?.style, ...styles?.title }}
          >
            {title}
          </ToastTitle>
        ) : null}
        {hasContent(body) || hasContent(subtitle) || hasContent(toastChildren) ? (
          <ToastBody
            {...bodyProps}
            subtitle={hasContent(subtitle) ? { children: subtitle } : bodyProps?.subtitle}
            className={mergeClasses(bodyProps?.className, classNames?.body)}
            style={{ ...bodyProps?.style, ...styles?.body }}
          >
            {body ?? toastChildren}
          </ToastBody>
        ) : null}
        {hasContent(footer) ? (
          <ToastFooter
            {...footerProps}
            className={mergeClasses(footerProps?.className, classNames?.footer)}
            style={{ ...footerProps?.style, ...styles?.footer }}
          >
            {footer}
          </ToastFooter>
        ) : null}
      </FluentToast>,
      {
        toastId,
        intent,
        position: toastPosition,
        timeout: autoDismiss ? getTimeout({ ...options, duration, durationUnit }) : -1,
        pauseOnHover: toastPauseOnHover,
        pauseOnWindowBlur: toastPauseOnWindowBlur,
        onStatusChange: (_event, data): void => {
          metadata?.onStatusChange?.(data.status);
          if (data.status === 'dismissed') {
            onDismiss?.();
          }
        },
      },
    );

    return toastId;
  }, [controller, pauseOnHover, pauseOnWindowBlur, position, toasterId]);

  const contextValue = React.useMemo<IToastContextValue>(() => ({
    dispatchToast: dispatch,
    showToast: dispatch,
    dismissToast: controller.dismissToast,
    dismissAllToasts: controller.dismissAllToasts,
    pauseToast: controller.pauseToast,
    playToast: controller.playToast,
  }), [controller, dispatch]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* The Fluent providers wrap only the toaster so consumer content keeps its own theme and layout. */}
      <IdPrefixProvider value={idPrefix}>
        <FluentProvider theme={theme} style={{ backgroundColor: 'transparent' }}>
          <Toaster
            toasterId={toasterId}
            position={position}
            pauseOnHover={pauseOnHover}
            pauseOnWindowBlur={pauseOnWindowBlur}
            limit={limit}
            offset={offset}
            mountNode={mountNode}
            inline={inline}
          />
        </FluentProvider>
      </IdPrefixProvider>
    </ToastContext.Provider>
  );
};

export const ToastProvider = (props: IToastProviderProps): React.ReactElement => {
  const {
    children,
    theme = webLightTheme,
    idPrefix = DEFAULT_ID_PREFIX,
    toasterId: providedToasterId,
    ...toasterProps
  } = props;
  const toasterIdRef = React.useRef<string>();

  if (!toasterIdRef.current) {
    providerInstanceId += 1;
    toasterIdRef.current = providedToasterId ?? `${idPrefix}${providerInstanceId}-toaster`;
  }

  return (
    <ToastProviderController {...toasterProps} theme={theme} idPrefix={idPrefix} toasterId={toasterIdRef.current}>
      {children}
    </ToastProviderController>
  );
};