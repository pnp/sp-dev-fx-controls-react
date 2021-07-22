import { BaseComponentContext} from "@microsoft/sp-component-base";

export interface ILivePersonatProps {
  /**
   * The Web Part context
   */
  context: BaseComponentContext;

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
