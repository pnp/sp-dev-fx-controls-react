/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from 'react';

import { TermStore } from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';

import {
  TERM_CHILDREN_KEY,
  TERMSETS_CHILDREN_KEY,
  TERMSETS_LIST_KEY,
} from '../constants/constants';
import { ITerms } from '../models/ITerms';
import { ITermSetsResponse } from '../models/ITermSetListResponse';
import { useUtils } from '../utils/useUtils';
import { useSessionStorage } from './useSessionStorage';

interface IGraphTaxonomyAPI {
  getTermSetChildren: (
    siteId: string,
    termSetId: string,
    refreshCache: boolean
  ) => Promise<TermStore.Term[]>;
  getTermChildren: (
    siteId: string,
    termSetId: string,
    termId: string,
    refreshCache: boolean
  ) => Promise<TermStore.Term[]>;
  getTermSets: (siteId: string, query?: string, refreshCache?: boolean) => Promise<TermStore.Set[]>;
  getTermSet: (siteId: string, termSetId: string, refreshCache?: boolean) => Promise<TermStore.Set>;
}

export const useGraphTaxonomyAPI = (context: BaseComponentContext): IGraphTaxonomyAPI => {
  const [getSessionStorageItem, setSessionStorageItem] = useSessionStorage();
  const { getCacheKey } = useUtils();
  const graphClient = React.useMemo(async () => {
    if (!context) return undefined;
    return await context.msGraphClientFactory.getClient("3");
  }, [context]);

  const getTermSetChildren = React.useCallback(
    async (siteId: string, termSetId: string, refreshCache?: boolean): Promise<TermStore.Term[]> => {
      if (!graphClient && !siteId && !termSetId) return undefined;
      const cacheKey = getCacheKey(TERMSETS_CHILDREN_KEY, termSetId);
      let cachedTermSet: TermStore.Term[] = [];
      try {
        if (!refreshCache) {
          cachedTermSet = getSessionStorageItem(cacheKey);
          if (cachedTermSet) {
            return cachedTermSet;
          }
        }
        const response: ITerms = await (await graphClient)
          ?.api(`/sites/${siteId}/termStore/sets/${termSetId}/Children`)
          .select("id,createdDateTime,labels,lastModifiedDateTime,properties")
          .get();
        setSessionStorageItem(cacheKey, response?.value);
        return response?.value ?? undefined;
      } catch (error) {
        console.log("[getTermSetTerms] error:", error);
        throw error;
      }
    },
    [graphClient]
  );

  const getTermChildren = React.useCallback(
    async (
      siteId: string,

      termSetId: string,
      termId: string,
      refreshCache: boolean
    ): Promise<TermStore.Term[]> => {
      if (!graphClient && !siteId && !termSetId && termId) return undefined;
      const cacheKey = getCacheKey(TERM_CHILDREN_KEY, termId);
      let cachedTerm: TermStore.Term[] = [];
      try {
        if (!refreshCache) {
          cachedTerm = getSessionStorageItem(cacheKey);
          if (cachedTerm) {
            return cachedTerm;
          }
        }
        const response: ITerms = await (await graphClient)
          ?.api(`/sites/${siteId}/termStore/sets/${termSetId}/terms/${termId}/children`)
          .select("id,createdDateTime,labels,lastModifiedDateTime,properties")
          .get();
        setSessionStorageItem(cacheKey, response?.value);
        return response?.value ?? undefined;
      } catch (error) {
        console.log("[getTermChildren] error:", error);
        throw error;
      }
    },
    [graphClient, getCacheKey, getSessionStorageItem, setSessionStorageItem]
  );

  const getTermSets = React.useCallback(
    async (siteId: string, query?: string, refreshCache?: boolean): Promise<TermStore.Set[]> => {
      if (!graphClient && !siteId) return [];
      const { instanceId } = context;
      const cacheKey = getCacheKey(TERMSETS_LIST_KEY, instanceId);
      try {
        if (!refreshCache) {
          let cachedTermSets: TermStore.Set[] = [];
          cachedTermSets = getSessionStorageItem(cacheKey);
          if (cachedTermSets) {
            return cachedTermSets;
          }
        }
        const response: ITermSetsResponse = await (await graphClient)
          ?.api(`/sites/${siteId}/termStore/sets`)
          .filter(query ?? "")
          .select("id,description,localizedNames,properties,createdDateTime")
          .get();
        setSessionStorageItem(cacheKey, response.value);

        return response ? response.value : [];
      } catch (error) {
        console.log("[getTermSets] error:", error);
        throw error;
      }
    },
    [graphClient, getSessionStorageItem, setSessionStorageItem, getCacheKey, context]
  );

  const getTermSet = React.useCallback(
    async (siteId: string, termSetId?: string): Promise<TermStore.Set> => {
      if (!graphClient && !siteId) throw new Error("[getTermSet] error: Missing required parameters");
      const { instanceId } = context;
      let cachedTermSets: TermStore.Set[] = [];
      const cacheKey = getCacheKey(TERMSETS_LIST_KEY, instanceId);
      try {
        cachedTermSets = getSessionStorageItem(cacheKey);
        if (cachedTermSets) {
          const termset = cachedTermSets.find((termset) => termset.id === termSetId);
          return termset;
        }
        const response: TermStore.LocalizedDescription = await (await graphClient)
          ?.api(`/sites/${siteId}/termStore/sets/${termSetId}`)
          .select("id,description,localizedNames,properties,createdDateTime")
          .get();
        return response ?? undefined;
      } catch (error) {
        console.log("[getTermSet] error:", error);
        throw error;
      }
    },
    [graphClient, getSessionStorageItem, setSessionStorageItem, getCacheKey, context]
  );

  return {
    getTermSetChildren,
    getTermChildren,
    getTermSets,
    getTermSet,
  };
};
