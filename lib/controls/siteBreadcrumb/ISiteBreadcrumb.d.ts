import { IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { BaseComponentContext } from '@microsoft/sp-component-base';
export interface ISiteBreadcrumbProps {
    context: BaseComponentContext;
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
//# sourceMappingURL=ISiteBreadcrumb.d.ts.map