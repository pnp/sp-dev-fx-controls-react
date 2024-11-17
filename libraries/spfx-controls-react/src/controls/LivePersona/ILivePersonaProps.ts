import { ServiceScope } from "@microsoft/sp-core-library";

export interface ILivePersonatProps {

/**
   * The service locator pattern used by the SharePoint Framework.
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
