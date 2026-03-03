var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { Tooltip, tokens } from '@fluentui/react-components';
import { Marker as MapMarker } from 'react-map-gl/maplibre';
import TooltipContent from './TooltipContent';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
var useStyles = function () {
    return {
        flag: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      width: 22px;\n      height: 10px;\n      border-radius: 4px;\n      box-shadow: '", ";\n      border: 1px solid ", ";\n      cursor: pointer;\n      display: block;\n      margin: 0 auto;\n    "], ["\n      width: 22px;\n      height: 10px;\n      border-radius: 4px;\n      box-shadow: '", ";\n      border: 1px solid ", ";\n      cursor: pointer;\n      display: block;\n      margin: 0 auto;\n    "])), tokens.shadow4, tokens.colorNeutralStroke2),
        tooltipContent: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      background-color: ", ";\n    "], ["\n      background-color: ", ";\n    "])), tokens.colorBrandBackground2),
    };
};
export var Marker = function (_a) {
    var data = _a.data, onClick = _a.onClick, markerClassName = _a.markerClassName, markerStyle = _a.markerStyle, renderToolTip = _a.renderToolTip, tooltipClassName = _a.tooltipClassName, tooltipStyle = _a.tooltipStyle;
    var styles = useStyles();
    return (React.createElement(MapMarker, { longitude: data.coordinates[0], latitude: data.coordinates[1], anchor: "bottom", onClick: function () { return onClick && onClick(data); }, className: markerClassName !== null && markerClassName !== void 0 ? markerClassName : styles.flag, style: markerStyle !== null && markerStyle !== void 0 ? markerStyle : undefined },
        React.createElement(Tooltip, { content: {
                children: renderToolTip !== null && renderToolTip !== void 0 ? renderToolTip : React.createElement(TooltipContent, { data: data }),
                style: __assign({}, tooltipStyle),
                className: tooltipClassName !== null && tooltipClassName !== void 0 ? tooltipClassName : styles.tooltipContent,
            }, relationship: "label" },
            React.createElement("img", { src: data.imageUrl, alt: "".concat(data.name, " ").concat(strings.worldMapFlag), onMouseEnter: function (e) { return (e.currentTarget.style.transform = 'scale(1.1)'); }, onMouseLeave: function (e) { return (e.currentTarget.style.transform = ''); }, style: { cursor: 'pointer' } }))));
};
export default Marker;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Marker.js.map