import * as React from "react";
import { DivAttributes } from "../helpers/types";
type Props = Pick<DivAttributes, Exclude<keyof DivAttributes, 'children'>> & {
    children(args: Partial<{
        expanded: boolean;
        disabled: boolean;
    }>): React.ReactNode;
};
declare const AccordionItemState: ({ children }: Props) => JSX.Element;
export default AccordionItemState;
//# sourceMappingURL=AccordionItemState.d.ts.map