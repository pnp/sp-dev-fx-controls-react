/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useCallback, useEffect, useRef, useState, } from 'react';
import { css } from '@emotion/css';
import { RenderDialog } from './renderDialog';
var useStyles = function (iFrameHeight) {
    var styles = {
        iframe: css({
            width: "100%",
            height: iFrameHeight,
            border: "none",
        }),
    };
    return { styles: styles };
};
export var ShareDialog = function (_a) {
    var isOpen = _a.isOpen, options = _a.options, onClose = _a.onClose;
    var _b = useState(undefined), dialogUrl = _b[0], setDialogUrl = _b[1];
    var iframeRef = useRef(null);
    var _c = useState(400), iFrameHeight = _c[0], setIFrameHeight = _c[1];
    var siteUrl = options.siteUrl, listId = options.listId, itemId = options.itemId, name = options.name;
    var styles = useStyles(iFrameHeight).styles;
    var closeDialog = useCallback(function () {
        onClose();
    }, [onClose]);
    var handleIframeMessage = useCallback(function (event) {
        var _a = JSON.parse(event.data), name = _a.name, height = _a.height;
        switch (name) {
            case "share_dismiss":
                closeDialog();
                break;
            case "share_resize":
                setIFrameHeight(height);
                break;
            case "share_scriptsLoaded":
                break;
            case "share_uiReady":
                break;
            case "share_ready":
                break;
            default:
                break;
        }
    }, [closeDialog]);
    useEffect(function () {
        window.addEventListener("message", handleIframeMessage);
        return function () {
            window.removeEventListener("message", handleIframeMessage);
        };
    }, [handleIframeMessage]);
    useEffect(function () {
        if (isOpen) {
            var clientId = "sharePoint";
            var policyTip = 0;
            var folderColor = "";
            var clickTime = new Date().getTime();
            var fullScreenMode = false;
            var origin_1 = encodeURIComponent(window.location.origin);
            var encodeName = encodeURIComponent(name);
            var url = "".concat(siteUrl, "/_layouts/15/sharedialog.aspx") +
                "?listId=".concat(listId) +
                "&listItemId=".concat(itemId) +
                "&clientId=".concat(clientId) +
                "&policyTip=".concat(policyTip) +
                "&folderColor=".concat(folderColor) +
                "&clickTime=".concat(clickTime) +
                "&ma=0" +
                "&fullScreenMode=".concat(fullScreenMode) +
                "&itemName= ".concat(encodeName) +
                "&channelId=" +
                "&origin=".concat(origin_1);
            setDialogUrl(url);
        }
        else {
            setDialogUrl(undefined);
        }
    }, [isOpen, siteUrl, listId, itemId]);
    return (React.createElement(RenderDialog, { isOpen: isOpen, onDismiss: closeDialog, maxHeight: "fit-content" },
        React.createElement("iframe", { ref: iframeRef, src: dialogUrl || "", className: styles.iframe })));
};
//# sourceMappingURL=ShareDialog.js.map