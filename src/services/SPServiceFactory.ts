import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPService } from "./ISPService";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import SPServiceMock from "./SPServiceMock";
import SPService from "./SPService";

export class SPServiceFactory {
  public static createService(context: BaseComponentContext, includeDelay?: boolean, delayTimeout?: number, webAbsoluteUrl?: string): ISPService {
    if (Environment.type === EnvironmentType.Local) {
      return new SPServiceMock(includeDelay, delayTimeout);
    }
    return new SPService(context, webAbsoluteUrl);
  }
}
