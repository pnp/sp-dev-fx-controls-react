import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface ITrendProps {
  context?: WebPartContext |  ApplicationCustomizerContext;
  smooth?: boolean;
  autoDraw?: boolean;
  autoDrawDuration?: number;
  autoDrawEasing?:string;
  data: Number[];
  gradient?:string[];
  radius?:number;
  strokeWidth?:number;
  strokeLinecap?:string;
  padding?:number;
}
