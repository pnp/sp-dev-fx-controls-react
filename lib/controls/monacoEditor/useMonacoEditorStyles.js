import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import React from "react";
export var useMonacoEditorStyles = function () {
    var controlClasses = React.useMemo(function () {
        return mergeStyleSets({
            containerStyles: {
                height: "800px",
            }
        });
    }, []);
    return { controlClasses: controlClasses };
};
//# sourceMappingURL=useMonacoEditorStyles.js.map