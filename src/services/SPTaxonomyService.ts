import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { SPFI } from '@pnp/sp';
import '@pnp/sp/taxonomy';
import { JSONParse } from '@pnp/queryable';
import { ITermInfo, ITermSetInfo, ITermStoreInfo, ITerms } from '@pnp/sp/taxonomy';
import { getSP } from '../common/utilities/PnPJSConfig';

export class SPTaxonomyService {

  private readonly _sp: SPFI;

  constructor(private context: BaseComponentContext) {
    this._sp = getSP(context);
  }

  public async getTerms(termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize: number = 50): Promise<{ value: ITermInfo[], skiptoken: string }> {
    const localSpfi = this._sp.using(JSONParse());
    try {
      let legacyChildrenTerms: ITerms;
      if (parentTermId && parentTermId !== Guid.empty) {
        legacyChildrenTerms = (localSpfi.termStore.sets.getById(termSetId.toString()).terms.getById(parentTermId.toString()).concat('/getLegacyChildren') as unknown as ITerms);
      }
      else {
        legacyChildrenTerms = (localSpfi.termStore.sets.getById(termSetId.toString()).concat('/getLegacyChildren') as unknown as ITerms);
      }
      legacyChildrenTerms = legacyChildrenTerms.top(pageSize);
      if (hideDeprecatedTerms) {
        legacyChildrenTerms = legacyChildrenTerms.filter('isDeprecated eq false');
      }
      if (skiptoken && skiptoken !== '') {
        legacyChildrenTerms.query.set('$skiptoken', skiptoken);
      }

      // type manipulations as we're getting plain JSON here
      const termsJsonResult = await legacyChildrenTerms() as { '@odata.nextLink': string | undefined, value: ITermInfo[] };
      let newSkiptoken = '';
      if (termsJsonResult['@odata.nextLink']) {
        const urlParams = new URLSearchParams(termsJsonResult['@odata.nextLink'].split('?')[1]);
        if (urlParams.has('$skiptoken')) {
          newSkiptoken = urlParams.get('$skiptoken');
        }
      }

      return { value: termsJsonResult.value as ITermInfo[], skiptoken: newSkiptoken };
    } catch (error) {
      return { value: [], skiptoken: '' };
    }
  }

  public async getTermById(termSetId: Guid, termId: Guid): Promise<ITermInfo> {
    if (termId === Guid.empty) {
      return undefined;
    }
    try {
      const termInfo = await this._sp.termStore.sets.getById(termSetId.toString()).terms.getById(termId.toString()).expand("parent")();
      return termInfo;
    } catch (error) {
      return undefined;
    }
  }

  public async searchTerm(termSetId: Guid, label: string, languageTag: string, parentTermId?: Guid, allowSelectingChildren = true, stringMatchId: string = '0', pageSize: number = 50): Promise<ITermInfo[]> {
    try {
      const query = [
        `label='${label}'`,
        `setId='${termSetId}'`,
        `languageTag='${languageTag}'`,
        `stringMatchId='${stringMatchId}'`
      ];

      if (parentTermId !== Guid.empty) {
        query.push(`parentTermId='${parentTermId}'`);
      }

      const searchTermQuery = (this._sp.termStore.concat(`/searchTerm(${query.join(',')})`) as unknown as ITerms).top(pageSize);
      let filteredTerms: ITermInfo[] = await searchTermQuery();

      if (allowSelectingChildren === false) {
        const hasParentId = parentTermId !== Guid.empty;

        const set = this._sp.termStore.sets.getById(termSetId.toString());
        const collection = hasParentId ? set.terms.getById(parentTermId.toString()).children : set.children;

        const childrenIds = await collection.select("id")().then(children => children.map(c => c.id));
        filteredTerms = filteredTerms.filter(term => childrenIds.includes(term.id));
      }

      return filteredTerms;
    } catch (error) {
      return [];
    }
  }

  public async getTermSetInfo(termSetId: Guid): Promise<ITermSetInfo | undefined> {
    const tsInfo = await this._sp.termStore.sets.getById(termSetId.toString())();
    return tsInfo;
  }

  public async getTermStoreInfo(): Promise<ITermStoreInfo | undefined> {
    const termStoreInfo = await this._sp.termStore();
    return termStoreInfo;
  }
}
