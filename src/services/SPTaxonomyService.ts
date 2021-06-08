import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { LambdaParser } from '@pnp/odata/parsers';
import { SharePointQueryableCollection, sp } from '@pnp/sp';
import '@pnp/sp/taxonomy';
import { ITermInfo, ITermSetInfo } from '@pnp/sp/taxonomy';

export class SPTaxonomyService {

  /**
   * Service constructor
   */
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

  public async getTermsByIds(termSetId: Guid, termIds: string[]): Promise<ITermInfo[]> {
    const batch = sp.createBatch();
    const results = [];
    termIds.forEach(termId => {
      sp.termStore.sets.getById(termSetId.toString()).terms.getById(termId).inBatch(batch)()
        .then(term => results.push(term))
        .catch(reason => console.warn(`Error retreiving Term ID ${termId}: ${reason}`));
    });
    await batch.execute();
    return results;
  }

  public async searchTerm(termSetId: Guid, label: string, languageTag: string, parentTermId?: Guid, stringMatchId: string = '0', pageSize: number = 50): Promise<ITermInfo[]> {
    try {
      const searchTermUrl = sp.termStore.concat(`/searchTerm(label='${label}',setId='${termSetId}',languageTag='${languageTag}',stringMatchId='${stringMatchId}'${parentTermId ? `,parentTermId='${parentTermId}'` : ''})`).toUrl();
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
}
