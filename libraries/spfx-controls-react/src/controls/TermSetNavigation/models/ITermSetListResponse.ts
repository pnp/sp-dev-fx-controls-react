import { TermStore } from '@microsoft/microsoft-graph-types';

export interface ITermSetsResponse {
  '@odata.context': string;
  value: TermStore.Set[];
}
