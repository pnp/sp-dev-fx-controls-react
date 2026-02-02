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
import { PropertySheetEntry } from "adaptivecards-designer/lib/designer-peers";
var DesignerPeerCategory = /** @class */ (function () {
    function DesignerPeerCategory() {
    }
    DesignerPeerCategory.Unknown = "Unknown";
    DesignerPeerCategory.Containers = "Containers";
    DesignerPeerCategory.Elements = "Elements";
    DesignerPeerCategory.Inputs = "Inputs";
    DesignerPeerCategory.Actions = "Actions";
    return DesignerPeerCategory;
}());
export { DesignerPeerCategory };
var NameValuePairPropertyEditor = /** @class */ (function (_super) {
    __extends(NameValuePairPropertyEditor, _super);
    function NameValuePairPropertyEditor(targetVersion, collectionPropertyName, namePropertyName, valuePropertyName, createCollectionItem, // eslint-disable-line @typescript-eslint/no-explicit-any
    namePropertyLabel, valuePropertyLabel, addButtonTitle, messageIfEmpty) {
        if (namePropertyLabel === void 0) { namePropertyLabel = "Name"; }
        if (valuePropertyLabel === void 0) { valuePropertyLabel = "Value"; }
        if (addButtonTitle === void 0) { addButtonTitle = "Add"; }
        if (messageIfEmpty === void 0) { messageIfEmpty = "This collection is empty"; }
        var _this = _super.call(this, targetVersion) || this;
        _this.targetVersion = targetVersion;
        _this.collectionPropertyName = collectionPropertyName;
        _this.namePropertyName = namePropertyName;
        _this.valuePropertyName = valuePropertyName;
        _this.createCollectionItem = createCollectionItem;
        _this.namePropertyLabel = namePropertyLabel;
        _this.valuePropertyLabel = valuePropertyLabel;
        _this.addButtonTitle = addButtonTitle;
        _this.messageIfEmpty = messageIfEmpty;
        return _this;
    }
    NameValuePairPropertyEditor.prototype.collectionChanged = function (context, nameValuePairs, refreshPropertySheet) {
        context.target[this.collectionPropertyName] = [];
        for (var _i = 0, nameValuePairs_1 = nameValuePairs; _i < nameValuePairs_1.length; _i++) {
            var nameValuePair = nameValuePairs_1[_i];
            var item = this.createCollectionItem(nameValuePair.name, nameValuePair.value);
            context.target[this.collectionPropertyName].push(item);
        }
        context.peer.changed(refreshPropertySheet);
    };
    NameValuePairPropertyEditor.prototype.render = function (context) {
        var _this = this;
        var result = new Adaptive.Container();
        var collection = context.target[this.collectionPropertyName];
        if (!Array.isArray(collection)) {
            throw new Error("The " + this.collectionPropertyName + " property on " + context.peer.getCardObject().getJsonTypeName() + " either doesn't exist or isn't an array.");
        }
        var nameValuePairs = [];
        for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
            var pair = collection_1[_i];
            nameValuePairs.push({
                name: pair[this.namePropertyName],
                value: pair[this.valuePropertyName]
            });
        }
        if (nameValuePairs.length === 0) {
            var messageTextBlock = new Adaptive.TextBlock();
            messageTextBlock.spacing = Adaptive.Spacing.Small;
            messageTextBlock.text = this.messageIfEmpty;
            result.addItem(messageTextBlock);
        }
        else {
            var _loop_1 = function (i) {
                var textInput = new Adaptive.TextInput();
                textInput.placeholder = this_1.namePropertyLabel;
                textInput.defaultValue = nameValuePairs[i].name;
                textInput.onValueChanged = function (sender) {
                    nameValuePairs[i].name = sender.value;
                    _this.collectionChanged(context, nameValuePairs, false);
                };
                var nameColumn = new Adaptive.Column("stretch");
                nameColumn.addItem(textInput);
                textInput = new Adaptive.TextInput();
                textInput.placeholder = this_1.valuePropertyLabel;
                textInput.defaultValue = nameValuePairs[i].value;
                textInput.onValueChanged = function (sender) {
                    nameValuePairs[i].value = sender.value;
                    _this.collectionChanged(context, nameValuePairs, false);
                };
                var valueColumn = new Adaptive.Column("stretch");
                valueColumn.spacing = Adaptive.Spacing.Small;
                valueColumn.addItem(textInput);
                var removeAction = new Adaptive.SubmitAction();
                removeAction.title = "X";
                removeAction.tooltip = "Remove";
                removeAction.onExecute = function (sender) {
                    nameValuePairs.splice(i, 1);
                    _this.collectionChanged(context, nameValuePairs, true);
                };
                var newActionSet = new Adaptive.ActionSet();
                newActionSet.addAction(removeAction);
                var removeColumn = new Adaptive.Column("auto");
                removeColumn.spacing = Adaptive.Spacing.Small;
                removeColumn.addItem(newActionSet);
                var columnSet = new Adaptive.ColumnSet();
                columnSet.spacing = Adaptive.Spacing.Small;
                columnSet.addColumn(nameColumn);
                columnSet.addColumn(valueColumn);
                columnSet.addColumn(removeColumn);
                result.addItem(columnSet);
            };
            var this_1 = this;
            for (var i = 0; i < nameValuePairs.length; i++) {
                _loop_1(i);
            }
        }
        var addAction = new Adaptive.SubmitAction();
        addAction.title = this.addButtonTitle;
        addAction.onExecute = function (sender) {
            nameValuePairs.push({ name: "", value: "" });
            _this.collectionChanged(context, nameValuePairs, true);
        };
        var actionSet = new Adaptive.ActionSet();
        actionSet.spacing = Adaptive.Spacing.Small;
        actionSet.addAction(addAction);
        result.addItem(actionSet);
        return result;
    };
    return NameValuePairPropertyEditor;
}(PropertySheetEntry));
export { NameValuePairPropertyEditor };
//# sourceMappingURL=Shared.js.map