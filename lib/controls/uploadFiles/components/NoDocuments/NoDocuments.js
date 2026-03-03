import * as React from 'react';
import strings from 'ControlStrings';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { useNoDocumentsStyles } from './useNoDocumentsStyles';
export var NoDocuments = function (props) {
    var _a = useNoDocumentsStyles(), stackContainerStyles = _a.stackContainerStyles, controlStyles = _a.controlStyles;
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { styles: stackContainerStyles, verticalAlign: "center", horizontal: true, horizontalAlign: "center", tokens: { padding: 20, childrenGap: 10 } },
            React.createElement(FontIcon, { iconName: "BulkUpload", className: controlStyles.iconStyles }),
            React.createElement(Text, { variant: "mediumPlus" },
                strings.UpLoadFilesDragDropLabel,
                " "))));
};
//# sourceMappingURL=NoDocuments.js.map