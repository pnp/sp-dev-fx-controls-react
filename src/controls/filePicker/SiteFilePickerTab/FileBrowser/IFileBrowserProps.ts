import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFile } from ".";

export interface IFileBrowserProps {
  libraryName: string;
  folderPath: string;
  accepts: string;
  context: WebPartContext;
  onChange: (imageUrl: string) => void;
  onOpenFolder: (folder: IFile) => void;
}
