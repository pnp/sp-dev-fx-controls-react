import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from "@microsoft/sp-core-library";
import {
  IReadonlyTheme,

} from "@microsoft/sp-component-base";
import { IControlsTestWebPartProps } from '../IControlsTestWebPartProps';

export interface IControlsTestProps extends IControlsTestWebPartProps {
  context: WebPartContext;
  displayMode: DisplayMode;
  onOpenPropertyPane: () => void;
  updateProperty: (value: string) => void;
  themeVariant?:  IReadonlyTheme;
}


