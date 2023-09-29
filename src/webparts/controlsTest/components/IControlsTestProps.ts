import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from "@microsoft/sp-core-library";
import {
  IReadonlyTheme,

} from "@microsoft/sp-component-base";
import { ControlVisibility } from '../IControlsTestWebPartProps';

export interface IControlsTestProps {
  context: WebPartContext;
  controlVisibility: ControlVisibility;
  description: string;
  title: string;
  displayMode: DisplayMode;
  dynamicFormListId: string;
  onOpenPropertyPane: () => void;
  updateProperty: (value: string) => void;
  totalPages?: number;
  themeVariant?:  IReadonlyTheme;
}


