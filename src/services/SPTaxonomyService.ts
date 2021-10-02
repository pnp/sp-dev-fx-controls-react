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
            var urlParams = new URLSearchParams(json['@odata.nextLink'].split('?')[1]);
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

  public async searchTerm(termSetId: Guid, label: string, languageTag: string, parentTermId?: Guid, stringMatchId: string = '0', pageSize: number = 50): Promise<ITermInfo[]> {
    try {
      const searchTermUrl = sp.termStore.concat(`/searchTerm(label='${label}',setId='${termSetId}',languageTag='${languageTag}',stringMatchId='${stringMatchId}'${parentTermId && parentTermId !== Guid.empty ? `,parentTermId='${parentTermId}'` : ''})`).toUrl();
      const searchTermQuery = SharePointQueryableCollection(searchTermUrl).top(pageSize);
      const filteredTerms = await searchTermQuery();
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
