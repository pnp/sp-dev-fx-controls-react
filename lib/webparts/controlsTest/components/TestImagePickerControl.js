import * as React from 'react';
import { FluentProvider } from '@fluentui/react-components';
import { ImagePicker } from '../../../ImagePicker';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
export var TestImagePickerControl = function (_a) {
    var context = _a.context, themeVariant = _a.themeVariant;
    var _b = React.useState(''), selectedFileUrl = _b[0], setSelectedFileUrl = _b[1];
    var setTheme = React.useCallback(function () {
        return createV9Theme(themeVariant);
    }, [themeVariant]);
    var handleFileSelected = function (file) {
        console.log('File selected:', file);
        setSelectedFileUrl(file.previewDataUrl);
    };
    var handleDeleteFile = function () {
        console.log('File deleted');
        setSelectedFileUrl('');
    };
    return (React.createElement(FluentProvider, { theme: setTheme() },
        React.createElement("div", null,
            React.createElement("h2", null, "Test ImagePicker Component"),
            React.createElement(ImagePicker, { onFileSelected: handleFileSelected, onDeleteFile: handleDeleteFile, selectedFileUrl: selectedFileUrl, context: context }))));
};
export default TestImagePickerControl;
//# sourceMappingURL=TestImagePickerControl.js.map