import { ISearchImagesResult } from './ISearchImagesResult';

export interface ISearchResult {
    fields : ISearchImagesResult[]
    hasMoreResults: boolean;
    total: number;
}