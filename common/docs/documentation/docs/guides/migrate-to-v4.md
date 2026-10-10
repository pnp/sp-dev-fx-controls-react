# Migrating to v4: PnPjs removal

This guide describes the PnPjs-related changes on the v4 development branch. It does not imply that v4 has been released or cover every change from earlier controls versions. The branch requires SPFx 1.23.2 or later (below 2.0.0), React 17 and the supported Node 22 development toolchain.

## Dependencies

The controls no longer require `@pnp/sp`, `@pnp/common` or `@pnp/odata`. Requests use SPFx HTTP clients. Do not install PnPjs solely for these controls. Applications that use PnPjs themselves may keep their own dependency at their chosen version.

All controls remain available, including DynamicForm, ModernTaxonomyPicker and classic TaxonomyPicker. `@pnp/telemetry-js` is separate from PnPjs and remains unchanged, including its opt-out mechanism.

## Public type imports

Import the control's data contracts from the controls library instead of PnPjs:

| Previous import | Replacement |
| --- | --- |
| `ITermInfo`, `ITermSetInfo`, `ITermStoreInfo` from `@pnp/sp/taxonomy` | `@pnp/spfx-controls-react/lib/ModernTaxonomyPicker` |
| `IFileInfo` from `@pnp/sp/files` | `@pnp/spfx-controls-react/lib/Common` |
| `ISiteUserInfo`, `IFieldInfo`, `INavNodeInfo`, `IInstalledLanguageInfo`, `ChoiceFieldFormatType` | `@pnp/spfx-controls-react/lib/Common` |
| DynamicForm callback's PnPjs `IItem` | `IDynamicFormItemReference` from `@pnp/spfx-controls-react/lib/DynamicForm` |

Taxonomy data retains the SharePoint response shape, including parent, children count and tagging metadata. These objects are data, not queryable SDK instances.

## DynamicForm submission

Previously, the callback could receive a live PnPjs item:

```tsx
// Before migration
<DynamicForm
  context={context}
  listId={listId}
  returnListItemInstanceOnSubmit={true}
  onSubmitted={async (data, item) => console.log(await item.get())}
/>
```

Use the saved data directly:

```tsx
import { DynamicForm, IDynamicFormItemReference } from "@pnp/spfx-controls-react/lib/DynamicForm";

<DynamicForm
  context={context}
  listId={listId}
  returnListItemReferenceOnSubmit={true}
  onSubmitted={(data, reference?: IDynamicFormItemReference) => {
    console.log("Saved item", data);
    console.log(reference?.webAbsoluteUrl, reference?.listId, reference?.listItemId, reference?.etag);
  }}
/>
```

Rename `returnListItemInstanceOnSubmit` to `returnListItemReferenceOnSubmit`. It still defaults to `true`; `false` omits the second argument. The reference has no `.get()`, `.update()` or other SDK methods. Consumers that need them can construct their own SDK object from the reference.

The same callback contract applies to item creation/update, uploaded documents, folders and document sets. A follow-up read supplies saved data and the current ETag. If a resource has already been persisted but a later step fails, `onSubmitError` receives an error with `saveCommitted: true` and `itemReference`; do not automatically submit the create operation again.

For incomplete uploads or metadata updates, `partialCommit: true` and `failedPhase` (`identify`, `upload` or `metadata`) distinguish partial persistence from a fully saved item whose final `read` failed. The error reference includes the server-relative path when known; `listItemId` can be absent if identification itself failed. Successful callbacks are invoked once, and callback errors do not trigger a write retry.

Both values of `useModernTaxonomyPicker` remain supported. Existing field overrides, validation, formatting, images, attachments, file selection and taxonomy fields are retained. File uploads retain the existing 10 MB chunk and overwrite defaults. Encoded folder paths remain supported and are decoded once; actual path case is preserved. Changing the web, list or item invalidates pending work so it cannot write to or update the replacement form.

## Request behavior and support

The replacement transport applies to the migrated PnPjs request paths, not every pre-existing request made anywhere in the library:

- Up to seven application-level attempts, including the initial request. Missing/invalid `Retry-After` uses exponential delays starting at 100 ms; valid seconds or HTTP-date values are honored.
- Explicit throttling responses can be retried. Reads and known replay-safe operations also handle transient 503/504 responses. Creates, conditional updates and upload finalization are not blindly repeated after an uncertain response.
- Permission, validation and ETag conflict errors are surfaced rather than repeatedly retried. The existing folder/document-set metadata-update conflict policy permits up to three 100 ms retries, within the request's overall budget.
- Batch results are handled independently: successful user resolutions remain available, and only eligible failed entries are retried. SharePoint changesets are not transactions.
- Digest acquisition has the same status-aware retry handling, with per-client/web in-memory caching and expiration. Credentials/digests are not stored persistently.
- List-item entity type names retain a five-day local-storage cache. This caches metadata, not list-item data. Blocked storage is reported and does not prevent the request.

SPFx handles browser credentials and its own authentication recovery. Seven attempts is an application retry limit, not a guarantee about every authentication-related wire request inside SPFx. Retry/cache settings are internal, not new public control props.

## Taxonomy endpoint caveat

ModernTaxonomyPicker continues using SharePoint `/_api/v2.1/termstore`, including `searchTerm`, `getLegacyChildren` and parent expansion. Classic TaxonomyPicker retains its existing ProcessQuery/internal-suggestions implementation.

These APIs are intentionally retained to preserve behavior that the documented Graph term model does not fully expose. Undocumented endpoints have no public compatibility guarantee. No Graph-only fallback fabricates tagging availability or silently removes functionality. Existing SharePoint-backed taxonomy reads introduce no new Graph consent requirement; consumer-provided Graph actions still require their own permissions.

Live behavior must be verified in a suitable SharePoint tenant; mocked tests alone cannot establish endpoint compatibility. When reporting a failure, include the HTTP status, request/correlation ID where available, and which operation failed. Do not publish digests, tokens, personal data or full sensitive request payloads.
