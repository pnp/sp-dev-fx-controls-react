import { ILibrary } from "../../../../services/FileBrowserService.types";

export interface IDocumentLibraryBrowserState {
  isLoading: boolean;
  lists: ILibrary[];
}
