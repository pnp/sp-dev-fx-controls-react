import * as React from 'react';
import { ImageFit } from '@fluentui/react/lib/Image';
/**
 * Carousel Image component props
 */
export interface ICarouselImageProps {
    /**
     * Image source
     */
    imageSrc: string;
    /**
     * Specifies the method to be used to fit image
     */
    imageFit?: ImageFit;
    /**
     * URL to be opened when clicking on details
     */
    url?: string;
    /**
     * Title to display in details
     */
    title?: string;
    /**
     * Description to show in details.
     * Can be either a string (text) or JSX.Element to show HTML
     */
    description?: string | JSX.Element;
    /**
     * Target of the URL to open
     */
    target?: '_blank' | '_self';
    /**
     * Specifies if the details are shown on hover or constantly
     */
    showDetailsOnHover?: boolean;
    /**
     * Class to apply to the component
     */
    className?: string;
    /**
     * Styles to apply to the component
     */
    style?: React.CSSProperties;
    /**
     * Class to apply to the image control
     */
    imgClassName?: string;
    /**
     * Styles to apply to the image control
     */
    imgStyle?: React.CSSProperties;
    /**
     * Class to apply to the details control
     */
    detailsClassName?: string;
    /**
     * Styles to apply to the details control
     */
    detailsStyle?: React.CSSProperties;
    /**
     * Class to apply to the title control
     */
    titleClassName?: string;
    /**
     * Styles to apply to the title control
     */
    titleStyle?: React.CSSProperties;
    /**
     * Class to apply to the description control
     */
    descriptionClassName?: string;
    /**
     * Class to apply to the description control
     */
    descriptionStyle?: React.CSSProperties;
}
export interface ICarouselImageState {
}
export default class CarouselImage extends React.Component<ICarouselImageProps, ICarouselImageState> {
    render(): React.ReactElement<ICarouselImageProps>;
}
//# sourceMappingURL=CarouselImage.d.ts.map