import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPService } from "./ISPService";
import SPService from "./SPService";

export class SPServiceFactory {
  public static createService(context: BaseComponentContext, includeDelay?: boolean, delayTimeout?: number, webAbsoluteUrl?: string): ISPService {
    return new SPService(context, webAbsoluteUrl);
  }
}
