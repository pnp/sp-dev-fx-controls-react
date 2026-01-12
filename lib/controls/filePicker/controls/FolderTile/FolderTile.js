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
import * as React from 'react';
import styles from './FolderTile.module.scss';
import { css } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';
import * as strings from 'ControlStrings';
import { ScreenWidthMinLarge } from '@fluentui/react/lib/Styling';
var FolderTile = /** @class */ (function (_super) {
    __extends(FolderTile, _super);
    function FolderTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FolderTile.prototype.render = function () {
        var _this = this;
        var _a = this.props, isSelected = _a.isSelected, index = _a.index, item = _a.item, pageWidth = _a.pageWidth;
        var isLarge = pageWidth >= ScreenWidthMinLarge;
        //{item.name}, Folder, Modified {item.modified}, edited by {item.modifiedBy}, {item.totalFileCount} items, Private
        var itemLabel = strings.FolderLabelTemplate
            .replace('{0}', item.name)
            .replace('{1}', item.modified)
            .replace('{2}', item.modifiedBy)
            .replace('{3}', "".concat(item.totalFileCount));
        return (React.createElement("div", { "aria-selected": isSelected, "data-is-draggable": false, role: "listitem", "aria-labelledby": "Tile-label".concat(index), "aria-describedby": "Tile-activity".concat(index), className: css(styles.tile, isLarge ? styles.isLarge : styles.isSmall, styles.invokable, isSelected ? styles.selected : undefined), "data-is-focusable": true, "data-is-sub-focuszone": true, "data-disable-click-on-enter": true, "data-selection-index": index, onClick: function (_event) { return _this.props.onItemInvoked(item); } },
            React.createElement("div", { className: styles.link, role: "link" },
                React.createElement("span", { id: "Tile-label".concat(index), className: styles.label }, itemLabel),
                React.createElement("span", { role: "presentation", className: styles.aboveNameplate },
                    React.createElement("span", { role: "presentation", className: styles.content },
                        React.createElement("span", { role: "presentation", className: styles.foreground },
                            React.createElement("span", { className: styles.odItemTile2FolderCover },
                                React.createElement("div", { className: css(styles.folderCover, styles.isLarge) },
                                    React.createElement(Icon, { className: styles.folderCoverBack, imageProps: {
                                            src: strings.FolderBackPlate
                                        } }),
                                    item.totalFileCount > 0 &&
                                        React.createElement("span", { className: styles.folderCoverContent },
                                            React.createElement("span", { className: styles.folderCoverFrame },
                                                React.createElement("span", { className: styles.itemTileBlankCover, style: { width: 104, height: 72 } }))),
                                    React.createElement(Icon, { className: styles.folderCoverFront, imageProps: {
                                            src: strings.FolderFrontPlate
                                        } }),
                                    item.totalFileCount > 0 &&
                                        React.createElement("span", { className: styles.metadata }, item.totalFileCount)))))),
                React.createElement("span", { className: styles.namePlate },
                    React.createElement("span", { className: styles.name },
                        React.createElement("span", { className: css(styles.signalField, styles.compact) },
                            React.createElement("span", { className: styles.signalFieldValue }, item.name))),
                    React.createElement("span", { className: styles.activity, id: "Tile-activity".concat(index) },
                        React.createElement("span", { className: css(styles.signalField, styles.compact) },
                            React.createElement("span", { className: styles.signalFieldValue }, item.modified)))))));
    };
    return FolderTile;
}(React.Component));
export { FolderTile };
//# sourceMappingURL=FolderTile.js.map