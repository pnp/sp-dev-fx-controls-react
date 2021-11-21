import { IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { SPFxContext } from '../../common/Types';

export interface ISiteBreadcrumbProps {

  context: SPFxContext;
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
