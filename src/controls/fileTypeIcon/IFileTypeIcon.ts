/**
 * Available icon types
 */
export enum IconType {
  font = 1,
  image
}

/**
 * Available applications / types
 */
export enum ApplicationType {
  Access = 1,
  ASPX,
  Code,
  CSS,
  CSV,
  Excel,
  HTML,
  Image,
  Mail,
  OneNote,
  PDF,
  PowerApps,
  PowerPoint,
  Project,
  Publisher,
  SASS,
  Visio,
  Word
}

/**
 * Available image sizes
 */
export enum ImageSize {
  small = 1,
  medium,
  large,
  normal
}

/**
 * Interface for the application icons list
 */
export interface IApplicationIcons {

  application: ApplicationType;
  extensions: string[];
  iconName: string;
  imageName: string[];
  cdnImageName?: string[];
}

/**
 * Array with all the known applications and their icon and image names
 */
export const ApplicationIconList: IApplicationIcons[] = [
  {
    application: ApplicationType.Access,
    extensions: ['accdb', 'accde', 'accdt', 'accdr', 'mdb'],
    iconName: 'AccessLogo',
    imageName: ['accdb'],
    cdnImageName: ["accdb"]
  },
  {
    application: ApplicationType.ASPX,
    extensions: ['aspx', 'master'],
    iconName: 'FileASPX',
    imageName: [],
    cdnImageName: ['spo']
  },
  {
    application: ApplicationType.Code,
    extensions: ['js', 'ts', 'cs', 'json'],
    iconName: 'FileCode',
    imageName: [],
    cdnImageName: ['code']
  },
  {
    application: ApplicationType.CSS,
    extensions: ['css'],
    iconName: 'FileCSS',
    imageName: [],
    cdnImageName: ['code']
  },
  {
    application: ApplicationType.CSV,
    extensions: ['csv'],
    iconName: 'ExcelDocument',
    imageName: ['csv'],
    cdnImageName: ['csv']
  },
  {
    application: ApplicationType.Excel,
    extensions: ['xls', 'xlt', 'xlm', 'xlsx', 'xlsm', 'xltx', 'xltm', 'ods'],
    iconName: 'ExcelDocument',
    imageName: ['xlsx', 'xls', 'xltx', 'ods'],
    cdnImageName: ['xlsx', 'xltx', 'ods']
  },
  {
    application: ApplicationType.HTML,
    extensions: ['html'],
    iconName: 'FileHTML',
    imageName: [],
    cdnImageName: ['html']
  },
  {
    application: ApplicationType.Image,
    extensions: ['jpg', 'jpeg', 'gif', 'png'],
    iconName: 'FileImage',
    imageName: [],
    cdnImageName: ['photo']
  },
  {
    application: ApplicationType.Mail,
    extensions: ['msg'],
    iconName: 'Mail',
    imageName: [],
    cdnImageName: ['email']
  },
  {
    application: ApplicationType.OneNote,
    extensions: ['one', 'onepkg', 'onetoc'],
    iconName: 'OneNoteLogo',
    imageName: ['one', 'onepkg', 'onetoc'],
    cdnImageName: ['one', 'onetoc']
  },
  {
    application: ApplicationType.PDF,
    extensions: ['pdf'],
    iconName: 'PDF',
    imageName: [],
    cdnImageName: ['pdf']
  },
  {
    application: ApplicationType.PowerApps,
    extensions: ['msapp'],
    iconName: 'PowerApps',
    imageName: []
  },
  {
    application: ApplicationType.PowerPoint,
    extensions: ['ppt', 'pot', 'pps', 'pptx', 'pptm', 'potx', 'potm', 'ppam', 'ppsx', 'ppsm', 'sldx', 'sldx'],
    iconName: 'PowerPointDocument',
    imageName: ['odp', 'potx', 'ppsx', 'pptx'],
    cdnImageName: ['pptx', 'odp', 'potx', 'ppsx']
  },
  {
    application: ApplicationType.Project,
    extensions: ['mpp', 'mpt', 'mpx', 'mpd'],
    iconName: 'ProjectLogoInverse',
    imageName: ['mpp', 'mpt'],
    cdnImageName: ['mpp', 'mpt']
  },
  {
    application: ApplicationType.Publisher,
    extensions: ['pub'],
    iconName: 'PublisherLogo',
    imageName: ['pub'],
    cdnImageName: ['pub']
  },
  {
    application: ApplicationType.SASS,
    extensions: ['scss', 'sass'],
    iconName: 'FileSass',
    imageName: [],
    cdnImageName: ['code']
  },
  {
    application: ApplicationType.Visio,
    extensions: ['vsd', 'vss', 'vst', 'vdx', 'vsx', 'vtx', 'vsdx'],
    iconName: 'VisioDocument',
    imageName: ['vsdx', 'vssx', 'vstx'],
    cdnImageName: ['vsdx', 'vssx', 'vstx']
  },
  {
    application: ApplicationType.Word,
    extensions: ['doc', 'dot', 'docx', 'docm', 'dotx', 'dotm', 'docb', 'odt'],
    iconName: 'WordDocument',
    imageName: ['docx', 'dotx', 'odt'],
    cdnImageName: ['docx', 'dotx', 'odt']
  }
];

