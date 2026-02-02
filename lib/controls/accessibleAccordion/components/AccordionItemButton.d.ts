import * as React from "react";
import { InjectedButtonAttributes } from "../helpers/AccordionStore";
import { DivAttributes } from "../helpers/types";
type WrapperProps = Pick<DivAttributes, Exclude<keyof DivAttributes, keyof InjectedButtonAttributes>>;
declare const AccordionItemButtonWrapper: React.SFC<WrapperProps>;
export default AccordionItemButtonWrapper;
//# sourceMappingURL=AccordionItemButton.d.ts.map