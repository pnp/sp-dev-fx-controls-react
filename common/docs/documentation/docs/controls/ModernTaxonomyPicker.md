# ModernTaxonomyPicker control

Select one or more managed metadata terms, browse a term hierarchy, search labels,
and optionally show selected terms' parent paths.

## How to use this control

Install the controls library as described in [getting started](../index.md#getting-started).
PnPjs is not required.

```tsx
import { ModernTaxonomyPicker, ITermInfo } from "@pnp/spfx-controls-react/lib/ModernTaxonomyPicker";

<ModernTaxonomyPicker
  context={context}
  termSetId={termSetId}
  label="Categories"
  panelTitle="Select categories"
  allowMultipleSelections={true}
  onChange={(terms?: ITermInfo[]) => console.log(terms)}
/>
```

Import `ITermInfo`, `ITermSetInfo` and `ITermStoreInfo` from this control's entry
point, not `@pnp/sp/taxonomy`. See the [v4 migration guide](../guides/migrate-to-v4.md).
Term data retains the SharePoint shape, including labels, parents, child counts,
deprecation and per-set tagging availability.

## Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| context | BaseComponentContext | yes | SPFx context providing the HTTP client and culture. |
| webAbsoluteUrl | string | no | Target SharePoint web; defaults to the context web. |
| termSetId | string | yes | Term set GUID. |
| anchorTermId | string | no | Restrict browsing/search to an anchor term. |
| panelTitle | string | yes | Picker panel heading. |
| label | string | yes | Field label. |
| allowMultipleSelections | boolean | no | Permit multiple selected terms. |
| isPathRendered | boolean | no | Display parent paths for selected terms. |
| initialValues | Partial term information[] | no | Initial terms, with ID and labels. This is initialization, not a controlled value. See the exported prop type for optional metadata fields. |
| onChange | (terms?: ITermInfo[]) => void | no | Selected term data. |
| disabled | boolean | no | Disable selection. |
| required | boolean | no | Mark the field required. |
| placeHolder | string | no | Input placeholder. |
| customPanelWidth | number | no | Custom panel width. |
| themeVariant | IReadonlyTheme | no | Theme variant. |
| termPickerProps | picker props | no | Customize the underlying term picker and suggestion behavior. |
| isLightDismiss | boolean | no | Allow dismissing the panel outside its bounds. |
| isBlocking | boolean | no | Block interaction outside the panel. |
| allowSelectingChildren | boolean | no | Control descendant selection; the service defaults to allowing descendants. |
| onRenderItem | item renderer | no | Customize selected term rendering. |
| onRenderSuggestionsItem | suggestion renderer | no | Customize suggestion rendering. |
| onRenderActionButton | action renderer | no | Render term/set actions; the tree supplies an update callback for refreshing changed terms. |

The browser loads children in pages (50 by default). Selection, locale fallback,
server ordering, parent paths and tagging/deprecation filtering remain available.
Service failures are reported separately from an empty term set.

## Direct taxonomy service

`SPTaxonomyService` remains exported and accepts a context plus an optional target web:

```ts
import { Guid } from "@microsoft/sp-core-library";
import { SPTaxonomyService } from "@pnp/spfx-controls-react/lib/ModernTaxonomyPicker";

const service = new SPTaxonomyService(context, targetWebUrl);
const store = await service.getTermStoreInfo();
const set = await service.getTermSetInfo(Guid.parse(termSetId));
const firstPage = await service.getTerms(Guid.parse(termSetId), undefined, undefined, true, 50);
if (firstPage.skiptoken) {
  const nextPage = await service.getTerms(
    Guid.parse(termSetId), undefined, firstPage.skiptoken, true, 50
  );
  console.log(nextPage.value);
}
console.log(store, set);
```

Pass `skiptoken` back unchanged. `getTermById` includes parent information.
`searchTerm` accepts a label, language, optional anchor and descendant-selection
restriction. Failed calls reject; callers should display or log the error.
`dispose()` prevents additional retry attempts when a service instance is no longer used.

`ModernTermPicker`, `TaxonomyTree`, `TaxonomyPanelContents` and term rendering
components remain available from the same entry point. They accept the owned term
types and existing rendering/selection callbacks. When using `TaxonomyTree`
directly, supply its `onLoadMoreData` from `service.getTerms`, current store/set
information, language, selected terms and `setTerms`.

## Custom actions without PnPjs

The action renderer receives store/set/term data and, when invoked by the tree,
a callback accepting new terms, parent terms, updated terms and deleted terms.
The consumer is responsible for authorization and error presentation.

For example, an action can create a child using the same SharePoint backend and
then reload the real term metadata before updating the tree:

```ts
import { SPHttpClient } from "@microsoft/sp-http";
import { Guid } from "@microsoft/sp-core-library";
import {
  ITermInfo,
  SPTaxonomyService
} from "@pnp/spfx-controls-react/lib/ModernTaxonomyPicker";

async function addChild(
  parent: ITermInfo,
  updateTree: (newTerms?: ITermInfo[], parents?: ITermInfo[]) => void
): Promise<void> {
  const webUrl = context.pageContext.web.absoluteUrl;
  const setId = Guid.parse(termSetId).toString();
  const parentId = Guid.parse(parent.id).toString();
  const response = await context.spHttpClient.post(
    `${webUrl}/_api/v2.1/termstore/sets/${setId}/terms/${parentId}/children`,
    SPHttpClient.configurations.v1,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "OData-Version": ""
      },
      body: JSON.stringify({
        labels: [{ name: "New term", languageTag: "en-US", isDefault: true }]
      })
    }
  );
  if (!response.ok) throw new Error(`Term creation failed (${response.status}).`);
  const created: { id: string } = await response.json();
  const service = new SPTaxonomyService(context);
  const term = await service.getTermById(Guid.parse(setId), Guid.parse(created.id));
  updateTree([term], [parent]);
}
```

Do not invent `isAvailableForTagging` values for action results. Load the actual
metadata as above. Similarly, after a successful update reload the term; after a
successful delete pass it in the deleted-terms argument. These callbacks update
the UI; they do not perform mutations themselves.

Graph-based consumer actions remain possible but require their own Graph
permissions and correct site IDs. They are not prerequisites for the built-in
SharePoint-backed picker.

## Endpoint support

This control intentionally retains SharePoint `/_api/v2.1/termstore`, including
`getLegacyChildren`, `searchTerm` and parent expansion. These undocumented APIs
provide metadata/behavior not fully represented by the documented Graph term
resource. They have no public stability guarantee.

The migration does not introduce new Graph consent for built-in reads.
SharePoint permissions still apply. See [request behavior and support](../guides/migrate-to-v4.md#request-behavior-and-support)
for retries, diagnostics and the need for live tenant verification.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/ModernTaxonomyPicker)
