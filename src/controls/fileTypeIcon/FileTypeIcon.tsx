import * as React from 'react';
import { findIndex } from '@microsoft/sp-lodash-subset';
import { IFileTypeIconProps, ApplicationType, ApplicationIconList, IconType, IconSizes, ImageSize, IImageResult, ICON_GENERIC_16, ICON_GENERIC_48, ICON_GENERIC_96, ImageInformation } from './IFileTypeIcon';
import * as telemetry from '../../common/telemetry';
import { Icon } from '@fluentui/react/lib/components/Icon';
import { ICON_GENERIC_20 } from '.';

const ICON_GENERIC = 'Page';
const ICON_DEFAULT_SIZE = 'icon16';
const ICON_CDN_URL = `https://modernb.akamai.odsp.cdn.office.net/files/fabric-cdn-prod_20210703.001/assets/item-types`;

/**
* File type icon component
*/
export class FileTypeIcon extends React.Component<IFileTypeIconProps, {}> {
  constructor(props: IFileTypeIconProps) {
    super(props);

    telemetry.track('ReactFileTypeIcon', {
      type: IconType[props.type],
      applicationType: !!props.application,
      path: !!props.path,
      size: !!props.size ? ImageSize[props.size] : 'default'
    });
  }

  /**
  * Function which returns the font icon
  */
  private _getIconClassName(): string {
    let className = ICON_GENERIC;

    // Check if the path property is provided
    if (typeof this.props.path !== 'undefined' && this.props.path !== null) {
      const path: string = this.props.path;
      const fileExtension: string = this._getFileExtension(path);
      // Check the known file extensions list
      const iconName = this._getIconByExtension(fileExtension.toLowerCase(), IconType.font);
      if (iconName !== null) {
        className = iconName.image;
      }
    }
    // Check if the application name has been provided
    else if (typeof this.props.application !== 'undefined' && this.props.application !== null) {
      const application: ApplicationType = this.props.application;
      const iconName = this._getIconByApplicationType(application, IconType.font);
      if (iconName !== null) {
        className = iconName.image;
      }
    }

    return className;
  }


  /**
  * Function which returns the image icon
  */
  private _getIconImageName(): IImageResult {
    let size = ICON_DEFAULT_SIZE;
    let imageInfo: ImageInformation = null;

    // Get the right icon size to display
    if (typeof this.props.size !== 'undefined' && this.props.size !== null) {
      // Retrieve the right icon size
      size = this._getFileSizeName(this.props.size);
    }

    // Check if the path is provided
    if (typeof this.props.path !== 'undefined' && this.props.path !== null) {
      const path: string = this.props.path;
      const fileExtension: string = this._getFileExtension(path);
      // Get the image for the current file extension
      imageInfo = this._getIconByExtension(fileExtension.toLowerCase(), IconType.image);
    }
    // Check if the application name has been provided
    else if (typeof this.props.application !== 'undefined' && this.props.application !== null) {
      const application: ApplicationType = this.props.application;
      imageInfo = this._getIconByApplicationType(application, IconType.image);
    }

    return {
      size,
      image: imageInfo && imageInfo.image ? imageInfo.image : null,
      cdnFallback: imageInfo && imageInfo.cdnFallback ? imageInfo.cdnFallback : null
    };
  }

  /**
  * Function to retrieve the file extension from the path
  *
  * @param value File path
  */
  private _getFileExtension(value): string {
    // Split the URL on the dots
    const splittedValue = value.split('.');
    // Take the last value
    let extensionValue = splittedValue.pop();
    // Check if there are query string params in place
    if (extensionValue.indexOf('?') !== -1) {
      // Split the string on the question mark and return the first part
      const querySplit = extensionValue.split('?');
      extensionValue = querySplit[0];
    }
    return extensionValue;
  }

