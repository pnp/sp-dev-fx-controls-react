
export interface ISearchSiteAssetsResult {
  "@odata.type": string;
  id: string;
  name: string;
  parentReference: ParentReference;
  webUrl: string;
}

interface ParentReference {
  sharepointIds: SharepointIds;
  siteId: string;
}

interface SharepointIds {
  listId: string;
}
