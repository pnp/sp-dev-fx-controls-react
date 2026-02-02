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
import styles from './Carousel.module.scss';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { css } from '@fluentui/react/lib/Utilities';
var CarouselImage = /** @class */ (function (_super) {
    __extends(CarouselImage, _super);
    function CarouselImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarouselImage.prototype.render = function () {
        var _a = this.props, imageSrc = _a.imageSrc, _b = _a.imageFit, imageFit = _b === void 0 ? ImageFit.none : _b, url = _a.url, title = _a.title, description = _a.description, _c = _a.target, target = _c === void 0 ? '_blank' : _c, showDetailsOnHover = _a.showDetailsOnHover, className = _a.className, style = _a.style, imgClassName = _a.imgClassName, imgStyle = _a.imgStyle, detailsClassName = _a.detailsClassName, detailsStyle = _a.detailsStyle, titleClassName = _a.titleClassName, titleStyle = _a.titleStyle, descriptionClassName = _a.descriptionClassName, descriptionStyle = _a.descriptionStyle;
        var details = null;
        var hasDetails = !!title || !!description;
        if (hasDetails) {
            var descriptionEl = void 0;
            if (description) {
                if (typeof (description) === 'string') {
                    descriptionEl = React.createElement("span", { className: descriptionClassName, style: descriptionStyle }, description);
                }
                else {
                    descriptionEl = description;
                }
            }
            var detailsContent = React.createElement("div", { className: css(styles.details, detailsClassName), style: detailsStyle },
                !!title && React.createElement("span", { className: css(styles.title, titleClassName), style: titleStyle }, title),
                descriptionEl);
            if (url) {
                details = React.createElement("a", { href: url, target: target, "data-interception": target === "_blank" ? "off" : "on" }, detailsContent);
            }
            else {
                details = detailsContent;
            }
        }
        return (React.createElement("div", { className: css(styles.carouselImage, className, showDetailsOnHover ? styles.dynamicDetails : styles.staticDetails), style: style },
            React.createElement(Image, { className: css(styles.image, imgClassName), style: imgStyle, imageFit: imageFit, src: imageSrc }),
            details));
    };
    return CarouselImage;
}(React.Component));
export default CarouselImage;
//# sourceMappingURL=CarouselImage.js.map