

export interface  IFileCommandBarProps   {
  onUpload?: (file: File) => void;
  onSelectedAll?: (isSelected:boolean) => void;
  onDelete?: () => void;
}
