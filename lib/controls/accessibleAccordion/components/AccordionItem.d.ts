import DisplayName from "../helpers/DisplayName";
import { DivAttributes } from "../helpers/types";
import { UUID } from "./ItemContext";
type Props = DivAttributes & {
    uuid?: UUID;
    activeClassName?: string;
    dangerouslySetExpanded?: boolean;
};
declare const AccordionItem: {
    ({ uuid: customUuid, dangerouslySetExpanded, className, activeClassName, ...rest }: Props): JSX.Element;
    displayName: DisplayName;
};
export default AccordionItem;
//# sourceMappingURL=AccordionItem.d.ts.map