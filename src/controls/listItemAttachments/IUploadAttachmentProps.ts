import { SPFxContext } from '../../common/Types';

export interface IUploadAttachmentProps {
  listId: string;
  itemId?: number;
  className?: string;
  webUrl?: string;
  disabled?: boolean;
  context: SPFxContext;
  fireUpload?: boolean;
  onAttachmentUpload: (file?: File) => void;
}