/**
 * Array with the known icon image sizes
 */
export const IconSizes = [
  {
    size: ImageSize.small,
    name: 'icon16'
  },
  {
    size: ImageSize.medium,
    name: 'icon48'
  },
  {
    size: ImageSize.large,
    name: 'icon96'
  },
  {
    size: ImageSize.normal,
    name: 'icon20'
  }
];

/**
 * Interface for the image result when return the image instead of the icon font
 */
export interface IImageResult {

  size: string;
  image: string;
  cdnFallback: string;
}

export interface ImageInformation {

  image: string;
  cdnFallback: string;
}

/**
 * Interface for the FileTypeIcon component properties
 */
export interface IFileTypeIconProps {

  type: IconType;
  application?: ApplicationType;
  path?: string;
  size?: ImageSize;
}

/**
 * Generic file type icons base64 encoded
 */
export const ICON_GENERIC_16 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAACxUExURf///6CgoZeYmJ+goJSVlpydnaampqWlpaOjo6KioqCgoZ+fn52enpycnJqbm/39/fz9/fz8/dzc3Pr7+/r6+/n6+vn5+vj5+vj4+erq6oyMjJGSk/n6+/f4+fv8/JCRkvj5+Y+QkPv7/I2Oj/f4+IyNjvb3+IqMjJmZmvz8/ImKi5eYmPf3+IeJipaXl/X294aHiJSVlvb394SGh5OUlPb294OFhZKTk4GDhICCg////6edRp4AAAAGdFJOUwD5MPww+XxQO+MAAAABYktHRACIBR1IAAAAsElEQVQY0z3L2RqCIBCGYdq0MkPCgqxxQaI9LFvs/m8smIP+s++dZwghQTieTKNZPO/1CS6klCaMsWAxGCKMKU+XKyGD9WKEMKGpBxFk2QZhStPl1gFAXiBEiW9ZSsgrhBlzZwluqkaImVgJKAG02iHMmRAuQRu1RzgcSyl9G3VCOOf+/2KM4VeEW661T2N5g3BXvszDWt4iPD28rBt/I3z4fx1CUdW7/enatO/uS8gP83oU3WB3gUcAAAAASUVORK5CYII=';

export const ICON_GENERIC_20 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALBJREFUeNpiYKAyYETmJMTFzARSXETom7Vg0ZLDBFUBDVz88+fP//gASE1+bs4WIG2LzQwmdAE2NjaCFgeHhFixsrLlYDOUiZxwsrWzFwwLD3cFWp4ENFSeIgO5uLl53r59y+Di6iYYGhbuDxSqQpZnIdVAU1Mzvbra6g3fvn79ArMDb6T8JxGA9FAchvjAqIGjBg5KA3/9+kW0Zmxq0fPyt/TU5CUkOuobAy0BQIABAAt9e++IKuZcAAAAAElFTkSuQmCC';

