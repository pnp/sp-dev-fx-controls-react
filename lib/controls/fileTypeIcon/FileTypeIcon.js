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
import { findIndex } from '@microsoft/sp-lodash-subset';
import { ApplicationIconList, IconType, IconSizes, ImageSize, ICON_GENERIC_16, ICON_GENERIC_48, ICON_GENERIC_96 } from './IFileTypeIcon';
import * as telemetry from '../../common/telemetry';
import { Icon } from '@fluentui/react/lib/Icon';
import { ICON_GENERIC_20 } from '.';
var ICON_GENERIC = 'Page';
var ICON_DEFAULT_SIZE = 'icon16';
var ICON_CDN_URL = "https://modernb.akamai.odsp.cdn.office.net/files/fabric-cdn-prod_20210703.001/assets/item-types";
/**
* File type icon component
*/
var FileTypeIcon = /** @class */ (function (_super) {
    __extends(FileTypeIcon, _super);
    function FileTypeIcon(props) {
        var _this = _super.call(this, props) || this;
        telemetry.track('ReactFileTypeIcon', {
            type: IconType[props.type],
            applicationType: !!props.application,
            path: !!props.path,
            size: !!props.size ? ImageSize[props.size] : 'default'
        });
        return _this;
    }
    /**
    * Function which returns the font icon
    */
    FileTypeIcon.prototype._getIconClassName = function () {
        var className = ICON_GENERIC;
        // Check if the path property is provided
        if (typeof this.props.path !== 'undefined' && this.props.path !== null) {
            var path = this.props.path;
            var fileExtension = this._getFileExtension(path);
            // Check the known file extensions list
            var iconName = this._getIconByExtension(fileExtension.toLowerCase(), IconType.font);
            if (iconName !== null) {
                className = iconName.image;
            }
        }
        // Check if the application name has been provided
        else if (typeof this.props.application !== 'undefined' && this.props.application !== null) {
            var application = this.props.application;
            var iconName = this._getIconByApplicationType(application, IconType.font);
            if (iconName !== null) {
                className = iconName.image;
            }
        }
        return className;
    };
    /**
    * Function which returns the image icon
    */
    FileTypeIcon.prototype._getIconImageName = function () {
        var size = ICON_DEFAULT_SIZE;
        var imageInfo = null;
        // Get the right icon size to display
        if (typeof this.props.size !== 'undefined' && this.props.size !== null) {
            // Retrieve the right icon size
            size = this._getFileSizeName(this.props.size);
        }
        // Check if the path is provided
        if (typeof this.props.path !== 'undefined' && this.props.path !== null) {
            var path = this.props.path;
            var fileExtension = this._getFileExtension(path);
            // Get the image for the current file extension
            imageInfo = this._getIconByExtension(fileExtension.toLowerCase(), IconType.image);
        }
        // Check if the application name has been provided
        else if (typeof this.props.application !== 'undefined' && this.props.application !== null) {
            var application = this.props.application;
            imageInfo = this._getIconByApplicationType(application, IconType.image);
        }
        return {
            size: size,
            image: imageInfo && imageInfo.image ? imageInfo.image : null,
            cdnFallback: imageInfo && imageInfo.cdnFallback ? imageInfo.cdnFallback : null
        };
    };
    /**
    * Function to retrieve the file extension from the path
    *
    * @param value File path
    */
    FileTypeIcon.prototype._getFileExtension = function (value) {
        // Split the URL on the dots
        var splittedValue = value.split('.');
        // Take the last value
        var extensionValue = splittedValue.pop();
        // Check if there are query string params in place
        if (extensionValue.indexOf('?') !== -1) {
            // Split the string on the question mark and return the first part
            var querySplit = extensionValue.split('?');
            extensionValue = querySplit[0];
        }
        return extensionValue;
    };
    /**
    * Find the icon name for the provided extension
    *
    * @param extension File extension
    */
    FileTypeIcon.prototype._getIconByExtension = function (extension, iconType) {
        // Find the application index by the provided extension
        var appIdx = findIndex(ApplicationIconList, function (item) { return item.extensions.indexOf(extension.toLowerCase()) !== -1; });
        // Check if an application has found
        if (appIdx !== -1) {
            // Check the type of icon, the image needs to get checked for the name
            if (iconType === IconType.font) {
                return {
                    image: ApplicationIconList[appIdx].iconName,
                    cdnFallback: null
                };
            }
            else {
                var knownImgs = ApplicationIconList[appIdx].imageName;
                // Check if the file extension is known
                var imgIdx = knownImgs.indexOf(extension);
                var imgExists = ApplicationIconList[appIdx].cdnImageName && ApplicationIconList[appIdx].cdnImageName.indexOf(extension) !== -1;
                var fallbackImg = null;
                if (imgExists) {
                    fallbackImg = extension;
                }
                else if (ApplicationIconList[appIdx].cdnImageName && ApplicationIconList[appIdx].cdnImageName.length > 0) {
                    fallbackImg = ApplicationIconList[appIdx].cdnImageName[0];
                }
                if (imgIdx !== -1) {
                    return {
                        image: knownImgs[imgIdx],
                        cdnFallback: fallbackImg
                    };
                }
                else {
                    // Return the first one if it was not known
                    return {
                        image: knownImgs[0],
                        cdnFallback: fallbackImg
                    };
                }
            }
        }
        return null;
    };
    /**
    * Find the icon name for the application
    *
    * @param application
    */
    FileTypeIcon.prototype._getIconByApplicationType = function (application, iconType) {
        // Find the application index by the provided extension
        var appIdx = findIndex(ApplicationIconList, function (item) { return item.application === application; });
        // Check if an application has found
        if (appIdx !== -1) {
            var knownApp = ApplicationIconList[appIdx];
            var fallbackImg = null;
            if (knownApp.cdnImageName && knownApp.cdnImageName.length > 0) {
                fallbackImg = knownApp.cdnImageName[0];
            }
            if (iconType === IconType.font) {
                return {
                    image: knownApp.iconName,
                    cdnFallback: fallbackImg
                };
            }
            else {
                // Check if the application has a known list of image types
                if (knownApp.imageName.length > 0) {
                    return {
                        image: knownApp.imageName[0],
                        cdnFallback: fallbackImg
                    };
                }
                else {
                    return {
                        image: null,
                        cdnFallback: fallbackImg
                    };
                }
            }
        }
        return null;
    };
    /**
    * Return the right image size for the provided value
    *
    * @param value Image size value
    */
    FileTypeIcon.prototype._getFileSizeName = function (value) {
        // Find the image size index by the image size
        var sizeIdx = findIndex(IconSizes, function (size) { return size.size === value; });
        // Check if an icon size has been retrieved
        if (sizeIdx !== -1) {
            // Return the first icon size
            return IconSizes[sizeIdx].name;
        }
        // Return the default file size if nothing was found
        return ICON_DEFAULT_SIZE;
    };
    /**
    * Default React component render method
    */
    FileTypeIcon.prototype.render = function () {
        var iconElm = React.createElement("span", null);
        // Check the type of icon that needs to be displayed
        if (this.props.type === IconType.image) {
            // Return an image icon element
            var iconImage = this._getIconImageName();
            // Check if the image was found, otherwise a generic image will be returned
            if (iconImage.cdnFallback) {
                var size = iconImage.size.replace("icon", "");
                var iconUrl = "".concat(ICON_CDN_URL, "/").concat(size, "/").concat(iconImage.cdnFallback, ".png");
                iconElm = React.createElement(Icon, { imageProps: { src: iconUrl } });
            }
            else if (iconImage.image) {
                iconElm = React.createElement(Icon, { imageProps: { className: "ms-BrandIcon--".concat(iconImage.size, " ms-BrandIcon--").concat(iconImage.image) } });
            }
            else {
                // Return a generic image
                var imgElm = React.createElement("img", null);
                // Check the size of the generic image which has to be returned
                switch (iconImage.size) {
                    case 'icon16':
                        imgElm = React.createElement(Icon, { imageProps: { src: ICON_GENERIC_16 } });
                        break;
                    case 'icon20':
                        imgElm = React.createElement(Icon, { imageProps: { src: ICON_GENERIC_20 } });
                        break;
                    case 'icon48':
                        imgElm = React.createElement(Icon, { imageProps: { src: ICON_GENERIC_48 } });
                        break;
                    case 'icon96':
                        imgElm = React.createElement(Icon, { imageProps: { src: ICON_GENERIC_96 } });
                        break;
                    default:
                        imgElm = React.createElement(Icon, { imageProps: { src: ICON_GENERIC_16 } });
                        break;
                }
                iconElm = (React.createElement("div", { style: { display: 'inline-block' } }, imgElm));
            }
        }
        else {
            // Return the icon font element
            var iconClass = this._getIconClassName();
            iconElm = React.createElement(Icon, { iconName: iconClass });
        }
        // Bind events
        iconElm.props.onClick = this.props.onClick;
        iconElm.props.onDoubleClick = this.props.onDoubleClick;
        iconElm.props.onMouseEnter = this.props.onMouseEnter;
        iconElm.props.onMouseLeave = this.props.onMouseLeave;
        iconElm.props.onMouseOver = this.props.onMouseOver;
        iconElm.props.onMouseUp = this.props.onMouseUp;
        // Return the icon element
        return iconElm;
    };
    return FileTypeIcon;
}(React.Component));
export { FileTypeIcon };
//# sourceMappingURL=FileTypeIcon.js.map