import { ImageSize, ImageAspect, ImageLicense, ISearchResult } from ".";
import { IFilePickerResult } from "../FilePicker.types";

export interface IWebSearchTabState {
  isLoading: boolean;
  query?: string;
  size?: ImageSize;
  aspect?: ImageAspect;
  license?: ImageLicense;
  results: ISearchResult[];
  filePickerResult: IFilePickerResult;
}
