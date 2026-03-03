var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { DefaultButton } from '@fluentui/react';
import * as React from 'react';
var TestApp = /** @class */ (function (_super) {
    __extends(TestApp, _super);
    function TestApp(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TestApp.prototype.render = function () {
        return (React.createElement(DefaultButton, { text: "test" }));
    };
    return TestApp;
}(React.Component));
export default TestApp;
//# sourceMappingURL=TestApp.js.map