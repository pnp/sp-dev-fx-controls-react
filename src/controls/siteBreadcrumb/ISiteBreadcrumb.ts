import ApplicationCustomizerContext from "@microsoft/sp-application-base/lib/extensibility/ApplicationCustomizerContext";
import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISiteBreadcrumbProps {
  context: WebPartContext | ApplicationCustomizerContext;
}

export interface ISiteBreadcrumbState {
  breadcrumbItems: IBreadcrumbItem[];
}

export interface IWebInfo {
  Id: string;
  Title: string;
  ServerRelativeUrl: string;
  error?: any;
}
