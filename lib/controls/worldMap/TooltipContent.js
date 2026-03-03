var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from "react";
import { Text, tokens, } from "@fluentui/react-components";
import { css } from "@emotion/css";
import strings from "ControlStrings";
var stackStyles = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-width: 160px;\n\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-start;\n  background-color: ", ";\n  padding: 0;\n  min-width: 100px;\n"], ["\n  min-width: 160px;\n\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-start;\n  background-color: ", ";\n  padding: 0;\n  min-width: 100px;\n"])), tokens.colorBrandBackground2);
var rowStyles = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n"])));
var imageStyles = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 32px;\n  height: 20px;\n  display: block;\n  border-radius: 4px;\n  box-shadow: '", ";\n"], ["\n  width: 32px;\n  height: 20px;\n  display: block;\n  border-radius: 4px;\n  box-shadow: '", ";\n"])), tokens.shadow4);
var titleStyles = css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-weight: 600;\n  font-size: 1rem;\n"], ["\n  font-weight: 600;\n  font-size: 1rem;\n"])));
var subTitleStyles = css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  color: '", ";\n  font-size: 0.92rem;\n"], ["\n  color: '", ";\n  font-size: 0.92rem;\n"])), tokens.colorNeutralForeground2);
export var TooltipContent = function (_a) {
    var data = _a.data;
    return (React.createElement("div", { className: stackStyles },
        React.createElement("div", { className: rowStyles },
            React.createElement("img", { src: data.imageUrl, alt: "".concat(data.name, " ").concat(strings.worldMapFlag), className: imageStyles }),
            React.createElement(Text, { className: titleStyles }, data.name)),
        React.createElement("div", { className: rowStyles },
            React.createElement(Text, { className: subTitleStyles }, strings.worldMapCoord),
            React.createElement(Text, null,
                data.coordinates[1].toFixed(2),
                strings.worldMapN),
            React.createElement(Text, null,
                data.coordinates[0].toFixed(2),
                strings.worldMapE))));
};
export default TooltipContent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=TooltipContent.js.map