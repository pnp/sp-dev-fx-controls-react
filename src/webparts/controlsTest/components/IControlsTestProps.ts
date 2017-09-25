import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ImageSize } from '../../../FileTypeIcon';

export interface IControlsTestProps {

  context: WebPartContext;
  description: string;
}

export interface IControlsTestState {

  imgSize: ImageSize;
  items: any[];
}
