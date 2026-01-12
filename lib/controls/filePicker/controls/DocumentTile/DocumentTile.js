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
import styles from './DocumentTile.module.scss';
import { css } from '@fluentui/react/lib/Utilities';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import * as strings from 'ControlStrings';
import { Check } from '@fluentui/react/lib/Check';
import { ScreenWidthMinLarge } from '@fluentui/react/lib/Styling';
var MAX_ASPECT_RATIO = 3;
var DocumentTile = /** @class */ (function (_super) {
    __extends(DocumentTile, _super);
    function DocumentTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentTile.prototype.render = function () {
        var _this = this;
        var _a = this.props, isSelected = _a.isSelected, index = _a.index, item = _a.item, pageWidth = _a.pageWidth, tileDimensions = _a.tileDimensions;
        var isLarge = pageWidth >= ScreenWidthMinLarge;
        // Find the dimensions that are biggest
        var thumbnailWidth = tileDimensions.width;
        var thumbnailHeight = tileDimensions.height;
        if (item.dimensions) {
            var contentAspectRatio = item.dimensions.width / item.dimensions.height;
            var boundsAspectRatio = tileDimensions.width / tileDimensions.height;
            var scale = void 0;
            if (contentAspectRatio > boundsAspectRatio) {
                scale = tileDimensions.width / item.dimensions.width;
            }
            else {
                scale = tileDimensions.height / item.dimensions.height;
            }
            var finalScale = Math.min(MAX_ASPECT_RATIO, scale);
            thumbnailWidth = item.dimensions.width * finalScale;
            thumbnailHeight = item.dimensions.height * finalScale;
        }
        // Check extension and get preview
        var thumbnail = this.props.fileBroserService.getFileThumbnailUrl(this.props.item, thumbnailWidth, thumbnailHeight);
        var ariaLabel = strings.ImageAriaLabelTemplate.replace('{0}', item.fileIcon);
        var itemLabel = strings.DocumentLabelTemplate
            .replace('{0}', item.name)
            .replace('{1}', item.modified)
            .replace('{2}', item.modifiedBy);
        return (React.createElement("div", { "aria-selected": isSelected, "data-is-draggable": false, role: "listitem", "aria-labelledby": "Tile-label".concat(index), "aria-describedby": "Tile-activity".concat(index), className: css(styles.tile, isLarge ? styles.isLarge : styles.isSmall, styles.invokable, styles.selectable, isSelected ? styles.selected : undefined), "data-is-focusable": true, "data-is-sub-focuszone": true, "data-disable-click-on-enter": true, "data-selection-index": index, 
            //data-selection-invoke={true}
            onClick: function (_event) { return _this.props.onItemInvoked(item); } },
            React.createElement("div", { className: styles.link, role: "link" },
                React.createElement("span", { id: "Tile-label".concat(index), className: styles.label }, itemLabel),
                React.createElement("span", { role: "presentation", className: styles.aboveNameplate },
                    React.createElement("span", { role: "presentation", className: styles.content },
                        React.createElement("span", { role: "presentation", className: styles.foreground },
                            React.createElement("span", { className: styles.odItemTile2Image },
                                React.createElement("span", { className: styles.odImageFrame2, style: { width: thumbnailWidth, height: thumbnailHeight } },
                                    React.createElement("span", { className: styles.odImageFrame2Image },
                                        React.createElement("span", { className: styles.odImageFrame },
                                            React.createElement("span", { className: styles.odImageStack },
                                                React.createElement("span", { className: styles.odImageStackTile },
                                                    React.createElement("span", { className: styles.odImageTile },
                                                        React.createElement("span", { className: styles.odImageTileBackground },
                                                            React.createElement(Image, { src: thumbnail, width: thumbnailWidth, height: thumbnailHeight, imageFit: ImageFit.contain })))))))))),
                        React.createElement("span", { className: styles.odItemTile2SmallIcon },
                            React.createElement("div", { className: styles.fileTypeIcon, "aria-label": ariaLabel, title: ariaLabel },
                                React.createElement("img", { className: styles.fileTypeIconIcon, src: strings.ODPhotoIconUrl, style: { width: 16, height: 16 } }))))),
                React.createElement("span", { className: styles.namePlate },
                    React.createElement("span", { className: styles.name },
                        React.createElement("span", { className: css(styles.signalField, styles.compact) },
                            React.createElement("span", { className: styles.signalFieldValue }, item.name))),
                    React.createElement("span", { className: styles.activity, id: "Tile-activity".concat(index) },
                        React.createElement("span", { className: css(styles.signalField, styles.compact) },
                            React.createElement("span", { className: styles.signalFieldValue }, item.modified))))),
            React.createElement("span", { role: "checkbox", className: styles.check, "data-selection-toggle": true, "aria-checked": isSelected },
                React.createElement(Check, { checked: isSelected }))));
    };
    return DocumentTile;
}(React.Component));
export { DocumentTile };
//# sourceMappingURL=DocumentTile.js.map