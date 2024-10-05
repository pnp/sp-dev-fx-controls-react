import { ImageSize, ImageAspect, ImageLicense } from "./WebSearchTab.types";
import { IFilePickerResult } from "../FilePicker.types";
import { ISearchResult } from "../../../services/FilesSearchService.types";

export interface IWebSearchTabState {
  isLoading: boolean;
  query?: string;
  size?: ImageSize;
  aspect?: ImageAspect;
  license?: ImageLicense;
  results: ISearchResult[];
  filePickerResult: IFilePickerResult;
}
