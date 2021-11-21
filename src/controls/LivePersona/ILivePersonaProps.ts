import { ServiceScope } from "@microsoft/sp-core-library";
import { SPFxContext } from "../../common/Types";

export interface ILivePersonatProps {
  /**
   * The Web Part context
   */
  context?: SPFxContext;
/**
   * The Web Part context
   */
 serviceScope: ServiceScope;
  /**
   * The user UPN to use for the live information
   */
  upn: string;

  /**
   * If info should not appear on hover
   */
  disableHover?: boolean;

  /**
   * The content to wrap with persona info
   */
  template?: string | JSX.Element ;
}
