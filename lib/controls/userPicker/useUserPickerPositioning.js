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
import { resolvePositioningShorthand, usePositioning, } from '@fluentui/react-positioning';
export var useUserPickerPositioning = function (props) {
    var positioning = props.positioning;
    // Set a default set of fallback positions to try if the dropdown does not fit on screen
    var fallbackPositions = ['above', 'after', 'after-top', 'before', 'before-top'];
    // popper options
    var popperOptions = __assign({ position: 'below', align: 'start', offset: { crossAxis: 0, mainAxis: 2 }, fallbackPositions: fallbackPositions, matchTargetSize: 'width' }, resolvePositioningShorthand(positioning));
    var _a = usePositioning(popperOptions), targetRef = _a.targetRef, containerRef = _a.containerRef;
    return [containerRef, targetRef];
};
//# sourceMappingURL=useUserPickerPositioning.js.map