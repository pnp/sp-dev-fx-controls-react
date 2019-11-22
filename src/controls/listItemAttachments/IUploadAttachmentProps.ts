import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ExtensionContext } from "@microsoft/sp-extension-base";

export interface IUploadAttachmentProps {
  listId: string;
  itemId: number;
  className?: string;
  webUrl?:string;
  disabled?: boolean;
  context: WebPartContext |  ExtensionContext;
  fireUpload?:boolean;
  onAttachmentUpload: () => void;
}
