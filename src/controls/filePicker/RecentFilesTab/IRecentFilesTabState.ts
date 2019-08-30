import { IRecentFile } from ".";

export interface IRecentFilesTabState {
  results: IRecentFile[];
  isLoading: boolean;
  fileUrl?: string;
}
