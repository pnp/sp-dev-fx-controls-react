# Toast control

The Toast controls provide complete Fluent UI v9 notifications without requiring consumers to configure Fluent's `Toaster`, controller IDs, dispatch options, or content primitives. Use the declarative `Toast` for a single notification, or `ToastProvider` and `useToast` for a shared queue of notifications.

## How to use this control

- Import the control into your component:

```tsx
import * as React from 'react';
import { Toast } from '@pnp/spfx-controls-react/lib/Toast';

export const Example = (): React.ReactElement => (
  <Toast
    title="Decision saved"
    body="DEC-2026-0042 was updated successfully."
    subtitle="Just now"
    intent="success"
    dismissible
    autoDismiss
    duration={3}
    durationUnit="seconds"
  />
);
```

When no shared provider is present, `Toast` automatically configures `FluentProvider`, `IdPrefixProvider`, `Toaster`, and `useToastController`. The notification uses Fluent UI's native portal positioning, intent icons, accessibility behavior, animation, and timer.

## Shared provider and hook

For applications that can display multiple notifications, wrap the application or web part content once with `ToastProvider`:

```tsx
import * as React from 'react';
import { ToastProvider } from '@pnp/spfx-controls-react/lib/Toast';

export const App = (): React.ReactElement => (
  <ToastProvider position="top-end" limit={4}>
    <AppContent />
  </ToastProvider>
);
```

Components beneath the provider can display notifications through `useToast`:

```tsx
import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { useToast } from '@pnp/spfx-controls-react/lib/Toast';

export const SaveButton = (): React.ReactElement => {
  const { showToast } = useToast();

  return (
    <Button
      onClick={() => showToast({
        title: 'Saved',
        body: 'Your changes were saved successfully.',
        intent: 'success',
        dismissible: true,
        autoDismiss: true,
        duration: 5,
        durationUnit: 'seconds',
      })}
    >
      Save
    </Button>
  );
};
```

All hook calls under the same provider use one native Fluent UI queue, so simultaneous notifications stack, respect the provider limit, and share positioning and keyboard behavior. The provider applies its Fluent UI theme only to the notifications; wrapped application content keeps its own theme, styling, and layout.

Declarative `Toast` components rendered beneath a `ToastProvider` automatically join the same queue. They retain the same property-only API and do not create another toaster.

### Position and pause behavior

```tsx
import * as React from 'react';
import { Toast } from '@pnp/spfx-controls-react/lib/Toast';

export const WarningToast = (): React.ReactElement => (
  <Toast
    title="Review required"
    body="Check the submitted values before continuing."
    intent="warning"
    position="bottom-end"
    autoDismiss
    duration={8}
    durationUnit="seconds"
    pauseOnHover
    pauseOnWindowBlur
  />
);
```

## Implementation

The `Toast` control can be configured with the following properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| theme | `Theme` | No | Fluent UI v9 theme applied by the control. Defaults to `webLightTheme`. |
| idPrefix | `string` | No | Prefix used for generated Fluent UI IDs. Defaults to `'toastControl-'`. |
| intent | `'info' \| 'success' \| 'warning' \| 'error'` | No | Applies the standard intent icon and accessible notification role for standalone usage. |
| title | `React.ReactNode` | No | Main content displayed in the title region. |
| body | `React.ReactNode` | No | Primary content displayed in the body. |
| subtitle | `React.ReactNode` | No | Supporting content displayed below the body. |
| footer | `React.ReactNode` | No | Content displayed in the footer. |
| media | `React.ReactNode` | No | Icon or media displayed in the title region. |
| action | `React.ReactNode` | No | Custom action displayed in the title region. |
| autoDismiss | `boolean` | No | Dismisses the toast after the configured duration. Defaults to `false`. |
| duration | `number` | No | Delay before automatic dismissal. Defaults to `3000` milliseconds. |
| durationUnit | `'milliseconds' \| 'seconds'` | No | Unit used by `duration`. Defaults to `'milliseconds'`. |
| position | `'top-end' \| 'top-start' \| 'bottom-end' \| 'bottom-start' \| 'top' \| 'bottom'` | No | Portal position of the toast. Defaults to `'top-end'`. |
| pauseOnHover | `boolean` | No | Pauses the auto-dismiss timer while the pointer is over the toast. Defaults to `true`. |
| pauseOnWindowBlur | `boolean` | No | Pauses the auto-dismiss timer while the browser window is inactive. Defaults to `true`. |
| dismissible | `boolean` | No | Displays a dismiss action. Defaults to `false`. |
| dismissAriaLabel | `string` | No | Accessible label for the default dismiss button. |
| dismissAction | `React.ReactElement` | No | Custom element used instead of the default dismiss button. |
| onDismiss | `() => void` | No | Called once when the toast is dismissed. |
| children | `React.ReactNode` | No | Body content used when `body` is not provided. |
| classNames | `IToastClassNames` | No | Class names for the root, title, body, and footer. |
| styles | `IToastStyles` | No | Inline styles for the root, title, body, and footer. |
| titleProps | `ToastTitleProps` | No | Additional Fluent UI title properties. |
| bodyProps | `ToastBodyProps` | No | Additional Fluent UI body properties. |
| footerProps | `ToastFooterProps` | No | Additional Fluent UI footer properties. |

