import { IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';

export interface ISiteBreadcrumbProps {

  context: WebPartContext | ExtensionContext;
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
