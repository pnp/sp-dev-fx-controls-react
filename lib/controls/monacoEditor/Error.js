import { Stack } from "@fluentui/react/lib/Stack";
import { MessageBarType, MessageBar } from "@fluentui/react/lib/MessageBar";
import * as React from "react";
export var Error = function (props) {
    var error = props.error, show = props.show;
    return (React.createElement(React.Fragment, null, (show && error) ?
        React.createElement(Stack, { horizontal: true, horizontalAlign: "start" },
            React.createElement(MessageBar, { isMultiline: true, messageBarType: MessageBarType.error }, error.message))
        :
            null));
};
//# sourceMappingURL=Error.js.map