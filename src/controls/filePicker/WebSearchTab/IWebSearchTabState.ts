import { ImageSize, ImageAspect, ImageLicense, ISearchResult } from ".";

export interface IWebSearchTabState {
  isLoading: boolean;
  apiKey?: string;
  hasKey?: boolean;
  query?: string;
  size?: ImageSize;
  aspect?: ImageAspect;
  license?: ImageLicense;
  results: ISearchResult[];
  fileUrl?: string;
}
