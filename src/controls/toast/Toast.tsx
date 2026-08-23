import * as React from 'react';

import type { IShowToastOptions, IToastHandle, IToastProps } from './IToast';
import { ToastContext, ToastProvider } from './ToastProvider';

interface IToastDispatcherProps extends IShowToastOptions {
  toastRef: React.ForwardedRef<IToastHandle>;
}

const ToastDispatcher = (props: IToastDispatcherProps): React.ReactElement => {
  const { toastRef: forwardedRef, onDismiss, ...options } = props;
  const context = React.useContext(ToastContext);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const toastIdRef = React.useRef<string>();
  const activeRef = React.useRef(false);
  const visibleRef = React.useRef(false);
  const mountedRef = React.useRef(false);
  const optionsRef = React.useRef(options);
  const onDismissRef = React.useRef(onDismiss);

  if (!context) {
    throw new Error('ToastDispatcher must be used within a ToastProvider.');
  }

  optionsRef.current = options;
  onDismissRef.current = onDismiss;

  const dismiss = React.useCallback((): void => {
    if (toastIdRef.current) {
      context.dismissToast(toastIdRef.current);
    }
  }, [context]);

  const show = React.useCallback((): void => {
    if (activeRef.current) {
      return;
    }

    activeRef.current = true;
    toastIdRef.current = context.dispatchToast(
      {
        ...optionsRef.current,
        onDismiss: () => {
          if (mountedRef.current) {
            onDismissRef.current?.();
          }
        },
      },
      {
        elementRef,
        onStatusChange: (status) => {
          activeRef.current = status === 'queued' || status === 'visible';
          visibleRef.current = status === 'visible';
        },
      },
    );
  }, [context]);

  React.useImperativeHandle(forwardedRef, () => ({
    get element(): HTMLDivElement | undefined {
      return elementRef.current ?? undefined;
    },
    show,
    dismiss,
    isVisible: () => visibleRef.current,
    focus: () => elementRef.current?.focus(),
  }), [dismiss, show]);

  React.useEffect(() => {
    mountedRef.current = true;
    show();
    return () => {
      mountedRef.current = false;
      dismiss();
    };
  }, [dismiss, show]);

  return <></>;
};

export const Toast = React.forwardRef<IToastHandle, IToastProps>((props, ref) => {
  const context = React.useContext(ToastContext);
  const { theme, idPrefix, position, pauseOnHover, pauseOnWindowBlur, ...toastOptions } = props;
  const dispatcher = (
    <ToastDispatcher
      {...toastOptions}
      position={position}
      pauseOnHover={pauseOnHover}
      pauseOnWindowBlur={pauseOnWindowBlur}
      toastRef={ref}
    />
  );

  if (context) {
    return dispatcher;
  }

  return (
    <ToastProvider
      theme={theme}
      idPrefix={idPrefix}
      position={position}
      pauseOnHover={pauseOnHover}
      pauseOnWindowBlur={pauseOnWindowBlur}
    >
      {dispatcher}
    </ToastProvider>
  );
});

Toast.displayName = 'Toast';