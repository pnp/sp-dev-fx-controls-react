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
import * as Adaptive from "adaptivecards";
import { BaseSubmitActionPeer, PropertySheetCategory, StringPropertyEditor, TypedActionPeer } from "adaptivecards-designer/lib/designer-peers";
var SubmitActionPeer = /** @class */ (function (_super) {
    __extends(SubmitActionPeer, _super);
    function SubmitActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SubmitActionPeer;
}(BaseSubmitActionPeer));
export { SubmitActionPeer };
var ExecuteActionPeer = /** @class */ (function (_super) {
    __extends(ExecuteActionPeer, _super);
    function ExecuteActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExecuteActionPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ExecuteActionPeer.verbProperty);
    };
    ExecuteActionPeer.verbProperty = new StringPropertyEditor(Adaptive.Versions.v1_4, "verb", "Verb");
    return ExecuteActionPeer;
}(BaseSubmitActionPeer));
export { ExecuteActionPeer };
var OpenUrlActionPeer = /** @class */ (function (_super) {
    __extends(OpenUrlActionPeer, _super);
    function OpenUrlActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenUrlActionPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, OpenUrlActionPeer.urlProperty);
    };
    OpenUrlActionPeer.urlProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "url", "Url");
    return OpenUrlActionPeer;
}(TypedActionPeer));
export { OpenUrlActionPeer };
var ShowCardActionPeer = /** @class */ (function (_super) {
    __extends(ShowCardActionPeer, _super);
    function ShowCardActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowCardActionPeer.prototype.getToolTip = function () {
        return "Double click to open/close";
    };
    return ShowCardActionPeer;
}(TypedActionPeer));
export { ShowCardActionPeer };
var ToggleVisibilityActionPeer = /** @class */ (function (_super) {
    __extends(ToggleVisibilityActionPeer, _super);
    function ToggleVisibilityActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ToggleVisibilityActionPeer;
}(TypedActionPeer));
export { ToggleVisibilityActionPeer };
//# sourceMappingURL=ActionPeers.js.map