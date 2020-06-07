import * as React from 'react';
import styles from './CarouselImage.module.scss';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { css } from 'office-ui-fabric-react/lib/Utilities';

export interface ICarouselImageProps {
  imageSrc: string;
  imageFit?: ImageFit;
  url?: string;
  title?: string;
  description?: string | JSX.Element;
  target?: '_blank' | '_self';
  showDetailsOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  detailsClassName?: string;
  detailsStyle?: React.CSSProperties;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  descriptionClassName?: string;
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