  /**
  * Find the icon name for the provided extension
  *
  * @param extension File extension
  */
  private _getIconByExtension(extension: string, iconType: IconType): ImageInformation {
    // Find the application index by the provided extension
    const appIdx = findIndex(ApplicationIconList, item => { return item.extensions.indexOf(extension.toLowerCase()) !== -1; });

    // Check if an application has found
    if (appIdx !== -1) {
      // Check the type of icon, the image needs to get checked for the name
      if (iconType === IconType.font) {
        return {
          image: ApplicationIconList[appIdx].iconName,
          cdnFallback: null
        };
      } else {
        const knownImgs = ApplicationIconList[appIdx].imageName;
        // Check if the file extension is known
        const imgIdx = knownImgs.indexOf(extension);

        const imgExists = ApplicationIconList[appIdx].cdnImageName && ApplicationIconList[appIdx].cdnImageName.indexOf(extension) !== -1;
        let fallbackImg = null;
        if (imgExists) {
          fallbackImg = extension;
        } else if (ApplicationIconList[appIdx].cdnImageName && ApplicationIconList[appIdx].cdnImageName.length > 0) {
          fallbackImg = ApplicationIconList[appIdx].cdnImageName[0];
        }

        if (imgIdx !== -1) {
          return {
            image: knownImgs[imgIdx],
            cdnFallback: fallbackImg
          };
        } else {
          // Return the first one if it was not known
          return {
            image: knownImgs[0],
            cdnFallback: fallbackImg
          };
        }
      }
    }

    return null;
  }

  /**
  * Find the icon name for the application
  *
  * @param application
  */
  private _getIconByApplicationType(application: ApplicationType, iconType: IconType): ImageInformation {
    // Find the application index by the provided extension
    const appIdx = findIndex(ApplicationIconList, item => item.application === application);

    // Check if an application has found
    if (appIdx !== -1) {
      const knownApp = ApplicationIconList[appIdx];

      let fallbackImg = null;
      if (knownApp.cdnImageName && knownApp.cdnImageName.length > 0) {
        fallbackImg = knownApp.cdnImageName[0];
      }

      if (iconType === IconType.font) {
        return {
          image: knownApp.iconName,
          cdnFallback: fallbackImg
        };
      } else {
        // Check if the application has a known list of image types
        if (knownApp.imageName.length > 0) {
          return {
            image: knownApp.imageName[0],
            cdnFallback: fallbackImg
          };
        } else {
          return {
            image: null,
            cdnFallback: fallbackImg
          };
        }
      }
    }

    return null;
  }

  /**
  * Return the right image size for the provided value
  *
  * @param value Image size value
  */
  private _getFileSizeName(value: ImageSize): string {
    // Find the image size index by the image size
    const sizeIdx = findIndex(IconSizes, size => size.size === value);

    // Check if an icon size has been retrieved
    if (sizeIdx !== -1) {
      // Return the first icon size
      return IconSizes[sizeIdx].name;
    }

    // Return the default file size if nothing was found
    return ICON_DEFAULT_SIZE;
  }

  /**
  * Default React component render method
  */
  public render(): React.ReactElement<IFileTypeIconProps> {
    let iconElm = <span />;
    // Check the type of icon that needs to be displayed
    if (this.props.type === IconType.image) {
      // Return an image icon element
      const iconImage = this._getIconImageName();
      // Check if the image was found, otherwise a generic image will be returned
      if (iconImage.cdnFallback) {
        const size = iconImage.size.replace("icon", "");
        const iconUrl = `${ICON_CDN_URL}/${size}/${iconImage.cdnFallback}.png`;
        iconElm = <Icon imageProps={{ src: iconUrl }} />;
      } else if (iconImage.image) {
        iconElm = <Icon imageProps={{ className: `ms-BrandIcon--${iconImage.size} ms-BrandIcon--${iconImage.image}` }} />;
      } else {
        // Return a generic image
        let imgElm = <img />;
        // Check the size of the generic image which has to be returned
        switch (iconImage.size) {
          case 'icon16':
            imgElm = <Icon imageProps={{ src: ICON_GENERIC_16 }} />;
            break;
          case 'icon20':
            imgElm = <Icon imageProps={{ src: ICON_GENERIC_20 }} />;
            break;
          case 'icon48':
            imgElm = <Icon imageProps={{ src: ICON_GENERIC_48 }} />;
            break;
          case 'icon96':
            imgElm = <Icon imageProps={{ src: ICON_GENERIC_96 }} />;
            break;
          default:
            imgElm = <Icon imageProps={{ src: ICON_GENERIC_16 }} />;
            break;
        }

        iconElm = (
          <div style={{ display: 'inline-block' }}>
            {imgElm}
          </div>
        );
      }
    } else {
      // Return the icon font element
      const iconClass = this._getIconClassName();
      iconElm = <Icon iconName={iconClass} />;
    }

    // Return the icon element
    return iconElm;
  }
}