export const ICON_GENERIC_48 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAGeUExURf///6Kio5iZmaSkpZeYmKOjpJaXl6ChopWWlp+goZSVlZ6en5OTlJucnZGSk5qbm6ampqWlpaSkpaSkpKOjo6KioqGioqGhoaCgoJ+goJ+fn56fn56enp2enp2dnZydnZycnJubnJqbm5qam5mamv39/fz9/fz8/fz9/Pz8/Pv8/P3+/unp6fv7+/r7+/r6+/r6+vn6+vn6+/n5+vj5+vj4+ff4+fj5+fLy8unq6vT09PHx8ejp6fv7/PPz8+/v7+Xl5e3t7evr6+Hh4e7u7ufn597e3vn6+erq6ujo6OPj49ra2vn5+YyMjJCSkuLi497f4N7f397e393e3+Hh4pCRkff4+Pf3+Pb3+I+QkY+QkI6PkI6Pj42Oj4yOjoyNjouNjYuMjYqMjIqLjImLi4mKi/b294iKipmZmvX294eJipiZmfb394eIiZiYmYaIiZeYmIaHiJeXmIWHiJaXl4WGh5WWl4SGh5WWloSFhpSVloOFhpSVlYKEhZOUlZOTlIKDhJKTlIGDhJKTk4CCg5GSkn+Bgn+BgX6Agf///0viRIgAAAAQdFJOUwD5MPww/DD8MPww/DD7MPl5g3acAAAAAWJLR0QAiAUdSAAAAmRJREFUSMfN0Wdf01AUwOG6twYolL3T2NjeEpMmao1AHTgq1kEb9i4Gi4iIiFhFrODH9o4kve1J+5rz+v+cc/NLIHByRxAaGpuCweaWUKi1rb2js6u7p7evf2Dw1OlaQHQmjEeSbkpSRJIjt4TombP+oEGMxRCKx+NDinJbVRVNS2i6IQt37p477wsaMWCCBxHhXvL+hYt+oEk0AdAweJAcHrl02QcE6ZOqL8hCcng09fDK1VqA+waVgUejqejjJ9euA9Assv34AAFjLkg9jT4bef7iBgAtIuvxAUVVVUNLM/CSzTgAITEeLx9wvtlIvMpkMq/fvH03UQMMsd59kZHQ8WRzljkJQKvIcvdAWsNA98AUAG1hheW41wxygLzIA9MAtIfd9ao2Rr+AO2CZMwB0hNl21qfZF5TBLACdkspGMWiPH+QcoGAOgC4GFLye9uRB3gHLnAegW9LwJ5BcTdDeexAFCwD0SBodlawv9+yAZS4C0Cux2llf2VvmEgB9kUSC1pW9C5YB6HeeRHO9qrdiKwAMEKCTmuRVvYVWARiMGGy8nOvzaA2A9wTopHZyvrfROgAf2Ee7Nd8XbBttAPBR1vnJsh9Gx8ZgE4BPckXO9XkCtgD4LPvntLfRNgBfZK4u5wXa22gHgK9ylk6Oz9l6AnYB+GbmcpUx19toD4DvplU9Ba+30T4AP8zaOQZFAH6atXNf8IsH+cocgwMAfpve7uqagEMA/sTydGzfQSUA/iK7zviA8frgCIAJVHeOAZicmp6ZnZtfWFxaXlldW9/Y3Nre2d3bLxYPDkulo+N/gZM7/wGRlGTTsm+SowAAAABJRU5ErkJggg==';

export const ICON_GENERIC_96 = 'data:image/png;base64,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';
