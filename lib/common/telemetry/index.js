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
import PnPTelemetry from "@pnp/telemetry-js";
import { version } from './version';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import * as React from 'react';
var CONTROL_TYPE = "react";
/**
 * Track control information
 *
 * @param componentName
 * @param properties
 */
export function track(componentName, properties) {
    if (properties === void 0) { properties = {}; }
    var telemetry = PnPTelemetry.getInstance();
    telemetry.trackEvent(componentName, __assign({ version: version, controlType: CONTROL_TYPE, debug: DEBUG ? "true" : "false", environment: EnvironmentType[Environment.type] }, properties));
}
export var useTelemetry = function (componentName, properties) {
    if (properties === void 0) { properties = {}; }
    var _a = React.useState(false), hasBeenCalled = _a[0], setHasBeenCalled = _a[1];
    if (hasBeenCalled) {
        return;
    }
    track(componentName, properties);
    setHasBeenCalled(true);
};
//# sourceMappingURL=index.js.map