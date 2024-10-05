export interface IFileProps {
  fileInfo: File;
  onSelected?: (isSelected:boolean,file: File) => void;
  checked: boolean;
}
