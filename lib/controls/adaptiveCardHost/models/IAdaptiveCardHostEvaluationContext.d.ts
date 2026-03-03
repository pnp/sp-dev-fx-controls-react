import { IPartialTheme, ITheme } from '@fluentui/react/lib/Styling';
import { IAadInfo } from './IAadInfo';
import { ICultureInfo } from './ICultureInfo';
import { ISPListInfo } from './ISPListInfo';
import { ISPListItemInfo } from './ISPListItemInfo';
import { ISPSiteInfo } from './ISPSiteInfo';
import { ISPWebInfo } from './ISPWebInfo';
import { IUserInfo } from './IUserInfo';
export interface IAdaptiveCardHostEvaluationContext {
    theme: IPartialTheme | ITheme;
    aadInfo?: IAadInfo;
    cultureInfo?: ICultureInfo;
    userInfo?: IUserInfo;
    spListInfo?: ISPListInfo;
    spListItemInfo?: ISPListItemInfo;
    spSiteInfo?: ISPSiteInfo;
    spWebInfo?: ISPWebInfo;
}
//# sourceMappingURL=IAdaptiveCardHostEvaluationContext.d.ts.map