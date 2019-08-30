import { ILibrary } from ".";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDocumentLibraryBrowserProps {
  context: WebPartContext;
  onOpenLibrary: (selectedLibrary: ILibrary) => void;
}
