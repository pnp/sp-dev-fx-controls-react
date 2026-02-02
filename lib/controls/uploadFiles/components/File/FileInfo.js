var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { format } from 'date-fns';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { DocumentCard, DocumentCardDetails, DocumentCardImage, } from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { getFileTypeIconProps, initializeFileTypeIcons, } from '@fluentui/react-file-type-icons';
import { useUtils } from '../../hooks/useUtils';
import { useFileStyles } from './useFileStyles';
initializeFileTypeIcons();
export var FileInfo = function (props) {
    var fileInfo = props.fileInfo, onSelected = props.onSelected, isSelected = props.isSelected;
    var name = fileInfo.name, size = fileInfo.size, lastModified = fileInfo.lastModified;
    var _a = useFileStyles(), checkBoxStyles = _a.checkBoxStyles, documentCardStyles = _a.documentCardStyles, stackCheckboxStyles = _a.stackCheckboxStyles, fileNameStyles = _a.fileNameStyles, documentImageStyles = _a.documentImageStyles;
    var _b = useUtils(), getShortText = _b.getShortText, getFileExtension = _b.getFileExtension, getFileSize = _b.getFileSize;
    var fileSize = getFileSize(size);
    var fileExtension = getFileExtension(name);
    var fileModified = format(new Date(lastModified), "dd, MMM yyyy");
    var _c = React.useState(false), isChecked = _c[0], setIsChecked = _c[1];
    var fileIcon = React.useMemo(function () {
        return __assign(__assign({}, getFileTypeIconProps({ extension: fileExtension, size: 48, imageFileType: "svg" })), { styles: { root: { fontSize: 0 } } });
    }, [fileExtension]);
    var onCheckboxChange = React.useCallback(function (ev, checked) {
        setIsChecked(checked);
        if (onSelected) {
            onSelected(checked, fileInfo);
        }
    }, [fileInfo, onSelected]);
    React.useEffect(function () {
        setIsChecked(isSelected);
    }, [isSelected]);
    var renderNormalCard = React.useCallback(function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Stack, null,
                React.createElement(DocumentCard, { styles: documentCardStyles, title: name },
                    React.createElement(DocumentCardImage, { height: 100, imageFit: ImageFit.cover, iconProps: fileIcon, styles: documentImageStyles }),
                    React.createElement(Stack, { horizontal: true, horizontalAlign: "end", tokens: { childrenGap: 5, padding: 7 }, styles: stackCheckboxStyles },
                        React.createElement(Checkbox, { styles: checkBoxStyles, checked: isChecked, onChange: onCheckboxChange })),
                    React.createElement(DocumentCardDetails, null,
                        React.createElement(Stack, { tokens: { padding: 10, childrenGap: 5 }, horizontalAlign: "center", verticalAlign: "center" },
                            React.createElement(Text, { title: name, styles: fileNameStyles, variant: "medium" }, getShortText(name, 15)),
                            React.createElement(Text, { variant: "small" }, fileSize),
                            React.createElement(Text, { block: true, nowrap: true, variant: "small" }, fileModified)))))));
    }, [
        documentCardStyles,
        name,
        fileIcon,
        documentImageStyles,
        stackCheckboxStyles,
        checkBoxStyles,
        isChecked,
        onCheckboxChange,
        fileNameStyles,
        getShortText,
        fileSize,
        fileModified,
    ]);
    return React.createElement(React.Fragment, null, renderNormalCard());
};
//# sourceMappingURL=FileInfo.js.map