import { TermStore } from '@microsoft/microsoft-graph-types';
interface IUseUtils {
    getTermSetLocalizedNames: (termSet: TermStore.Set, language: string) => TermStore.LocalizedName[];
    getTermProperty: (term: TermStore.Term, property: string) => string;
    getTermSetProperty: (termSet: TermStore.Set, property: string) => string;
    getCacheKey: (key: string, uniqueId: string) => string;
    validateUrl: (url: string) => boolean;
    getTermLabel: (term: TermStore.Term, name: string) => string;
}
export declare const useUtils: () => IUseUtils;
export {};
//# sourceMappingURL=useUtils.d.ts.map