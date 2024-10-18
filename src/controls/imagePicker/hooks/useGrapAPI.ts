/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { BaseComponentContext } from '@microsoft/sp-component-base';

import { ISearchImagesResult } from '../models/ISearchImagesResult';
import { ISearchResult } from '../models/ISearchResult';
import { ISearchSiteAssetsResult } from '../models/ISearchSiteAssetsResult';

interface IuseGraphAPI {
  searchImages: (query: string, from: number) => Promise<ISearchResult>;
  getDriveItemDownloadUrl: (driveId: string, itemId: string) => Promise<any>;
  getSiteAssetsLibrary: (site: string) => Promise<ISearchSiteAssetsResult>;
}

export const useGraphAPI = (context: BaseComponentContext): IuseGraphAPI => {
  const graphClient = React.useMemo(async () => {
    if (!context) return undefined;
    return await context.msGraphClientFactory.getClient("3");
  }, [context]);

  const searchImages = React.useCallback(
    async (query: string, from: number = 0): Promise<ISearchResult> => {
      if (!query || !graphClient) return undefined;
      try {
        const client = await graphClient;

        const searchResults = await client.api("/search/query").post({
          requests: [
            {
              entityTypes: ["driveItem"],
              query: {
                queryString: `${query} AND -driveitem:""`,
              },
              fields: [
                "editor",
                "driveId",
                "Title",
                "Path",
                "Filename",
                "FileExtension",
                "FileType",
                "Created",
                "Author",
                "LastModifiedTime",
                "EditorOwsUser",
                "ModifiedBy",
                "LinkingUrl",
                "SiteTitle",
                "ParentLink",
                "DocumentPreviewMetadata",
                "ListID",
                "ListItemID",
                "SPSiteURL",
                "SiteID",
                "WebId",
                "UniqueID",
                "SPWebUrl",
                "DefaultEncodingURL",
                "PictureThumbnailURL",
                "DriveItem",
                "UniqueId",
                "BannerImageUrlOWSURLH",
              ],
              from: from,
              size: 50,
            },
          ],
        });
        const hasMoreResults = searchResults.value[0]?.hitsContainers[0]?.moreResultsAvailable;
        const total = searchResults.value[0]?.hitsContainers[0]?.total;
        const fields = searchResults.value[0]?.hitsContainers[0]?.hits?.map((hit: { resource: { listItem: any } }) => {
          return { ...hit.resource?.listItem.fields, id: hit.resource?.listItem.id };
        }) as ISearchImagesResult[];
        return { fields, hasMoreResults, total };
      } catch (error) {
        console.error("[searchImages] error:", error);
        throw error;
      }
    },
    [graphClient]
  );

  const getDriveItemDownloadUrl = React.useCallback(
    async (driveId: string, itemId: string): Promise<string> => {
      if (!graphClient || !driveId || !itemId) return undefined;
      try {
        const client = await graphClient;
        const driveItem = await client
          .api(`/drives/${driveId}/items/${itemId}?select=@microsoft.graph.downloadUrl`)
          .get();
        return driveItem["@microsoft.graph.downloadUrl"];
      } catch (error) {
        console.error("[getDriveItemDownloadUrl] error:", error);
        throw error;
      }
    },
    [graphClient]
  );

  const getSiteAssetsLibrary = React.useCallback(
    async (site: string): Promise<ISearchSiteAssetsResult> => {
      if (!site || !graphClient) return undefined;
      try {
        const client = await graphClient;
        const query = `path:${site}/SiteAssets`;
        const searchResults = await client.api("/search/query").post({
          requests: [
            {
              entityTypes: ["drive"],
              query: {
                queryString: query,
              },
              fields: [
                "editor",
                "driveId",
                "Title",
                "Path",
                "Filename",
                "FileExtension",
                "id",
                "name",
                "path",
                "parentReference",
              ],
            },
          ],
        });

        const fields = searchResults.value[0]?.hitsContainers[0]?.hits?.map(
          (hit: { resource: ISearchSiteAssetsResult }) => ({ ...hit.resource })
        ) as ISearchSiteAssetsResult[];
        return fields[0];
      } catch (error) {
        console.error("[getSiteAssetsLibrary] error:", error);
        throw error;
      }
    },
    [graphClient]
  );

  return {
    searchImages,
    getDriveItemDownloadUrl,
    getSiteAssetsLibrary,
  };
};
