import * as React from 'react';
import styles from './Carousel.module.scss';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { css } from '@fluentui/react/lib/Utilities';

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

export interface ICarouselImageState { }

export default class CarouselImage extends React.Component<ICarouselImageProps, ICarouselImageState> {
  public render(): React.ReactElement<ICarouselImageProps> {
    const {
      imageSrc,
      imageFit = ImageFit.none,
      url,
      title,
      description,
      target = '_blank',
      showDetailsOnHover,
      className,
      style,
      imgClassName,
      imgStyle,
      detailsClassName,
      detailsStyle,
      titleClassName,
      titleStyle,
      descriptionClassName,
      descriptionStyle
    } = this.props;

    let details: JSX.Element | null = null;
    const hasDetails = !!title || !!description;

    if (hasDetails) {
      let descriptionEl: JSX.Element | null;
      if (description) {
        if (typeof(description) === 'string') {
          descriptionEl = <span className={descriptionClassName} style={descriptionStyle}>{description}</span>;
        }
        else {
          descriptionEl = description;
        }
      }
      const detailsContent = <div className={css(styles.details, detailsClassName)} style={detailsStyle}>
        {!!title && <span className={css(styles.title, titleClassName)} style={titleStyle}>{title}</span>}
        {descriptionEl}
      </div>;

      if (url) {
        details = <a href={url} target={target}>{detailsContent}</a>;
      }
      else {
        details = detailsContent;
      }
    }

    return (
      <div className={css(styles.carouselImage, className, showDetailsOnHover ? styles.dynamicDetails : styles.staticDetails)} style={style}>
        <Image className={css(styles.image, imgClassName)} style={imgStyle} imageFit={imageFit} src={imageSrc} />
        {details}
      </div>
    );
  }
}
