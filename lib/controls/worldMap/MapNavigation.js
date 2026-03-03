var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import { ArrowReset24Regular, ZoomIn24Regular, ZoomOut24Regular, } from '@fluentui/react-icons';
import { Button, Tooltip, shorthands, } from '@fluentui/react-components';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
var navStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 2;\n  background: tokens.colorNeutralBackground1;\n  border-radius: 8px;\n  box-shadow: tokens.shadow4;\n  padding: 4px;\n  display: flex;\n  gap: 8px;\n"], ["\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 2;\n  background: tokens.colorNeutralBackground1;\n  border-radius: 8px;\n  box-shadow: tokens.shadow4;\n  padding: 4px;\n  display: flex;\n  gap: 8px;\n"])));
var navStyleVertical = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex-direction: column;\n"], ["\n  flex-direction: column;\n"])));
var buttonStyle = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  min-width: 32px;\n  min-height: 32px;\n  ", "\n"], ["\n  min-width: 32px;\n  min-height: 32px;\n  ", "\n"])), shorthands.padding('4px'));
export var MapNavigation = function (_a) {
    var mapRef = _a.mapRef, _b = _a.initialViewState, initialViewState = _b === void 0 ? { longitude: 0, latitude: 20, zoom: 1 } : _b, _c = _a.vertical, vertical = _c === void 0 ? true : _c;
    var handleZoomIn = React.useCallback(function () {
        var _a;
        (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.getMap().zoomIn();
    }, [mapRef]);
    var handleZoomOut = React.useCallback(function () {
        var _a;
        (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.getMap().zoomOut();
    }, [mapRef]);
    var handleReset = React.useCallback(function () {
        var _a;
        (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.flyTo({
            center: [initialViewState.longitude, initialViewState.latitude],
            zoom: initialViewState.zoom,
            essential: true,
        });
    }, [mapRef, initialViewState]);
    return (React.createElement("div", { className: vertical ? "".concat(navStyle, " ").concat(navStyleVertical) : navStyle },
        React.createElement(Tooltip, { content: strings.worldMapZoomContent, relationship: "label" },
            React.createElement(Button, { appearance: "subtle", icon: React.createElement(ZoomIn24Regular, null), "aria-label": strings.worldMapZoomIn, className: buttonStyle, onClick: handleZoomIn })),
        React.createElement(Tooltip, { content: strings.worldMapZoomOut, relationship: "label" },
            React.createElement(Button, { appearance: "subtle", icon: React.createElement(ZoomOut24Regular, null), "aria-label": strings.worldMapZoomOut, className: buttonStyle, onClick: handleZoomOut })),
        React.createElement(Tooltip, { content: strings.worldMapResetMap, relationship: "label" },
            React.createElement(Button, { appearance: "subtle", icon: React.createElement(ArrowReset24Regular, null), "aria-label": strings.worldMapReset, className: buttonStyle, onClick: handleReset }))));
};
export default MapNavigation;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=MapNavigation.js.map