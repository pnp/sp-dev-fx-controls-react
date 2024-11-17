import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { LambdaParser } from '@pnp/odata/parsers';
import { SharePointQueryableCollection, sp } from '@pnp/sp';
import '@pnp/sp/taxonomy';
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from '@pnp/sp/taxonomy';

export class SPTaxonomyService {

  constructor(private context: BaseComponentContext) {

  }

  public async getTerms(termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize: number = 50): Promise<{ value: ITermInfo[], skiptoken: string }> {
      try {
        const parser = new LambdaParser(async (r: Response) => {
          const json = await r.json();
          let newSkiptoken='';
          if(json['@odata.nextLink']) {
            const urlParams = new URLSearchParams(json['@odata.nextLink'].split('?')[1]);
            if(urlParams.has('$skiptoken')) {
              newSkiptoken = urlParams.get('$skiptoken');
            }
          }
          return { value: json.value, skiptoken: newSkiptoken };
        });

        let legacyChildrenUrlAndQuery = '';
        if (parentTermId && parentTermId !== Guid.empty) {
          legacyChildrenUrlAndQuery = sp.termStore.sets.getById(termSetId.toString()).terms.getById(parentTermId.toString()).concat('/getLegacyChildren').toUrl();
        }
        else {
          legacyChildrenUrlAndQuery = sp.termStore.sets.getById(termSetId.toString()).concat('/getLegacyChildren').toUrl();
        }
        let legacyChildrenQueryable = SharePointQueryableCollection(legacyChildrenUrlAndQuery).top(pageSize).usingParser(parser);
        if (hideDeprecatedTerms) {
          legacyChildrenQueryable = legacyChildrenQueryable.filter('isDeprecated eq false');
        }
        if (skiptoken && skiptoken !== '') {
          legacyChildrenQueryable.query.set('$skiptoken', skiptoken);
        }
        const termsResult = await legacyChildrenQueryable() as {value: ITermInfo[], skiptoken: string};
        return termsResult;
      } catch (error) {
        return { value: [], skiptoken: '' };
      }
  }

  public async getTermById(termSetId: Guid, termId: Guid): Promise<ITermInfo> {
    if (termId === Guid.empty) {
      return undefined;
    }
    try {
      const termInfo = await sp.termStore.sets.getById(termSetId.toString()).terms.getById(termId.toString()).expand("parent")();
      return termInfo;
    } catch (error) {
      return undefined;
    }
  }

  public async searchTerm(termSetId: Guid, label: string, languageTag: string, parentTermId?: Guid, allowSelectingChildren = true, stringMatchOption: string = 'StartsWith', pageSize: number = 50): Promise<ITermInfo[]> {
    try {
      const query = [
        `label='${label}'`,
        `setId='${termSetId}'`,
        `languageTag='${languageTag}'`,
        `stringMatchOption='${stringMatchOption}'`
      ];

      if(parentTermId !== Guid.empty) {
        query.push(`parentTermId='${parentTermId}'`);
      }

      const searchTermUrl = sp.termStore.concat(`/searchTerm(${query.join(',')})`).toUrl();
      const searchTermQuery = SharePointQueryableCollection(searchTermUrl).top(pageSize);
      let filteredTerms: ITermInfo[] = await searchTermQuery();

      if(allowSelectingChildren === false) {
        const hasParentId = parentTermId !== Guid.empty;

        const set = sp.termStore.sets.getById(termSetId.toString());
        const collection = hasParentId ? set.terms.getById(parentTermId.toString()).children : set.children;

        const childrenIds = await collection.select("id").get().then(children => children.map(c => c.id));
        filteredTerms = filteredTerms.filter(term => childrenIds.includes(term.id));
      }

      return filteredTerms;
    } catch (error) {
      return [];
    }
  }

  public async getTermSetInfo(termSetId: Guid): Promise<ITermSetInfo | undefined> {
    const tsInfo = await sp.termStore.sets.getById(termSetId.toString()).get();
    return tsInfo;
  }

  public async getTermStoreInfo(): Promise<ITermStoreInfo | undefined> {
    const termStoreInfo = await sp.termStore();
    return termStoreInfo;
  }
}
