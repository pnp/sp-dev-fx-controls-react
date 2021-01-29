import { FileBrowserService } from "../../../../services/FileBrowserService";
import { ILibrary } from "../../../../services/FileBrowserService.types";

export interface IDocumentLibraryBrowserProps {
  fileBrowserService: FileBrowserService;
  onOpenLibrary: (selectedLibrary: ILibrary) => void;
  includePageLibraries?: boolean;
}
