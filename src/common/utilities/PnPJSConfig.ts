import { BaseComponentContext } from "@microsoft/sp-component-base";

// import pnp
import { ISPFXContext, spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

// eslint-disable-next-line no-var
let _sp: SPFI = null;

export const getSP = (context?: BaseComponentContext | ISPFXContext, webAbsoluteUrl?: string): SPFI => {
  if (!!context) {
    _sp = spfi(webAbsoluteUrl).using(SPFx(context));
  }
  return _sp;
};