import * as React from 'react';
import { INavLink } from '@fluentui/react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TermStore } from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';

import { useGraphTaxonomyAPI } from '../hooks/useGraphTaxonomyAPI';

export const useTaxonomyUtils = (context: BaseComponentContext) => {
  const {  getTermChildren } = useGraphTaxonomyAPI(context);

  const createChildren = React.useCallback(
    async (siteId: string, termSetId:string, term: TermStore.Term, level: number, refreshCache: boolean): Promise<INavLink[]> => {
      const navLinkGroups: INavLink[] = [];
      let navLink: INavLink = {} as INavLink;
      const termChildren = await getTermChildren(siteId,termSetId, term.id, refreshCache);

      for (const termChild of termChildren) {
        navLink = {
          isExpanded: true,
          name: termChild.labels[0].name,
          key: termChild.id,
          url: "",
          links: await createChildren(siteId, termSetId, termChild, level + 1, refreshCache),
          data: termChild as TermStore.Term
        };
        navLinkGroups.push(navLink);
      }
      return navLinkGroups;
    },
    [getTermChildren]
  );

  const createItems = React.useCallback(
    async (siteId:string, termSetId: string, terms: TermStore.Term[], level: number, refreshCache: boolean): Promise<INavLink[]> => {
      const navLinks:INavLink[] = ([]);
      for (const term of terms) {
        const navLink: INavLink = {
          name: term.labels[0].name,
          key: term.id,
          url: "",
          links: await createChildren(siteId, termSetId, term, level + 1, refreshCache),
          isExpanded: true,
          data:  term as TermStore.Term
        } as INavLink;
        navLinks.push(navLink);
      }
      return navLinks;
    },
    [getTermChildren, createChildren  ]
  );


  return { createItems, createChildren }
}