All other supported Fluent UI `ToastProps` are passed to the underlying toast.

The direct `intent` property is passed to Fluent UI's toast controller, which supplies the standard intent icon and accessibility politeness. A custom `media` value overrides the standard icon.

### ToastProvider properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| children | `React.ReactNode` | No | Application or web part content that can access the shared toast queue. |
| theme | `Theme` | No | Fluent UI v9 theme applied to the toaster. Defaults to `webLightTheme`. |
| idPrefix | `string` | No | Prefix used for generated Fluent IDs. Defaults to `'toastControl-'`. |
| toasterId | `string` | No | Stable toaster ID. A unique ID is generated when omitted. |
| position | `ToastPosition` | No | Default position for notifications. Defaults to `'top-end'`. |
| pauseOnHover | `boolean` | No | Default hover pause behavior. Defaults to `true`. |
| pauseOnWindowBlur | `boolean` | No | Default inactive-window pause behavior. Defaults to `true`. |
| limit | `number` | No | Maximum number of visible notifications before additional notifications are queued. |
| offset | `ToastOffset` | No | Distance between the toaster and viewport edges. |
| mountNode | `HTMLElement` | No | Custom portal mount node. |
| inline | `boolean` | No | Renders the toaster inline instead of through a portal. |

### useToast API

The `useToast` hook must be called beneath `ToastProvider`. It returns:

| Method | Description |
| --- | --- |
| `showToast(options)` | Displays a notification and returns its generated or supplied toast ID. |
| `dismissToast(toastId)` | Dismisses one notification. |
| `dismissAllToasts()` | Dismisses every notification in the provider queue. |
| `pauseToast(toastId)` | Pauses one notification's timer. |
| `playToast(toastId)` | Resumes one notification's timer. |

## Rendering lifecycle

The toast is dispatched when the component mounts. Render it conditionally when an application event should display a notification:

```tsx
{showSavedToast && (
  <Toast
    title="Saved"
    body="Your changes were saved."
    intent="success"
    autoDismiss
    onDismiss={() => setShowSavedToast(false)}
  />
)}
```

A standalone `Toast` owns a private toaster. Place multiple declarative toasts beneath one `ToastProvider`, or use `showToast`, when notifications may be visible simultaneously.

## Imperative API

Use an `IToastHandle` ref to show, dismiss, inspect, or focus the toast:

```tsx
import { Button } from '@fluentui/react-components';
import { IToastHandle, Toast } from '@pnp/spfx-controls-react/lib/Toast';

const toastRef = React.useRef<IToastHandle>(null);

<Toast ref={toastRef} title="Saved" />
<Button onClick={() => toastRef.current?.show()}>Show</Button>
<Button onClick={() => toastRef.current?.dismiss()}>Dismiss</Button>
```

The handle exposes `show()`, `dismiss()`, `isVisible()`, `focus()`, and the root `element`.

## Accessibility

The controls preserve Fluent UI keyboard, focus, queue, and live-region behavior. Intent controls native live-region politeness, and the default dismiss button has a configurable accessible label.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/Toast)