import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from "@microsoft/sp-core-library";
import {
  IReadonlyTheme,

} from "@microsoft/sp-component-base";

export interface IControlsTestProps {
  context: WebPartContext;
  description: string;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  totalPages?: number;
  themeVariant?:  IReadonlyTheme;
}


