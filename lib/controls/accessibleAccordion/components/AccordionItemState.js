import * as React from "react";
import { Consumer as ItemConsumer } from "./ItemContext";
var AccordionItemState = function (_a) {
    var children = _a.children;
    var renderChildren = function (itemContext) {
        var expanded = itemContext.expanded, disabled = itemContext.disabled;
        return (React.createElement(React.Fragment, null, children({ expanded: expanded, disabled: disabled })));
    };
    return React.createElement(ItemConsumer, null, renderChildren);
};
export default AccordionItemState;
//# sourceMappingURL=AccordionItemState.js.map