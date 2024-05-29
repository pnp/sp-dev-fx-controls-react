import { IImageFile } from './models/IImageFile';

export interface IImagePickerProps {
onImageSelected: (image: IImageFile) => void;
isOpen: boolean;
onDismiss: () => void;

}