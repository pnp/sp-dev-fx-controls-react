import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface IUploadAttachmentProps {
  listId: string;
  itemId: number;
  className?: string;
  webUrl?:string;
  disabled?: boolean;
  context: WebPartContext |  ApplicationCustomizerContext;
  fireUpload?:boolean;
  onAttachmentUpload: () => void;
}
