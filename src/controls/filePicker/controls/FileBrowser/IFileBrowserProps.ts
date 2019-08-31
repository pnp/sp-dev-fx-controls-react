import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FileBrowserService } from "../../../../services/FileBrowserService";
import { IFile } from "../../../../services/FileBrowserService.types";

export interface IFileBrowserProps {
  fileBrowserService: FileBrowserService;
  libraryName: string;
  folderPath: string;
  accepts: string;
  onChange: (imageUrl: string) => void;
  onOpenFolder: (folder: IFile) => void;
}
